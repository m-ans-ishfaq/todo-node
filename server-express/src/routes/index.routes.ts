import { IndexHandler } from '../handlers/index.handlers';
import { Router } from 'express';

const indexRouter = Router();
const { getAll } = IndexHandler;

indexRouter.route('/:id').get(getAll);

export { indexRouter };
