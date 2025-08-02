"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRoutes = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.inventoryRoutes = router;
router.get('/test', (req, res) => {
    res.json({ message: 'Inventory route working!' });
});
//# sourceMappingURL=inventory.js.map