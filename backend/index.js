const express = require('express');
const app = express();
const rootRouter = require('./routes/index.js')
const userRouter = require('./user.js')
const port = 3000;

app.use('/api/v1', rootRouter)
app.use('/api/v1/user', userRouter)
app.get('/', (req, res) => res.send("Hello there sexy fellow"));
app.listen(port, () => console.log(`server started at port ${port}`));

