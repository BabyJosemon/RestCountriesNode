import logger from '../../utils/logger.js'

const BASE_URL = 'https://restcountries.com/v3.1'
const CountriesService = {
    getAllCountries: async () => {
        const results = await fetch(`${BASE_URL}/all`).then((res) => res.json())
        return results
    },
    getCountryByName: async (name, isFullText) => {
        return new Promise(async (resolve, reject) => {
            let results
            if (isFullText) {
                results = await fetch(
                    `${BASE_URL}/name/${name}?fullText=${isFullText}`
                ).then((res) => res.json())
            } else {
                results = await fetch(`${BASE_URL}/name/${name}`).then((res) =>
                    res.json()
                )
            }
            if (results?.status == 404) {
                reject({ message: 'Country Not Found' })
            } else {
                resolve(results)
            }
        })
    },
}

const commentedOut = () => {
    return {
        /*
   getCountryByName: async (name, isFullText) => {
     let results=null;
       if(isFullText){
           results = await fetch(`${BASE_URL}/name/${name}?fullText=${isFullText}`)
           .then((res) => {
               if(!res.ok){
                   console.log('Resonse '+res.json())
                   throw new Error('Country Not Found');

               }
               return res.json();
           })
           .then((res) => res.json())
           .catch(e => {
               console.log(e.message);
               throw e;
           });
           logger.info(`The URL used is ${BASE_URL}/name/${name}?fullText=${isFullText}`);
       }else{
           results = await fetch(`${BASE_URL}/name/${name}`)
           .then((res) => {
                       if(!res.ok){
                           throw new Error('Country Not Found');
                       }
                       return res.json();
                   })
           .then((res) => res.json())
           .catch(e => {
                   console.log(e);
                   });
           logger.info(`The URL used is ${BASE_URL}/name/${name}`);
       }
       return results;
     },
   */
    }
}
export default CountriesService
