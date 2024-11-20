import { conmysql } from "../db.js";

// Obtener todos los usuarios
export const getUsuarios =
async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM usuarios");
        res.json(result);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error al obtener usuarios" });
    }
};

// buscamos un usuario por id
export const getUsuarioxid = async (req, res) => {
    try {
        const [result] = await conmysql.query("SELECT * FROM usuarios WHERE id_usuario = ?", [req.params.id]);
        if (result.length<=0)return res.status(404).json({
            id_usuario:0,
            message:"Usuario no encontrado"
        })
        res.json(result[0]);
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

// creamos un nuevo usuario
export const postUsuario = async (req, res) => {
    try {
        const { nombre, email, telefono, password } = req.body;
        const [result] = await conmysql.query(
            "INSERT INTO usuarios (nombre, email, telefono, password, fecha_registro) VALUES (?, ?, ?, ?)",
            [nombre, email, telefono, password]
        );
        res.status(201).json({
            message: "Usuario creado correctamente",
            id_usuario: result.insertId,
        });
    } catch (error) {
        console.error("Error al crear usuario:", error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

export const putUsuario = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, email, telefono, password } = req.body;
        const [result] = await conmysql.query(
            "UPDATE usuarios SET nombre = ?, email = ?, telefono = ?, password = ? WHERE id_usuario = ?",
            [nombre, email, telefono, password, id]
        )
        if(result.affectedRows<=0)return res.status(404).json({
            message:'Usuario no encontrado'
        })
        const[rows]=await conmysql.query('select * from usuarios where id_usuario=?',[id])
        res.json(rows[0])
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
}

// actulizamos el usuario por id
export const patchUsuario =
 async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, email, telefono, password } = req.body;
        const [result] = await conmysql.query(
            "UPDATE usuarios SET nombre = IFNULL(?, nombre), email = IFNULL(?, email), telefono = IFNULL(?, telefono), password = IFNULL(?, password) WHERE id_usuario = ?",
            [nombre, email, telefono, password, id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado parcialmente" });
    } catch (error) {
        console.error("Error al actualizar parcialmente usuario:", error);
        res.status(500).json({ message: "Error al actualizar parcialmente usuario" });
    }
}

    // Eliminar un usuario por ID
    export const deleteUsuario=
    async(req,res)=>{
        try {
            //const {miid}=req.params
            const [rows]=await conmysql.query(' delete from usuarios where id_usuario=?',[req.params.id])
            if(rows.affectedRows<=0)return res.status(404).json({
                id:0,
                message: "No pudo eliminar el usuario"
            })
            res.sendStatus(202)
        } catch (error) {
            return res.status(500).json({message:"Error del lado del servidor"})
        }
    }