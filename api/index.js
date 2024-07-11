import express from 'express'
import letterHandler from './routes/letter.routes.js'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { getTodaysDate } from './utils/getTodayDate.js'
import { addLetter } from './controllers/letter.controller.js'
import bodyParser from 'body-parser'
dotenv.config()

export const supabase = createClient(process.env.SUPABASEURL,process.env.PUBLICANONKEY)

const app = express()
app.use(bodyParser.json());


app.use('/api/letters',letterHandler)


app.listen(5000,() => {
    console.log("Server listening on port : 5000")
})