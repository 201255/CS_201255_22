const { query } = require('express');
const express = require('express');

const response= require('../../../network/response');

const router = express.Router();

router.get('/', function(req, res){
    
    // res.send({
    //     success: 'success 1',
    // })
    response.succes(req,res,'',200)
    
});

router.post('/login',function(req,res){
    let username=req.query.username;
    let password=req.query.password;
    console.log(req.query);
    res.send({
        username,
        password,
        token:'token',
        id_user:'id_user',
        success:'Ok'
})
})

router.post('/register', function(req,res){
    let username=req.query.username;
    let password=req.query.password;
    let email=req.query.email;
    let number_phone=req.query.number_phone;
    console.log(req.query);
    res.send({
        username,
        password,
        email,
        number_phone,
        token:'token',
        id_user:'id_user',
        success:'Ok'
    })
})

module.exports = router;
