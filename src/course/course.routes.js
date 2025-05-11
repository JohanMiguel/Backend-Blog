import { Router } from "express";
import { getCourseByName, getCourses } from "./course.controller.js";

const router = Router();

/**
 * @swagger
 * /coursesfiltro/{name}:
 *   get:
 *     summary: Get course by name along with its related posts
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Course name
 *     responses:
 *       200:
 *         description: Course and related posts found
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get("/coursesfiltro/:name", getCourseByName);

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: List of courses
 *       500:
 *         description: Server error
 */
router.get("/", getCourses);

export default router;