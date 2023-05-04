import { Router } from 'express';
import { reverseToken, verifyToken } from '../util/jwt';
import { selectEntity } from '../model/userDao';

export const router = Router();

router.get('/', (req, res) => {
	return res.render('index', { layout: 'main' });
});

router.get('/login', (req, res) => {
	res.render('login', { layout: 'auth' });
});

router.get('/register', (req, res) => {
	res.render('register', { layout: 'auth' });
});

router.get('/editor/test', async (req, res) => {
	res.render('edit');
});

router.get('/editor/:id', async (req, res) => {
	const id = Number(req.params.id);

	const user = await selectEntity(id);

	res.render('edit');
});

router.get('/subjects', async (req, res) => {
	res.render('subjects');
});

router.get('/entries', async (req, res) => {
	res.render('entries');
});

router.get('/*', (req, res) => {
	res.status(404).render('404');
});

