const Joi = require('joi')
const {Knex} = require('../../db/knex')
const serialize = require('../../middlewares/serialize')
const joi = require('../../middlewares/joi')
const moment = require('moment')

const validations = Joi.object().keys({
	key: Joi.string(),
	timestamp: Joi.number().integer()
})

function filter(query, params={}) {
	if(params.timestamp) {
		query.whereRaw('extract(epoch from objects.created_at) <= :timestamp',{timestamp: params.timestamp})
	}
}

async function show(req, res) {
	console.log(req.joi,'joi')
  const objects = Knex('objects')
  		.select('objects.key', 'objects.value', 'objects.created_at')
	    .where('objects.key', req.joi.key)
	    .orderBy('objects.created_at','DESC')
	    .modify(filter, req.joi)
	    .first()

  return Promise.props({ objects })
}

module.exports = [
  joi(validations),
  serialize(show),
]
