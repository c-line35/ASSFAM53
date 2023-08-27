const Event =require('../models/agenda')

const inputRegexp = new RegExp(/^[a-z0-9\séèçêëàâùîïôq°<Q/'\-,.?":{}()]{0,20000}$/i);

exports.createEvent=(req, res, next)=>{
    let eventObject = req.body
    const title = eventObject.title;
    const content = eventObject.content;
    const date = eventObject.date;
    const place = eventObject.place;

    const valideTitle = inputRegexp.test(title);
    const valideContent = inputRegexp.test(content);

    if(!valideTitle || !valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
    }else{
        if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
            const event = new Event({ title, content, date, place})
            event.save()
            .then((data)=>res.status(201).json(data))
            .catch((error)=>res.status(400).json({error}))
        }else{
            return res.status(401).json({message: 'Requête non authentifiée'})
        }
    }
}

exports.getAllEvents = (req, res, next)=>{
    Event.find()
    .then((events)=>{res.status(200).json(events)})
    .catch(error=>res.status(400).json({error:error}))
}

exports.getOneEvent = (req, res, next)=>{
    const id = req.params.id
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
        Event.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Evènement non trouvé'})
            }else{
                res.status(200).json(data)
            }
        })
        .catch(error=>res.status(400).json({ error }))
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'})
    }
}

exports.updateEvent = (req, res, next)=>{
    const id = req.params.id
    let eventObject = req.body
    const title = eventObject.title;
    const content = eventObject.content;
    const date = eventObject.date;
    const place = eventObject.place;

    const valideTitle = inputRegexp.test(title);
    const valideContent = inputRegexp.test(content);

    if(!valideTitle || !valideContent){
        return res.status(400).json({error:'Certains caractères spéciaux ne sont pas autorisés'})
        }else{
            if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
                Event.findOne({_id: id})
                .then((data)=>{
                    if(!data){
                        res.status(404).send({message: 'Evènement non trouvé'})
                    }else{
                        Event.updateOne({_id:id}, {title, content, date, place})
                        .then(() => res.status(200).json({ message: 'Objet modifié !'}))
                        .catch(error => res.status(400).json({ message: error.message}));
                    }
                })
            }else{
                return res.status(401).json({message: 'Requête non authentifiée'})
            }
    }
}

exports.deleteEvent=(req, res, next)=>{
    const id = req.params.id;
    if(req.auth.userRole === 'admin' && req.auth.userRights.includes('articles')){
        Event.findOne({_id: id})
        .then((data)=>{
            if(!data){
                res.status(404).send({message: 'Evènement non trouvé'})
            }else{
                Event.deleteOne({_id:id})
                .then(()=> res.status(200).json({ message: 'article supprimé'}))
                .catch(error => res.status(400).json({error}))
            }
        })
    }else{
        return res.status(401).json({message: 'Requête non authentifiée'})
    }
}