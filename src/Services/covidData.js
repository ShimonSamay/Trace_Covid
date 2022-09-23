const baseUrl = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
   try {
     const response = await fetch(baseUrl);
     const { confirmed , recovered , deaths , lastUpdate } = await response.json();
     sessionStorage.setItem('globalData' , JSON.stringify({ confirmed , recovered , deaths , lastUpdate }));
     return { confirmed , recovered , deaths , lastUpdate };
   }
   catch (err) {
     return err ;
   }
};

export const fetchDailyData = async () => {
   try {
    const response = await fetch(`${baseUrl}/daily`);
    const data = await response.json();
    const dailyData = data.map(({ confirmed , deaths , reportDate }) => ({
      confirmed : confirmed.total , 
      deaths : deaths.total ,
      date : reportDate
     }));
     return dailyData;
   }
   catch (err) {
     return err;
   }
};

export const fetchCountriesList = async () => {
   try {
    const response = await fetch(`${baseUrl}/countries`);
    const { countries } = await response.json();
    const countriesList = countries.map(({ name }) => name);
    return countriesList;
   }
   catch (err) {
    return err;
   }
};

export const fetchCountryData = async (country) => {
   try {
     const response = await fetch(`${baseUrl}/countries/${country}`);
     const { confirmed , recovered , deaths , lastUpdate } = await response.json();
     return { confirmed , recovered , deaths , lastUpdate };
  }
  catch (err) {
    return err;
  }
}