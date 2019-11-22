import React, { useState, lazy, useEffect } from 'react'
import { Tabs } from 'components/TabsList'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import { makeStyles, Grid, Typography, Link } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { Footer } from 'components/Footer/Footer'
import { NotifStyleDisplayer } from 'components/NotifStylesDisplayer'

const useStyles = makeStyles(theme => {
    root: {
        margin: theme.spacing(100)
    }
})

const Papers = () => {

    let ToRender

    ToRender = <NotifStyleDisplayer queryObject={{query_params: "paper"}} />
    
    const styles = useStyles()

    return (
        <Grid container>
            {ToRender}
        </Grid>
    )
}

export default Papers    