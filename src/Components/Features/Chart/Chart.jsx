import styles from "./Chart.module.css";
import { Line , Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import { useEffect , useState } from "react";
import { fetchDailyData } from "../../../Services/covidData";

Chart.register(...registerables);

const DailyChart = ({ singleCountryData  , country }) => {

    const { confirmed , deaths } = singleCountryData || "";
   
    const [dailyData , setDailyData] = useState([]);

    const getDailyData = async () => {
       const dailyData = await fetchDailyData();
       setDailyData(dailyData);
    }

    useEffect(() => {
        getDailyData();
    } , [])
   return (
    <section className={styles.container}>
        {   
         singleCountryData.confirmed ? 
           <Bar 
           data={{ 
            labels : ["Infections" , "Deaths"] ,
            datasets : [{
                label : `Number of cases at ${country}` ,
                backgroundColor : ["cornflowerblue" , "red"] , 
                data : [confirmed.value , deaths.value]
            }]
           }} 
           />
                :
             dailyData.length ?
            <Line
            data={{
                labels : dailyData.map(({ date }) => date ) ,
                datasets : [{
                    data : dailyData.map(({ confirmed }) => confirmed ) ,
                    label : "Infections" ,
                    fill: true ,
                    borderColor : "cornflowerblue"
                } , {
                    data : dailyData.map(({ deaths }) => deaths ) ,
                    label : "Deaths" ,
                    fill: true ,
                    borderColor : "red"
                }]
            }}  
            /> :
             <p>Loading</p>
        }
    </section>
   )
}

export default DailyChart ;