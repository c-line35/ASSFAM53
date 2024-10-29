const Notice =require('../models/notices');
const Book = require('../models/books');
const User = require('../models/user');


const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàâùûîïôq°<Q/'\-,.?":{}()]{0,20000}$/i);

let date = Date.now();


exports.createNotice=(req, res,next)=>{
    const bookId = req.params.bookId;
    const userId = req.params.userId
    let noticeObject = req.body;
    const content = noticeObject.content;
    const level = noticeObject.level; 
    const firstName = noticeObject.firstName;

    const valideContent = inputRegexp.test(content);

    if (!valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        if (req.auth.userId === userId){

            Notice.find({userId:userId, bookId:bookId})
            .then((data)=>{
                if(data.length>=1){
                    res.status(400).json({message: "Vous avez déjà publié un avis pour ce livre"})
                }else{
                    Book.findOne({_id:bookId})
                    .then((book)=>{
                        const notice=book.notice
                        const newNotice = new Notice({ userId, bookId, content, level, date, firstName})
                        newNotice.save()
                        .then(()=>{
                        notice.push(newNotice)
                            Book.updateOne({_id:bookId}, {notice})
                            .then(()=>res.status(200).json({message: "avis publié"}))
                            .catch(()=>res.status(400).json({message:"Une erreur est survenue pour l'avis"}))
                        })
                        .catch(()=>res.status(400).json({message:"erreur lors de la création de l'avis"}))
                    })
                    .catch(()=>{res.status(400).json({mesage:"Livre non trouvé"})})
                   
                }
            })
            .catch((error)=>res.status(400).json(error))          
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}

exports.getOneNotice=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Notice.findOne({_id:id})
        .populate('userId', '-_id -__v -email -password -lastName -phoneNumber -adress -post -city -role -end -level -adminRights')
        .then((notice)=>{
            res.status(200).json(notice)
        })
        .catch(()=>res.status(400).json({ message:"avis non trouvé" }))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'}) 
    }
}

exports.getBookNotices=(req, res, next)=>{
    const bookId = req.params.bookId;
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Notice.find({bookId:bookId})
        .populate('userId', '-__v -email -password -lastName -phoneNumber -adress -post -city -role -end -level -adminRights')
        .then((data)=>{
            res.status(201).json(data)
        })
        .catch((error)=>res.status(400).json(error))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'})
    }
}

exports.getUserNotice=(req, res, next)=>{
    const userId = req.params.userId;
    if(req.auth.userId === userId){
        Notice.find({userId:userId})
        .then((data)=>res.status(201).json(data))
        .catch((error)=>res.status(400).json(error))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'})
    }
}

exports.updateNotice=(req, res, next)=>{
    const id = req.params.id
    let noticeObject = req.body;
    const content = noticeObject.content;
    const level = noticeObject.level;
    date=Date.now()

    const valideContent = inputRegexp.test(content);

    if (!valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        Notice.updateOne({_id:id}, { content, level, date })
        .then((notice)=>{
            res.status(200).json(notice)})
        .catch(()=>res.status(400).json({ message:"avis non trouvé" }))
    }
}

exports.deleteNotice=(req, res, next)=>{

  const noticeId = req.params.noticeId;
  const userId =req.params.userId;
    if((req.auth.userRole === 'admin' && req.auth.userRights.includes('library'))|| userId === req.auth.userId ){
        Notice.findOne({_id:noticeId })
        .then((data)=>{
            Book.findOne({_id:data.bookId})
            .then((book)=>{
                const bookId = book._id
                console.log(bookId)
                 Notice.deleteOne({_id: data._id})
                .then(()=>{
                    Notice.find({bookId:book._id})
                    .select("_id")
                    .then((liste)=>{
                        const notice=liste
                        console.log(notice)
                       Book.updateOne({_id:bookId}, {notice})
                        .then(()=>res.status(200).json({message:"Avis supprimé et livre mis à jour"}))
                        .catch(()=>res.status(400).json({message:"erreur lors de la mise à jour du livre"}))
                    })
                    .catch(()=>res.status(400).json({message:"Avis du livre non trouvé"}))
                })
                .catch(()=>res.status(400).json({message:"erreur lors de la suppression de l'avis"})) 
            })        
            .catch(()=>res.staus(400).json({message:"Livre non trouvé"}))
        })
        .catch(()=>res.status(400).json({message:"Avis non trouvé"}))
      }else{
        return res.status(401).json({message: 'Requête non authentifiée'})
    }
}