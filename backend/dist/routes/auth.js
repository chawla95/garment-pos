"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.authRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Auth route working!' });
});
//# sourceMappingURL=auth.js.map