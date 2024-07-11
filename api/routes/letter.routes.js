import express, { Router } from 'express'
import { addLetter, viewPublicLetters } from '../controllers/letter.controller.js'


const router = Router()

router.post('/add',addLetter)
router.get('/getall',viewPublicLetters)

export default router