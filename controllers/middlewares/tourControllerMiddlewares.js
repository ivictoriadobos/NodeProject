exports.validatePaginationQueryParameters = (req, res, next) =>
{
  let pageParameterVerified = true;
  let limitParameterVerified = true;

  if (req.query.page)
    if( req.query.page < 0)
      pageParameterVerified = false;

  if (req.query.limit)
    if(req.query.limit < 0)
      limitParameterVerified = false;

  if (pageParameterVerified&&limitParameterVerified)
    next();

  else
  {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid pagination parameter values in query'
    })
  }
}