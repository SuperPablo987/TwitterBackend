import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

//user CRUD

// Create user
/*
    Test CURL
    curl -X POST -H "Content-Type: application/json" 
        -d '{"name": "Elon Musk", "email": "doge@twitter.com", "username": "elon"}' 
        http://localhost:3000/user/
*/

router.post('/', async (req, res) => {
    const { email, name, username } = req.body; 

    try {
        const result = await prisma.user.create({
        data: {
            email,
            name,
            username,
            bio: "Hello, I'm new on twitter"
        },
    });
    
    res.json(result);
    }catch (e) {
        res.status(400).json({ error: 'username and email should be unique'});
    }
});

// List users
router.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany();

    res.json(allUsers);
});

// get one user
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: {id: Number(id) } });
    if (!user) {
        return res.status(404).json({ error: "User not found!"});
    }
    res.json(user);
});

// update user
/*
Test CURL:
    curl -X POST -H "Content-Type: application/json" 
        -d '{"name": "Elon Tusk", "email": "dogec@twitter.com", "username": "elonT"}' 
        http://localhost:3000/user/
*/
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { bio, name, image } = req.body;

    try {
        const result = await prisma.user.update({
            where: { id: Number(id)},
            data: { bio, name, image}
        });
        res.json(result);
    } catch (e) {
        res.status(400).json({ error: `Failed to update the user: ${id}`});
    }
});

// delete user
/*
Test CURL:
    curl -X PUT -H "Content-Type: application/json" -d "{\"name\": \"Pablo\", \"bio\": \"I'm a G\"}" 
        http://localhost:3000/user/1
*/

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
});

export default router;