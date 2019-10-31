import React, { useState, useEffect } from 'react'
import 'assets/css/theme.css'
import { useMutation } from '@apollo/react-hooks'
import { usePageLoadingContext } from 'context'
import gql from 'graphql-tag'
import { Grid, Snackbar, TextField, Typography, Button, SnackbarContent, FormControl, FormHelperText } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import {green, red} from '@material-ui/core/colors'
import { Footer } from 'components/Footer/Footer'

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

const ADD_STUDENT = gql`
mutation AddStudent($student: InpStudent!) {
    addStudent(student: $student) {
        _id
        roll_no
        first_name
        last_name
        country_code
        phone_no
        father_name
        mother_name
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

const AddStudent = () => {

    const classes = useStyles()

    const [formValue, setFormValue] = useState({
        roll_no: "",
        first_name: "",
        last_name: "",
        country_code: "",
        phone_no: "",
        father_name: "",
        mother_name:""
    })

    const handleChange = (e) => {
        setFormValue({
            ...formValue,
            [e.target.name]: e.target.value
        })
    } 

    const [addStudentDetails, sup] = useMutation(ADD_STUDENT)
    const {setLoading} = usePageLoadingContext()
    const [shouldShow, setShouldShow] = useState(false)
    const [message, setMessage] = useState("Dummy Text")
    const [showingMessage, setShowingMessage] = useState(false)

    useEffect(() => {
        if(addStudentDetails && sup.loading == false && shouldShow === true){
            setMessage(sup.error ? "Error Adding Details. Make sure all the details are valid!" : "Added Student Details")
            setShowingMessage(true)
            setLoading(false)
        } 
    }, [sup.loading])

    const handleSubmit = () => {
        setShowingMessage(false)
        setLoading(true)
        setShouldShow(true)
        addStudentDetails({
            variables: {student: formValue}
        })
    }

    return (
        <>
        <Grid container>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={showingMessage} autoHideDuration={1000} onClose={() => setShowingMessage(false)}>
                <SnackbarContent 
                 message={message}
                 className={message.includes('Error') ? classes.error : classes.success}/>
            </Snackbar>
            <Grid item xs={12} style={{textAlign: "center", fontFamily: "Comfortaa, sans-serif"}}>
                <Typography variant="h5" style={{paddingTop: "12px", paddingBottom: "12px"}}>Student Form</Typography>
            </Grid>
            <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    label="Roll No"
                    value={formValue.roll_no}
                    onChange={handleChange}
                    name="roll_no"
                    placeholder="Roll No"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                        fullWidth
                        variant="outlined"
                        label="First Name"
                        value={formValue.first_name}
                        onChange={handleChange}
                        name="first_name"/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Last Name"
                        value={formValue.last_name}
                        onChange={handleChange}
                        name="last_name"
                        placeholder="Last Name"/>
                </Grid>
                <Grid item xs={2}>
                <TextField
                    fullWidth 
                    variant='outlined'
                    label="Country Code"
                    value={formValue.country_code}
                    onChange={handleChange}
                    name="country_code"
                    placeholder="Country Code"/>
                </Grid>
                <Grid item xs={10} >
                    <FormControl fullWidth>
                    <TextField
                        fullWidth
                        variant="outlined" 
                        label="Phone No"
                        value={formValue.phone_no}
                        onChange={handleChange}
                        name="phone_no"
                        placeholder="Phone No"/>
                        <FormHelperText>Phone number must be 10 digits long.</FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    label="Father's Name"
                    value={formValue.father_name}
                    onChange={handleChange}
                    name="father_name"
                    placeholder="Father Name"/>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    label="Mother's Name"
                    value={formValue.mother_name}
                    onChange={handleChange}
                    name="mother_name"
                    placeholder="Mother Name"/>
                </Grid>
                <Grid xs={12} style={{paddingTop: "16px"}}>
                    <Button variant="contained" onClick={() => handleSubmit()}>Submit</Button>
                </Grid>
                </Grid>
                </form>
            </Grid>
        </Grid>
        </>
    )
}

export default AddStudent