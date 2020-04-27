import { Router } from 'express';
import { getConnection } from 'typeorm';
import { Request, Status } from '../../../entity/Request';
import { body } from 'express-validator';
import { validate } from '../../../../middleware/validator';

let router = Router();

// GET: All Requests
router.get("/", async (req, res) => {
  if (!req.isAuthenticated()) {
    const requests = await getRequestRepo()
      .createQueryBuilder("request")
      .loadAllRelationIds()
      .where('request.fulfillingUser IS NOT NULL')
      .getMany();
    return res.send(requests);
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});

// get requests for currently logged in user
router.get("/:id", async (req, res) => {
  const { id } = req.params
  if (req.isAuthenticated()) {
    const requests = await getRequestRepo()
      .createQueryBuilder("request")
      .select("request")
      .where("request.requestedUser = :id", { id })
      .getMany()
    return res.send(requests);
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});

// mock response

// router.get("/:id", async (req, res) => {
//   return (res.send([
//     {
//         type: "Assistance",
//         requestedAt: "08:00",
//         status: "Accepted",
//         acceptedBy: "Tom Hardy",
//         details: "I need assistance mowing my lawn please.",
//         address: "3 Example Street",
//         city: "Auckland"
//     },
//     {
//         type: "Pickup",
//         requestedAt: "10:00",
//         status: "Pending",
//         acceptedBy: "N/A",
//         details: "I need 3 carrots, 4 onions and a pumpkin from the grocery store.",
//         address: "5 Test Drive",
//         city: "Auckland"
//     },
//     {
//         type: "Assistance",
//         requestedAt: "09:00",
//         status: "Pending",
//         acceptedBy: "N/A",
//         details: "I need my gutters cleaned out.",
//         address: "21 Jump Street",
//         city: "Auckland"
//     },
//     {
//         type: "Third Party Assistance",
//         requestedAt: "11:30",
//         status: "Completed",
//         acceptedBy: "Jemma Schofield",
//         details: "I am requesting assistance on behalf of my sick Aunt, please pick up some panadol for her.",
//         address: "10 Dawning Street",
//         city: "Auckland"
//     }]))
// });


//cancel a request
router.put('/cancel', (req, res) => {
  
})

// PUT: Create New Request
const requestSubmissionRules = () => {
  return [
    body("type").exists().isIn(['assist', 'pickup', 'talk', 'tpa']),
    body("details").exists(),
    body("address").exists(),
    body("city").exists(),
    body("zipCode").exists(),
    body("requestedUser").exists()
  ];
};

router.put("/", requestSubmissionRules(), validate, async (req, res) => {
  if (req.isAuthenticated()) {
    return getRequestRepo().save({
      ...req.body,
      status: Status.PENDING
    }).then(() => {
      return res.status(201).send({ message: "success" })
    }).catch(() => res.status(500).send({ error: "Request creation failed." }));
  } else {
    res.status(401).send({ error: "Not Authorized" });
  }
});

// POST: Fulfil Request
const requestFulfillRules = () => {
  return [
    body("requestId").exists(),
    body("userId").exists(),
  ];
};

router.post("/fulfil", requestFulfillRules(), validate, async (req, res) => {
  if (req.isAuthenticated()) {
    return await getRequestRepo().update(req.body.requestId, {
      fulfillingUser: req.body.userId,
      status: Status.ACCEPTED
    }).then(() => {
      return res.status(201).send({ message: "Request successfully updated!" })
    }).catch(() => res.status(500).send({ error: "Request failed to update." }));
  } else {
    res.status(401).send({ error: "Not Authorized" });
  }
});

// POST: Complete Request
const requestCompleteRules = () => {
  return [
    body("requestId").exists(),
  ];
};

router.post('/complete', requestCompleteRules(), validate, async (req, res) => {
  if (!req.isAuthenticated()) {
    return await getRequestRepo().update(req.body.requestId, {
      status: Status.COMPLETED
    }).then(() => {
      return res.status(201).send({ message: "Request successfully updated!" })
    }).catch(() => res.status(500).send({ error: "Request failed to update." }));
  } else {
    res.status(401).send({ error: "Not Authorized" });
  }
})

// Helper Function
function getRequestRepo() {
  return getConnection('default').getRepository<Request>('Request')
}

export default router;