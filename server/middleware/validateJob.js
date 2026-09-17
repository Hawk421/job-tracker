const allowedStatuses = [
  'Applied',
  'Interview',
  'Offer',
  'Rejected',
]

function validateJob(req, res, next) {
  const {
    company,
    position,
    status,
  } = req.body

  if (
    !company?.trim() ||
    !position?.trim() ||
    !status
  ) {
    return res.status(400).json({
      message:
        'Company, position and status are required',
    })
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: 'Invalid status',
    })
  }

  next()
}

module.exports = validateJob