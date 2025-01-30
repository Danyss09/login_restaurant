const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.get('/favicon.ico', (req, res) => res.status(204).end());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3) RETURNING id',
            [username, hashedPassword, email]
        );
        res.status(201).json({ message: 'Usuario registrado', userId: result.rows[0].id });
    } catch (err) {
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Datos recibidos para login:', { username, password }); // Log para verificar datos

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            console.log('Contraseña incorrecta');
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        console.log('Login exitoso:', username);
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ message: 'Login exitoso', token });
    } catch (err) {
        console.error('Error en login:', err);
        return res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));