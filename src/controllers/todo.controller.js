const pool = require('../config/db')

exports.createTodo = async (req, res) => {
    const { title, description } = req.body

    const [result] = await pool.query(
        'insert into todos (title, description, user_id) values (?, ?, ?)',
        [title, description, req.user.id]
    );

    res.json({
        id: result.insertId,
        title: title,
        description
    });
};

exports.getTodo = async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [todos] = await pool.query(
        'select * from todos where user_id=? limit ? offset ?',
        [req.user.id, limit, offset]
    )

    const [[{ total }]] = await pool.query(
        'select count(*) as total from todos where user_id=?',
        [req.user.id]
    )

    res.json({
        data: todos,
        page: page,
        limit: limit,
        total: total
    })
};

exports.updateTodo = async (req, res) => {
    const { title, description } = req.body;
    const todoId = req.params.id;

    const [todos] = await pool.query(
        'SELECT * FROM todos WHERE id=? AND user_id=?',
        [todoId, req.user.id]
    );

    if (todos.length === 0) {
        return res.status(404).json({ message: 'Todo not found' });
    }

    await pool.query(
        'UPDATE todos SET title=?, description=? WHERE id=?',
        [title, description, todoId]
    );

    res.json({ id: todoId, title, description });
};

exports.deleteTodo = async (req, res) => {
    const todoId = req.params.id;

    const [result] = await pool.query(
        'delete from todos where id=? and user_id=?',
        [todoId, req.user.id]
    )

    if (result.affectedRows === 0){
        res.status(403).json({ message: 'Forbidden' });
    }

    res.status(204).send()
};
