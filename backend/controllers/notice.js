const Notice =require('../models/notices');
const Book = require('../models/books')

const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàâùûîïôq°<Q/'\-,.?":{}()]{0,20000}$/i);

let date = Date.now();

exports.createNotice=(req, res,next)=>{
    const bookId = req.params.bookId;
    const userId = req.params.userId
    let noticeObject = req.body;
    const content = noticeObject.content;
    const level = noticeObject.level;

    const valideContent = inputRegexp.test(content);

    if (!valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        if (req.auth.userId === userId){
            Book.findOne({_id:bookId})
            .then((book)=>{
                const notice = book.notice;
                const checkNotice = book.notice.find((notice)=>notice.userId === userId)                
                if (!checkNotice){
                    const newNotice = new Notice({ userId, bookId, content, level, date})
                    newNotice.save()
                    .then(()=>{
                    notice.push(newNotice)
                        Book.updateOne({_id:bookId}, {notice})
                        .then(()=>res.status(200).json({message: "avis publié"}))
                        .catch(()=>res.status(400).json({message:"Une erreur est survenue pour l'avis"}))
                    })
                    .catch(()=>res.status(400).json({message:"Une erreur est survenue lors de la création de l'avis "}))
                }else{
                    return res.status(400).json({message: 'Un avis existe déjà'})
                }
            })
            .catch(()=>res.status(400).json({message:"Livre non trouvé"}))
          
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}

exports.getOneNotice=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Notice.findOne({_id:id})
        .then((notice)=>{
            res.status(200).json(notice)})
        .catch(()=>res.status(400).json({ message:"avis non trouvé" }))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'}) 
    }
}

exports.getBookNotices=(req, res, next)=>{
    const bookId = req.params.bookId;
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Notice.find({bookId:bookId})
        .then((data)=>res.status(201).json(data))
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
    const bookId = noticeObject.bookId;
    const content = noticeObject.content;
    const level = noticeObject.level;
    const userId = req.auth.userId;
    date=Date.now()

    const valideContent = inputRegexp.test(content);

    if (!valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
       Notice.updateOne({_id:id}, {content, level, date})
       .then(()=>{
        Notice.findOne({_id:id})
        .then((data)=>{
            Book.findOne({_id:data.bookId})
            .then((book)=>{
                const notice = book.notice.filter(not=>not.userId !== userId)
                notice.push(data)
                Book.updateOne({_id:book._id}, { notice })
                .then(()=>res.status(200).json({message: "avis et livre mis à jour"}))
                .catch(()=>res.status(400).json({message:"Une erreur est survenue lors de la mise à jour du livre"}))
            })
            .catch(()=>res.status(400).json({message:"livre non trouvé"}))
           })
        .catch(()=>res.status(400).json({message:"notice non trouvée"}))
       })
       .catch((error)=>res.status(400).json(error))
        ////////////////////////////////////////problème avec la notice trouvée; _id = new ObjectId("6547b4c394226aace9115b56")//////////////////
        /*  Notice.findOne({_id:id})
            .then((notice)=>{
            const newNotice = notice;
            if(notice.userId === userId){
                
                Notice.updateOne({bookId: bookId , userId:userId}, { content, level, date })
                .then((notice)=>{
                    console.log(notice)
                    Book.findOne({_id:notice.bookId})
                    .then((book)=>{
                        const notice = book.notice.filter((not)=>not._id !== newNotice.id);
                        notice.push(newNotice)
                        Book.updateOne({_id: book._id}, {notice})
                        .then(()=>res.status(200).json({messge:"modification réussie"}))
                        .catch(()=>res.status(400).json({message: "erreur lors de la mise à jour le l'avis"}))
                    })
                    .catch(()=>res.status(401).json({message: "livre non trouvé"}))
                })
                .catch(()=>res.status(401).json({message: "Une erreur est survenue lors de la mise à jour de l'avis"})) 
            }else{
                return res.status(401).json({message: 'Requête non authentifiée'})
          
        })
        .catch(()=>res.status(400).json({message:"Livre non trouvé"})  }) */
    }
}