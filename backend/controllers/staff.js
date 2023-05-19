const Staff = require('../models/staff');
const fs = require('fs');


const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}]{0,200}$/i);


exports.createStaff=(req, res, next)=>{
    const { user, imageUrl, grade, mission, coordonnees }=req.body;
    const staff = new Staff({
        user, imageUrl, grade, mission, coordonnees
    })
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('staff')){
            staff.save()
            .then((data)=>res.status(201).json(data))
            .catch((error)=>res.status(400).json({error}))
        }else{
            return res.status(401).json({error: 'Requête non authentifiée'})
    }
}
    exports.getStaffById=(req, res, next)=>{
        const id = req.params.id
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('staff') || req.auth.userId === id){
          Staff.findOne({_id:id}).populate('user', '-_id -__v -password -role -end -level -adminRights')
            .then((data)=>{
                res.status(200).json(data)
            })
            .catch((error)=>{
            res.status(400).json({error});
            console.log(error)
        })
        }else{     
            return res.status(401).json({error: 'Requête non authentifiée'})
        }
    
}
exports.getAllStaff = (req, res, next) =>{
        Staff.find()
        .populate('user', '-__v -password -role -end -level -adminRights -email -coordonnees -_id -adress -city -post -phoneNumber')
        .select('grade mission ca')
        .then((staffs)=> {
            res.status(200).json(staffs)
        })
        .catch(error => {
            res.status(400).json({ error: error })
        });
};
exports.getAllStaffConn = (req, res, next) =>{
        Staff.find().populate('user', '-__v -password -role -end -level -adminRights')
        .then((staffs)=> {
            res.status(200).json(staffs)
        })
        .catch(error => res.status(400).json({ error: error }));
};

exports.updateStaff=(req, res, next)=>{
    const { id }=req.params;
    let staffObject = JSON.parse(req.body.data);
    const grade = staffObject.grade;
    const ca = staffObject.ca[0];
    const mission = staffObject.mission;
    const coordonnees = staffObject.coordonnees;

    const valideGrade=inputRegexp.test(staffObject.grade);
    const valideMission=inputRegexp.test(staffObject.mission);
    const valideCoordonnees=inputRegexp.test(staffObject.coordonnees);

    if(!valideGrade || !valideMission|| !valideCoordonnees){
        return res.status(400).json({error : 'certains caractères spéciaux ne sont pas autorisés'})
        }else{
   if(req.file){
        Staff.findOne({_id:id})
        .then((staff)=>{
           if(req.auth.userRole === 'admin' && req.auth.userRights.includes('staff')) {
                if(staff.imageUrl){
                    const filename= staff.imageUrl.split('/images/')[1];       
                    fs.unlink(`images/${filename}`, (err)=>{
                        if(err)console.log(err)
                        else console.log('ancienne image supprimée')})                
                }
               const host = req.get('host')
                let imageUrl = `${req.protocol}://${host}/images/${req.file.filename}`
                Staff.updateOne({_id:id}, {grade, ca, mission, coordonnees, imageUrl})
                .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ message: error.message}));
            }else{
                    return res.status(401).json({message: 'Requête non authentifiée'})
                }
        })
        .catch((error)=> res.status(400).send({message: error.message}))
    }else{
       
            Staff.updateOne({_id:id}, { grade, ca, mission, coordonnees } )
            .then(() => res.status(200).json({message: "membre modifié" }))
            .catch(error => res.status(400).json({ error }));
        }
    } 
}
exports.deleteStaff=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('staff') || req.auth.userId === id){
        Staff.findOne({_id:id})
        .then((staff)=>{
           if(req.auth.userRole === 'admin' && req.auth.userRights.includes('staff')) {
                if(staff.imageUrl){
                    const filename= staff.imageUrl.split('/images/')[1];       
                    fs.unlink(`images/staff/${filename}`, (err)=>{
                        if(err)console.log(err)
                        else console.log('ancienne image supprimée')})                
                }}})
        Staff.deleteOne({_id: req.params.id})
            .then(()=> res.status(200).json({ message: 'Membre supprimé'}))
            .catch(error => res.status(400).json({error}))
    }else{     
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}