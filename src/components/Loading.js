import React from 'react'
import { Grid } from '@material-ui/core'

export const Loading = ({show}) => {
    return (
        <div className={{position: 'fixed', top: 0, left: 0}}>
        {
            show ? 
            <div className="loader">
            </div> :
            <div className="dummy"></div>
        }
        </div> 
     )
}