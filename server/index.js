const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db.js');

app.use(cors());
app.use(express.json());

//api routes

//get all todos
app.get("/todos", async (req, res) =>{
    try {
        const getTodos = await pool.query("SELECT * FROM todo");
        res.json(getTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//post a new todo
app.post('/todos', async (req, res) => {
    try {
        const {message} = req.body;
        const postTodo = await pool.query('INSERT INTO todo (message) VALUES ($1) RETURNING *', [message]);
        res.json(postTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get individual todo
app.get('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const getTodo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(getTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//Update todo
app.put('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {message} = req.body;
        const updateTodo = await pool.query('UPDATE todo SET message = $1 WHERE todo_id = $2', [message, id]);

        res.json("Todo was updated");
    } catch (err) {
        console.error(err.message);
    }
})


//Delete todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

        res.json("Todo was delete!");
    } catch (err) {
        console.error(err.message);
    }
})

app.listen('5000', ()=>{
    console.log("App is running on port 5000")
});