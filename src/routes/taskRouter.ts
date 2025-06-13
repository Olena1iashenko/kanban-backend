import { Router } from 'express';

const router = Router();

router.get('/tasks', (req, res) => {
  res.send('Boards route is working');
});

export default router;
