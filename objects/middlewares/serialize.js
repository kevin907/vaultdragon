const env = process.env.NODE_ENV || 'development'
const dev = env === 'development' || process.env.DEBUG === 'true'

module.exports = function(cb) {
  return async function(req, res, next) {
    try {
      /* istanbul ignore if */
      if(dev) console.time(req.url)
      const resp = await cb(req, res, next)

      if(Buffer.isBuffer(resp)) {
        res.type('json')
          .set('Content-Encoding', 'gzip')
          .send(resp)
      } else {
        res.json(resp)
      }
    } catch (err) {
      /* istanbul ignore if */
      next(err)
    } finally {
      /* istanbul ignore if */
      if(dev) console.timeEnd(req.url)
    }
  }
}
