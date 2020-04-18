import * as express from 'express';
import { getConnection, Brackets } from 'typeorm';
import { Buddy, Users } from '../../../entity';
import { Status } from '../../../entity/Buddy';

let router = express.Router();

router.post("/", function(req, res) {
	if (req.isAuthenticated()) {
		const buddyRepo =  getConnection('default').getRepository<Buddy>('Buddy')
		
		buddyRepo
			.createQueryBuilder("buddy")
			.loadAllRelationIds()
			.where(new Brackets(qb => {
				qb.where("buddy.volunteer = :userId", { userId: req.user.id })
				.orWhere("buddy.buddy = :userId", { userId: req.user.id })
			}))
			.andWhereInIds(req.body.buddyId)
			.getOne()
			.then((buddy) => {
				if (!buddy) {
					return res.status(400).send({ message: "No buddy request for this account with this buddyId" });
				}

				buddyRepo
					.update(req.body.buddyId, { status: Status.DEACTIVATED })
					.then(() => {
						return res.status(200).send({ message: "Request for Buddy deactivated!" });
					})
			})
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }
});

function respondToInvite(userId, buddyId, response: Status) {

}
export default router;