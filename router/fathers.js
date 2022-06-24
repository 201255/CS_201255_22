import { Router } from "express";
import { getFather } from "../model/father.js";
import { getUser } from "../model/Users.js";
import { getSon } from "../model/son.js";

const router = Router();

router.get('/all_father_orm', async function (req, res) {
    getFather.findAll({
        include:{
            model:getSon,
            attributes:['name','lastNamef','lastNamem','age']
        },
        attributes: ['id','name','lastNamef','lastNamem','age'] })
        .then(father => {
            res.send(father)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/create_father_orm', async function (req, res) {

    getFather.create({
        name: req.query.name,
        lastNamef: req.query.lastNamef,
        lastNamem: req.query.lastNamem,
        age:req.query.age,
        catUserId: req.query.catUserId
    })
        .then(father => {
            res.send(father);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/update_father_orm', async function (req, res) {
    let id = req.query.id;
    
    let newDato = req.query;
    getFather.findOne({
        where: { id: id },
    })
        .then(father => {
            father.update(newDato)
                .then(newfather => {
                    res.send(newfather)
                })
        })
});

router.delete('/destroy_father_orm', async function (req, res) {
    let id = req.query.id

    getFather.destroy({
        where: { id: id }
    }).then(() => {
        res.send('padre eliminado')
    })
});

export default router;