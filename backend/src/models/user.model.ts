import mongoose from "mongoose";
import { compare, hash } from "../utils/bcrypt";

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  isVerified: boolean;
  comparePasswords(
    candidatePassword: string
  ): (candidatePassword: string) => boolean;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password, delete ret.__v;
        return ret;
      },
    },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await hash(this.password);
  next();
});

userSchema.methods.comparePasswords = async function (
  candidatePassword: string
) {
  return compare(candidatePassword, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);
export default UserModel;
