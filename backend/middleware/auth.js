const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports=(req, res, next)=>{ 
    
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const userId = decodedToken.userId;
        const userRole = decodedToken.role;
        const userRights = decodedToken.userRights;
        req.auth = {userId, userRole, userRights};
        
        if(req.body.userId && req.body.userId !== userId){
            throw'userId non valable!';
            }else{
                next();
            }
        }catch(error){
            res.status(401).json({error: 'Requête non authentifiée !'});
    };
};