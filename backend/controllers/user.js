const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.signup =(req, res, next)=>{
    const { email, password, lastName, firstName, role, end, form, level, phoneNumber} = req.body
    bcrypt.hash(password, 10)
    .then(hash =>{
        const user = new User({
            email,
            password: hash,
            lastName,
            firstName,
            role, 
            end,
            form,
            phoneNumber,
            level
       });
       user.save()
       .then(()=> res.status(201).json({message: "Utilisateur créé!"}))
       .catch(error => res.status(400).json({error}));
    })
    .catch(error => res.status(500).json({error}))
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
                            role: user.role
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

    User.findOne({where: {id: parseInt(id)}})
    .then((data)=>{
        if(!data){
            res.status(404).send({message: 'Utilisateur non trouvé'})
        }else{
       
        res.status(200).send(data)
        }
    })
}