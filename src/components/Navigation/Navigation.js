import React, { useState } from 'react'
import {A, usePath} from 'hookrouter' 
import 'assets/css/theme.css'
import {FONTS_HEAD, FONTS_MAIN} from 'App'
import './Navigation.css'
import { usePageLoadingContext } from 'context'
import IGMCAvatar from 'assets/images/IGMC.png'
import { AppBar, Toolbar, IconButton, Icon, Typography, Drawer, List, ListSubheader, ListItem, ListItemText, Divider, Collapse, makeStyles, LinearProgress, ListItemAvatar, Avatar } from '@material-ui/core'

const ustyles = makeStyles(theme => ({
    root:{
        width: 240
    },
    loaderStyles: {
        height: 1.2
    },
    dummyLoader: {
        height: 1.2,
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
        textTransform: "uppercase",
        fontSize: "12px",
        fontWeight: "500"
    },
    nestedItem: {
        paddingLeft: theme.spacing(4)
    },
    toolbar: {
        boxShadow: theme.shadows[0],
        borderBottom: `1px solid ${theme.palette.grey[200]}5f`
    },
    titlePath: {
        fontSize: "1rem",
        fontWeight: "500",
        textTransform: "uppercase",
        marginLeft: "1rem"
    },
    iconContainer: {
        padding: "10px 12px"
    },
    fIcon: {
        fontSize: '16px',
    }
}))

const paths = {
    '/home': "Home",
    '/notifications': "Notifications",
    '/gallery': 'Gallery',
    '/about': "About IGMC",
    '/complaints': "Complaints",
    '/papers&books': "Papers & Books",
    '/addstudent': "Add Student"
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

export const Navigation = ({currentSettings, onChangeSettings}) => {

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
        <AppBar position="fixed" className={styles.toolbar}>
            {loading ? <LinearProgress className={styles.loaderStyles} color="secondary" />: <div className={styles.dummyLoader}></div>}
            <Toolbar>
                <IconButton className={styles.iconContainer} edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                    <i className={`${styles.fIcon} fas fa-bars`}></i>
                </IconButton>
                <Typography variant="h6" className={styles.titlePath}>{getPath(path)}</Typography>
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
                    'Papers & Books',
                    'Add Student'
                ]).map((item, index) => {
                    return (
                        <ListItem button onClick={() => handleClose()} key={index} className={styles.listItem} component={A} href={`/${item.toLowerCase().split(" ").join("")}`}>
                            <ListItemText 
                                disableTypography 
                                primary={
                                    <Typography variant="subtitle1" className={styles.listItemText}>{item}</Typography>
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
                            <ListItem className={`${styles.listItem} ${styles.nestedItem}`} button onClick={() => handleClose()} key={index} component={A} href={`/clubs/${item.toLowerCase()}`}>
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