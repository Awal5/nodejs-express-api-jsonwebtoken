require('dotenv').config();
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const { handphone } = require('../controllers');

function AuthenticateAccessToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[2];
    console.log(process.env.ACCESS_TOKEN_SECRET);
    console.log(token);

    if (token == null) {
        res.json({ message: 'Invalid access token' });
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.json({ message: err });
            } else {

                next();
            }
        });
    }
}

// GET localhost:8080/karyawan => Ambil data semua karyawan
router.get('/handphone', handphone.getDataHandphone);

// GET localhost:8080/handphone/2 => Ambil data semua handphone berdasarkan id = 2
router.get('/handphone/:id', handphone.getDataHandphoneByID);

// POST localhost:8080/handphone/add => Tambah data handphone ke database
router.post('/handphone/add', AuthenticateAccessToken, handphone.addDataHandphone);

// POST localhost:8080/handphone/2 => Edit data handphone
router.post('/handphone/edit', handphone.editDataHandphone);

// POST localhost:8080/handphone/delete => Delete data handphone
router.post('/handphone/delete/', handphone.deleteDataHandphone);

module.exports = router;