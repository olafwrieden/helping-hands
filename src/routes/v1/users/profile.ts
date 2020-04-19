import * as express from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../../../entity/Users';

let router = express.Router();

router.get("/", function (req, res) {
	if (req.isAuthenticated()) {
		const connection = getConnection('default')
		const User = connection.getRepository<Users>("Users");

		// Does user (still) exist?
		let user = User.findOne(req.user.id)
		if (!user) return res.status(401).send({ error: "User profile not found." });

		return res.status(200).send(user);
	} else {
		res.status(401).send({ error: "Not Authorized" });
	}


});

export default router;