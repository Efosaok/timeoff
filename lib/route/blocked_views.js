const express = require('express');
const responseParser = require('../util/responseParser');

const router = express.Router();

router.all(/.*/, require('../middleware/ensure_user_is_admin'));

const validateBlockedViewsRequestBody = (req) => {
  if (!req.body.name) {
    throw new Error('name cannot be empty');
  }
  if (!req.body.date) {
    throw new Error('date cannot be empty');
  }
};

const defaultResponse = () => {};

router.get('/blocked-views', async (req, res) => {
  try {
    const { BlockedView } = req.app.get('db_model');

  const views = await BlockedView.findAll({
    where: {
      companyId: req.user.companyId,
    },
  });

  return responseParser({
    req,
    res,
    defaultResponse,
    statusCode: 200,
    body: { message: 'blocked views fetched successfully', views }
  });
  } catch(err) {
    console.log(err?.message);
  
    return responseParser({
      req,
      res,
      defaultResponse,
      statusCode: 500,
      body: { err }
    });
  }
});

router.post('/blocked-views', async (req, res) => {
  try {
    validateBlockedViewsRequestBody(req);
    const { BlockedView } = req.app.get('db_model');
    const { companyId } = req.user;

    const newBlockedView = await BlockedView.create({
      ...req?.body,
      companyId,
    });
  
    return responseParser({
      req,
      res,
      defaultResponse,
      statusCode: 200,
      body: { messages: ['blocked views created successfully'], newBlockedView }
    });
  } catch(err) {
    console.log(err);

    let errors = [err?.message];
    if (err?.errors?.[0]?.message === 'date must be unique') errors = ['Date already blocked, please choose another']
    return responseParser({
      req,
      res,
      defaultResponse,
      statusCode: 500,
      body: { errors }
    });
  }
});

router.delete('/blocked-views/:id', async (req, res) => {
  try {
    const { BlockedView } = req.app.get('db_model');
    const { id } = req.params;
    const { companyId } = req.user;
  
    await BlockedView.destroy({
      where: {
        id,
        companyId,
      },
    });
    return responseParser({
      req,
      res,
      defaultResponse,
      statusCode: 200,
      body: { messages: ['blocked views deleted successfully'], viewToRemove: { id } }
    });
  } catch(err) {
    return responseParser({
      req,
      res,
      defaultResponse,
      statusCode: 500,
      body: { errors: [err?.message] }
    });
  }
});

module.exports = router;
