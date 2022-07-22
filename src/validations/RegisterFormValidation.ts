import * as yup from 'yup';


export const validationSchemaRegister = yup.object({

    nombre: yup.string()
        .required('El nombre es requerido'),
    email: yup
      .string()
      .email('Ingresa un email válido')
      .required('Email es requerido'),
    password: yup
      .string()
      .min(8, 'Password debe tener al menos 8 caracteres')
      .required('Password es requerido'),
  });
