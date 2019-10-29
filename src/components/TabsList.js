import React from 'react'
import { Grid, Chip, makeStyles } from '@material-ui/core'
import { FONTS_HEAD } from 'App'

const useStyles = makeStyles((theme) => ({
    root: {
        fontFamily: FONTS_HEAD,
        marginLeft: theme.spacing(1),
        fontWeight: 700
    }
}))

const Tab = ({text, isActive, onChange}) => {

    const classes = useStyles() 

    return (
        <Chip onClick={onChange} className={classes.root} label={text} variant={isActive ? "default": "outlined"} color={isActive ? "secondary" : "default"} />
    )
}

export const Tabs = ({tabList, currentTab, onChange}) => {
    return (
        <Grid style={{paddingBottom: "24px"}}>
            {
                tabList.map((item, index) => {
                    return (
                        <Tab key={index} text={item} isActive={currentTab === index} onChange={() => onChange(index)}/>
                    )
                })
            }
        </Grid>
    )
}