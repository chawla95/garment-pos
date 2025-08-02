import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
  res.json({ message: 'Sales route working!' });
});

export { router as salesRoutes };
