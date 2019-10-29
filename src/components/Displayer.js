import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Grid, Typography } from '@material-ui/core'
import { FONTS_HEAD } from 'App'
import { makeStyles } from '@material-ui/styles'

const infoStyles = makeStyles(theme => ({
    infoContainer: {
        padding: theme.spacing(1),
        borderRadius: "4px",
        overflow: "hidden",
        transition: "0.14s backgroundColor ease-in-out",
        "&:hover": {
            backgroundColor: theme.palette.primary.dark
        }
    },
    imazo: {
        width: '100%',
        height: "240px",
        objectFit: "contain",
        [theme.breakpoints.down('md')]: {
            height: '180px',
        }
    },
    info: {
        fontFamily: FONTS_HEAD,
        fontSize: '16px',
        color: theme.palette.grey[100]
    },
    subinfo: {
        fontFamily: FONTS_HEAD,
        fontSize: '12px',
        color: theme.palette.grey[400]        
    }
}))

const InfoCard = ({showInfo, info}) => {

    const classes = infoStyles()

    return (
        <Grid item xs={12} sm={6} md={4} className={classes.infoContainer}>
            <img className={classes.imazo} src={info.url_path} />
            {
                showInfo ? <Grid container>
                    <Grid item xs={12} style={{paddingTop: "8px"}}>
                        <Typography variant="h6" className={classes.info}>
                            {info.creator}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" className={classes.subinfo}>
                            {info.about_creator}
                        </Typography>
                    </Grid>
                </Grid> : null
            }
        </Grid>
    )
}


const LIMIT = 12
const STEPPER = 4

const DisplayStyle = makeStyles(theme => ({
    notFound: {
        color: theme.palette.grey[600],
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5)
    }
}))

export const Displayer = ({queryObject, shouldDisplayInfo}) => {

    const classes = DisplayStyle()

    const {data, error, loading, fetchMore} = useQuery(queryObject.query_query, {
        variables: {
            options: {
                skip: 0,
                limit: LIMIT,
                type: queryObject.query_params
            }
        }
    })
    const {setLoading} = usePageLoadingContext()

    useEffect(() => {
        if(loading === true) {
            setLoading(true)
        } else if(loading === false) {
            setLoading(false)
        }
    }, [loading])

    let ToRender
    const makeResponse = () => {
        const items = data.allArts.map((item, index) => {
            return (
                <InfoCard showInfo={shouldDisplayInfo} info={item} key={index}/>
            )
        })
        const result = []
        for(let i = 0; i < data.allArts.length; i+=STEPPER){
            const ti = []
            for(let j = 0; j < STEPPER && (i + j) < data.allArts.length; ++j){
                ti.push(items[i+j])
            }
            result.push(<Grid container>{ti}</Grid>)
        }
        
        return result
    }

    if(loading) {
        ToRender = (
            <Grid container className={classes.notFound}>
                <Grid item xs={12} style={{textAlign: "center"}}>
                    <Typography variant="h4">Loading...</Typography>
                </Grid>
            </Grid>
        )
    }
    else if(error) {
        ToRender = <div>Error</div>
    }
    else if(data) {
        const response = makeResponse()

        console.log(response)
        if(response.length === 0){
            ToRender = (
                <Grid container className={classes.notFound}>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        <Typography variant="h4">
                            -\_(^_^)_/- <br /><br />
                            Nothing Found
                        </Typography>
                    </Grid>
                </Grid>
            )
        } else {
            ToRender = (
                <>
                    <InfiniteScroll
                        dataLength={response.length}
                        loader={<div>Loading</div>}
                        hasMore={data.length % LIMIT !== 0 ? false : true}
                        next={() => fetchMore({
                            variables: {
                                skip: Math.floor(data.length / LIMIT),
                                limit: LIMIT,
                                type: queryObject.query_params
                            }, updateQuery: (prev, { fetchMoreResult }) => {
                                if (!fetchMoreResult) return prev;
                                return Object.assign({}, prev, {
                                feed: [...prev[queryObject.query_table_name], ...fetchMoreResult[queryObject.query_table_name]]
                                });
                            }
                        })}>
                        {response}
                    </InfiniteScroll>
                </>
            )
        }
    }
    return (
        <>
            {ToRender}
        </>
    )
}