const pool = require('../config/db');

exports.getCalender = async (req, res) => {
    try {
        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                message: 'from and to are required'
            });
        }

        const [tasks] = await pool.query(
            `SELECT id, title, start_date, end_date, status, priority
            FROM tasks
            WHERE user_id = ?
            AND start_date <= ?
            AND end_date >= ?
            ORDER BY start_date ASC`,
            [req.user.id, to, from]
        );

        res.json({
            events: tasks.map(task => ({
                id: task.id,
                title: task.title,
                start: task.start_date,
                end: task.end_date,
                status: task.status,
                priority: task.priority
            }))
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
