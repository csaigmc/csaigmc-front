import React from 'react'
import { makeStyles } from '@material-ui/core'

const itemStyles = makeStyles(t => ({
    item: {
        height: "3rem",
        background: `${t.palette.primary.dark}8f`,
        borderRadius: "8px",
        marginTop: "8px",
        marginBottom: "8px"
    },
    width100: {
        width: "100%"
    },
    width50: {
        width: "100%"
    }
}))

const Item = () => {

    const c = itemStyles()

    return (
        <div className={`${c.item} ${c.width100}`}></div>
    )
}

export const NotifLoader = () => {

    return (
        <div>
            <Item />
            <Item />
            <Item />
        </div>
    )
}