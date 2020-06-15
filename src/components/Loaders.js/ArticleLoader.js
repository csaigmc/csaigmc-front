import React from 'react'
import { makeStyles, Grid } from '@material-ui/core'

const itemStyles = makeStyles(t => ({
    item: {
        background: `${t.palette.primary.dark}8f`,
        borderRadius: "8px",
        marginTop: "8px",
        marginBottom: "8px"
    },
    width100: {
        width: "100%"
    },
    width60: {
        width: "60%"
    },
    width50: {
        width: "50%"
    },
    width20: {
        width: "20%"
    },
    width10: {
        width: "10%"
    },
    height196: {
        height: "156px",
        [t.breakpoints.down('sm')]: {
            height: "128px"
        }
    },
    height20: {
        height: "20px",
    }
}))

const Item = () => {

    const c = itemStyles()

    return (
        <>
            <div className={`${c.item} ${c.height196} ${c.width100}`} />
            <div className={`${c.item} ${c.height20} ${c.width50}`} />
            <div className={`${c.item} ${c.height20} ${c.width60}`} />
        </>
    )
}

export const ArticleLoader = () => {

    return (
        <Grid container>
            <Grid item style={{padding: "4px"}} xs={12} md={4}><Item /></Grid>
            <Grid item style={{padding: "4px"}} xs={12} md={4}><Item /></Grid>
            <Grid item style={{padding: "4px"}} xs={12} md={4}><Item /></Grid>
        </Grid>
    )
}