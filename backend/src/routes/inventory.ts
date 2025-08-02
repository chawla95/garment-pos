import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Inventory route working!' });
});

export { router as inventoryRoutes };
