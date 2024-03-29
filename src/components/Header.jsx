import React, { useState, useContext } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Menu,
  MenuItem
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'wouter'
import Context from '../context/appContext'
import { AccountCircle, DesktopMacOutlined, AssignmentTwoTone, MenuOpen, Assessment, Business } from '@material-ui/icons'
const { VITE_APP: appUrl } = import.meta.env

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360
  },
  title: {
    color: '#343434'
  },
  itemsText: {
    color: '#979393'
  },
  appBar: {
    backgroundColor: '#1d3557'
  },
  link: {
    textDecoration: 'none'
  }
}))

const PageMenu = ({ onClose }) => {
  const classes = useStyles()
  const { isAdmin } = useContext(Context)

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <ListItem>
            <ListItemText primary="KPI Network" className={classes.title} />
        </ListItem>
        <Divider />
        <Link href='/' onClick={onClose}>
          <ListItem button>
              <ListItemIcon>
                  <DesktopMacOutlined />
              </ListItemIcon>
              <ListItemText primary="Universe Overview" className={classes.itemsText} />
          </ListItem>
        </Link>
        <Link href='/company-report' onClick={onClose}>
          <ListItem button>
              <ListItemIcon>
                <AssignmentTwoTone />
              </ListItemIcon>
              <ListItemText primary="Company report vs peers" className={classes.itemsText}/>
          </ListItem>
        </Link>
        {isAdmin && <Link href='/admin/users' onClick={onClose}>
          <ListItem button>
              <ListItemIcon>
                <Assessment/>
              </ListItemIcon>
              <ListItemText primary="Admin Panel" className={classes.itemsText}/>
          </ListItem>
        </Link> }
        <a href={appUrl} className={classes.link} onClick={onClose}>
          <ListItem button>
              <ListItemIcon>
                <Business/>
              </ListItemIcon>
              <ListItemText primary="About us" className={classes.itemsText}/>
          </ListItem>
        </a>
      </List>
    </div>
  )
}

const ProfileMenu = ({ signOut, visible, onProfileClose }) => {
  const onSignOut = () => {
    localStorage.clear()
    signOut()
  }

  return (
    <Menu
        id="menu-appbar"
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(visible)}
        anchorEl={visible}
        onClose={onProfileClose}
    >
      <MenuItem onClick={() => onSignOut()}>Sign Out</MenuItem>
    </Menu>
  )
}

export const Header = (props) => {
  const [menuVisible, setMenuVisibility] = useState(false)
  const [profileVisible, setProfileVisibility] = useState(false)
  const classes = useStyles()

  const toggleDrawer = (visibility) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setMenuVisibility(visibility)
  }

  const toggleProfile = (visibility) => (event) => {
    setProfileVisibility(event.currentTarget)
  }

  const onProfileClose = () => {
    setProfileVisibility(null)
  }

  return (
    <>
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              className={props.classes.menuButton}
              color="inherit"
              aria-label="menu">
              <MenuOpen />
            </IconButton>
            <Typography
              variant="h6"
              className={props.classes.title}>
              KPI Network
            </Typography>
            <IconButton
              onClick={toggleProfile(true)}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit">
              <AccountCircle />
            </IconButton>
            <ProfileMenu
              signOut={props.signOut}
              visible={profileVisible}
              onProfileClose={onProfileClose}
            />
            </Toolbar>
        </AppBar>
        {menuVisible
          ? <Drawer
              anchor="left"
              open={menuVisible}
              onClose={toggleDrawer(false)}>
            <PageMenu onClose={toggleDrawer(false)}/>
            </Drawer>
          : null}
    </>
  )
}
