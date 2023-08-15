const Article =require('../models/articles')
const fs = require('fs')

const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàù'\-,.?":{}]{0,20000}$/i);
const pattern =/(https?|http):\/\/[a-z0-9\/:%_+.,#?!@&=-]+/
const linkRegexp = new RegExp(pattern); 
let date = Date.now()


exports.createArticle=(req, res, next)=>{
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
                const host = req.get('host')
                let imageUrl=`${req.protocol}://${host}/images/${req.file.filename}`
                let document=''
                let lien=''
                const article = new Article({ title, imageUrl, content, document, lien, date})
                article.save()
                .then((data)=>res.status(201).json(data))
                .catch((error)=>res.status(400).json({error}))
            }else{
                let document=''
                let lien=''
                const article = new Article({title, content, document, lien, date} )
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
    .then((articles)=>{res.status(200).json(articles)})
    .catch(error=>res.status(400).json({error:error}))
}

exports.updateArticle=(req, res, next)=>{
    let date = Date.now()
    const { id }= req.params;
    let articleObject = JSON.parse(req.body.data);
    const title = articleObject.title;
    const content = articleObject.content;

    const valideTitle = inputRegexp.test(title);
    const valideContent = inputRegexp.test(content);

    if(!valideTitle || !valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
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
                    Article.updateOne({_id:id}, {title, content, imageUrl, date})
                    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
            }else{
                Article.updateOne({_id:id}, { title, content, date } )
                .then(() => res.status(200).json({message: "article modifié" }))
                .catch(error => res.status(400).json({ error }));
            }
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}
exports.addDoc=(req, res, next)=>{
    let date = Date.now()
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
                    Article.updateOne({_id:id}, { document, date })
                    .then(() => res.status(200).json({ message: 'document ajouté !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
    }
}
exports.deleteDoc=(req, res, next)=>{
    let date = Date.now()
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
                    Article.updateOne({_id:id}, { document, date })
                    .then(() => res.status(200).json({ message: 'document supprimé !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
    }
}
exports.addLink=(req, res, next)=>{
    let date = Date.now()
    const lien=req.body.lien
    const valideLien = linkRegexp.test(lien);
    const { id }= req.params;
    if(!valideLien && lien.length>0){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
                Article.findOne({_id:id})
                .then(()=>{
                    Article.updateOne({_id:id}, { lien, date })
                    .then(() => res.status(200).json({ message: 'lien modifié !'}))
                    .catch(error => res.status(400).json({ message: error.message}));
                })
                .catch((error)=> res.status(400).send({message: error.message}))
        }
    }
}

exports.deleteArticle=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles') || req.auth.userId === id){
        Article.findOne({_id:id})
        .then((article)=>{
           if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')) {
                if(article.imageUrl){
                    const filename= article.imageUrl.split('/images/')[1];       
                    fs.unlink(`images/${filename}`, (err)=>{
                        if(err)console.log(err)
                        else console.log('ancienne image supprimée')})                
                }
            }})
        Article.deleteOne({_id: req.params.id})
            .then(()=> res.status(200).json({ message: 'article supprimé'}))
            .catch(error => res.status(400).json({error}))
    }else{     
        return res.status(401).json({message: 'Vous navez pas les droits pour effectuer cette opération'})
    }
}