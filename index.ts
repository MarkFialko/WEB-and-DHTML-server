import express, { Express } from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import router from './routes/index'
import errorMiddleware from './middlewares/error.middleware'
import cors from 'cors'
import multer from 'multer'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

//load images to static folder
const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, 'uploads')
  },
  filename: (_,file,cb)=> {
      cb(null,file.originalname)
  }
})

const upload = multer({ storage})

app.use(cors(
  {
    origin:process.env.CLIENT_URL,
    credentials:true,
  }
))

app.post('/upload',upload.single('image'), (req,res) => {
  res.json({
    url: `/uploads/${req.file?.originalname}`
  })
})

// to show image in uploads folder
app.use('/uploads',express.static('uploads'))

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
