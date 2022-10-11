const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkTourId = (req, res, next, val) => {
  // req.params.id = val
  const id = req.params.id * 1; // string -> integer
  const tour = tours.find(el => el.id === id)

  if ( tour === undefined)
  {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id"
    })
  }

  next();
}

exports.checkDataIntegrity = (req, res, next) =>
{
    const tourName = req.body["name"]
    const tourPrice = req.body["price"]

    if (tourPrice !== undefined && tourPrice !== null && tourPrice > 0 &&
        tourName !== undefined && tourName !== null && tourName.length > 0)
    {
      next();
    }
    else {
      return res.status(400).json({
        status: "fail",
        message: "A tour should have a positive price value and a name value."
      })
    }
}

exports.getAllTours = (req, res) =>
{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}

exports.getTour = (req, res) =>
{
  res.status(200).json({
    status: 'success',
    data: {
      tour: tours[req.params.id]
    }
  });
}

exports.createTour = (req, res) =>
{
  const newId = tours[tours.length-1].id + 1;
  const newTour = Object.assign({id: newId}, req.body)

  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: "success",
      data:{
        newTour } })
  })
}

exports.updateTour = (req, res) =>
{
  res.status(200).json(
    {
      status:"success",
      data: {
        tour: "Updated tour here..."
      }
    }
  )
}