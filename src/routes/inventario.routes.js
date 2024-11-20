import { Router } from "express";
import {getInventarios, getInventarioxid, postInventario, putInventario, patchInventario, deleteInventario, getInventarios } from '../controladores/inventarioCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/inventario',getInventarios)//select 
router.get('/inventario/:id', getInventarioxid)//select con id
router.post('/inventario', upload.single('imagen'),postInventario)//insert
router.put('/inventario/:id', upload.single('image'),putInventario) //update
router.patch('/inventario/:id',upload.single('image'),patchInventario)  //update
router.delete('/inventario/:id', deleteInventario)

export default router