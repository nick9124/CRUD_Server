const express = require('express');
const controller = require('../controller/posts_controller');
const router = express.Router();

router.get('/tasks', controller.getTasks);
router.get('/tasks/:id', controller.getTask);
router.put('/tasks/:id', controller.updateTask);
router.delete('/tasks/:id', controller.deleteTask);
router.post('/tasks', controller.addTask);

module.exports = router;
