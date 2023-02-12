// import axios, { AxiosResponse } from 'axios';
const express = require('express');
const fs = require('fs');

const { Request, Response, NextFunction } = express;

// getting all tasks
const getTasks = (req, res, next) => {
  fs.readFile(`${__dirname}/../data/tasks.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading tasks file',
        error: err,
      });
    }
    let allTasks = JSON.parse(data);
    return res.status(200).json({
      message: allTasks,
    });
  });
};

// getting a single task
const getTask = (req, res, next) => {
  let taskId = req.params.id;
  fs.readFile(`${__dirname}/../data/tasks.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading tasks file',
        error: err,
      });
    }
    let tasks = JSON.parse(data);
    let id = parseInt(taskId);
    let task = tasks.filter((task) => task.id == id);
    return res.status(200).json({
      message: task,
    });
  });
};

// updating a task
const updateTask = (req, res, next) => {
  // get the task id from the req.params
  let id = req.params.id;
  // get the data from req.body
  let taskData = req.body.task ?? null;
  fs.readFile(`${__dirname}/../data/tasks.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading tasks file',
        error: err,
      });
    }
    let tasks = JSON.parse(data);
    let id = parseInt(req.params.id);
    tasks = tasks.map((task) =>
      task.id == id
        ? {
            ...task,
            task: taskData,
          }
        : task
    );
    fs.writeFile(
      `${__dirname}/../data/tasks.json`,
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error updating task',
            error: err,
          });
        }
        return res.status(200).json({
          message: `Task with id: ${id} is updated`,
        });
      }
    );
  });
};

// deleting a task
const deleteTask = (req, res, next) => {
  // get the task id from req.params
  let id = req.params.id;
  fs.readFile(`${__dirname}/../data/tasks.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading tasks file',
        error: err,
      });
    }
    let tasks = JSON.parse(data);
    let id = parseInt(req.params.id);
    tasks = tasks.filter((task) => task.id != id);
    fs.writeFile(
      `${__dirname}/../data/tasks.json`,
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error deleting task',
            error: err,
          });
        }
        return res.status(200).json({
          message: `task with id: ${id} is deleted`,
        });
      }
    );
  });
};

// adding a task
const addTask = (req, res, next) => {
  // get the data from req.body
  let task = req.body.task;
  fs.readFile(`${__dirname}/../data/tasks.json`, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({
        message: 'Error reading tasks file',
        error: err,
      });
    }
    let tasks = JSON.parse(data);
    let newId = tasks.length + 1;
    tasks.push({
      id: newId,
      task,
    });
    fs.writeFile(
      `${__dirname}/../data/tasks.json`,
      JSON.stringify(tasks),
      (err) => {
        if (err) {
          return res.status(500).json({
            message: 'Error adding task',
            error: err,
          });
        }
        return res.status(200).json({
          message: `task added successfully`,
        });
      }
    );
  });
};

module.exports = { getTasks, getTask, updateTask, deleteTask, addTask };
