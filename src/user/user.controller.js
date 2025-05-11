import { hash } from "argon2";
import User from "./user.model.js";


export const initializeAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: "ADMIN_ROLE" });

        if (!adminExists) {
            const hashedPassword = await hash("Johan2006$sin");

            const admin = new User({
                name: "Johan",
                surname: "Tojin",
                username: "admin_role",
                password: hashedPassword,
                role: "ADMIN_ROLE",
                status: true,
            });

            await admin.save();
            console.log("✅ Usuario ADMIN_ROLE creado correctamente");
        }
    } catch (error) {
        console.error("❌ Error al inicializar el usuario ADMIN_ROLE:", error);
    }
};