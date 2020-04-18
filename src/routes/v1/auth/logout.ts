import * as express from 'express';

const router = express.Router();

router.get("/", async (req, res, next) => {
	req.logOut();
	res.send({ message: 'Logged out!' });
})

export default router;
