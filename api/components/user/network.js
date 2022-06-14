import { Router } from 'express';

import { success as _success } from '../../../network/response.js';
import { getData } from '../../../model/db.js';
import { getUser } from '../../../model/Users.js';

import cors from 'cors';
const router = Router();

var allowlist = ['http://localhost:3000', ''];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    } else {
        corsOptions = { origin: false }
    }
    callback(null, corsOptions)
}

router.get('/obtener', cors(corsOptionsDelegate), async function (req, res) {
    const client = await getConnection();

    let id = req.query.id

    const query_request = {
        text: 'SELECT * FROM tbl_usersdb ',

    }

    client.query(query_request)
        .then(r => { _success(req, res, r, 200); })
        .catch(e => { _success(req, res, e.stack, 400); })
})

router.post('/login', function (req, res) {
    let username = req.query.username;
    let password = req.query.password;
    console.log(req.query);
    res.send({
        username,
        password,
        token: 'token',
        id_user: 'id_user',
        success: 'Ok'
    })
})

router.post('/register', function (req, res) {
    let username = req.query.username;
    let password = req.query.password;
    let email = req.query.email;
    let number_phone = req.query.number_phone;
    console.log(req.query);
    res.send({
        username,
        password,
        email,
        number_phone,
        token: 'token',
        id_user: 'id_user',
        success: 'Ok'
    })
})

router.post('/register2', cors(corsOptionsDelegate), async function (req, res) {
    const client = await getConnection();

    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: 'INSERT INTO tbl_usersdb(username,email,password,phone_number) VALUES($1, $2, $3, $4)',
        values: [username, email, password, phone_number]
    };

    client.query(query_request)
        .then(r => { _success(req, res, r, 200); })
        .catch(e => { _success(req, res, e, 200); })

});

router.delete('/delete', cors(corsOptionsDelegate), async function (req, res) {
    const client = await getConnection();


    let id = req.query.id;


    const query_request = {
        text: `DELETE FROM tbl_usersdb WHERE id=${id} `,

    };

    client.query(query_request)
        .then(r => { _success(req, res, r, 200); })
        .catch(e => { _success(req, res, e, 400); })
});

router.put('/update', cors(corsOptionsDelegate), async function (req, res) {
    const client = await getConnection();

    let id = req.query.id;
    let username = req.query.username;
    let email = req.query.email;
    let password = req.query.password;
    let phone_number = req.query.phone_number;

    const query_request = {
        text: `UPDATE tbl_usersdb SET username=$1, email=$2, password=$3, phone_number=$4 WHERE id=${id}`,
        values: [username, email, password, phone_number]

    };

    client.query(query_request)
        .then(r => { _success(req, res, r, 200); })
        .catch(e => { _success(req, res, e.stack, 400); })

});

router.get('/all_users_orm', async function (req, res) {
    getUser.findAll({ attributes: ['name'] })
        .then(users => {
            res.send(users)
        })
        .catch(err => {
            console.log(err)
        })
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

router.post("/create_users_orm", async function (req, res) {

    getUser
        .create({

            username: req.query.username,
            email: req.query.email,
            password: req.query.password,
            phone_number: req.query.phone_number,

        }, { fields: ['username', 'email', 'password', 'phone_number'] })
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            console.log(err);
        });
});

export default router;
