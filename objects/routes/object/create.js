const _ = require('lodash')
const Joi = require('joi')
const {Knex} = require('../../db/knex')
const serialize = require('../../middlewares/serialize')
const joi = require('../../middlewares/joi')

const string = Joi.string()
const validations = Joi.object().keys({key:string, value:string})
async function create(req, res) {

  const objects = Knex('objects')
      .insert({key: req.joi.key, value: req.joi.value})
      .returning(['key','value','created_at'])

  return Promise.props({ objects })
}

module.exports = [
  joi(validations),
  serialize(create),
]
