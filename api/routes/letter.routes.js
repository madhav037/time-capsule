import express, { Router } from 'express'
import { addLetter, getLetterById, viewPublicLetters } from '../controllers/letter.controller.js'


const router = Router()

router.post('/add',addLetter)
router.get('/getall',viewPublicLetters)
router.get('/get-user-letters/:id',getLetterById)
// router.get('/test/add-to-cache', addLettersToCache)

export default router