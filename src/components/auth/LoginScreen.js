import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { Paper, TextField, Button, LinearProgress, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { useStyles } from '../../useMaterialStyles';
import { useForm } from '../../hooks/useForm';


const AUTH_LOGING = gql`
    mutation AuthAdminLogin( $email: String!, $password: String! ){
        authAdminLogin( email: $email, password: $password )
    }
`;

export const LoginScreen = () => {

    const styles = useStyles();
    const history = useHistory();

    const [ authLogin, { data } ] = useMutation(AUTH_LOGING, { ignoreResults: false });
    const [ loading, setLoading ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ emailError, setEmailError ] = useState( false );
    const [ passwordError, setPasswordError ] = useState( false );
    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const handleSubmitForm = () => {
        if( formValues.email !== '' && formValues.password !== '') {
            setLoading( true );
            authLogin({ variables: { email: formValues.email, password: formValues.password }})
        } else {
            if( formValues.email === '' ){
                setEmailError( true );
            }
            if( formValues.password === '' ){
                setPasswordError( true );
            }
        }
    }

    useEffect(()=>{ 
        if( data ){
            if( data.authAdminLogin === "correcto" ){
                history.push('/empleados')
            } else {
                setLoading( false )
                setError(true)
            }
        }
    },[data])

    useEffect( () => {
        if( emailError ){
            setEmailError( false );
        }
        if( passwordError ){
            setPasswordError( false );
        }
    },[formValues])

    return (
        <div>
            <Snackbar open={error} autoHideDuration={6000} onClose={ () => setError( false )}>
                <Alert severity="error" onClose={ () => setError( false )}>
                    Sucedio un error, intentelo de nuevo.
                </Alert>
            </Snackbar>
            {
                loading ? <LinearProgress/> : null
            }
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "98vh" }}>
                <Paper elevation={ 1 } className={ styles.paperLogin }>
                    <h1>Iniciar sesión</h1>
                    <TextField label="Correo" id="email" fullWidth type="email" variant="outlined" className={ styles.inputMaterial } onChange={ handleInputChange } autoComplete="off" error={ emailError }/>
                    <TextField label="Contraseña" id="password" fullWidth type="password" variant="outlined" className={ styles.inputMaterial } onChange={ handleInputChange } autoComplete="off" error={ passwordError }/>
                    <br/>
                    <Button className={ styles.buttonLogin } variant="contained" color="primary" onClick={ () => handleSubmitForm() }>Iniciar</Button>
                </Paper>
            </div>
        </div>
    )
}
