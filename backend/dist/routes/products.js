"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.productRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Products route working!' });
});
//# sourceMappingURL=products.js.map