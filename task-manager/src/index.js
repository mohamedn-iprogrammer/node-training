const express = require('express');
require('./db/mongoose');
const User = require('./model/user');
const Task = require('./model/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    const result = await user.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }

  // user
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
  // User.find({})
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

app.get('/users/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }

  // User.findById(_id)
  //   .then((result) => {
  //     if (!result) {
  //       return res.status(404).send();
  //     }
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     res.status(500).send();
  //   });
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    const result = await task.save();
    res.status(201).send(result);
  } catch (error) {
    res.status(400).send(error);
  }

  // task
  //   .save()
  //   .then((result) => {
  //     res.status(201).send(result);
  //   })
  //   .catch((error) => {
  //     res.status(400).send(error);
  //   });
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.find({})
  //   .then((result) => {
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

app.get('/tasks/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }

  // Task.findById(_id)
  //   .then((result) => {
  //     if (!result) {
  //       return res.status(404).send();
  //     }
  //     res.send(result);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   });
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
