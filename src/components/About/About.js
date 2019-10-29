import React from 'react'
import {FONTS_HEAD} from 'App'
import { Grid, Typography } from '@material-ui/core'
import { makeStyles} from '@material-ui/styles'
import IGMC from 'assets/images/IGMC.jpg'

const useStyles = makeStyles(theme => ({
    about: {
        fontFamily: FONTS_HEAD,
        paddingTop: theme.spacing(3),
        color: theme.palette.grey[500],
        fontSize: "14px"
    }
}))

const About = () => {

    const classes = useStyles()

    return (
        <Grid container>
            <Grid item xs={12} style={{textAlign: 'center'}}> 
                <img src={IGMC} style={{borderRadius: "2px", maxWidth: "100%", filter: 'brightness(80%)'}} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" className={classes.about} >
                    Himachal Pradesh Medical College at Shimla (HPMC) was established in the year 1966 with admissions of 50 students in the first batch. Indira Gandhi Medical College is affiliated to Himachal Pradesh University, Shimla. With the establishment of Medical College in the State, the hopes and aspirations of the people of the state were met with the standards of health services going on and students benefiting with the advantage of staying home and getting better educational avenues. Himachal Pradesh Medical College was renamed Indira Gandhi Medical College (now popularly known as IGMC in abbreviated form) in 1984. Admission facility was increased to 65 in the year 1978. Now MBBS seats have been increased to 100. The post Graduate courses were started in 16 disciplines in the year 1981.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default About