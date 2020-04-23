import * as express from 'express';
import { getConnection } from 'typeorm';
import { validate } from '../../../../middleware/validator';
import { body } from 'express-validator';
import { Users } from "../../../entity/Users";
const router = express.Router();

/**
 * Edit User Validation Rules
 */
const updateUserInputRules = () => {
  return [
    body("email", "Invalid email address")
      .isEmail(),
    body("bio").exists().trim(),
    body("phone").exists().isNumeric().trim(),
    body("address").exists().trim(),
    body("city").exists().trim(),
    body("zipCode").exists().isInt().trim(),
  ];
};

router.post("/", updateUserInputRules(), validate, async (req, res) => {
  if(req.isAuthenticated) {
    try {
    // const connection = getConnection('default')
    // const User = connection.getRepository<Users>("Users");
    // const { id } = req.body;
    // console.log('req from client, ', req.body)
    // const updatedUser = await User.save(req.body)
    // console.log('updated user from db, ', updatedUser)
    //error checking: compoare key-value pairs of updated user in db wiht request from client.
    //if discrepancy found, return error.
    const { id } = req.body
    const {
        bio,
        phone,
        address,
        city,
        zipCode
    } = req.body
    const dbres = await getConnection('default')
    .createQueryBuilder()
    .update(Users)
    .set({bio, phone, address, city, zipCode})
    .where("id = :id", { id })
    .execute();
    console.log('dbres, ', dbres)
    res.status(200).send({ message: "The user was successfully updated.", dbres });
    } catch(err) {
        console.log(err)
        res.status(500).send({ error: "Attempt to update user was unsuccessful." })
    }
  } else {
    res.status(401).send({ error: "Not Authorized" });
  }
});

export default router;