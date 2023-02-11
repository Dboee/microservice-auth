// import express, { Request, Response } from 'express';
// import { BadRequestError } from '../errors/bad-request-error';
// import { User } from '../models/user';
// import { SMNAuthenticationService } from './services/SMNAuthentionService';

// const router = express.Router();

// router.post('/smn-authenticate', async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (!existingUser) {
//     throw new BadRequestError('Invalid credentials');
//   }

//   const isPasswordMatch = await existingUser.comparePassword(password);
//   if (!isPasswordMatch) {
//     throw new BadRequestError('Invalid credentials');
//   }

//   const smnAuthenticationService = new SMNAuthenticationService();
//   const token = await smnAuthenticationService.authenticate(email, password);

//   existingUser.smnToken = token;
//   await existingUser.save();

//   res.send({ message: 'SMN authentication successful' });
// });

// export { router as smnAuthenticationRouter };
