import { Router } from "express";
import { getImg } from "../model/imagen.js";
import multer from 'multer';

const router = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/image')
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop()
        // console.log(file.originalname)
        cb(null, `${Date.now()}.${ext}`)
    }
})

const upload = multer({ storage })

router.post('/upload', upload.single('name'), async function (req, res) {

    // console.log(req.body.file)
    getImg.create({
        
        name: req.file.originalname
    }, { fields: ['name'] })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
        });
})

router.get('/get_all', async function (req, res) {
    getImg.findAll({ exclude: [] })
        .then(img => {
            res.send(img)
        })
        .catch(err => {
            console.log(err)
        })
});

export default router;