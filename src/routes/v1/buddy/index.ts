import * as express from 'express';
import retrieve from './retrieve';
import create from './create';
import accept from './accept';
import remove from './remove';

let router = express.Router();

router.use('/retrieve', retrieve)
router.use('/create', create)
router.use('/respond', accept)
router.use('/remove', remove)

export default router;