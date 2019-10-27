import React, { useState, useEffect } from 'react'
import 'assets/css/theme.css'
import { useMutation } from '@apollo/react-hooks'
import { usePageLoadingContext } from 'context'
import gql from 'graphql-tag'

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

const AddStudent = () => {

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
            setMessage(sup.error ? "Error Adding Details. Make sure your phone number is 10 digits long" : "Added Student Details")
            setShowingMessage(true)
            setLoading(false)
        } 
    }, [sup.loading])

    return (
        <div className="container pt-2">
            <div className="row">
            {showingMessage ? <div className="col-12 border-0 rounded p-2 font-main" style={{border: `2px solid ${message.includes('Error') ? "#c43b3d40" : "#3bc46040"}`, backgroundColor: `${message.includes('Error') ? "#c43b3d40" : "#3bc46040"}`}}>{message}</div> : null}
            <div className="col-12 container-fluid font-head mt-2 text-center">Student Form</div>
            <form onSubmit={(e) => {
                e.preventDefault()
                setShowingMessage(false)
                setLoading(true)
                setShouldShow(true)
                addStudentDetails({
                    variables: {student: formValue}
                })
            }} className="col-12">
                <div className="col-12">
                    <InputBox 
                        label="Roll No"
                        value={formValue.roll_no}
                        onChange={handleChange}
                        name="roll_no"
                        placeholder="Roll No"/>
                    </div>
                <div className="col-12 py-1">
                    <InputBox 
                        label="First Name"
                        value={formValue.first_name}
                        onChange={handleChange}
                        name="first_name"/>
                </div>
                <div className="col-12 py-1">
                <InputBox 
                    label="Last Name"
                    value={formValue.last_name}
                    onChange={handleChange}
                    name="last_name"
                    placeholder="Last Name"/>
                </div>
                <div className="col-12 py-1">
                <InputBox 
                    label="Country Code"
                    value={formValue.country_code}
                    onChange={handleChange}
                    name="country_code"
                    placeholder="Country Code"/>
                </div>
                <div className="col-12 py-1">
                <InputBox 
                    label="Phone No"
                    value={formValue.phone_no}
                    onChange={handleChange}
                    name="phone_no"
                    placeholder="Phone No"/>
                </div>
                <div className="col-12 py-1">
                <InputBox 
                    label="Father's Name"
                    value={formValue.father_name}
                    onChange={handleChange}
                    name="father_name"
                    placeholder="Father Name"/>
                </div>
                <div className="col-12 py-1">
                <InputBox 
                    label="Mother's Name"
                    value={formValue.mother_name}
                    onChange={handleChange}
                    name="mother_name"
                    placeholder="Mother Name"/>
                </div>
                <button className="font-head border-0 bg-secondary-main bg-secondary-light-hover rounded px-2 py-1 text-primary-dark" style={{cursor: "pointer"}}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddStudent