import { Router } from "express";
import { publicarPost, updatePost, deletePost, getAllPosts, getPostById, filterPosts } from "./post.controller.js";
import { createPostValidator, updatePostValidator, deletePostValidator } from "../middlewares/post-validator.js";

const router = Router();

/**
 * @swagger
 * /posts/publicarPost:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               category:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post("/publicarPost", createPostValidator, publicarPost);

/**
 * @swagger
 * /posts/updatePost/{post_id}:
 *   put:
 *     summary: Update a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: Post updated
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.put("/updatePost/:uid", updatePostValidator, updatePost);

/**
 * @swagger
 * /posts/deletePost/{post_id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted
 *       500:
 *         description: Server error
 */
router.delete("/deletePost/:uid", deletePostValidator, deletePost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: List of posts
 *       500:
 *         description: Server error
 */
router.get("/", getAllPosts);

/**
 * @swagger
 * /posts/buscar/{post_id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: post_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post found
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
router.get("/buscar/:post_id", getPostById);

/**
 * @swagger
 * /posts/filter:
 *   get:
 *     summary: Filter posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Filtered posts
 *       500:
 *         description: Server error
 */
router.get("/filter", filterPosts);

export default router;