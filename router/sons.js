import { Router } from "express";
import { getSon } from "../model/son.js";

const router = Router();

router.get('/all_son_orm', async function (req, res) {
    getSon.findAll({ attributes: ['name'] })
        .then(son => {
            res.send(son)
        })
        .catch(err => {
            console.log(err)
        })
});

router.post('/create_son_orm', async function (req, res) {

    getSon.create({
        name: req.query.name,
        lastNamef: req.query.lastNamef,
        lastNamem: req.query.lastNamem,
        age:req.query.age,
        catFatherId:req.query.catFatherId
    })
        .then(father => {
            res.send(father);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put('/update_son_orm', async function (req, res) {
    let id = req.query.id;
    let newDato = req.query;
    getSon.findOne({
        where: { id: id },
    })
        .then(son => {
            son.update(newDato)
                .then(newson => {
                    res.send(newson)
                })
        })
});

router.delete('/destroy_son_orm', async function (req, res) {
    let id = req.query.id

    getSon.destroy({
        where: { id: id }
    }).then(() => {
        res.send('hijo eliminado')
    })
});

export default router;