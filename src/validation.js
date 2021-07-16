/* eslint-disable */
import { extend } from 'vee-validate';
import {
  required,
  numeric,
  between,
  oneOf,
  min_value,
  max_value,
  excluded,
  confirmed,
  min,
} from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'Este campo es obligatorio.',
});

extend('between', {
  ...between,
  message: 'El campo {_field_} debe estar entre {min} y {max}.',
});

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max;
  },

  params: ['min', 'max'],

  message: 'El campo {_field_} debe contener entre {min} y {max} caracteres.',
});

extend('numeric', {
  ...numeric,
  message: 'El campo {_field_} solo debe contener caracteres numéricos.',
});

extend('positive', {
  validate(value) {
    return value >= 0;
  },

  message: 'El campo {_field_} debe contener un número positivo.',
});

extend('min_date', {
  validate(value, min) {
    return new Date(value) >= new Date(min);
  },

  message: 'El campo {_field_} debe contener una fecha mayor o igual a la fecha de inicio.',
});

extend('correct_password', {
  validate(value, password) {
    return value == password;
  },

  message: `Contraseña incorrecta.`,
});

extend('oneOf', {
  ...oneOf,

  message:
    'El campo {_field_} solo puede contener uno de los valores definidos.',
});

extend('min_value', {
  ...min_value,

  message: 'El campo {_field_} debe contener un número mayor o igual a {min}',
});

extend('max_value', {
  ...max_value,

  message: 'El campo {_field_} debe contener un número menor o igual a {max}',
});

extend('min', {
  ...min,

  message: 'El campo {_field_} debe contener por lo menos {length} caracteres.',
});

extend('excluded', {
  ...excluded,

  message: 'Este valor ya fue utiizado.',
});

extend('confirmed', {
  ...confirmed,

  message: 'El campo {_field_} debe coincidir con el campo de confirmación.',
});
