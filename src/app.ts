// Description: This file is the entry point for the auth service.
// It is responsible for configuring the express server

import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

// Other
import cookieSession from 'cookie-session';

// Routes
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

// Middlewares
import { errorHandler } from '@delight-system/microservice-common';
import { NotFoundError } from '@delight-system/microservice-common';

// setup
const port = 3000;
const app = express();

// Trust ingress-nginx. This is required for secure cookies to work in a k8s cluster with ingress-nginx.
app.set('trust proxy', true);

// Body parser. This is required for express to understand incoming JSON payloads.
app.use(json());

// Cookies. This is required for express to understand incoming cookies.
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test' ? true : false,
  })
);

//routes
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

// Middlewares
app.all('*', async (req, res) => {
  throw new NotFoundError();
});
app.use(errorHandler);

export { app, port };
