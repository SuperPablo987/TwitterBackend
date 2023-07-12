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
//Tweet CRUD
// Create tweet
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, image } = req.body;
    // @ts-ignore
    const user = req.user;
    try {
        const result = yield prisma.tweet.create({
            data: {
                content,
                image,
                userId: user.id,
            },
            include: { user: true },
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: 'username and email should be unique' });
    }
}));
// List tweet
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allTweets = yield prisma.tweet.findMany({
        include: {
            user: {
                select: {
                    username: true,
                    image: true,
                },
            },
        },
    });
    res.json(allTweets);
}));
// get one tweet
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log('Query tweet with id: ', id);
    const tweet = yield prisma.tweet.findUnique({
        where: { id: Number(id) },
        include: { user: true },
    });
    if (!tweet) {
        return res.status(404).json({ error: "Tweet not found!" });
    }
    res.json(tweet);
}));
// update tweet
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { content, image } = req.body;
    try {
        const result = yield prisma.tweet.update({
            where: { id: Number(id) },
            data: { content, image }
        });
        res.json(result);
    }
    catch (e) {
        res.status(400).json({ error: `Failed to update the tweet: ${id}` });
    }
}));
// delete tweet
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.tweet.delete({ where: { id: Number(id) } });
    res.sendStatus(200);
}));
exports.default = router;
