import styles from "./CountryPicker.module.css" ;
import { NativeSelect , FormControl } from "@mui/material"
import { useEffect , useState } from "react";
import { fetchCountriesList } from "../../../Services/covidData";



const CountryPicker = ({ handleCountryChange }) => {

    const [countriesList , setCountriesList] = useState([]);

    const getCountriesList = async () => {
       const listData = await fetchCountriesList();
       setCountriesList(listData);
    };

    useEffect(() => {
        getCountriesList();
    } , []);

    const updateSelect = (e) => {
        const { value } = e.target;
        handleCountryChange(value);
    };

   return (
    <section className={styles.container}>
       <FormControl>
        <NativeSelect defaultValue={""} onChange={updateSelect} className={styles.select}>
            <option value={""} className={styles.countriesList}>Global</option>
             {
                countriesList.map(country => <option className={styles.countriesList} key={country} value={country}>{country}</option> )
             }
        </NativeSelect>
       </FormControl>
    </section>
   )
}

export default CountryPicker ;