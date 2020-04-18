import * as express from 'express';
import { getConnection } from 'typeorm';
import { Users } from '../../../entity/Users';

let router = express.Router();

router.get("/", function(req, res) {
	if (req.isAuthenticated()) {
		return getConnection('default')
		.getRepository<Users>('Buddy')
		.createQueryBuilder("buddy")
		.loadAllRelationIds()
		.where("buddy.volunteer = :userId", { userId: req.user.id })
		.orWhere("buddy.buddy = :userId", { userId: req.user.id })
		.getMany()
		.then((user) => {
			return res.status(200).send(user);
		})
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }

	
});

export default router;