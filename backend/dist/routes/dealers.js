"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dealerRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.dealerRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Dealers route working!' });
});
//# sourceMappingURL=dealers.js.map