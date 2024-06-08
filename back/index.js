const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.json()); 

const db = require('./db'); 

const defaultroute = require('./routes/default/default');
app.use('/api/default', defaultroute);

const login = require('./routes/auth/login');
app.use('/api/login', login);

const register = require('./routes/auth/register');
app.use('/api/register', register);

const task = require('./routes/task/task');
app.use('/api/task', task);

const taskCheckbox = require('./routes/task/checkbox');
app.use('/api/taskcheckbox', taskCheckbox);

const userGetData = require('./routes/user/user');
app.use('/api/user', userGetData);

const deleteTask = require('./routes/task/delete');
app.use('/api/delete', deleteTask);

const getFolder = require('./routes/folder/getFolder');
app.use('/api/getfolder', getFolder);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});