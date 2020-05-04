import React, { useState, useEffect }  from 'react';
import { NativeSelect, FormControl } from '@material-ui/core'; 
import { fetchCountries } from '../../api'

import styles from './CountryPicker.module.css';

const CountryPicker = ({handleCountyChange}) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountries());
        }

        fetchAPI();
    }, [setCountries]);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue='' onChange = {(e) => handleCountyChange({
                    name: e.target.value,
                    translate: e.target.options[e.target.selectedIndex].text
                })}>
                <option value=''>Весь мир</option>
                {countries.map((country) => {
                    return <option key={country.name} value={country.name}>{country.translate}</option>
                })}
            </NativeSelect>
        </FormControl>
    );
};

export default CountryPicker;