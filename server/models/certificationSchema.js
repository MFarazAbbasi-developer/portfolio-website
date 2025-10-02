import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  issuer: {
    type: String,
  },
  date: {
    type: String,
  },
  svg: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
});

export const Certification = mongoose.model("Certification", certificationSchema);
