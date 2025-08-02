import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Products route working!' });
});

export { router as productRoutes };
