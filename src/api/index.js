import axios from 'axios';

const COVID_API_URL = 'https://covid19.mathdro.id/api';

const YANDEX_TRANSLATE_API_URL = 'https://translate.yandex.net/api/v1.5/tr.json/translate';
const YANDEX_TRANSLATE_KEY = 'trnsl.1.1.20200504T100920Z.f61c4784ae35633d.23a45cc76ccdeeafcd8dda83f66a130e08494e52';

export const fetchData = async (country) => {
    const url = country ? `${COVID_API_URL}/countries/${country}` : COVID_API_URL;
    try {
        const { data: {confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate }
    } catch (error) {
        console.log(error);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${COVID_API_URL}/daily`);
        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }))
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

 const yandexTranslate = async (text, key, lang = 'en-ru') => {
    const url = `${YANDEX_TRANSLATE_API_URL}?lang=${lang}&key=${key}`;
    const params = new URLSearchParams();
    params.append('text', text);
    const response = await axios.post(url, params, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    });
    return response.data.text[0];
}

export const fetchCountries = async () => {
    try {
        const { data: {countries} } = await axios.get(`${COVID_API_URL}/countries`);
        const countriesNames = countries.map((country) => country.name);
        const countriesNamesTranslated = (await yandexTranslate(countriesNames.join(' | '), 
                                                YANDEX_TRANSLATE_KEY)).split(' | ');

        const countriesTranslated = countriesNames.map((countryName, i) => ({
            name: countryName,
            translate: countriesNamesTranslated[i]
        }));
        console.log('countriesTranslated',countriesTranslated)
        return countriesTranslated;
    } catch (error) {
        console.log(error);
    }
}