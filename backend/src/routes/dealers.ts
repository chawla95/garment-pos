import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Dealers route working!' });
});

export { router as dealerRoutes };
