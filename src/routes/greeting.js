import express from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/greeting:
 *   get:
 *     summary: Returns a greeting message
 *     responses:
 *       200:
 *         description: A greeting message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello, World!
 */
router.get('/greeting', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

export default router;
