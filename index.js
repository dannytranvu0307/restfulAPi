const express = require('express');
const app = express();
const port = 3000;
const authRouter = require('./router/auth');
const homeRouter = require('./router/home');
const adminRouter = require('./router/admin');
const db = require('./config/db');
const path = require('path')
db.connect();

app.use(express.static(path.join(__dirname,'/public/image')));
app.use(express.urlencoded());
app.use(express.json());
app.use('/user', authRouter);
app.use('/',homeRouter);
app.use('/admin', adminRouter);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})