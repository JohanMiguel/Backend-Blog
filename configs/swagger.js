import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Blog de Aprendizaje API",
            version: "1.0.0",
            description: "API para un sistema de gestion de publicaciones y de comentarios acerca de cursos",
            contact:{
                name: "Johan Tojin",
                email: "jtojin-2020591@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/blog/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/course/course.routes.js",
        "./src/post/post.routes.js",
        "./src/comment/comment.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}
