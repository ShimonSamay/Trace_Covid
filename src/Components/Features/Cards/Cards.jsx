import styles from "./Cards.module.css" ;
import { Card , CardContent , Typography , Grid } from "@mui/material" ;
import CountUp from "react-countup";


const Cards = ({ data }) => {

  const { confirmed , deaths , lastUpdate } = data ;
  
  const setStyle = (item) => {
    return item.confirmed ? styles.infection : item.recovered ? styles.recovered : styles.deaths
  }

  const cardsContent = [
    {
        caseType : "Infections" ,
        confirmed ,
        lastUpdate
    } ,
    {
        caseType : "Deaths" ,
        deaths ,  
        lastUpdate
    }
];
   return (
    data ? 
 <section className={styles.container}>
   <Grid container justifyContent="space-around" className={styles.cardsBox}>
      {   
         cardsContent.map(content => 
              <Grid className={`${styles.card} ${setStyle(content)}`} key={content.caseType} item component={Card}>
                <CardContent>
                  <Typography color="MenuText" gutterBottom align="center">{content.caseType.toUpperCase()}</Typography>
                  <Typography variant="h4"  align="center" fontWeight={600} fontSize={25}>
                  <CountUp start={0} end={content.confirmed?.value  || content.deaths?.value }  duration={5} separator=","/>
                  </Typography>
                  <Typography mt={1} color="GrayText"  align="center">{new Date(content.lastUpdate).toDateString()}</Typography>
                </CardContent>
             </Grid>
        ) 
       }
    </Grid>  
   </section>
        :
    <p>
       loading
    </p>
   )
}

export default Cards ;
