require('dotenv').config()

const express = require('express')
const app = express()
// async errors
require('express-async-errors')

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')

const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(express.json())

// Routes
app.get('/', (req, res) => {
	res.send('<h1>Store API</h1><a href="/api/v1/products">Products</a>')
})

// Products routes
app.use('/api/v1/products', productsRouter)

// Middlewares
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 5000

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(PORT, console.log(`Server is listening on port: ${PORT}...`))
  } catch (error) {
    console.log(error)
  }
}


start()


