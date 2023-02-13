// Express
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

// Middlewares
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

// Errors
import { BadRequestError } from '../errors/bad-request-error';

// DB
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
    body('username').isString().withMessage('Username must be a string'),
    body('username').trim().notEmpty().withMessage('Username is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('The email provided is already in use.');
    }

    // Hash the password

    // Create user
    const user = User.build({ username, email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      // payload
      {
        id: user.id,
        email: user.email,
      },
      // secret, the "!" is a typescript assertion that the variable is defined
      process.env.JWT_KEY!
    );

    // Store JWT on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
