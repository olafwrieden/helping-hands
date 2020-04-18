import * as express from 'express';
import { getConnection } from 'typeorm';
import { Buddy, Users } from '../../../entity';

let router = express.Router();

router.put("/", function(req, res) {
	if (req.isAuthenticated()) {
		return getConnection('default')
			.getRepository<Users>('Users')
			.createQueryBuilder("user")
			.whereInIds(req.user.id)
			.getOne()
			.then((user) => {
				const buddyRepo =  getConnection('default').getRepository<Buddy>('Buddy')

				let saveData;
				if (user.isVolunteer) {
					saveData = {
						volunteer: req.user.id,
						buddy: req.body.userId,
						initiatedByBuddy: false
					}
				} else {
					saveData = {
						volunteer: req.body.userId,
						buddy: req.user.id,
						initiatedByBuddy: true
					}
				}

				return buddyRepo.save(saveData)
					.then(() => {
						return res.status(201).send({ message: "Request for Buddy submitted" });
					})
			})
		
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }

	
});

export default router;