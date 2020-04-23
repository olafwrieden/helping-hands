import * as express from 'express';

const router = express.Router();

router.get("/", async (req, res, next) => {
	console.log('req to logout, ', req)
	req.logOut();
	res.send({ message: 'Logged out!' });
})

export default router;
