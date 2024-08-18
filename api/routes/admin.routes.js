import express, { Router } from 'express'
import { insertInBulk } from '../controllers/admin.controller.js'


const router = Router()

router.post('/bulk-letter-insert', insertInBulk)

export default router