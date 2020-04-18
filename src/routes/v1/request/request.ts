import * as express from 'express';
import { getConnection } from 'typeorm';
import { Request, Status } from '../../../entity/Request';
import { body } from 'express-validator';
import { validate } from '../../../../middleware/validator';

let router = express.Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) {
    retrieveRequests()
      .then((requests) => {
        res.status(200).send(requests)
      })
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});



const requestSubmissionRules = () => {
  return [
    body("type").exists(),
    body("details").exists(),
    body("latitude").exists(),
    body("longitude").exists(),
    body("requestedUserId").exists()
  ];
};

router.put("/submit", requestSubmissionRules(), validate, (req, res) => {
  if (req.isAuthenticated()) {
    return submitRequest(req.body)
      .then(() => {
        return res.status(201).send({ message: "Request successfully created!" })
      })
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});



const requestFulfillRules = () => {
  return [
    body("requestId").exists(),
    body("userId").exists(),
  ];
};

router.post("/fulfil", requestFulfillRules(), validate, (req, res) => {
  if (req.isAuthenticated()) {
    return fulfilRequest(req.body)
      .then(() => {
        return res.status(201).send({ message: "Request successfully Updated!" })
      })
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
});



const requestCompleteRules = () => {
  return [
    body("requestId").exists(),
  ];
};

router.post('/complete', requestCompleteRules(), validate, (req, res) => {
  if (req.isAuthenticated()) {
    return completeRequest(req.body.requestId)
      .then(() => {
        return res.status(201).send({ message: "Request successfully Updated!" })
      })
  } else {
    res.status(401).send({ message: "Not Authorized" });
  }
})



function retrieveRequests() {
  return getRequestRepo()
    .createQueryBuilder("request")
    .loadAllRelationIds()
    .where('request.fulfillingUser IS NOT NULL')
    .getMany()
    .then((requests) => {
      console.log(requests);
      return requests;
    });
}

function submitRequest(data) {
  return getRequestRepo().save({
    ...data,
    status: Status.PENDING
  });
}

function fulfilRequest(data) {
  return getRequestRepo().update(data.requestId, {
    fulfillingUser: data.userId,
    status: Status.ACCEPTED
  })
}

function completeRequest(requestId) {
  return getRequestRepo().update(requestId, {
    status: Status.COMPLETED
  })
}

function getRequestRepo() {
  return getConnection('default').getRepository<Request>('Request')
}

export default router;