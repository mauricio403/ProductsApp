import * as yup from 'yup';


export const validationSchemaLogin = yup.object({
    email: yup
      .string()
      .email('Ingresa un email válido')
      .required('Email es requerido'),
    password: yup
      .string()
      .min(8, 'Password debe tener al menos 8 caracteres')
      .required('Password es requerido'),
  });
