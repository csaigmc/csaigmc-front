import React from 'react'
import 'assets/css/theme.css'

export const NotFound = () => {
    return (
        <div className="container font-head">
            <div className="row">
                <div className="col-12 text-center">
                    <h1>404 ;(</h1><br />
                    Not Found
                </div>
                <div className="col-12 small text-center pt-4">
                        The resource you are looking for cannot be found.
                </div>
            </div>
        </div>
    )
}