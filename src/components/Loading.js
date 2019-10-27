import React from 'react'

export const Loading = ({show}) => {
    return (
        <>
        {
            show ? 
            <div className="loader">
            </div> :
            <div className="dummy"></div>
        } 
        </>
    )
}