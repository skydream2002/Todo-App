const pool = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { name, email, password } = req.body

    const [exiting] = await pool.query(
        'select id from User where email=?',
        [email]
    );

    if (exiting.length) {
        res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        'insert into User(name, email, password) values (?, ?, ?)',
        [name, email, hashedPassword]
    )

    const token = jwt.sign(
        { id: result.insertId, email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.json({ msg: 'registered ', token: token })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const [users] = await pool.query(
        'select * from User where email=?',
        [email]
    )

    if (users.length === 0) {
        res.status(401).json({ msg: 'Invalid email' })
    }

    const user = users[0]
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        res.status(400).json({ msg: 'Invalid paswword' })
    }

    const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' }
    );

    res.json({ msg: 'logined ', token: token });
}