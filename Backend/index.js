const express = require('express');
const app = express();
require('dotenv').config();
require('./models/dbConnection');
const PORT = process.env.PORT || 8080;
const AuthRouter = require('./routes/authRouter');
const cors = require('cors');




app.use(cors())
app.get('/', (req,res) => { 
    res.send("hello from auth server")
})

app.use('/auth', AuthRouter)
app.listen(PORT , () => {
    console.log(`Server is running on ${PORT}`);

})
