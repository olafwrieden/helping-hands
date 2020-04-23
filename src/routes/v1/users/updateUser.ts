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
  const connection = getConnection('default')
  const User = connection.getRepository<Users>("Users");
  const { id } = req.body;
  console.log('req from client, ', req.body)
  // Find the user in the db by email. The object returned will include all fields from db.
//   const user = await User.findOne(id)
//   console.log('original user from db, ', user)
//   //update props of user object from db with those from client
//   for (let prop in user) {
//     for(let p in req.body) {
//         //if property in client user matches db user, update that property
//         user[prop] = req.body[p]
//     }
//    }
//    console.log('updated user for db, ', user)
   //save newly updated user object
   const updatedUser = await User.save(req.body)
   console.log('updated user from db, ', updatedUser)
   //error checking: compoare key-value pairs of updated user in db wiht request from client.
   //if discrepancy found, return error.

  res.send({ message: "The user was successfully updated.", updatedUser });
});

export default router;