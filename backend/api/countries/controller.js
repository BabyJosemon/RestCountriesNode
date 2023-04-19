import CountriesService from './service.js'

const CountriesController = {
    property: '',
    getAllCountries: async (req, res) => {
        const results = await CountriesService.getAllCountries()
        res.send(results).status(200)
    },
    getCountry: async (req, res) => {
        const { name } = req.params
        const { fullText } = req.query
        if (!/^[a-zA-Z]+$/.test(name)) {
            return res.status(400).send('Invalid name parameter')
        }
        if (
            fullText !== undefined &&
            fullText !== 'true' &&
            fullText !== 'false'
        ) {
            return res.status(400).send('Invalid fullText parameter')
        }
        try {
            const results = await CountriesService.getCountryByName(
                name,
                fullText === 'true' ? true : false
            )
            res.send(results).status(200)
        } catch (errorResult) {
            res.status(404).send({ ...errorResult, status: 404 })
        }
    },
}

export default CountriesController
