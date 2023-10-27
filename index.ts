import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL!)
    console.log(mongoose.connection.readyState)

    app.get('/', (req: Request, res: Response) => {
      res.send('Express + Typescript server')
    })

    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
