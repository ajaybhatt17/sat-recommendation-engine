import mongoose from 'mongoose';

export const connectToDatabase = async (URL: string) => {
  mongoose.connect(URL, { useNewUrlParser: true } as any, () => {
    console.log('Connected to db');
  });
};
