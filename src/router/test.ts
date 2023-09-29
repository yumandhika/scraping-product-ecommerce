import express from 'express';

import { test } from '../controllers/test';

export default (router: express.Router) => {
  router.get('/test', test);
};
