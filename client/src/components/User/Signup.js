import React, { useState } from 'react';
import { 
    Avatar,
    Button,
    TextField,
    Link, 
    Grid,
    Typography,
    Container 
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { signup, validateRecaptcha } from '../../auth'
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

export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = useState({
      username: '',
      email: '',
      password: '',
      error: '',
      success: false,
      recaptcha: false
  })
  const { username, email, password, error, success, recaptcha } = values

  const handleChange = name => e => {
      setValues({ ...values, error: false, [name]: e.target.value })
  }

  const handleCaptcha = value => {
    validateRecaptcha(value).then(res => {
      setValues({ ...values, recaptcha: res.data.success })
    }).catch(error => {
      setValues({ ...values, recaptcha: false, error: error })
    })
  }

  const handleSubmit = e => {
      e.preventDefault()
      setValues({ ...values, error: false })
      console.log(recaptcha)
      if(recaptcha) {
        signup({ username, email, password }).then(res => {
            setValues({ ...values, username: '', email: '', password: '', error: '', success: true })
        }).catch(error => {
            setValues({ ...values, error: error.response.data.error, success: false })
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
    <Alert severity="success" style={{ display: success ? '' : 'none' }}>
        Success! User created. Please <Link href="/signin" variant="body2" >Sign In</Link>
    </Alert>
  )

  const signUpForm = () => (
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
          label="Email"
          autoComplete="email"
          onChange={handleChange("email")}
          value={email}
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
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link href="/signin" variant="body2">
              {"Already have an account? Sign In"}
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
            Sign Up
        </Typography>
        {signUpForm()}
        <ReCAPTCHA sitekey="6LdnsUUaAAAAAIKnh5KN2YjooZQnU-bh2G4kUO_s" onChange={handleCaptcha} />
    </div>
    </Container>
  );
}
