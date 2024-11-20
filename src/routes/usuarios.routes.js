import { Router } from "express";
import {getUsuarios, getUsuarioxid, postUsuario, putUsuario, patchUsuario, deleteUsuario } from '../controladores/usuariosCtrl.js'
const router=Router()
//armar nuestras rutas

router.get('/usuarios',getUsuarios)//select 
router.get('/usuarios/:id', getUsuarioxid)//select con id
router.post('/usuarios', postUsuario)//insert
router.put('/usuarios/:id',putUsuario) //update
router.patch('/usuarios/:id',patchUsuario)  //update
router.delete('/usuarios/:id',deleteUsuario)

export default router