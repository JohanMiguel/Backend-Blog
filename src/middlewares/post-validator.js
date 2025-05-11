import { body, param } from "express-validator";
import { validarCampos} from "./validate-fields.js";
import { postExists } from "../helpers/db-validators.js"
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const createPostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("title").notEmpty().withMessage("El título es requerido"),
    body("content").notEmpty().withMessage("El contenido es requerido"),
    validarCampos, 
    handleErrors
]

export const updatePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("post_id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("post_id").custom(postExists),
    validarCampos,
    handleErrors
]

export const deletePostValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("post_id").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("post_id").custom(postExists),
    validarCampos,
    handleErrors
]