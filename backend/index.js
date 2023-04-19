import express from 'express'
import morganMiddleware from './middlewares/morgan.js'
import CountriesRouter from './api/countries/routes.js'
import logger from './utils/logger.js'
import path from 'path';

const app = express()
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(morganMiddleware)

const PORT = process.env.PORT || 3001

app.use('/api', CountriesRouter)

app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(PORT, () => {
    logger.info('Server is running on port ' + PORT)
})
