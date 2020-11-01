import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import {
    IconButton,
    Table,
    TableContainer,
    TableCell,
    TableBody,
    TableRow,
    TableHead,
    Paper,
    Fab,
    Modal,
    TextField,
    Button,
} from "@material-ui/core";
import {
    Edit,
    Delete,
    Add
} from "@material-ui/icons";

import { useStyles } from '../../useMaterialStyles';


const CREATE_USER = gql`
    mutation createUser($input: UserInput!) {
        createUser( input: $input){
            _id
        }
    }
`;
const UPDATE_USER = gql`
    mutation updateUser( $_id: ID!, $input: UpdateUserInput!) {
        updateUser( _id: $_id, input: $input){
            name
        }
    }

`;
const DELETE_USER = gql`
    mutation deleteUser( $_id: ID! ){
        deleteUser(_id: $_id)
    }
`;


export const UsersTable = ({ initialData = [] }) => {

    const [createUser, { data }] = useMutation(CREATE_USER, { ignoreResults: false })
    const [updateUser] = useMutation(UPDATE_USER)
    const [deleteUser] = useMutation(DELETE_USER)

    const [usersData, setUsersData] = useState(initialData)

    const [selectedUser, setSelectedUser] = useState({
        name: '',
        lastname: '', 
        email: '',
        age: '',
        area: ''
    })
    const [modalAddUser, setModalAddUser] = useState(false);
    const [modalEditUser, setModalEditUser] = useState(false);
    const [modalDeleteUser, setModalDeleteUser] = useState(false);
    
    const styles = useStyles();

    const handleAddModal = () => {
        setModalAddUser(!modalAddUser);
    }

    const handleEditModal = () => {
        setModalEditUser(!modalEditUser);
    }

    const handleDeleteModal = () => {
        setModalDeleteUser(!modalDeleteUser);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
    };


    const selectedUserAction = (user, action) => {

        setSelectedUser(user)
        if (action === "Edit") {
            handleEditModal();
        } else {
            handleDeleteModal();
        }

    };

    const createUserAction = () => {
        let { name, lastname, email, age, area } = selectedUser; 
        let intAge = parseInt( age )
        console.log( name, lastname, email, intAge, area )
        createUser({ variables: { input: { name:name, lastname:lastname, email:email, age: intAge, area:area } } })
        handleAddModal()
    }

    const updateUserAction = () => {
        let { name, lastname, email, age, area, _id } = selectedUser;
        let intAge = parseInt( age )
        updateUser({ variables: { _id:_id, input: { name:name, lastname:lastname, email:email, age:intAge, area:area }} })
        let newDataArray = []
        usersData.forEach( user => {
            if( user._id === selectedUser._id ){
                let newUserObject = selectedUser
                newDataArray.push( newUserObject )
            } else {
                newDataArray.push( user )
            }
        })
        setUsersData( newDataArray )
        handleEditModal();
    }

    const deleteUserAction = () => {
        deleteUser( {variables: { _id: selectedUser._id }})
        setUsersData( usersData.filter( user => user._id !== selectedUser._id))
        handleDeleteModal()
    }

    useEffect( () => {
        if( data ){
            let userObject = selectedUser
            userObject['_id'] = data.createUser._id

            setUsersData( usersData.concat( userObject ))
        }
    }, [data])


    const deleteUserModal = (
        <div className={styles.modal} style={{ width: "500px", fontSize: "19px" }}>
            <p style={{ marginTop: "15px" }}>
                Estás seguro que deseas eliminar a{" "}
                <b>{selectedUser && selectedUser.name}</b>?{" "}
            </p>
            <br />
            <br />
            <div align="right">
                <Button color="secondary" onClick={() => handleDeleteModal()}>
                    No
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteUserAction()}
                >
                    Sí
                </Button>
            </div>
        </div>
    );

    const editUserModal = (
        <div className={styles.modal}>
            <h3>Editar Empleado</h3>
            <TextField value={selectedUser.name} name="name" label="Nombre" id="name" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={selectedUser.lastname} name="lastname" label="Apellido" id="lastname" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={selectedUser.email} name="email" label="Correo" id="email" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={selectedUser.age} name="age" label="Edad" id="age" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={selectedUser.area} name="area" label="Area" id="area" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <br />
            <div style={{ alignSelf: "flex-end" }}>
                <Button color="primary" onClick={() => handleEditModal()}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => updateUserAction()}
                >
                    Agregar
                </Button>
            </div>
        </div>
    );

    const addUserModal = (
        <div className={styles.modal}>
            <h3>Agregar Proyecto</h3>
            <TextField label="Nombre" name="name" id="name" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Apellido" name="lastname" id="lastname" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Correo" name="email" id="email" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Edad" name="age" id="age" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Area" name="area" id="area" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <br />
            <div style={{ alignSelf: "flex-end" }}>
                <Button color="primary" onClick={() => handleAddModal()}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => createUserAction() }
                >
                    Agregar
                </Button>
            </div>
        </div>
    );


    return (
        <div>
            <Paper className={styles.table} elevation={3}>
                <TableContainer>
                    <Table>
                        <TableHead className={styles.table}>
                            <TableRow>
                                <TableCell>
                                    <b>Nombre</b>
                                </TableCell>
                                <TableCell>
                                    <b>Apellido</b>
                                </TableCell>
                                <TableCell>
                                    <b>Correo</b>
                                </TableCell>
                                <TableCell>
                                    <b>Edad</b>
                                </TableCell>
                                <TableCell>
                                    <b>Aréa</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {usersData.map(( user ) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.lastname}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.age}</TableCell>
                                    <TableCell>{user.area}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            className={styles.margin}
                                            onClick={() => selectedUserAction(user, "Edit")}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            className={styles.margin}
                                            onClick={() => selectedUserAction(user, "Delete")}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Fab
                className={styles.fab}
                color="primary"
                onClick={() => handleAddModal()}
            >
                <Add />
            </Fab>

            <Modal open={modalAddUser} onClose={handleAddModal}>
                {addUserModal}
            </Modal>

            <Modal open={modalEditUser} onClose={handleEditModal}>
                {editUserModal}
            </Modal>

            <Modal open={modalDeleteUser} onClose={handleDeleteModal}>
                {deleteUserModal}
            </Modal>

        </div>
    )
}
