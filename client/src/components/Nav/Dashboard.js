import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated } from '../../auth'

import clsx from 'clsx';
import { 
  Tabs, 
  Tab,
  Drawer,
  AppBar, 
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListItem,
  makeStyles, 
  useTheme
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  toolbar: {
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: '#fff',
    paddingTop: theme.spacing(1),
  },
  tabs: {
    flexGrow: 1,
    alignSelf: 'flex-end'
  }
}))

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const handleDrawer = () => {
    open ? setOpen(false) : setOpen(true)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className='appBar'
        style={{ background: '#1c92d2' }}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            National Parks List
          </Typography>
        </Toolbar>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <Tab label="Home" href="/"  />
          <Tab label="Sign Up" href="/signup"  />
          <Tab label="Sign In" href="/signin"  />
          <Tab label="Sign Out" href="/signout"  />
        </Tabs>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon><AccountCircleIcon /></ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
        </List>
        <List>
          <ListItem button>
            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
            <ListItemText primary='Sign Out' />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}
