import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import {
    Switch,
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
    TextField,
    Alert,
} from '@mui/material';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


// ✅ Validación de `config.fields` con `PropTypes`
Formulario.propTypes = {
    config: PropTypes.shape({
        titleButton: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        submitFunc: PropTypes.func.isRequired,
        initialValues: PropTypes.any,
        fields: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string.isRequired,
                label: PropTypes.string.isRequired,
                type: PropTypes.string.isRequired,
                required: PropTypes.bool,
                disabled: PropTypes.bool,
                id: PropTypes.string.isRequired,
                valorDefault: PropTypes.any,
                options: PropTypes.array,
                helperTxt: PropTypes.string,
                fullWidth: PropTypes.bool,
            })
        ),
    }).isRequired,
};


export default function Formulario({ open, setOpen, config }) {

    const [formValues, setFormValues] = useState(config.initialValues);
    const [errors, setErrors] = useState({});

    console.log("valor incial:", formValues)

    const handleClickOpen = () => {
        setOpen(true);
    };

    //Esta función detecta los cambios en los inputs y los guarda en arreglo, validar su uso luego.
    const handleChange = (fieldId, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [fieldId]: value,
        }));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const validateForm = () => {
        let newErrors = {};

        // config.fields.forEach((field) => {
        //     if (field.required && !formValues[field.name]) {
        //         newErrors[field.name] = "Este campo es obligatorio";
        //     }
        //     if (field.type === "email" && formValues[field.name]) {
        //         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //         if (!emailRegex.test(formValues[field.name])) {
        //             newErrors[field.name] = "El correo no es válido";
        //         }
        //     }
        // });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

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

        //Para utilizar value en lugar de default value, debo encontrar la forma en que lo sobrescriba cada vez que entre a renderizar
        //Ej: const value = formValues[id] !== undefined ? formValues[id] : '';
        const valorxd = formValues[field.name] !== undefined ? formValues[field.name] : '';
        console.log(valorxd);

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
                        margin= "dense"
                        name={field.name}
                        label={label}
                        type={type}
                        defaultValue={field.valorDefault}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={required}
                        disabled={disabled}
                        error={errors[field.name]}
                        helperText={errors[field.name] ? errors[field.name] : helperText}
                        fullWidth={fullWidth}
                        variant="outlined"
                        readOnly={false}
                        multiline={multiline}
                        rows={multiline ? rows : undefined}
                    />
                );

            case 'select':
                return (
                    <FormControl
                        fullWidth={fullWidth}
                        margin= "dense"
                        required={required}
                        disabled={disabled}
                        error={errors[field.name]}
                    >
                        <InputLabel id={`${field.name}-label`}>{label}</InputLabel>
                        <Select
                            labelId={`${field.name}-label`}
                            id={id}
                            name={field.name}
                            defaultValue={field.valorDefault}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            label={label}
                        >
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {(errors[field.name] || helperText) && (
                            <FormHelperText>{errors[field.name] ? errors[field.name] : helperText}</FormHelperText>
                        )}
                    </FormControl>
                );

            case 'radio':
                return (
                    <FormControl component="fieldset" required={required} disabled={disabled} error={errors[field.name]}>
                        <FormLabel component="legend">{label}</FormLabel>
                        <RadioGroup
                            name={field.name}
                            value={field.valorDefault}
                            onChange={(e) => handleChange(field.name, e.target.value)}
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
                        {(errors[field.name] || helperText) && (
                            <FormHelperText>{errors[field.name] ? errors[field.name] : helperText}</FormHelperText>
                        )}
                    </FormControl>
                );

            case 'checkbox':
                return (
                    <FormControl component="fieldset" required={required} disabled={disabled} error={errors[field.name]}>
                        <FormLabel component="legend">{label}</FormLabel>
                        <FormGroup>
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    control={
                                        <Checkbox
                                            checked={
                                                Array.isArray(field.valorDefault) ? value.includes(option.value) : field.valorDefault === option.value
                                            }
                                            onChange={(e) => {
                                                if (Array.isArray(field.valorDefault)) {
                                                    const newValue = e.target.checked
                                                        ? [...field.valorDefault, option.value]
                                                        : field.valorDefault.filter((val) => val !== option.value);
                                                    handleChange(field.name, newValue);
                                                } else {
                                                    handleChange(field.name, e.target.checked);
                                                }
                                            }}
                                        />
                                    }
                                    label={option.label}
                                />
                            ))}
                        </FormGroup>
                        {(errors[field.name] || helperText) && (
                            <FormHelperText>{errors[field.name] ? errors[field.name] : helperText}</FormHelperText>
                        )}
                    </FormControl>
                );

            case 'switch':
                return (
                    <FormControl component="fieldset" required={required} disabled={disabled} error={errors[field.name]}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={Boolean(field.valorDefault)}
                                    onChange={(e) => handleChange(field.name, e.target.checked)}
                                />
                            }
                            label={label}
                        />
                        {(errors[field.name] || helperText) && (
                            <FormHelperText>{errors[field.name] ? errors[field.name] : helperText}</FormHelperText>
                        )}
                    </FormControl>
                );

            case 'date':
                return (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label={label}
                            value={field.valorDefault || null}
                            onChange={(newValue) => handleChange(field.name, newValue)}
                            slotProps={{
                                textField: {
                                    required,
                                    disabled,
                                    error: errors[field.name],
                                    helperText: errors[field.name] ? errors[field.name] : helperText,
                                    fullWidth,
                                    variant: 'outlined',
                                    margin: "dense"
                                },
                            }}
                        />
                    </LocalizationProvider>
                );

            case 'textarea':
                return (
                    <TextField
                        id={id}
                        name={field.name}
                        label={label}
                        defaultValue={field.valorDefault}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        required={required}
                        disabled={disabled}
                        error={errors[field.name]}
                        helperText={errors[field.name] ? errors[field.name] : helperText}
                        fullWidth={fullWidth}
                        variant="outlined"
                        multiline
                        rows={rows}
                        margin= "dense"
                    />
                );

            default:
                return null;
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        if(validateForm()){
                            if (config.submitFunc) {
                                config.submitFunc(formJson);
                            }
                            handleClose();
                        }else{
                            alert("Se encontró 1 o más errores en el formulario, favor revisar.");
                        }
                    }
                },
            }}
        >
            <DialogTitle>{config.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {config.description}
                </DialogContentText>
                {config.fields?.map((field, index) => (
                    <React.Fragment key={field.name}>{renderField(field)}</React.Fragment>
                ))}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button type="submit">{config.titleButton}</Button>
            </DialogActions>
        </Dialog>

    );
}
