"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../db");
const config_1 = require("../config");
/**
 * Middleware to authenticate users via JWT
 */
const authenticateUser = async (req, res, next) => {
    console.log('--- Authenticating user ---');
    try {
        const authHeader = req.headers.authorization;
        console.log('Auth Header:', authHeader);
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.error('No token provided or invalid format');
            return res.status(401).json({ error: 'Unauthorized - No token provided' });
        }
        const token = authHeader.split(' ')[1];
        console.log('Token received:', token);
        console.log('Verifying token with secret:', config_1.JWT_SECRET ? 'Exists' : 'MISSING!');
        // Verify token and attach user to request
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log('Decoded token:', decoded);
        const user = await db_1.prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, role: true },
        });
        console.log('User found:', !!user);
        if (!user) {
            console.error('Invalid user from token');
            return res.status(401).json({ error: 'Unauthorized - Invalid user' });
        }
        req.user = user;
        console.log('--- Authentication successful ---');
        next();
    }
    catch (error) {
        console.error('--- Authentication failed ---');
        console.error('JWT verification error:', error);
        // Catches errors from jwt.verify (e.g., expired, invalid signature)
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
