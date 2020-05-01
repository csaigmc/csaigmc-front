import React, { useState } from 'react'
import {A, usePath} from 'hookrouter' 
import 'assets/css/theme.css'
import {FONTS_HEAD, FONTS_MAIN} from 'App'
import './Navigation.css'
import { Loading } from 'components/Loading'
import { usePageLoadingContext } from 'context'
import IGMCAvatar from 'assets/images/IGMC.png'
import { AppBar, Toolbar, IconButton, Icon, Typography, Drawer, List, ListSubheader, ListItem, ListItemText, Divider, Collapse, makeStyles, LinearProgress, ListItemAvatar, Avatar } from '@material-ui/core'
import Popover from '@material-ui/core/Popover';
import {Grid} from '@material-ui/core'
import {availableColors} from 'cconstants'

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
    },
    toolbar: {
        boxShadow: theme.shadows[1]
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

const SettingsStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(1),
        fontWeight: "bold",
        borderBottom: `1px solid ${theme.palette.primary.dark}`
    },
    itemTitle: {
        padding: theme.spacing(1),
        fontFamily: FONTS_HEAD,
        fontWeight: "bold"
    },
    selectableText: {
        fontFamily: FONTS_HEAD,
        background: "transparent",
        padding: theme.spacing(1),
        borderRadius: "1px",
        border: 'none',
        cursor: "pointer",
        '&:hover': {
            background: theme.palette.secondary.dark
        },
        color: theme.textColor.main
    },
    seletectedText: {
        background: theme.palette.secondary.dark
    },
    selectableColor: {
        padding: "10px",
        border: 'none',
        cursor: "pointer"
    },
    selectedColor: {
        padding: "12px"
    }
}))

const SettingsDialog = ({id, open, anchorEl, handleClose, currentSettings, onChangeSettings}) => {

    const classes = SettingsStyles()

    return <Popover 
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => handleClose()}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "left"
        }}
        transformOrigin={{
            vertical:"bottom",
            horizontal: "left"
        }}
    >
        <Grid container>
            <Grid item xs={12}>
                <Typography className={classes.title} variant="h6">Settings</Typography>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Typography className={classes.itemTitle} variant="subtitle1">Type</Typography>
                </Grid>
                <Grid item xs={9} style={{textAlign: "right"}}>
                    <Typography className={`${classes.selectableText} ${currentSettings.type == 'light' ? classes.seletectedText: ""} `} variant="subtitle1" component='button'  onClick={() => onChangeSettings("type", "light")}>Light</Typography>
                    <Typography className={`${classes.selectableText} ${currentSettings.type == 'dark' ? classes.seletectedText: ""} `} variant="subtitle1" component='button' onClick={() => onChangeSettings("type", "dark")}>Dark</Typography> 
                </Grid>
            </Grid>
            <Grid item container xs={12}>
                <Grid item xs={3}>
                    <Typography className={classes.itemTitle} variant="subtitle1">Color</Typography>
                </Grid>
                <Grid item xs={9} style={{textAlign: "right", alignContent: "Center", display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
                    {
                        Object.keys(availableColors).map((item, index) => {
                            let clr = availableColors[item]
                            return (
                                <Typography className={`${classes.selectableColor} ${item == currentSettings.color ? classes.selectedColor : 
                            ""}`} style={{backgroundColor: clr[500]}} variant="subtitle1" component='button'  onClick={() => onChangeSettings("color", item)}> </Typography>            
                            )
                        })
                    }
                </Grid>
            </Grid>

        </Grid>
    </Popover>

}

export const Navigation = ({currentSettings, onChangeSettings}) => {

    const [open, setOpen] = useState(false)
    const [collapseOpen, setCollapseOpen] = useState(false)
    const path = usePath() 
    const {loading} = usePageLoadingContext()
    const styles = ustyles()
    const [anchorEl, setAnchorEl] = useState(null)
    const [settingsPopperOpen, setSettingsPopperState] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <header>
        <AppBar position="fixed" className={styles.toolbar}>
            {loading ? <LinearProgress className={styles.loaderStyles} color="secondary" />: <div className={styles.dummyLoader}></div>}
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpen(true)}>
                    <Icon>
                        menu
                    </Icon>
                </IconButton>
                <Typography variant="h6" className="font-head" style={{paddingLeft: "8px", flexGrow: "1"}}>{getPath(path)}</Typography>
                <IconButton color="inherit" onClick={(e) => {
                    setAnchorEl(e.target)
                    setSettingsPopperState(!settingsPopperOpen)
                }}>
                    <Icon>
                        settings
                    </Icon>
                </IconButton>
                <SettingsDialog
                    id={settingsPopperOpen ? "settingsPopper" : undefined} 
                    open={settingsPopperOpen}
                    anchorEl={anchorEl}
                    handleClose={() => {
                        setSettingsPopperState(false)
                        setAnchorEl(null)
                    }}
                    currentSettings={currentSettings}
                    onChangeSettings={(k, v) => {
                        console.log("Called OnChangeSettings from Navigation with values " + k + " " + v)
                        onChangeSettings(k, v)
                    }} />
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
                        <ListItem button key={index} className={styles.listItem} component={A} href={`/${item.toLowerCase().split(" ").join("")}`}>
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