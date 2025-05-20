import Course from "./course.model.js";
import User from "../user/user.model.js";
import Post from "../post/post.model.js";

export const getCourses = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: { $ne: false } }; 

    try {
        const courses = await Course.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
            .select("name")
            .lean();

        res.status(200).json({
            success: true,
            courses,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al obtener los cursos",
            error: error.message,
        });
    }
};

export const getCourseByName = async (req, res) => {
  try {
    const { name } = req.params;
    const course = await Course.findOne({ name: new RegExp(`^${name}$`, "i") });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Curso no encontrado",
      });
    }

    const posts = await Post.find({ course: course._id, status: { $ne: false } })
      .select("title content user createdAt course") 
      .populate("user", "name")
      .populate("course", "name") 
      .lean();

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al buscar el curso y sus publicaciones",
      error: error.message,
    });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { name } = req.body;
    const existingCourse = await Course.findOne({ name: name.toLowerCase() });
    if (existingCourse) {
      return res.status(400).json({
        success: false,
        message: "La categoría ya existe",
      });
    }

    const course = new Course({ name: name.toLowerCase() });
    await course.save();

    res.status(201).json({
      success: true,
      message: "course creada exitosamente",
      course,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error al crear la course",
      error: err.message,
    });
  }
};