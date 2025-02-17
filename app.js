const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./auth');
const users = require('./users');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint untuk login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        const token = auth.generateToken(user);
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Endpoint untuk mendapatkan profil
app.get('/profile', auth.authenticateToken, (req, res) => {
    const user = users.find(u => u.username === req.user.username);
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});