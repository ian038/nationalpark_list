import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import { 
    Avatar,
    Button,
    TextField,
    Link, 
    Grid,
    Typography,
    Container,
    CircularProgress 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { isAuthenticated, signin, authenticate, validateRecaptcha } from '../../auth'
import ReCAPTCHA from "react-google-recaptcha" 

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [values, setValues] = useState({
      username: '',
      password: '',
      error: '',
      loading: false,
      redirectToReferer: false,
      recaptcha: false
  })
  const { username, password, error, loading, redirectToReferer, recaptcha } = values

  const handleChange = name => e => {
      setValues({ ...values, error: false, [name]: e.target.value })
  }

  const handleCaptcha = value => {
    validateRecaptcha(value).then(res => {
      setValues({ ...values, recaptcha: res.data.success })
    }).catch(error => {
      console.log(error.response)
      // setValues({ ...values, recaptcha: false, error: error })
    })
  }

  const handleSubmit = e => {
      e.preventDefault()
      setValues({ ...values, error: false, loading: true })
      if(recaptcha) {
        signin({ username, password }).then(res => {
          authenticate(res, () => {
            setValues({ ...values, redirectToReferer: true })
           })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error, loading: false })
        })
      } else {
        setValues({ ...values, error: 'Please validate recaptcha' })
      }
  }

  const showError = () => (
      <Alert severity="error" style={{ display: error ? '' : 'none' }}>
          {error}
      </Alert>
  )

  const showLoading = () => (
      <CircularProgress style={{ display: loading ? '' : 'none'}} />
  )

  const redirectUser = () => {
      if(redirectToReferer) {
          if(isAuthenticated()) {
              return <Redirect to='/' />
          }
      }
  }

  const signInForm = () => (
      <form className={classes.form} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Username"
          type="text"
          autoComplete="username"
          onChange={handleChange("username")}
          value={username}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={handleChange("password")}
          value={password}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
  )

  return (
    <Container maxWidth="xs">
    <div className={classes.paper}>
        {showError()}
        {showLoading()}
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign In
        </Typography>
        {signInForm()}
        {redirectUser()}
        <ReCAPTCHA sitekey="6LdnsUUaAAAAAIKnh5KN2YjooZQnU-bh2G4kUO_s" onChange={handleCaptcha} />
    </div>
    </Container>
  );
}
