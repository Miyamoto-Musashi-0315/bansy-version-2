"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const tests_1 = __importDefault(require("./routes/tests"));
const resume_1 = __importDefault(require("./routes/resume"));
const aiRoutes_1 = __importDefault(require("./routes/aiRoutes"));
const github_routes_1 = __importDefault(require("./routes/github.routes"));
const jdRoutes_1 = __importDefault(require("./routes/jdRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: true, // Allow requests from any origin in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/tests', tests_1.default);
app.use('/api/resume', resume_1.default);
app.use('/api/ai', aiRoutes_1.default);
app.use('/api/github', github_routes_1.default);
app.use('/api/jds', jdRoutes_1.default);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
