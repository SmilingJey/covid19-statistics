import React, {useState, useEffect} from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from  'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        };

        fetchAPI(dailyData);
    }, []);

    const lineChart = (
        dailyData.length ? (
            <Line
                data = {{
                    labels: dailyData.map(({ date}) => date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Зараженных',
                        borderColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true    
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Умерших',
                        borderColor: 'rgba(0, 0, 0, 0.5)',
                        fill: true 
                    }],
                }}
            />) : null
    );

    console.log(confirmed, recovered, deaths);            
    console.log(country);
    console.log(country && country.translate);
    const barChart = (
        confirmed && country ? (
            <Bar
                data={{
                    labels: ['Зараженных', 'Выздоровевших', 'Умерших'],
                    datasets: [{
                        label: 'Человек',
                        backgroundColor: [
                            'rgba(255, 0, 0, 0.8)',
                            'rgba(0, 255, 0, 0.8)',
                            'rgba(0, 0, 0, 0.8)',  
                        ],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options = {{
                    legend: { display: false },
                    title: {display: true, text: `Статистика - ${country.translate}`}
                }}
            />) : null
    );

    return (
        <div className={styles.container}>
            {(country && country.name) ? barChart : lineChart}
        </div>
    );
};

export default Chart;