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
    },
    ccontainer: {
        position: "relative",
        bottom: "0",
        marginTop: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        backgroundColor: theme.palette.primary.dark
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
            <Grid item className={ path === '/home' ? classes.padder : ""} xs={12} style={{textAlign: "center"}}>
                <Typography variant='body1' className={classes.fontmain} style={{textAlign: 'center', fontSize: "12px"}} >CopyRight &copy; 2019 CSAIGMC. All rights reserved.</Typography>
            </Grid>
        </Grid>
    )
}