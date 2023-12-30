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
  console.log(req.params.id);
  console.log(listing);
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
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') offer = { $in: [false, true] };

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false')
      parking = { $in: [false, true] };

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false')
      furnished = { $in: [false, true] };

    let type = req.query.type;
    if (type === undefined || type === all) type = { $in: ["sale", "rent"] };

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      furnished,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

      return res.status(200).json(listing);

  } catch (error) {
    next(error);
  }
};
