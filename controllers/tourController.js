const Tour = require('./../models/tourModel')


exports.getAllTours = async (req, res) => {

  try {

    // FILTERING
    const filter = buildFilterFromQuery({...req.query})

    let command = Tour.find(filter)

    // SORTING
    if (req.query.sort)
    {
      const sortBy = req.query.sort.split(',').join(' ')
      command = command.sort(sortBy )
    }
    else
    {
      command = command.sort('-createdAt')
    }

    // FIELD LIMITING
    if (req.query.fields)
    {
      const fields = req.query.fields.split(',').join(' ');
      command = command.select(fields)
    }
    else
    {
      command = command.select('-__v')
    }

    command = await paginateResults(command, req.query)

    const tours = await command;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
  }
  catch (err)
  {
    res.status(404).json({
      status: 'failed',
      message: err
    })
  }
}

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: tour
    })
  }

  catch (err)
  {
    res.status(404).json({
      status: 'fail',
      data: err
    })
  }
}

exports.createTour = async (req, res) =>
{
  try
  {
    const addedTour = await Tour.create(req.body);

    res.status(201).json(
      {
        status: 'success',
        data: addedTour
      });
  }
  catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }

}

exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // By default, findOneAndUpdate() returns the document as it was before update was applied.
      // If you set new: true, findOneAndUpdate() will instead give you the object after update was applied.
      runValidators: true
    })

    res.status(200).json({
      status: 'success',
      data: updatedTour
    })

  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteTour = async (req, res) =>
{
  try {

    const deletedTour = await Tour.findByIdAndDelete(req.params.id)

    res.status(200).json({
      status: 'success',
      data: deletedTour
    })
  }

  catch(err)
  {
    res.status(400).json({
      status: 'fail',
      message: err
    })
  }
}

function buildFilterFromQuery(query)
{
  const excludeFields = ['page', 'sort', 'limit', 'fields']

  excludeFields.forEach(el => delete query[el] ) // ignore some fields from the query

  let queryStr = JSON.stringify(query)

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, matchedWord => `$${matchedWord}`); // e.g. in query price[gte]=5 (all tours with price fields gte 5).
    // this translates to { price: { 'gte': '1500.2' } }. For mongo we need { price: { '$gte': '1500.2' } }, and the line above does the necessary job

  return JSON.parse(queryStr)
}

async function paginateResults(command, query) {
  //10 results per page by default

  let page = query.page * 1 || 1;
  let limit = query.limit * 1 || 3;

  command = command.skip(limit * (page - 1)).limit(limit)

  if (query.page) {
    const numDocuments = await Tour.countDocuments()
    if (limit * (query.page*1 - 1) >= numDocuments) throw new Error('This page does not exist')
  }
  return command;
}