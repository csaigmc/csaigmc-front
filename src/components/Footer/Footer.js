import React from 'react'
import {usePath} from 'hookrouter'
import { Grid, Typography, makeStyles, Link } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { MapLocation } from './MapLocation'
import IGMCImage from 'assets/images/IGMC.png'

const useStyles = makeStyles(theme => ({
    fontmain: {
        fontFamily: FONTS_HEAD,
        color: theme.textColor.main
    },
    copyRight: {
        color: `${theme.textColor.main}3f`
    },
    padder: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2)
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
        color: `${theme.textColor.dark}6f`,
        textAlign: "center",
        [theme.breakpoints.up('md')]: {
            paddingLeft: '16px',
            textAlign: "left",
            alignSelf: "center"
        }
    },
    socialicon: {
        fontSize: 20,
        marginLeft: "6px",
        marginRight: "6px",
        color: `${theme.palette.grey[400]}4f`
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
    },
    imagelogo: {
        borderRadius: '98px',
        background: theme.palette.grey[400],
        padding: '4px',
        width: 84,
        height: 84,
        marginRight: "1rem",
        [theme.breakpoints.down('md')]: {
            marginBottom: "8px",
            marginRight: "auto"
        }
    },
    divider: {
        textAlign: "center",
        [theme.breakpoints.up('md')]: {
            borderRight: `1px solid ${theme.palette.grey[700]}2f`,
            paddingRight: '16px',
            textAlign: "right"
        }
    },
    logoText: {
        fontFamily: FONTS_HEAD,
        verticalAlign: 'middle',
        paddingRight: "8px",
        display: "block",
        color: theme.palette.grey[700],
        [theme.breakpoints.up('md')]: {
            display: 'inline',
        },
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
            <Grid item container>
                <Grid item xs={12} md={6} className={`${path === '/home' ? classes.padder : ""} ${classes.divider}`}>
                    <img className={classes.imagelogo} src={IGMCImage} alt="CSA IGMC LOGO" />
                    <Typography className={classes.logoText} variant="h6">CSA IGMC</Typography>    
                </Grid>
                <Grid item xs={12} md={6} className={`${path === '/home' ? classes.padder : ""} ${classes.followus}`}>
                    <Typography variant="subtitle1" style={{fontFamily: FONTS_HEAD, fontSize: "12px"}}>Follow us on Social Media:</Typography> 
                    <Link className={`${classes.socialicon} ${classes.instagram}`} href="https://instagram.com/atelier_igmc?igshid=1ikxqwc1in0gp"><i className="fab fa-instagram"></i></Link>
                    <Link className={`${classes.socialicon}`} href="#"><i className="fab fa-twitter"></i></Link>
                    <Link className={`${classes.socialicon}`} href="#"><i className="fab fa-facebook-f "></i></Link>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{textAlign: "center", paddingTop: "16px", paddingBottom: "16px"}}>
                <Typography variant='body1' className={classes.copyRight} style={{textAlign: 'center', fontSize: "12px"}} >CopyRight &copy; 2019-20 CSAIGMC. All rights reserved.</Typography>
            </Grid>
        </Grid>
    )
}
