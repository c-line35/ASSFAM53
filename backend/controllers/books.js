const Book=require('../models/books')

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
    .then((library)=>{res.status(200).json(library)})
    .catch((error)=>{res.status(400).json(error)})
}

exports.getOneBook=(req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'user'||req.auth.userRole === 'admin'){
        Book.findOne({_id:id})
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