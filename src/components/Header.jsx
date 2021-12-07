import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/Inbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,      
    },
    title: {
        color: '#343434',
    },
    itemsText: {
        color: '#979393',
    },
    appBar: {
        backgroundColor: '#37bd5a',
    }
  }));

const Menu = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="main mailbox folders">
                <ListItem>
                    <ListItemText primary="KPI Network" className={classes.title} />
                </ListItem>
                <Divider />
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Universe Overview" className={classes.itemsText} />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Company report vs peers" className={classes.itemsText}/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Comparison versus peers" className={classes.itemsText}/>
                </ListItem>
            </List>
        </div>
    );
};

export const Header = (props) => {
    const [menuVisible, setMenuVisibility] = useState(false);
    const classes = useStyles();

    const toggleDrawer = (visibility) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setMenuVisibility(visibility);
    };

    return (
        <>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                <IconButton onClick={toggleDrawer(true)} edge="start" className={props.classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={props.classes.title}>
                    KPI Network
                </Typography>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                </Toolbar>
            </AppBar>
            {
                menuVisible ?
                <Drawer anchor="left" open={menuVisible} onClose={toggleDrawer(false)}>
                    <Menu/>
                </Drawer>
                : null
            }
        </>
    );
};
