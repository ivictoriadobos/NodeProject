const express = require('express');
const fs = require('fs');

const router = express.Router();
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

const getAllTours = (req, res) =>
{
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
  });
}

const getTour = (req, res) =>
{
  const id = req.params.id * 1; // string -> integer
  const tour = tours.find(el => el.id === id)

  if ( tour === undefined)
  {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id"
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
}

const createTour = (req, res) =>
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

const updateTour = (req, res) =>
{
  const id = req.params.id * 1; // string -> id
  const tour = tours.find(el => el.id === id)

  if ( tour === undefined)
  {
    return res.status(404).json({
      status: "fail",
      message: "Invalid id"
    })
  }

  res.status(200).json(
    {
      status:"success",
      data: {
        tour: "Updated tour here..."
      }
    }
  )
}

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour);

module.exports = router;