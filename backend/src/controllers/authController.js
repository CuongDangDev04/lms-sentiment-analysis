const User = require('../models/user'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 

exports.register = async (req, res) => {
    const { id, username, password, fullname, role } = req.body;

    if (!id || !username || !password || !fullname || !role) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
        return res.status(400).json({ message: 'Username already exists!' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ id, username, password: hashedPassword, fullname, role });
        res.status(201).json({ message: 'User created successfully!', user });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'User registration failed!' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required!' });
    }

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid password!' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful!', token, user: { id: user.id, username: user.username, fullname: user.fullname, role: user.role } });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed!' });
    }
};
