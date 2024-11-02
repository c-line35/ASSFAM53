const Book=require('../models/books');
const fs = require ('fs');

const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàâùûîïôq°<Q/'\-,.?":{}()]{0,20000}$/i);

exports.createbook=(req, res, next)=>{
    let bookObject = JSON.parse(req.body.data);
    const code= bookObject.code;
    const title = bookObject.title;
    const author = bookObject.author;
    const resume = bookObject.resume;
    const cat = bookObject.cat;
    const theme = bookObject.theme;
    
    const valideCode=inputRegexp.test(code);
    const valideTitle=inputRegexp.test(title);
    const valideAuthor=inputRegexp.test(author);
    const valideResume=inputRegexp.test(resume);
    const valideCat=inputRegexp.test(cat);
    const valideTheme=inputRegexp.test(theme);

    if(!valideCode || !valideTitle || !valideAuthor || !valideResume || !valideCat || !valideTheme){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('library')){
            if(req.file){
                const host = req.get('host')
                let imageUrl=`${process.env.PROTOCOLE}://${host}/imageBook/${req.file.filename}`;
                let likes=[];
                let notice=[];
                const book = new Book({ code, title, author, resume, cat, theme, imageUrl, likes, notice})
                book.save()
                .then((data)=>res.status(201).json(data))
                .catch((error)=>res.status(400).json(error))
            }
            else{
                let likes=[];
                let notice=[];
                const book = new Book({ code, title, author, resume, cat, theme, likes, notice})
                book.save()
                .then((data)=>res.status(201).json(data))
                .catch((error)=>res.status(400).json(error))
            }
        }
        else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}

exports.getAllBooks=(req, res, next)=>{
    Book.find()
    .populate('notice', '-__v -bookId')
    .then((library)=>{res.status(200).json(library)})
    .catch((error)=>{res.status(400).json(error)})
}

exports.getOneBook=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Book.findOne({_id:id})
        .populate('notice', '-__v -_id -bookId')
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Livre non trouvé'})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(error=>res.status(400).json({ error }))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'}) 
    }
}

exports.updatebook=(req, res, next)=>{
    const id = req.params.id
    let bookObject = JSON.parse(req.body.data);
    const code= bookObject.code;
    const title = bookObject.title;
    const author = bookObject.author;
    const resume = bookObject.resume;
    const cat = bookObject.cat;
    const theme = bookObject.theme;

    const valideCode=inputRegexp.test(code);
    const valideTitle=inputRegexp.test(title);
    const valideAuthor=inputRegexp.test(author);
    const valideResume=inputRegexp.test(resume);
    const valideCat=inputRegexp.test(cat);
    const valideTheme=inputRegexp.test(theme);

    if(!valideCode || !valideTitle || !valideAuthor || !valideResume || !valideCat || !valideTheme){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        Book.findOne({_id:id})
        .then((book)=>{
                if(req.auth.userRole === 'admin' && req.auth.userRights.includes('library')){
                    if(book.imageUrl){
                        const filename= book.imageUrl.split('/imageBook/')[1];       
                        fs.unlink(`imageBook/${filename}`, (err)=>{
                            if(err)console.log(err)
                            else console.log('ancienne image supprimée')})     
                    }
                    if(req.file){
                        const host = req.get('host')
                        let imageUrl=`${process.env.PROTOCOLE}://${host}/imageBook/${req.file.filename}`;
                        Book.updateOne({_id:id}, { code, title, author, resume, cat, theme, imageUrl })
                        .then(()=>res.status(200).json({message:"Modification réussie"}))
                        .catch((error)=>res.status(400).json(error))
                    }
                    else{
                        Book.updateOne({_id:id}, { code, title, author, resume, cat, theme })
                        .then(()=>res.status(200).json({message:"Modification réussie"}))
                        .catch(()=>res.status(400).json({message:"une erreur d'update est survenue"}))
                    }
                }
                else{
                    return res.status(401).json({message: 'Requête non authentifiée'})
                } 
            
        })
        .catch(()=>res.status(400).json({message:"Livre non trouvé"})) 
    }
}

exports.updateLike=(req, res, next)=>{
    const id = req.params.bookId
    const user = req.auth.userId;
    const userId = req.params.userId
    Book.findOne({_id:id})
    .then((book)=>{
        if((req.auth.userRole === 'admin' || req.auth.userRole==='user') && user === userId){
            const cond = book.likes.includes(userId)
            if (cond){
                const likes = book.likes.filter((user)=> user!==userId)
                console.log(likes)
                Book.updateOne({_id:id}, {likes})
                .then(()=>res.status(200).json({message:"like enlevé"}))
                .catch(()=>res.status(400).json({message:"une erreur de like est survenue"}))
            }else{
                const likes = book.likes
                likes.push(userId)
                console.log(likes)
                Book.updateOne({_id:id}, {likes})
                .then(()=>res.status(200).json({message:"like ajouté"}))
                .catch((error)=>res.status(400).json(error))
            }
        } else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        } 
    })
    .catch(()=>res.status(400).json({message:"Livre non trouvé"}))
}

exports.deleteBook=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('library')){
        Book.findOne({_id:id})
        .then((book)=>{
            if(book.imageUrl){
                const filename= book.imageUrl.split('/imageBook/')[1];       
                fs.unlink(`imageBook/${filename}`, (err)=>{
                    if(err)console.log(err)
                    else console.log('ancienne image supprimée')})                
            }
            Book.deleteOne({_id:id})
            .then(()=> res.status(200).json({ message: 'livre supprimé'}))
            .catch(error => res.status(400).json({message: 'une erreur est survenue lors de la suppression du livre'}))
        })
        .catch(()=>res.status(400).json({message:"Livre non trouvé"}))
    }else{
        return res.status(401).json({message: "Vous n'avez pas les droits pour effectuer cette opération"})
    }
}
