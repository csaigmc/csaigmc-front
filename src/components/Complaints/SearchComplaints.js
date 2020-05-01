import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { usePageLoadingContext } from 'context'
import { useLazyQuery } from '@apollo/react-hooks'
import { Grid, InputBase, makeStyles, IconButton, Icon, Typography } from '@material-ui/core'
import { FONTS_HEAD } from 'App'

const SEARCH_COMPLAINT_QUERY = gql`
query searchComplaint($id: ID!) {
    complaint(id: $id) {
        _id
        complaint_status
        complaint_message
        create_date
    }
}
`

const useStyles = makeStyles(theme=> ({
    searchbar: {
        background: theme.palette.primary.dark,
        borderTopLeftRadius: theme.spacing(10),
        borderBottomLeftRadius: theme.spacing(10),
        paddingLeft: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    search: {
        background: theme.palette.primary.dark,
        borderTopRightRadius: theme.spacing(10),
        borderBottomRightRadius: theme.spacing(10),
        textAlign: "right",
        color: theme.palette.grey[400],
        paddingTop: 10,
        paddingBottom: theme.spacing(1),
        paddingRight: theme.spacing(2),
        '&:hover': {
            color: theme.palette.secondary.main,
        }
    },
    error: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'center',
        fontFamily: FONTS_HEAD,
        color: theme.palette.grey[500]
    },
    complaint_data: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        border: `1px solid ${theme.palette.grey[500]}`,
        color: theme.palette.grey[200]
    },
    complaintText: {
        fontFamily: FONTS_HEAD,
    }
}))

const dateFormatter = (create_date) => {
    const date = new Date()
    date.setTime(create_date)
    const day = date.getUTCDate()
    const mon = date.getMonth() + 1
    const year = date.getFullYear()
    const fdate = `${mon}/${day}/${year}`
    return fdate
}

const SearchComplaints = () => {

    const [value, setValue] = useState("")

    console.log(value)

    const [searchQuery, res] = useLazyQuery(
        SEARCH_COMPLAINT_QUERY,
        {
            variables: {
                id: value
            }
        }
    )
    const classes = useStyles()
    const {setLoading} = usePageLoadingContext()

    useEffect(() => {
        if(res.called && res.loading){
            setLoading(true)
        } else if(res.loading === false) {
            setLoading(false)
        }
    }, [res.loading])

    console.log(res.data)
    console.log(res.error)

    let ToRender
    if(res.error || res.data == null || res.data.complaint == null || res.data == undefined || res.data.complaint == undefined){
        ToRender = (
            <Grid container>
                <Grid item xs={12} className={classes.error}>
                <Typography variant="h5">
                    \_[^_^]_/ <br />
                    Not Found
                </Typography>
                </Grid>
            </Grid>
        )
    } else if(res.data) {
        let color
        switch (res.data.complaint.complaint_status) {
            case 'pending':
                color = '#b71c1c40'
                break;
            case 'inprogress':
                color = '#ffa00040'
                break;
            case 'resolved':
                color = '#255d0040'
                break;
            default:
                break;
        }
        ToRender = (
            <Grid container>
                <Grid item xs={12} className={classes.complaint_data} style={{background: color}}>
                    <Typography className={classes.complaintText}>ID: {res.data.complaint._id}</Typography>
                    <Typography className={classes.complaintText}>STATUS: {res.data.complaint.complaint_status}</Typography>
                    <Typography className={classes.complaintText}>COMPLAINT: {res.data.complaint.complaint_message}</Typography>
                    <Typography className={classes.complaintText}>ADDED ON: {dateFormatter(res.data.complaint.create_date)}</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container>
            <Grid item xs={11}>
                <InputBase
                    fullWidth
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    name="id"
                    className={classes.searchbar}
                    placeholder="Search Complaint ID..."
                 />
            </Grid>
            <Grid item xs={1} className={classes.search}>
                <Icon onClick={() => {
                    searchQuery()
                }}>search</Icon>
            </Grid>
            <Grid item xs={12}>
                {ToRender}
            </Grid>
        </Grid>
    )
}

export default SearchComplaints