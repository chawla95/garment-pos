import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Reports route working!' });
});

export { router as reportRoutes };
