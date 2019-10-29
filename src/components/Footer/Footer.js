import React from 'react'
import {usePath} from 'hookrouter'
import { Grid, Typography, makeStyles, Link } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { MapLocation } from './MapLocation'

const useStyles = makeStyles(theme => ({
    fontmain: {
        fontFamily: FONTS_HEAD,
        color: theme.palette.grey[500]
    },
    padder: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(2)
    },
    ccontainer: {
        position: "relative",
        bottom: "0",
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        backgroundColor: theme.palette.primary.dark
    },
    followus: {
        color: theme.palette.grey[400]
    },
    socialicon: {
        fontSize: 20,
        marginLeft: "6px",
        marginRight: "6px",
        color: theme.palette.grey[400]
    },
    instagram : {
        '&:hover': {
            color: `#405DE6`
        }
    },
    submit_complaint_here : {
        cursor: 'pointer',
        color: theme.palette.secondary.light,
        '&:hover': {
            color: theme.palette.secondary.dark,
        }
    }
})) 

export const Footer = () => {

    const classes = useStyles()
    const path = usePath()

    return (
        <Grid container className={classes.ccontainer}>
            {
                path === '/home' ?
                <Grid item xs={12}>
                    <MapLocation />
                </Grid> :
                null
            }
            <Grid item xs={12} className={`${path === '/home' ? classes.padder : ""} ${classes.followus}`} style={{textAlign: 'center'}}>
                <Typography variant="subtitle1" style={{fontFamily: "comfortaa"}}>Follow us on Social Media:</Typography> 
                <Link className={`${classes.socialicon} ${classes.instagram}`} href="https://instagram.com/atelier_igmc?igshid=3y1d6zzji3ta"><i className="fab fa-instagram"></i></Link>
                <Link className={`${classes.socialicon}`} href="#"><i className="fab fa-twitter"></i></Link>
                <Link className={`${classes.socialicon}`} href="#"><i className="fab fa-facebook-f "></i></Link>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center", paddingTop: "16px", paddingBottom: "16px"}}>
                <Typography variant='body1' className={classes.fontmain} style={{textAlign: 'center', fontSize: "12px"}} >CopyRight &copy; 2019 CSAIGMC. All rights reserved.</Typography>
            </Grid>
        </Grid>
    )
}