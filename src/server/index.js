import express from 'express'

import { catalogAPI } from './api/catalog';
import { checkoutAPI } from './api/checkout';

import renderApp from './renderer';

const server = express();

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))

  .get('/api', (_, res) => {
    res.status(200).json({
      success: true,
      data: 'Hi, I feel good and healthy!',
    })
  })

  .get('/api/catalog', catalogAPI)
  .post('/api/checkout', checkoutAPI)

  // React-Server Renderer
  .get('/*', (req, res) => {
    const { context, html } = renderApp(req, res);
    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(html);
    }
  });

export default server;
