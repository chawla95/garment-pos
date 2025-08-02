"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salesRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.salesRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Sales route working!' });
});
//# sourceMappingURL=sales.js.map