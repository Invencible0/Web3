const express = require('express');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

// CONEXIÓN A MYSQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
database: 'practica2'
});

db.connect((err) => {
    if (err) {
        console.log('Error al conectar la base de datos');
        console.log(err);
        return;
    }

    console.log('Base de datos conectada');
});
// 1. POST /categorias
app.post('/categorias', (req, res) => {

    const { nombre, descripcion } = req.body;

    const sql =
        'INSERT INTO categorias(nombre, descripcion) VALUES (?, ?)';

    db.query(sql, [nombre, descripcion], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Categoría registrada correctamente',
            id: result.insertId
        });

    });

});
// 2. GET /categorias
app.get('/categorias', (req, res) => {

    const sql = 'SELECT * FROM categorias';

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

});

// 3. GET /categorias/:id
app.get('/categorias/:id', (req, res) => {

    const id = req.params.id;

    const sqlCategoria =
        'SELECT * FROM categorias WHERE id = ?';

    db.query(sqlCategoria, [id], (err, categoria) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (categoria.length === 0) {
            return res.status(404).json({
                mensaje: 'Categoría no encontrada'
            });
        }

        const sqlProductos =
            'SELECT * FROM productos WHERE categoria_id = ?';

        db.query(sqlProductos, [id], (err, productos) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                categoria: categoria[0],
                productos: productos
            });

        });

    });

});
// 4. PATCH /categorias/:id
app.patch('/categorias/:id', (req, res) => {

    const id = req.params.id;

    const { nombre, descripcion } = req.body;

    const sql = `
        UPDATE categorias
        SET nombre = ?,
            descripcion = ?,
            updatedAt = NOW()
        WHERE id = ?
    `;

    db.query(sql, [nombre, descripcion, id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Categoría actualizada correctamente'
        });

    });

});
// 5. DELETE /categorias/:id
app.delete('/categorias/:id', (req, res) => {

    const id = req.params.id;

    const sql =
        'DELETE FROM categorias WHERE id = ?';

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            mensaje: 'Categoría eliminada correctamente'
        });

    });

});
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});