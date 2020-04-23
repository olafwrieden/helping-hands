import * as express from 'express';
import { getConnection } from 'typeorm';
import { Users } from "../../../entity/Users";

const router = express.Router();

router.delete("/:id", async (req, res, next) => {
	if(req.isAuthenticated) {
		try {
			const deleteUser = await getConnection()
			.createQueryBuilder()
			.delete()
			.from(Users)
			.where("id = :id", { id: req.params.id })
			.execute();
			req.logOut();
			console.log('response from db in delete ', deleteUser)
			res.send({ message: 'Your profile was deleted.' });
		} catch(err) {
			res.status(500).send({message: 'There was an issue deleting your profile.'})
		}
	} else {
		res.status(401).send({ error: "Not Authorized" });
	}
})

export default router;
