import { Router } from "express";

const router = Router();

router
.get('/')
.get('/:id')
.post('/add')
.put('/update/:id')
.delete('/delete/:id');

export default router;