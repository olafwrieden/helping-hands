import * as express from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../../../entity/Users';

let router = express.Router();

router.get("/", function(req, res) {
	if (req.isAuthenticated()) {
		return getConnection('default')
		.getRepository<Users>('Users')
		.createQueryBuilder("user")
		.select()
		.whereInIds(req.user.id)
		.getOne()
		.then((user) => {
			delete user.password;
			return res.status(200).send(user);
		})
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }

	
});

export default router;