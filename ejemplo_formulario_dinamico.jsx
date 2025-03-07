import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

/**
 * Componente de formulario reutilizable con Material UI
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.fields - Array de objetos que representan los campos del formulario
 * @param {Function} props.onSubmit - Función que se ejecuta al enviar el formulario
 * @param {string} props.submitButtonText - Texto del botón de envío
 * @param {string} props.cancelButtonText - Texto del botón de cancelar
 * @param {Function} props.onCancel - Función que se ejecuta al cancelar
 * @param {Object} props.initialValues - Valores iniciales del formulario
 * @param {Object} props.errors - Errores de validación del formulario
 * @param {boolean} props.loading - Estado de carga del formulario
 */
const GenericForm = ({
  fields = [],
  onSubmit,
  submitButtonText = 'Guardar',
  cancelButtonText = 'Cancelar',
  onCancel,
  initialValues = {},
  errors = {},
  loading = false,
}) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (fieldId, value) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [fieldId]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formValues);
    }
  };

  // Renderiza un campo basado en su tipo
  const renderField = (field) => {
    const {
      id,
      type = 'text',
      label,
      required = false,
      disabled = false,
      options = [],
      helperText = '',
      fullWidth = true,
      placeholder = '',
      multiline = false,
      rows = 4,
      min,
      max,
      step,
    } = field;

    const error = errors[id] ? true : false;
    const errorMessage = errors[id] || '';
    const value = formValues[id] !== undefined ? formValues[id] : '';

    switch (type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
      case 'tel':
      case 'url':
        return (
          <TextField
            id={id}
            name={id}
            label={label}
            type={type}
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            required={required}
            disabled={disabled}
            error={error}
            helperText={error ? errorMessage : helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
            variant="outlined"
            multiline={multiline}
            rows={multiline ? rows : undefined}
            InputProps={{
              inputProps: {
                min: min,
                max: max,
                step: step,
              },
            }}
          />
        );

      case 'select':
        return (
          <FormControl
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            error={error}
          >
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
              labelId={`${id}-label`}
              id={id}
              name={id}
              value={value}
              onChange={(e) => handleChange(id, e.target.value)}
              label={label}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {(error || helperText) && (
              <FormHelperText>{error ? errorMessage : helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl component="fieldset" required={required} disabled={disabled} error={error}>
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup
              name={id}
              value={value}
              onChange={(e) => handleChange(id, e.target.value)}
            >
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {(error || helperText) && (
              <FormHelperText>{error ? errorMessage : helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'checkbox':
        return (
          <FormControl component="fieldset" required={required} disabled={disabled} error={error}>
            <FormLabel component="legend">{label}</FormLabel>
            <FormGroup>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={
                        Array.isArray(value) ? value.includes(option.value) : value === option.value
                      }
                      onChange={(e) => {
                        if (Array.isArray(value)) {
                          const newValue = e.target.checked
                            ? [...value, option.value]
                            : value.filter((val) => val !== option.value);
                          handleChange(id, newValue);
                        } else {
                          handleChange(id, e.target.checked);
                        }
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            {(error || helperText) && (
              <FormHelperText>{error ? errorMessage : helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'switch':
        return (
          <FormControl component="fieldset" required={required} disabled={disabled} error={error}>
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(value)}
                  onChange={(e) => handleChange(id, e.target.checked)}
                />
              }
              label={label}
            />
            {(error || helperText) && (
              <FormHelperText>{error ? errorMessage : helperText}</FormHelperText>
            )}
          </FormControl>
        );

      case 'date':
        return (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label={label}
              value={value || null}
              onChange={(newValue) => handleChange(id, newValue)}
              slotProps={{
                textField: {
                  required,
                  disabled,
                  error,
                  helperText: error ? errorMessage : helperText,
                  fullWidth,
                  variant: 'outlined',
                },
              }}
            />
          </LocalizationProvider>
        );

      case 'textarea':
        return (
          <TextField
            id={id}
            name={id}
            label={label}
            value={value}
            onChange={(e) => handleChange(id, e.target.value)}
            required={required}
            disabled={disabled}
            error={error}
            helperText={error ? errorMessage : helperText}
            fullWidth={fullWidth}
            placeholder={placeholder}
            variant="outlined"
            multiline
            rows={rows}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <Stack spacing={3}>
        {fields.map((field) => (
          <Box key={field.id}>{renderField(field)}</Box>
        ))}

        <Stack direction="row" spacing={2} justifyContent="flex-end">
          {onCancel && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              {cancelButtonText}
            </Button>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Procesando...' : submitButtonText}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default GenericForm;

/*LO QUE USE PRIMERO XD-----*/
/*
<TextField
            autoFocus
            required={field.required}
            margin="dense"
            id={field.id}
            name={field.name}
            label={field.label}
            type={field.type}
            disabled={field.disabled}
            defaultValue={field.valorDefault}
            fullWidth
            variant="standard"
            key={index}
          />
*/