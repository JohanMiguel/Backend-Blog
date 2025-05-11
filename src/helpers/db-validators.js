import User from "../user/user.model.js"

export const emailExists = async (email = "") => {
    const existe = await User.findOne({email})
    if(existe){
        throw new Error(`The email ${email} is already registered`)
    }
}

export const usernameExists = async (username = "") => {
    const existe = await User.findOne({username})
    if(existe){
        throw new Error(`The username ${username} is already registered`)
    }
}

export const userExists = async (uid = " ") => {
    const existe = await User.findById(uid)
    if(!existe){
        throw new Error("No existe el usuario con el ID proporcionado")
    }
}
export const categoryExists = async (uid = " ") => {
    const existe = await Category.findById(uid)
    if(!existe){
        throw new Error("No existe la categoria con el ID proporcionado")
    }
}

export const postExists = async (uid = "") => {
    const existe = await Post.findById(uid);
    if (!existe) {
        throw new Error(`No existe la publicación con el ID proporcionado`);
    }
};
