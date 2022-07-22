import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import { Link as RouterLink } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { Copyright } from '../components/Copyright';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../redux/auth/LoginThunks';
import { AppDispatch, RootState } from '../redux/store';
import SaveIcon from '@mui/icons-material/Save';
import { validationSchemaLogin } from '../validations/LoginFormvalidation';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'


const theme = createTheme();



export const LoginPage = () => {

  const dispatch = useDispatch();

  const {status, msg} = useSelector((state:RootState) => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  useEffect(() => {
    if ( msg !== '' ) {
      Swal.fire('Error en la autenticación', msg, 'error');
    }    
  }, [msg])

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchemaLogin,
    onSubmit: values => {
      dispatch(startLogin(email, password) as any)
    }
  });

  const { email, password } = loginForm.values;


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <InventoryOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Productos App
            </Typography>
            {/* aqui va en onsubmit */}
            <Box component="form" onSubmit={loginForm.handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={loginForm.values.email}
                onChange={loginForm.handleChange}
                error={loginForm.touched.email && Boolean(loginForm.errors.email)}
                helperText={loginForm.touched.email && loginForm.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={loginForm.values.password}
                onChange={loginForm.handleChange}
                error={loginForm.touched.password && Boolean(loginForm.errors.password)}
                helperText={loginForm.touched.password && loginForm.errors.password}
              />

              <LoadingButton
                type="submit"
                fullWidth
                loading={isAuthenticating}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loadingPosition="start"
              >
                Ingresar
              </LoadingButton>
              <Grid container>

                <Grid item>
                  <Link component={RouterLink} variant="body2" to='/register'>
                    {"No tienes cuenta? Registrate"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
