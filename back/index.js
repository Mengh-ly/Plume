const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());

app.use(express.json()); 

const db = require('./db'); 

const defaultroute = require('./routes/default/default');
app.use('/api/default', defaultroute);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});