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
import { useDispatch, useSelector } from 'react-redux';
import { startLogin, startRegister } from '../redux/auth/LoginThunks';
import { AppDispatch, RootState } from '../redux/store';
import { validationSchemaRegister } from '../validations/RegisterFormValidation';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css'



const theme = createTheme();



export const RegisterPage = () => {

  const dispatch = useDispatch();

  const { status, msg } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if ( msg !== '' ) {
      Swal.fire('Error en la creación', msg, 'error');
    }    
  }, [msg])

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const registerForm = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchemaRegister,
    onSubmit: values => {
      dispatch(startRegister(nombre, email, password) as any)
    }
  });

  const { email, password, nombre } = registerForm.values;


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
              Nueva Cuenta
            </Typography>
            {/* aqui va en onsubmit */}
            <Box component="form" onSubmit={registerForm.handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    name="nombre"
                    required
                    fullWidth
                    id="nombre"
                    label="Nombres"
                    value={registerForm.values.nombre}
                    onChange={registerForm.handleChange}
                    error={registerForm.touched.nombre && Boolean(registerForm.errors.nombre)}
                    helperText={registerForm.touched.nombre && registerForm.errors.nombre}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={registerForm.values.email}
                    onChange={registerForm.handleChange}
                    error={registerForm.touched.email && Boolean(registerForm.errors.email)}
                    helperText={registerForm.touched.email && registerForm.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={registerForm.values.password}
                    onChange={registerForm.handleChange}
                    error={registerForm.touched.password && Boolean(registerForm.errors.password)}
                    helperText={registerForm.touched.password && registerForm.errors.password}
                  />
                </Grid>

              </Grid>
              <LoadingButton
                type="submit"
                loading={isAuthenticating}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registrarme!
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link component={RouterLink} variant="body2" to='/'>
                    Ya tienes una cuenta? Ingresa
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
