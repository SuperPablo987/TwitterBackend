"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
//user CRUD
// Create user
/*
    Test CURL
    curl -X POST -H "Content-Type: application/json"
        -d '{"name": "Elon Musk", "email": "doge@twitter.com", "username": "elon"}'
        http://localhost:3000/user/
*/
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, username } = req.body;
    try {
        const result = yield prisma.user.create({
            data: {
                email,
                name,
                username,
                bio: "Hello, I'm new on twitter"
            },
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: 'username and email should be unique' });
    }
}));
// List users
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allUsers = yield prisma.user.findMany({
    // select: {
    //     id: true, 
    //     name: true, 
    //     image: true,
    //     bio: true,
    // },
    });
    res.json(allUsers);
}));
// get one user
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma.user.findUnique({
        where: { id: Number(id) },
        include: { tweets: true },
    });
    if (!user) {
        return res.status(404).json({ error: "User not found!" });
    }
    res.json(user);
}));
// update user
/*
Test CURL:
    curl -X POST -H "Content-Type: application/json"
        -d '{"name": "Elon Tusk", "email": "dogec@twitter.com", "username": "elonT"}'
        http://localhost:3000/user/
*/
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bio, name, image } = req.body;
    try {
        const result = yield prisma.user.update({
            where: { id: Number(id) },
            data: { bio, name, image }
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: `Failed to update the user: ${id}` });
    }
}));
// delete user
/*
Test CURL:
    curl -X PUT -H "Content-Type: application/json" -d "{\"name\": \"Pablo\", \"bio\": \"I'm a G\"}"
        http://localhost:3000/user/1
*/
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.user.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
}));
exports.default = router;
