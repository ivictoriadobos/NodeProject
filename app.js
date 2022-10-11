const express = require('express')
const fs = require('fs')
const morgan = require('morgan')

const app = express()
app.use(morgan('dev'))
app.use(express.json())

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

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

const getAllUsers = (req, res) =>
{
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  })
}

const createUser = (req, res) =>
{
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  })
}

const getUser = (req, res) =>
{
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  })
}

const updateUser = (req, res) =>
{
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined."
  })
}

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour);

userRouter.route('').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser);

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

const port = 3000;
app.listen(port, ()=>
{
  console.log(`App running on port ${port}...`)
})