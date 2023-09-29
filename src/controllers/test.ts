import express from 'express';

export const test = async (req: express.Request, res: express.Response) => {
  try {
    return res.status(200).json({testing : 'test'}).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};