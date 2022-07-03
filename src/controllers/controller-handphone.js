const config = require('../configs/database');
const mysql = require('mysql');
const pool = mysql.createPool(config);

pool.on('error', (err) => {
    console.error(err);
});

module.exports = {
    // Ambil data semua Handphone
    getDataHandphone(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM handphone;
                `,
                function(error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    // Ambil data Handphone berdasarkan ID
    getDataHandphoneByID(req, res) {
        let id = req.params.no_seri;
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                SELECT * FROM handphone WHERE no_seri = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil ambil data!',
                        data: results
                    });
                });
            connection.release();
        })
    },
    // Simpan data handphone
    addDataHandphone(req, res) {
        let data = {
            handphone_nama: req.body.nama,
            jenis: req.body.jenis,
            tgl_produksi: req.body.tgl_produksi,
        }
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                INSERT INTO handphone SET ?;
                `, [data],
                function(error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil tambah data!',
                    });
                });
            connection.release();
        })
    },
    // Update data Handphone
    editDataKaryawan(req, res) {
        let dataEdit = {
            handphone_nama: req.body.nama,
            jenis: req.body.jenis,
            tgl_produksi: req.body.tgl_produksi,
        }
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                UPDATE handphone SET ? WHERE no_seri = ?;
                `, [dataEdit, id],
                function(error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil edit data!',
                    });
                });
            connection.release();
        })
    },
    // Delete data Handphone
    deleteDataKaryawan(req, res) {
        let id = req.body.id
        pool.getConnection(function(err, connection) {
            if (err) throw err;
            connection.query(
                `
                DELETE FROM handphone WHERE no_seri = ?;
                `, [id],
                function(error, results) {
                    if (error) throw error;
                    res.send({
                        success: true,
                        message: 'Berhasil hapus data!'
                    });
                });
            connection.release();
        })
    }
}