const Article =require('../models/articles')
const fs = require('fs')

const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.?":{}]{0,20000}$/i);

exports.createArticle=(req, res, next)=>{
    let articleObject = JSON.parse(req.body.data);
    const title = articleObject.title;
    const content = articleObject.content;
    const position = articleObject.position;
    

    const valideTitle = inputRegexp.test(title);
    const valideContent = inputRegexp.test(content);
    const validePosition = inputRegexp.test(position);
 

    if(!valideTitle || !valideContent || !validePosition){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisée'})
    }else{
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
            if(req.file){
                const host = req.get('host')
                let imageUrl=`${req.protocol}://${host}/images/${req.file.filename}`
                let document=''
                const article = new Article({ title, imageUrl, content, position, document})
                article.save()
                .then((data)=>res.status(201).json(data))
                .catch((error)=>res.status(400).json({error}))
            }else{
                const article = new Article({title, content, position, document} )
                article.save()
                .then((data)=>res.status(201).json(data))
                .catch((error)=>res.status(400).json({error}))
            }
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}

exports.getAllArticles = (req, res, next)=>{
    Article.find()
    .then((articles)=>res.status(200).json(articles))
    .catch(error=>res.status(400).json({error:error}))
}

exports.updateArticle=(req, res, next)=>{
    const { id }= req.params;
    let articleObject = JSON.parse(req.body.data);
    const title = articleObject.title;
    const content = articleObject.content;

    const valideTitle = inputRegexp.test(title);
    const valideContent = inputRegexp.test(content);

    if(!valideTitle || !valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisée'})
    }else{
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
            if(req.file){
                Article.findOne({_id:id})
                .then((article)=>{
                    if(article.imageUrl){
                        const filename= article.imageUrl.split('/images/')[1];       
                        fs.unlink(`images/${filename}`, (err)=>{
                            if(err)console.log(err)
                            else console.log('ancienne image supprimée')})                
                    }
                    const host = req.get('host')
                    let imageUrl = `${req.protocol}://${host}/images/${req.file.filename}`
                    Article.updateOne({_id:id}, {title, content, imageUrl})
                    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
            }else{
                Article.updateOne({_id:id}, { title, content } )
                .then(() => res.status(200).json({message: "article modifié" }))
                .catch(error => res.status(400).json({ error }));
            }
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}
exports.addDoc=(req, res, next)=>{
    const { id }= req.params;
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
                Article.findOne({_id:id})
                .then((article)=>{
                    if(article.document){
                        const filename= article.document.split('/articleDoc/')[1];       
                        fs.unlink(`articleDoc/${filename}`, (err)=>{
                            if(err)console.log(err)
                            else console.log('ancien document supprimé')})                
                    }
                    const host = req.get('host')
                    let document = `${req.protocol}://${host}/articleDoc/${req.file.filename}`
                    Article.updateOne({_id:id}, { document })
                    .then(() => res.status(200).json({ message: 'document ajouté !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
    }
}
exports.deleteDoc=(req, res, next)=>{
    const { id }= req.params;
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
                Article.findOne({_id:id})
                .then((article)=>{
                    if(article.document){
                        const filename= article.document.split('/articleDoc/')[1];       
                        fs.unlink(`articleDoc/${filename}`, (err)=>{
                            if(err)console.log(err)
                            else console.log('ancien document supprimé')})                
                    }
                    let document = ''
                    Article.updateOne({_id:id}, { document })
                    .then(() => res.status(200).json({ message: 'document supprimé !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
    }
}