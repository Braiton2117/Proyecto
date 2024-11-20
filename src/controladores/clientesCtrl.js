import {conmysql} from '../db.js'
export const getClientes=
    async (req,res)=>{
        try {
            const [result] = await conmysql.query(' select * from Clientes ')
            res.json(result)
        } catch (error) {
            return res.status(500).json({message:"Error al consultar clientes"})
        }
    }
    


export const getClientexid=
async (req,res)=>{
    try {
        const[result]=await conmysql.query('select * from Clientes where id_cliente=?',[req.params.id])
        if (result.length<=0)return res.status(404).json({
            id_cliente:0,
            message:"Cliente no encontrado"
        })
        res.json(result[0])
    } catch (error) {
        return res.status(500).json({message:'error de lado del servidor'})        
    }
}
export const postCliente=
async (req,res)=>{
    try {
        //console.log(req.body)
        const {nombre_cliente, email, telefono, direccion, fecha_registro}=req.body
        //console.log(cli_nombre)
        const [rows]=await conmysql.query('insert into Clientes (nombre_cliente, email, telefono, direccion, fecha_registro) values(?,?,?,?,?)',
            [nombre_cliente, email, telefono, direccion, fecha_registro])

        res.send({
            id:rows.insertId
        })
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}
export const putCliente=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {nombre_cliente, email, telefono, direccion, fecha_registro}=req.body
        //console.log(cli_nombre)
        const [result]=await conmysql.query('update Clientes set nombre_cliente=?, email=?, telefono=?, direccion=?, fecha_registro=? where id_cliente=?',
            [nombre_cliente, email, telefono, direccion, fecha_registro, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from Clientes where id_cliente=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const patchCliente=
async (req,res)=>{
    try {
        const {id}=req.params
        //console.log(req.body)
        const {nombre_cliente, email, telefono, direccion, fecha_registro}=req.body
        console.log(nombre_cliente)
        const [result]=await conmysql.query('update Clientes set nombre_cliente=IFNULL(?,nombre_cliente), email=IFNULL(?,email), telefono=IFNULL(?,telefono) where id_cliente=?',
            [nombre_cliente, email, telefono, direccion, fecha_registro, id])

        if(result.affectedRows<=0)return res.status(404).json({
            message:'Cliente no encontrado'
        })
        const[rows]=await conmysql.query('select * from Clientes where id_cliente=?',[id])
        res.json(rows[0])
        /* res.send({
            id:rows.insertId
        }) */
    } catch (error) {
        return res.status(500).json({message:'error del lado del servidor'})
    }
}

export const deleteCliente=
async(req,res)=>{
    try {
        //const {miid}=req.params
        const [rows]=await conmysql.query(' delete from Clientes where id_cliente=?',[req.params.id])
        if(rows.affectedRows<=0)return res.status(404).json({
            id:0,
            message: "No pudo eliminar el cliente"
        })
        //res.sendStatus(202) ----el que tenia
        return res.status(200).json({
          message: "Cliente eliminado correctamente"
        });  // Agregado
    } catch (error) {
        return res.status(500).json({message:"Error del lado del servidor"})
    }
}
