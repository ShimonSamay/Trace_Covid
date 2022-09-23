import styles from "./Layout.module.css"
import DailyChart from "../../Features/Chart/Chart" ;
import CountryPicker from "../../Features/Country Picker/CountryPicker";
import Cards from "../../Features/Cards/Cards"
import { useEffect, useState } from "react";
import { fetchCountryData, fetchData } from "../../../Services/covidData";
import covidImage from "../../../Images/covid.png"

const Layout = () => {

    const [globalData , setGlobalData] = useState({});

    const [country , setCountry] = useState("");

    const [countryDataStats , setCountryStats] = useState("");
    
    const getGlobalData = async () => {
       const globalData = await fetchData();
       setGlobalData(globalData);
    }
    
    useEffect(() => {
        getGlobalData();
    } , []);

    const handleSetCountry = async (countryValue) => {
        if(countryValue) {
             setCountry(countryValue);
             const countryStats =  await fetchCountryData(countryValue);
             return setCountryStats(countryStats);
         } 
         setCountryStats("");
         const savedGlobalData = JSON.parse(sessionStorage.getItem("globalData"));
         setGlobalData(savedGlobalData);
    }

   return (
    <section className={styles.container}>
        <img src={covidImage} alt="Covid-19" className={styles.image}/>
        <Cards data={ countryDataStats || globalData }/>
        <CountryPicker handleCountryChange={handleSetCountry}/>
        <DailyChart singleCountryData={countryDataStats} country={country}/>
    </section>
   )
}

export default Layout ;