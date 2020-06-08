import React, { useState, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthenticated, signout } from '../../auth'


import clsx from 'clsx';
import { 
  Button,
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
  button: {
    margin: theme.spacing(1, 1.5)
  }
}))

function Dashboard({ history }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawer = () => {
    open ? setOpen(false) : setOpen(true)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ background: '#1c92d2' }}
      >
        <Toolbar className={classes.toolbar}>
          {isAuthenticated() ? 
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />
          </IconButton>
          : ''
          }
          <Typography variant="h6" className={classes.title}>
            National Parks List
          </Typography>
          <nav>
            {isAuthenticated() ? 
            <Fragment>
              <Button variant="contained" href="/search" className={classes.button}>
                Search Parks
              </Button>
              <Button variant="contained" color="secondary" className={classes.button} onClick={() => signout(() => { history.push('/') })}>
                Sign Out
              </Button>
            </Fragment>
              :
            <Fragment>
              <Button variant="contained" href="/signup" className={classes.button}>
                Sign Up
              </Button>
              <Button variant="contained" href="/signin" className={classes.button}>
                Sign In
              </Button>
            </Fragment>
            }
          </nav>
        </Toolbar>
      </AppBar>
      {isAuthenticated() ? 
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
      : ''
      }
    </div>
  );
}

export default withRouter(Dashboard)