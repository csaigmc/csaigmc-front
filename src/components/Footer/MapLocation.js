import React from 'react'
import {Grid, Typography} from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
    padder: {
        padding: theme.spacing(2)
    },
    loc: {
        color: `${theme.palette.grey[400]}7f`,
        fontSize: "0.8rem"
    },
    padderLoc: {
        paddingTop: theme.spacing(2)
    },
    fontmain: {
        color: theme.palette.grey[400]
    }
}))

export const MapLocation = () => {

    const classes = useStyles()

    return (
        <Grid container >
            <Grid item xs={12} md={6}>
                <iframe style={{width: "100%"}} height="320" id="gmap_canvas" src="https://maps.google.com/maps?q=igmc%20shimla&t=&z=17&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" />
            </Grid>
            <Grid item xs={12} md={6} style={{padding: "8px"}}>
                <Typography className={classes.fontmain} style={{fontFamily: FONTS_HEAD, textTransform: "uppercase"}}>Location</Typography>
                <Typography className={`${classes.padderLoc} ${classes.loc}`} style={{fontFamily: FONTS_HEAD}}>
                    Indira Gandhi Medical College & Hospital <br />
                    Ridge Sanjauli Rd, Lakkar Bazar, Shimla, Himachal Pradesh <br /> 171001
                </Typography>
                <br />
            </Grid>
        </Grid>
    )
}