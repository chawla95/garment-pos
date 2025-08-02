"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.brandRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Brands route working!' });
});
//# sourceMappingURL=brands.js.map