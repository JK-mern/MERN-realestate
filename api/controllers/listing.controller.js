import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  console.log(req.params.id)
  console.log(listing)
  if (!listing) return next(errorHandler(401, "Listing Not Found"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your listings!!!"));
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been Deleted !");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "Listing Not Found"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(401, "You can only delete your listings!!!"));

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(errorHandler(401, "Listing Not Found"));
  try {
    res.status(200).json(listing)
  } catch (error) {
    next(error)
  }
};
