import express, { Request, Response } from 'express';

import { body } from 'express-validator';

// Errors
import { BadRequestError } from '../errors/bad-request-error';

// Middlewares
import { validateRequest } from '../middlewares/validate-request';
import jwt from 'jsonwebtoken';

// Services
import { Password } from '../services/password';

// DB
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    // Validate email and password using express-validator
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    // Check if password is correct
    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      // payload
      {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
      },
      // secret
      process.env.JWT_KEY!
    );

    // Store JWT on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
