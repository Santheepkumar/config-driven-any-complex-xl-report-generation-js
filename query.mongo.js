db.programApplications.aggregate([
  {
    $match: {
      stage: { $ne: "DRAFT" },
      _id: ObjectId("5e9d5774571774077c543668"),
    },
  },
  {
    $lookup: {
      from: "cawachForms",
      localField: "form",
      foreignField: "_id",
      as: "formData",
    },
  },
  {
    $unwind: {
      path: "$formData",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $lookup: {
      from: "cawachReviews",
      localField: "review",
      foreignField: "_id",
      as: "reviewData",
    },
  },
  {
    $unwind: {
      path: "$reviewData",
      preserveNullAndEmptyArrays: true,
    },
  }
]);
