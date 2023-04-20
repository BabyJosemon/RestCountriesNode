import express from 'express'
import morganMiddleware from './middlewares/morgan.js'
import CountriesRouter from './api/countries/routes.js'
import logger from './utils/logger.js'
import path from 'path';
import cors from 'cors';

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const allowedOrigins = ['https://rest-countries-client.onrender.com'];
const options = {
  origin: allowedOrigins
};

app.use(cors(options));

app.use(morganMiddleware)

const PORT = process.env.PORT || 3001

app.use('/api', CountriesRouter)

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
    logger.info('Server is running on port ' + PORT)
})
