import React, { useState, useEffect } from 'react'
import 'assets/css/theme.css'
import { useMutation } from '@apollo/react-hooks'
import { usePageLoadingContext } from 'context'
import gql from 'graphql-tag'
import { Grid, Snackbar, TextField, Typography, Button, SnackbarContent, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {green, red} from '@material-ui/core/colors'

const InputBox = ({label, value, onChange, name, placeholder}) => {
    return (
        <div className="row">
        <div className="col-12 px-0 bg-primary-light">
            <label className="px-2 py-0 font-head" style={{fontSize: "14px"}}>{label}</label>
            <div>
                <input className="input px-2 pb-1" style={{width: "100%", background: "transparent"}} type="text" value={value} onChange={onChange} name={name} />
            </div>
        </div>
        </div>
    )
}

const ADD_COMPLAINT = gql`
mutation AddComplaint($complaint: InpComplaint!) {
    addComplaint(complaint: $complaint) {
        _id
        complaint_message
        create_date
    }
}
`

const useStyles = makeStyles(theme => ({
    error: {
        background: red[800],
        color: red[200]
    },
    success: {
        background: green[800],
        color: green[200]
    }
}))

const AddComplaint = () => {

    const classes = useStyles()

    const [formValue, setFormValue] = useState({
        complaint_message: ""
    })

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    } 

    const [addComplaintDetails, sup] = useMutation(ADD_COMPLAINT)
    const {setLoading} = usePageLoadingContext()
    const [shouldShow, setShouldShow] = useState(false)
    const [message, setMessage] = useState("Dummy Text")
    const [showingMessage, setShowingMessage] = useState(false)

    console.log("____")
    console.log(sup)
    console.log("____")

    useEffect(() => {
        if(addComplaintDetails && sup.loading == false && shouldShow === true){
            setMessage(sup.error ? "Error Adding Complaint." : `Added Complaint: #${sup.data.addComplaint._id}. Please keep it to see progress of your Complaint.`)
            setShowingMessage(true)
            setLoading(false)
        } 
    }, [sup.loading])

    const handleSubmit = () => {
        setShowingMessage(false)
        setLoading(true)
        setShouldShow(true)
        addComplaintDetails({
            variables: {complaint: {...formValue, complaint_status: "pending"}}
        })
    }

    return (
        <Grid container>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={showingMessage} autoHideDuration={10000} onClose={() => setShowingMessage(false)}>
                <SnackbarContent 
                 message={message}
                 className={message.includes('Error') ? classes.error : classes.success}/>
            </Snackbar>
            <Grid item xs={12} style={{textAlign: "center", fontFamily: "Comfortaa, sans-serif"}}>
                <Typography variant="h5" style={{paddingTop: "12px", paddingBottom: "12px"}}>
                    Complaint Form
                </Typography>
            </Grid>
            <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <TextField 
                    fullWidth
                    multiline
                    variant="outlined"
                    label="Complaint Message"
                    value={formValue.complaint_message}
                    onChange={handleChange}
                    name="complaint_message"
                    placeholder="Complaint Message"/>
                </Grid>
                <Grid xs={12} style={{paddingTop: "16px"}}>
                    <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </Grid>
                </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default AddComplaint