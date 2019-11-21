import React, { useState } from 'react'
import {A, usePath} from 'hookrouter' 
import 'assets/css/theme.css'
import {FONTS_HEAD, FONTS_MAIN} from 'App'
import './Navigation.css'
import { Loading } from 'components/Loading'
import { usePageLoadingContext } from 'context'
import IGMCAvatar from 'assets/images/IGMC.png'
import { AppBar, Toolbar, IconButton, Icon, Typography, Drawer, List, ListSubheader, ListItem, ListItemText, Divider, Collapse, makeStyles, LinearProgress, ListItemAvatar, Avatar } from '@material-ui/core'

const ustyles = makeStyles(theme => ({
    root:{
        width: 240
    },
    loaderStyles: {
        height: 2
    },
    dummyLoader: {
        height: 2,
        width: '100%',
        background: theme.palette.primary.main
    },
    listItem: {
        '&:hover': {
            color: theme.palette.secondary.main
        }
    },
    listItemText: {
        fontFamily: FONTS_HEAD,
    },
    nestedItem: {
        paddingLeft: theme.spacing(4)
    }
}))

const paths = {
    '/home': "Home",
    '/notifications': "Notifications",
    '/gallery': 'Gallery',
    '/about': "About IGMC",
    '/complaints': "Complaints",
    '/papers': "Papers"
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
    const [collapseOpen, setCollapseOpen] = useState(false)
    const path = usePath() 
    const {loading} = usePageLoadingContext()
    const styles = ustyles()

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <header>
        <AppBar position="fixed">
            {loading ? <LinearProgress className={styles.loaderStyles} color="secondary" />: <div className={styles.dummyLoader}></div>}
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                    <Icon>
                        menu
                    </Icon>
                </IconButton>
                <Typography variant="h6" className="font-head" style={{paddingLeft: "8px"}}>{getPath(path)}</Typography>
            </Toolbar> 
        </AppBar>
        <Drawer open={open} onClose={() => setOpen(false)}>
            <div className={styles.root} role="presentation">
            <List component="nav" aria-labelledby="menu" subheader={
                <ListItem>
                        <ListItemAvatar>
                            <Avatar src={IGMCAvatar} style={{display: 'inline-block'}} /> 
                        </ListItemAvatar>
                        <ListItemText 
                        disableTypography
                        primary={<Typography className={styles.listItemText}>Menu</Typography>} />
                </ListItem>
            }>
                <Divider />
                {([
                    'Home',
                    'Gallery',
                    'Notifications',
                    'Complaints',
                    'Papers'
                ]).map((item, index) => {
                    return (
                        <ListItem button key={index} className={styles.listItem} component={A} href={`/${item.toLowerCase()}`}>
                            <ListItemText 
                                disableTypography 
                                primary={
                                    <Typography className={styles.listItemText}>{item}</Typography>
                                }/>
                        </ListItem>
                    )
                })}
                <ListItem className={styles.listItem} button onClick={() => setCollapseOpen(!collapseOpen)}>
                    <ListItemText 
                        disableTypography 
                        primary={
                            <Typography className={styles.listItemText}>Clubs</Typography>
                        }/>
                    <Icon>
                        {
                            collapseOpen ? 
                            'expand_less':
                            'expand_more'          
                        }
                    </Icon>
                </ListItem>
                <Collapse in={collapseOpen} timeout={'auto'}>
                    <List component="div" disablePadding>
                    {([
                        // 'Enigma',
                        'ISIS',
                        'Memers',
                        'Arts'
                    ]).map((item, index) => {
                        return (
                            <ListItem className={`${styles.listItem} ${styles.nestedItem}`} button key={index} component={A} href={`/clubs/${item.toLowerCase()}`}>
                                <ListItemText 
                                    disableTypography 
                                    primary={
                                        <Typography className={styles.listItemText}>{item}</Typography>
                                    }/>
                            </ListItem>
                        )
                    })}
                    </List>
                </Collapse>
                <ListItem button component={A} href={`/about`} className={styles.listItem}>
                    <ListItemText
                        disableTypography 
                        primary={
                            <Typography className={styles.listItemText}>About Us</Typography>
                        }/>
                </ListItem>
            </List>
            </div>
        </Drawer>
        </header>
    )
}