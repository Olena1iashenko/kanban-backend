import { Router } from 'express';

const router = Router();

router.get('/boards', (req, res) => {
  res.send('Boards route is working');
});

export default router;
