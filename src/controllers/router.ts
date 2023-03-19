import { Router } from 'express';

export const router = Router();

router.get('/name', (req, res) => {
	res.send({ status: 'ok' });
});
