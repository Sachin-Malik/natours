import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = Model => {
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);
      
        if (!doc) {
          return next(new AppError('No doc found with this ID', 404));
        }
      
        res.status(204).json({
          status: 'success',
          data: null,
        });
      });
}

exports.updateOne = Model => {
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        });
      
        if (!doc) {
          return next(new AppError('No document found with this ID', 404));
        }
      
        res.status(200).json({
          status: 'success',
          data: {
            data:tour,
          },
        });
    });
}

exports.createOne = Model => {
    catchAsync(async (req, res, next) => {
        const doc = await Model.create(req.body);
        res.status(201).json({
          status: 'success',
          data: {
            data: doc,
          },
        });
      });
}

exports.getOne = (Model, popOptions) => {
  catchAsync(async (req, res, next) => {
    // this "populate" is using reference to populate the tour model with the guides
    let query = Model.findById(req.params.id);
    if(popOptions)
    query= query.populate(popOptions);
    
    const doc = await query;
    //alternatively : Tour.findOne({_id: req.params.id});
    if (!doc) {
      return next(new AppError('No document found with this ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data:doc,
      },
    });
  }); 
}

exports.getAll = (Model) => {
  catchAsync(async (req, res, next) => {
    //  BUILD QUERY
    
    // To allow request for all reviews
    let filter ={};
    if(req.params.tourId) filter ={tour:req.params.tourId};

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
  
    // EXECUTE QUERY
    const doc = await features.query; //this is the result of the query
  
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data:doc,
      },
    });
  });
}