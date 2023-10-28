import express, { Express } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import router from './routes/index'
import errorMiddleware from './middlewares/error.middleware'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

// to parse body
app.use(express.json())

// to parse cookie
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!)

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
