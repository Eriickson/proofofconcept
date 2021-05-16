import React, { Component } from 'react';
import Moment from 'moment';
import countryCodes from 'country-codes-list';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Stack, IStackProps } from 'office-ui-fabric-react/lib/Stack';
import { DatePicker, DayOfWeek, IDatePickerStrings } from 'office-ui-fabric-react';
import { ComboBox } from 'office-ui-fabric-react/lib/index';



//TODO: Reeditar componente

const DayPickerStrings = {
  months: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  shortDays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  goToToday: 'Ir a hoy',
  prevMonthAriaLabel: 'Ir al mes anterior',
  nextMonthAriaLabel: 'Ir al siguiente mes',
  prevYearAriaLabel: 'Ir al año anterior',
  nextYearAriaLabel: 'Ir al año siguiente',
  closeButtonAriaLabel: 'Cerrar selector de fecha',
  monthPickerHeaderAriaLabel: '{0}, selecciona para cambiar el año',
  yearPickerHeaderAriaLabel: '{0}, selciona para cambiar el mes',
  isRequiredErrorMessage: 'La fecha de nacimiento es obligatoria.',
  invalidInputErrorMessage: 'Formato de fecha no válido.',
};

const stackTokens = { childrenGap: 50 };
const columnProps = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: 432 } },
};

const countries = countryCodes.customList('countryCode', '{countryNameLocal} (+{countryCallingCode})');
const countryOptions = Object.keys(countries).map(function(key) { return {'key': key, 'text': countries[key]}});

const onFormatDate = (date) => {
  return !date ? '' : Moment(date).format('DD/MM/YYYY');
};

const regExp = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

class PersonForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      second_last_name: '',
      birthday: '',
      email: props.email,
      country_code: 'ES',
      phone: '',
      isError: {
        first_name: '',
        last_name: '',
        second_last_name: '',
        birthday: '',
        email: '',
        country_code: '',
        phone: ''
      }
    }
  }

  onParseDateFromString = (value) => {
    const date = this.state.birthday || new Date();
    const values = (value || '').trim().split('/');
    const day = value.length > 0 ? Math.max(1, Math.min(31, parseInt(values[0], 10))) : date.getDate();
    const month = value.length > 1 ? Math.max(1, Math.min(12, parseInt(values[1], 10))) - 1 : date.getMonth();
    let year = value.length > 2 ? parseInt(values[2], 10) : date.getFullYear();
    if (year < 100) {
      year += date.getFullYear() - (date.getFullYear() % 100);
    }
    return new Date(year, month, day);
  };

  formDateChange = value => {
    if (value === null) return;
    this.setState(prevState => ({
      ...prevState,
      birthday: value
    }));
    this.validateForm('birthday', value);
  };

  formValChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let isError = { ...this.state.isError };

    switch (name) {
      case "first_name":
      case "last_name":
      case "second_last_name":
        isError[name] = value.length < 4
          ? "Debe contener al menos 2 caracteres"
          : "";
        break;
      case "email":
        isError.email = regExp.test(value)
          ? ""
          : "Formato no válido";
        break;
      case "country_code":
        isError.country_code = value.length === 0
          ? "Debes seleccionar un prefijo"
          : "";
        break;
      case "phone":
        isError.phone = value.length < 9
          ? "Debe contener al menos 9 dígitos"
          : "";
        break;
      default:
        break;
    }

    this.setState({
      isError,
      [name]: value
    });

    this.validateForm(name, value);
  };

  validateForm = (name, value) => {
    let isError = { ...this.state.isError };
    var self = this;
    var invalidatedFields = Object.keys(isError).filter(function(field) {
      var fieldValue = self.state[field];
      if (field === name) {
        fieldValue = value;
      }
      return fieldValue === '' || isError[field] !== ''
    });

    this.props.setIsButtonDisabled(invalidatedFields.length);

    if (invalidatedFields.length === 0) {
      this.props.setPerson({
        first_name: name === 'first_name' ? value : this.state.first_name,
        last_name: name === 'last_name' ? value : this.state.last_name,
        second_last_name: name === 'second_last_name' ? value : this.state.second_last_name,
        birthday: name === 'birthday' ? value : this.state.birthday,
        email: name === 'email' ? value : this.state.email,
        country_code: name === 'country_code' ? value : this.state.country_code,
        phone: name === 'phone' ? value : this.state.phone
      });
    }
  };

  render() {
    const { isError } = this.state;
    return (
      <form onSubmit={this.onSubmit} noValidate>
        <Stack tokens={stackTokens}>
          <Stack horizontal {...columnProps}>
            <Stack.Item grow>
              <TextField
                label="Nombre"
                required
                placeholder="Ingresa el nombre"
                name="first_name"
                onChange={this.formValChange}
                errorMessage={isError.first_name.length > 0 ? isError.first_name : undefined}
              />
            </Stack.Item>
            <Stack.Item grow>
              <TextField
                label="Primer Apellido"
                required
                placeholder="Ingresa el primer apellido"
                name="last_name"
                onChange={this.formValChange}
                errorMessage={isError.last_name.length > 0 ? isError.last_name : undefined}
              />
            </Stack.Item>
          </Stack>
          <Stack horizontal {...columnProps}>
            <Stack.Item grow>
              <TextField
                label="Segundo Apellido"
                required
                placeholder="Ingresa el segundo apellido"
                name="second_last_name"
                onChange={this.formValChange}
                errorMessage={isError.second_last_name.length > 0 ? isError.second_last_name : undefined}
              />
            </Stack.Item>
            <Stack.Item grow>
              <DatePicker
                placeholder="DD/MM/AAAA"
                label="Fecha de nacimiento"
                ariaLabel="La fecha de nacimiento es obligatoria"
                isRequired={true}
                allowTextInput={true}
                name="birthday"
                value={this.state.birthday}
                firstDayOfWeek={DayOfWeek.Monday}
                onSelectDate={this.formDateChange}
                formatDate={onFormatDate}
                parseDateFromString={this.onParseDateFromString}
                strings={DayPickerStrings}
                errorMessage={isError.birthday.length > 0 ? isError.birthday : undefined}
              />
            </Stack.Item>
          </Stack>
          <Stack {...columnProps}>
            <TextField
              label="Correo electrónico"
              required
              placeholder="Ingresa el correo electrónico"
              name="email"
              value={this.state.email}
              onChange={this.formValChange}
              errorMessage={isError.email.length > 0 ? isError.email : undefined}
            />
          </Stack>
          <Stack horizontal {...columnProps}>
            <Stack.Item>
              <ComboBox
                label="Prefijo (país)"
                required
                placeholder="Selecciona un prefijo"
                name="country_code"
                defaultSelectedKey="ES"
                options={countryOptions}
                onChange={this.formValChange}
                errorMessage={isError.country_code.length > 0 ? isError.country_code : undefined}
              />
            </Stack.Item>
            <Stack.Item grow={3}>
              <TextField
                label="Número teléfono móvil"
                required
                placeholder="Introduzca el teléfono móvil"
                name="phone"
                onChange={this.formValChange}
                errorMessage={isError.phone.length > 0 ? isError.phone : undefined}
              />
            </Stack.Item>
          </Stack>
        </Stack>
      </form>
    );
  }
};

export default PersonForm;
