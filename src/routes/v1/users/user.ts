import * as express from 'express';
import { getConnection } from 'typeorm';

let router = express.Router();

router.get("/:id", function (req: express.Request, res: express.Response) {
	const { id } = req.params;
	if (req.isAuthenticated()) {
		return getConnection('default')
			.getRepository('Users')
			.createQueryBuilder("user")
			.select(['user.firstName', 'user.lastName', 'user.city', 'user.enabled', 'user.gender'])
			.whereInIds(id)
			.getOne()
			.then((user) => {
				return res.status(200).send(user);
			})
	} else {
		res.status(401).send({ error: "Not Authorized" });
	}


});

export default router;