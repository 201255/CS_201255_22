import { Router } from "express";
import { getUser } from "../model/Users.js";

const router = Router();

router.get('/get_all', async function (req, res) {
    getUser.findAll({ exclude: [] })
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
    }, { fields: ['name', 'lastName','email', 'password', 'phone_number'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        });
});

router.put("/update_users_orm", async function (req, res) {
    let id = req.query.id;
    let newDato = req.query;
    getUser
        .findOne({
            where: { id: id },
        })
        .then((users) => {
            users.update(newDato)
                .then(newuser => {
                    res.send(newuser)
                })
        });
});

router.delete('/delete_user_orm', async function (req, res) {
    let id = req.query.id;
    getUser.destroy({
        where: {
            id: id
        }
    })
        .then((r) => {
            _success(req, res, r, 200);
        })
        .catch((e) => {
            _success(req, res, e, 200);
        });
});

export default router;