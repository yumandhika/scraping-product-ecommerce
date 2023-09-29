import express from 'express';

import { tokped, shopee } from '../controllers/test';

export default (router: express.Router) => {
  router.get('/tokped', tokped);
  router.get('/shopee', shopee);
};
