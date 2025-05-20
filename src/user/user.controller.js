import { hash } from "argon2";
import User from "./user.model.js";


export const createUser = async (req, res) => {
    try {
        const { name, surname, username, password, role, status } = req.body;
        const hashedPassword = await hash(password);

        const user = new User({
            name,
            surname,
            username,
            password: hashedPassword,
            role,
            status
        });

        await user.save();

        res.status(201).json({
            ok: true,
            msg: "Usuario creado correctamente",
            user: user.toJSON()
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: "Error al crear el usuario",
            error: error.message
        });
    }
};