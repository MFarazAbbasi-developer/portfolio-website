import mongoose from 'mongoose';

export const dbConnection = async () => {
    mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB Connection is established successfully!"))
  .catch((err) => console.log(err.message));

}
