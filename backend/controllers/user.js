const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const  Staff  = require('../models/staff')

const inputRegexpTxt = new RegExp(/^[a-z0-9\séèçêëàù'\-,.":{}]{0,200}$/i);
const inputRegexpName = new RegExp(/^[a-z\séèçêëàù'\-,.":{}]{0,200}$/i);

exports.signup =(req, res, next)=>{
    const { email, password, lastName, firstName, role, end, level, phoneNumber, adress, post, city} = req.body;
    const valideLastName=inputRegexpName.test(lastName);
    const validefirstName=inputRegexpName.test(firstName);
    const validePhoneNumber=inputRegexpTxt.test(phoneNumber);
    const valideAdress=inputRegexpTxt.test(adress);
    const validePost=inputRegexpTxt.test(post);
    const valideCity=inputRegexpName.test(city);

    if(!valideLastName || !validefirstName || !validePhoneNumber || !valideAdress || !validePost || !valideCity){
        return res.status(400).json({error : 'certains caractères spéciaux ne sont pas autorisés'})
        }else{
        bcrypt.hash(password, 10)
        .then(hash =>{
            const user = new User({
                email,
                password: hash,
                lastName,
                firstName,
                role, 
                end,
                phoneNumber,
                level,
                adress,
                post,
                city
        });
        user.save()
        .then(()=> res.status(201).json({message: "Utilisateur créé!"}))
        .catch(() => res.status(400).json({message:"une erreur est survenue"}));
        })
        .catch(() => res.status(400).json({message:"une erreur est survenue"}));
    }
}

exports.login = (req, res, next) =>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé !'})
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid =>{
                if(!valid){
                    return res.status(401).json({error: 'Mot de passe incorrect'})
                }else{
                    res.status(200).json({
                          token: jwt.sign(
                        {
                            userId: user._id,
                            role: user.role,
                            userRights: user.adminRights
                        },
                        process.env.TOKEN_KEY,
                        {expiresIn: '24h'}
                    )  
                })}
                
            }) 
            .catch(error => res.status(500).json({error: 'erreur crypt'}));
    })
    .catch(error => res.status(500).json({error: 'erreur server'}));
}
exports.getDataUser = (req, res, next)=>{

    const token= req.params.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const  id  = decodedToken.userId;
        User.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Utilisateur non trouvé'})
            }else{
                res.status(200).send(data)
            }
    }) 
}
exports.getAllUsers = (req, res, next) =>{
    if(req.auth.userRole !== 'admin'){
        return res.status(401).json({error: 'Requête non authentifiée'})
    }else{
        User.find()
        .then((users)=> {
            res.status(200).json(users)
        })
        .catch(error => res.status(400).json({ error: error }));
    }
};

exports.resetPassword = (req, res, next)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé !'})
        }
        else{ 
            res.status(200).json({
                  token: jwt.sign(
                {
                    userId: user._id,
                    role: user.role,
                    userRights: user.adminRights
                },
                process.env.TOKEN_KEY,
                {expiresIn: '24h'}
                ),
            })
        }
    })
    .catch(error => res.status(500).json({error: 'erreur server'}));   
}

exports.initPassword=(req, res, next)=>{
    const token = req.params.token
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    const id = decodedToken.userId;

    User.findOne({_id:id})
    .then((user)=>{
        if(!user){
            res.status(404).json({message:'Utilisateur non trouvé'})
        }else{
            bcrypt.hash(req.body.password, 10)
            .then(hash=>{
                User.updateOne({_id: id}, {password: hash})
                .then(() =>res.status(200).json({ message: 'Objet modifié !'}))
                .catch(error => res.status(400).json({ error }));
        })}
    })
}
//--------------------------------------------
exports.updateUser=(req, res, next)=>{
    const id = req.params.id;
    const{ lastName, firstName, email, phoneNumber, level, adress, post, city } =req.body;
    const valideLastName=inputRegexpName.test(lastName);
    const validefirstName=inputRegexpName.test(firstName);
    const validePhoneNumber=inputRegexpTxt.test(phoneNumber);
    const valideAdress=inputRegexpTxt.test(adress);
    const validePost=inputRegexpTxt.test(post);
    const valideCity=inputRegexpName.test(city);

    if(!valideLastName || !validefirstName || !validePhoneNumber || !valideAdress || !validePost || !valideCity){
        return res.status(400).json({error : 'certains caractères spéciaux ne sont pas autorisés'})
        }else{
            if(req.auth.userRole === 'admin' && req.auth.userRights.includes('users')|| req.auth.userId === id ){
                User.findOne({_id: id})
                .then((data)=>{
                    if(!data){
                        res.status(404).send({message: 'Utilisateur non trouvé'})
                    }else{
                            User.updateOne({_id:id}, {lastName, firstName, email, phoneNumber, level, adress, post, city})
                            .then(()=>res.status(200).json())
                            .catch(error=>res.status(400).json({ error }))
                    }
                })    
            }else{
                return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
        }
    }
}

exports.updateAdminRights=(req, res, next)=>{
    const id = req.params.id;
    const{ adminRights } =req.body
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('adminRights') ){
        User.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Utilisateur non trouvé'})
            }else{
                
                if (data.role ==='admin'){
                    User.updateOne({_id:id}, {adminRights})
                    .then((user)=>res.status(200).json({message: `Vous êtes sur le point de modifier les droits d'administrateurs de ${user.firstName}" "${user.lastName} `}))
                    .catch(error=>res.status(400).json({ error }))
                }else{
                    return res.status(401).json({error: 'Requête non autorisée'})
                }
            }
        })    
    }else{
        return res.status(401).json({error: 'Requête non authentifiée'})
    }
}

exports.getUserById=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'admin'  || req.auth.userId === id){
        User.findOne({_id:id})
        .then((user) =>res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
    }else{     
        return res.status(401).json({error: 'Requête non authentifiée'})
    }
}

exports.deleteUser=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('users') || req.auth.userId === id){
       
       User.findOne({_id:id})
        .then((data)=>{
            if(data){
                Staff.findOne({user:data})
                .then((staffData)=>{
                    if(staffData){
                        Staff.deleteOne({_id:staffData._id})
                        .then(()=>{
                            User.deleteOne({_id:id})
                            .then(()=>res.status(200).json({message:"utilisateur et staff supprimé"}))
                        })
                    }else{
                        User.deleteOne({_id:id})
                        .then((res)=>res.status(200).json({message:"utilisateur supprimé"}))
                        .catch((err)=>res.status(400).json({err}))
                    }
                })
            }else{
                return res.status(400).json({message: "utilisateur non trouvé"})
            }
        }) 
    }else{     
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}

exports.updateUserEnd=(req, res, next)=>{
    const id = req.params.id;
    const newYear = req.body.newYear;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('users') ){
        User.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Utilisateur non trouvé'})
            }else{
                let end= data.end
                if(end.includes(newYear)){
                        return res.status(400).json({message: `L'adhérent ${data.firstName} ${data.lastName} est déjà inscrit pour ${newYear}`})
                    }else{
                        end.push(newYear)
                        User.updateOne({_id:id}, {end})
                        .then(()=> res.status(200).json())
                        .catch((error)=> res.status(400).json({message:error}))
                        }}})
                
    }else{
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}
    exports.updateUserAdmin=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('adminRights') ){
        User.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Utilisateur non trouvé'})
            }else{
                if(data.role === "admin"){
                        return res.status(400).json({message: `L'adhérent ${data.firstName} ${data.lastName} est déjà dans la liste des administrateurs`})
                    }else{
                        let role = data.role;
                        role = "admin";
                        User.updateOne({_id:id}, {role})
                        .then(()=> res.status(200).json())
                        .catch((error)=> res.status(400).json({message:error}))
                        }}})
                
    }else{
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}
exports.deleteUserAdmin=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('adminRights') ){
        User.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Utilisateur non trouvé'})
            }else{
                if(data.role === "user"){
                        return res.status(400).json({message: `L'adhérent ${data.firstName} ${data.lastName} n'est pas un administrateur`})
                    }else{
                        let role = data.role;
                        let adminRights=data.adminRights;
                        role = "user";
                        adminRights=[];
                        console.log(adminRights)
                        User.updateOne({_id:id}, {role, adminRights})
                        .then(()=> res.status(200).json())
                        .catch((error)=> res.status(400).json({message:error}))
                        }}})
                
    }else{
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}
exports.getAllAdmins = (req, res, next) =>{
    if(req.auth.userRole !== 'admin' ){
        return res.status(401).json({error: 'Requête non authentifiée'})
    }else{
        User.find({ role :"admin"})
        .then((admins)=>res.status(200).json(admins))
        .catch(error => res.status(400).json({ error }));
    }
};
