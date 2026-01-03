const pool = require('../config/db');

exports.createTask = async (req, res) => {
    try {
        const { title, description, start_date, end_date, priority } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const [result] = await pool.query(
            `INSERT INTO tasks 
            (user_id, title, description, start_date, end_date,  priority) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.user.id,
                title,
                description || null,
                start_date || null,
                end_date || null,
                priority || 'medium'
            ]
        );

        res.status(201).json({
            id: result.insertId,
            user_id: req.user.id,
            title,
            description,
            start_date,
            end_date,
            priority: priority || 'medium',
            status: 'pending'
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getTask = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const [tasks] = await pool.query(
            `SELECT * FROM tasks 
            WHERE user_id = ? 
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?`,
            [req.user.id, limit, offset]
        );

        const [[{ total }]] = await pool.query(
            'SELECT COUNT(*) AS total FROM tasks WHERE user_id = ?',
            [req.user.id]
        );

        res.json({
            data: tasks,
            page,
            limit,
            total
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, status, end_date, priority } = req.body;
        const taskId = req.params.id;

        const fields = [];
        const values = [];

        if (title !== undefined) {
            fields.push('title=?');
            values.push(title);
        }

        if (status !== undefined) {
            fields.push('status=?');
            values.push(status);
        }

        if (end_date !== undefined) {
            fields.push('end_date=?');
            values.push(end_date);
        }

        if (priority !== undefined) {
            fields.push('priority=?');
            values.push(priority);
        }

        values.push(taskId, req.user.id);

        const [result] = await pool.query(
            `UPDATE tasks 
            SET ${fields.join(', ')} 
            WHERE id=? AND user_id=?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'Task not found or forbidden' });
        }

        res.json({ msg: 'Task updated successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id

        const [result] = await pool.query(
            'delete from tasks where id=? and user_id=?',
            [taskId, req.user.id]
        )

        if (result.affectedRows === 0) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        res.status(204).send()

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};

