import { Router } from 'express';
import { getUser } from '../model/Users.js';
import { getFather } from '../model/father.js';

const router = Router();

router.get('/all_users_orm', async function (req, res) {
    getUser.findAll({ 
        include:{
            model:getFather,
            attributes:['name','lastNamef','lastNamem','age']
        },
        attributes: ['id','name','lastName','email','password','phone_number'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/create_users_orm', async function (req, res) {

    getUser.create({
        name: req.query.name,
        lastName: req.query.lastName,
        email: req.query.email,
        password: req.query.password,
        phone_number: req.query.phone_number
    })
        .then(users => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/update_users_orm', async function (req, res) {
    let id = req.query.id;
    let newDato = req.query;
    getUser.findOne({
        where: { id: id },
    })
        .then(users => {
            users.update(newDato)
                .then(newuser => {
                    res.send(newuser)
                })
        })
});

router.delete('/destroy_users_orm', async function (req, res) {
    let id = req.query.id

    getUser.destroy({
        where: { id: id }
    }).then(() => {
        res.send('persona eliminada')
    })
});

export default router;