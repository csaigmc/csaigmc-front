import React, { useState } from 'react'
import {A, usePath} from 'hookrouter' 
import 'assets/css/theme.css'
import './Navigation.css'
import { Loading } from 'components/Loading'
import { usePageLoadingContext } from 'context'

const paths = {
    '/home': "Home",
    '/notifications': "Notifications",
    '/gallery': 'Gallery',
    '/aboutus': "About Us"
}

const MenuItem = ({text, link}) => {
    return <A href={link} className="col-12 small font-head decoration-none py-3 text-light bg-primary-main-hover">{text}</A>
}

const getPath = (path) => {
    console.log(path)
    if(paths[path]){
        return paths[path]
    } else if(path.startsWith('/clubs')) {
        return "Clubs"
    } else {
        return 'NotFound'
    }
}

export const Navigation = () => {

    const [open, setOpen] = useState(false)
    const path = usePath() 
    const {loading} = usePageLoadingContext()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <header className="w-100 px-0 position-fixed bg-primary-main" style={{position: "fixed", top: 0, left: 0}} >
        <Loading show={loading}/>
        <div className="px-3">
            <button className="navigation-button p-2" onClick={() => setOpen(true)}><i className="material-icons text-secondary-main text-secondary-light-hover">menu</i></button>
            <div className="d-inline-block pt-2 pl-2 font-weight-bold" style={{letterSpacing: "0.1px"}}>{getPath(path)}</div>
        </div>
        <nav className={`${open ? "" : "d-none"} h-100 w-100 position-fixed drawer`}>
        <div className="container-fluid h-100">
            <div className="row h-100">
            <div className="h-100 px-0 bg-primary-light col-8 col-md-3">
                 <div className="divider pl-2">
                    <button className="navigation-button p-3" onClick={handleClose}><i className="material-icons text-secondary-main text-secondary-light-hover">close</i></button>
                    <div className="d-inline-block font-head pl-2 py-3">Menu</div>
                 </div>
                 <div className="container-fluid">
                    <div className="row">
                        <MenuItem text="Home" link="/home"/>
                        <MenuItem text="Notifications" link="/notifications"/>
                        <MenuItem text="Clubs" link="/clubs"/>
                        <MenuItem text="Gallery" link="/gallery"/>
                        <MenuItem text="About Us" link="/aboutus"/>
                    </div>
                 </div>
            </div>
            <div className="w-75 h-100 col-4 col-md-9" onClick={handleClose} />
            </div>
        </div>
        </nav>
        </header>
    )
}