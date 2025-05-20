import Post from "./post.model.js"
import Course from "../course/course.model.js"
import Comment from "../comment/comment.model.js"

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: { $ne: false } })
            .sort({ createdAt: -1 })
            .select("title content course user createdAt")
            .populate("course", "name")
            .populate("user", "name")
            .lean();

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron publicaciones",
            });
        }

        const formattedPosts = posts.map(post => ({
            id: post._id,
            user: post.user?.name || "Usuario no encontrado",
            title: post.title,
            content: post.content,
            course: post.course?.name || "Curso no encontrado",
            createdAt: post.createdAt
        }));

        return res.status(200).json({
            success: true,
            total: formattedPosts.length,
            posts: formattedPosts,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener las publicaciones",
            error: err.message,
        });
    }
};

export const getPostById = async (req, res) => {
  try {
    const { post_id } = req.params;

    const post = await Post.findById(post_id)
      .populate("user", "name")
      .populate("course", "name")
      .populate({
        path: "comments",
        select: "nameUser content createdAt",
        options: { sort: { createdAt: -1 } } // Comentarios del más reciente al más antiguo
      })
      .lean();

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Publicación no encontrada",
      });
    }

    const formattedPost = {
      id: post._id,
      user: post.user?.name || "Usuario no encontrado",
      title: post.title,
      content: post.content,
      course: post.course?.name || "Curso no encontrado",
      createdAt: post.createdAt,
      comments: post.comments.map(comment => ({
        nameUser: comment.nameUser,
        content: comment.content,
        createdAt: comment.createdAt,
      })),
    };

    return res.status(200).json({
      success: true,
      post: formattedPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error al obtener la publicación",
      error: err.message,
    });
  }
};


export const publicarPost = async (req, res) => {
    try {
        const uid = req.user?.id || req.usuario?._id;
        if (!uid) {
            return res.status(401).json({
                message: "Token de usuario no encontrado"
            });
        }

        const { title, courseName, content } = req.body;
        if (!title || !courseName || !content) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const course = await Course.findOne({ name: new RegExp(`^${courseName}$`, "i") });
        if (!course) {
            return res.status(404).json({
                message: "El curso especificado no existe"
            });
        }

        // Crear la publicación
        const post = new Post({
            title: title.trim(),
            course: course._id,
            content,
            user: uid,
            status: true
        });

        await post.save();

        return res.status(201).json({
            message: "Publicación creada exitosamente",
            post
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error creando la publicación",
            error: err.message
        });
    }
};

export const filterPosts = async (req, res) => {
    try {
        const { course, dateRange } = req.query;

        const filter = {};

        if (course) {
            const courseData = await Course.findOne({ name: course });
            if (courseData) {
                filter.course = courseData._id;
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Curso no encontrado",
                });
            }
        }

        if (dateRange) {
            const now = new Date();
            let startDate;

            if (dateRange === "today") {
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            } else if (dateRange === "thisWeek") {
                const dayOfWeek = now.getDay();
                startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - dayOfWeek);
            } else if (dateRange === "thisMonth") {
                startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            }

            if (startDate) {
                filter.createdAt = { $gte: startDate };
            }
        }

        const posts = await Post.find(filter)
            .populate("course", "name")
            .populate("user", "name")
            .lean();

        if (!posts || posts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron publicaciones",
            });
        }

        const formattedPosts = posts.map(post => ({
            id: post._id,
            user: post.user?.name || "Usuario no encontrado",
            title: post.title,
            content: post.content,
            course: post.course?.name || "Curso no encontrado",
            createdAt: post.createdAt,
        }));

        return res.status(200).json({
            success: true,
            total: formattedPosts.length,
            posts: formattedPosts,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al filtrar publicaciones",
            error: err.message,
        });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { post_id } = req.params;
        const post = await Post.findByIdAndUpdate(post_id, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Publicación eliminada correctamente",
            post
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la publicación",
            error: err.message
        });
    }
};

