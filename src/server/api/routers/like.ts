import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const router = Router();

// Define the schema for the request body using Zod
const likeSchema = z.object({
    userId: z.number(),
    postId: z.number(),
});

// POST /like
router.post('/', async (req, res) => {
    try {
        // Validate the request body against the schema
        const { userId, postId } = likeSchema.parse(req.body);

        // Create a new like in the database using Prisma
        const like = await prisma.like.create({
            data: {
                userId,
                postId,
            },
        });

        res.json(like);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
