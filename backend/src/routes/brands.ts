import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Brands route working!' });
});

export { router as brandRoutes };
