import * as express from 'express';
import { getConnection, Brackets } from 'typeorm';
import { Buddy, Users } from '../../../entity';
import { Status } from '../../../entity/Buddy';

let router = express.Router();

router.post("/accept", function(req, res) {
	if (req.isAuthenticated()) {
		respondToInvite(req.user.id, req.body.buddyId, Status.ACTIVE)
			.then((result) => {
				return res.status(result.status).send({ message: result.message });
			})
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }
});

router.post("/decline", function(req, res) {
	if (req.isAuthenticated()) {
		respondToInvite(req.user.id, req.body.buddyId, Status.DECLINED)
			.then((result) => {
				return res.status(result.status).send({ message: result.message });
			})
	  } else {
		res.status(401).send({ message: "Not Authorized" });
	  }
});


function respondToInvite(userId, buddyId, response: Status) {
	const buddyRepo =  getConnection('default').getRepository<Buddy>('Buddy')
		
	return buddyRepo
		.createQueryBuilder("buddy")
		.loadAllRelationIds()
		.where(new Brackets(qb => {
			qb.where("buddy.volunteer = :userId", { userId: userId })
			.orWhere("buddy.buddy = :userId", { userId: userId })
		}))
		.andWhereInIds(buddyId)
		.getOne()
		.then((buddy) => {
			if (!buddy) {
				return { status: 400, message: "No buddy request for this account with this buddyId" };
			}
			if ((buddy.volunteer === userId && !buddy.initiatedByBuddy)||(buddy.buddy === userId && buddy.initiatedByBuddy)) {
				return { status: 400, message: "The other party must accept the buddy request" };
			}
			if (buddy.status === Status.DEACTIVATED) {
				return { status: 400, message: "This buddy request has been deactivated" }
			}

			return buddyRepo
				.update(buddyId, { status: response })
				.then(() => {
					return { status: 200, message: `Request for Buddy ${response}!` };
				})
		})
}
export default router;