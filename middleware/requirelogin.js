const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongoose = require('mongoose');
const User = mongoose.model('Users');

module.exports = (req, res, next)=>{
    // const timeoutPromise = new Promise(resolve => {
    //     const timeout = setTimeout(() => {
    //       clearTimeout(timeout);
    //       resolve('It took too long...');
    //     }, 8000);
    // });
    
    const {authorization} = req.headers;
    // Promise.race([timeoutPromise, authorization]);
    // console.log(authorization);

    if(!authorization){
        return res.status(401).redirect('/home');
        // return res.status(401).send("You are not a valid user    !");
    }
    
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.JWT_SECRET, (err, payload)=>{
            // console.log(err);

        if(err){
            console.log(err);
            return res.status(401).send("You must be logged in !")
            // res.redirect('/');
        }

        const {_id} = payload;
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })

    })

    
}