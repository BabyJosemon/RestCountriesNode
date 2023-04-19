import { Router } from 'express'
import CountriesController from './controller.js'

const CountriesRouter = Router()

CountriesRouter.get('/all', CountriesController.getAllCountries)
CountriesRouter.get('/:name', CountriesController.getCountry)

export default CountriesRouter
