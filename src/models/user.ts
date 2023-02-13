import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes what it takes to create a user
interface IUserAttrs {
  username: string;
  email: string;
  password: string;
}

// An interface that describes what the whole collection of users looks like
// And methods that can be called on the collection of users
interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

// An interface that describes the properties a user document has
interface IUserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

// This is a mongoose model, and has nothing to do with typescript
// You can tell the difference because the type is Capitalized
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // This is a mongoose option that tells it to use the toJSON method
    // when converting the document to JSON to send to the client
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// This makes sure that the user is created with the correct properties
// and that the properties are of the correct type
// it is a static method, so it is called on the model itself
userSchema.statics.build = (attrs: IUserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<IUserDoc, IUserModel>('User', userSchema);

export { User };
