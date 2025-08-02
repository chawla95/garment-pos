"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const errorHandler_1 = require("./middleware/errorHandler");
const notFound_1 = require("./middleware/notFound");
const auth_1 = require("./routes/auth");
const dealers_1 = require("./routes/dealers");
const brands_1 = require("./routes/brands");
const products_1 = require("./routes/products");
const inventory_1 = require("./routes/inventory");
const sales_1 = require("./routes/sales");
const analytics_1 = require("./routes/analytics");
const reports_1 = require("./routes/reports");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: '1.0.0'
    });
});
app.use('/api/auth', auth_1.authRoutes);
app.use('/api/dealers', dealers_1.dealerRoutes);
app.use('/api/brands', brands_1.brandRoutes);
app.use('/api/products', products_1.productRoutes);
app.use('/api/inventory', inventory_1.inventoryRoutes);
app.use('/api/sales', sales_1.salesRoutes);
app.use('/api/analytics', analytics_1.analyticsRoutes);
app.use('/api/reports', reports_1.reportRoutes);
app.use(notFound_1.notFound);
app.use(errorHandler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`🚀 Garment POS Backend running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
exports.default = app;
//# sourceMappingURL=index.js.map