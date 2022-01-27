const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const usersRouter = require('./router/users');
const productsRouter = require('./router/products');
const authJwt = require('./helpers/jwt');
require('dotenv/config')

app.use(cors())
app.options('*', cors())

app.use(express.json())
app.use(morgan('tiny'))
app.use(authJwt());

//Routers
app.use(`/products`, productsRouter);
app.use(`/users`, usersRouter);


const PORT = process.env.PORT || 4000 

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
    console.log('Nos conectamos a Mongo');
})
.catch((error) => {
    console.log(error.message);
})

app.listen(PORT, () => {
    console.log(`Estamos en el puerto ${PORT}`);
})
