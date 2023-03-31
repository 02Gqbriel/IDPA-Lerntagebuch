import { Router } from 'express';

import { router as auth } from './auth';

export const router = Router();

router.use(auth);

router.get('/name', (req, res) => {
	res.send({ status: 'ok' });
});
