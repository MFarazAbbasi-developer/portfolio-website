import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Certification } from "../models/certificationSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const addNewCertification = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image For Certification Required!", 404));
  }
  const { svg } = req.files;
  const { title, issuer, date } = req.body;
  if (!title || !issuer || !date) {
    return next(new ErrorHandler("Please Fill Full Form!", 400));
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    svg.tempFilePath,
    { folder: "PORTFOLIO CERTIFICATION IMAGES" }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(new ErrorHandler("Failed to upload avatar to Cloudinary", 500));
  }
  const certification = await Certification.create({
    title,
    issuer,
    date,
    svg: {
      public_id: cloudinaryResponse.public_id, // Set your cloudinary public_id here
      url: cloudinaryResponse.secure_url, // Set your cloudinary secure_url here
    },
  });
  res.status(201).json({
    success: true,
    message: "New Certification Added",
    certification,
  });
});
export const deleteCertification = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let certification = await Certification.findById(id);
  if (!certification) {
    return next(new ErrorHandler("Certification Not Found!", 404));
  }
  const certificationSvgId = certification.svg.public_id;
  await cloudinary.uploader.destroy(certificationSvgId);
  await certification.deleteOne();
  res.status(200).json({
    success: true,
    message: "Certification Deleted!",
  });
});
export const updateCertification = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let certification = await Certification.findById(id);
  if (!certification) {
    return next(new ErrorHandler("Certification Not Found!", 404));
  }
  const { title, issuer, date } = req.body;
  certification = await Certification.findByIdAndUpdate(
    id,
    { title, issuer, date },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
    message: "Certification Updated!",
    certification,
  });
});
export const getAllCertifications = catchAsyncErrors(async (req, res, next) => {
  const certifications = await Certification.find();
  res.status(200).json({
    success: true,
    certifications,
  });
});