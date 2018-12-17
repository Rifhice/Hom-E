/**
  * @swagger
  *
  * paths:
  *   /device/:deviceId/Categories:
  *     get:
  *       tags:
  *         - Categories
  *       description: Fetches all the categories for a specifice device
  *       summary: Fetches all the categories for a specifice device
  *       responses:
  *         200:
  *           description: The list of categories
  *           content:
  *             application/json:
  *               schema:
  *                 $ref: '#components/schemas/Categories'
  *         500:
  *           description: Internal error
  *         501:
  *           description: The device does not implement this request
  *         502:
  *           description: The device is unreachable
  *         504:
  *           description: The device response has timeout
  */
module.exports = async (req, res) => {
  res.status(200).send(req.deviceResponse)
}