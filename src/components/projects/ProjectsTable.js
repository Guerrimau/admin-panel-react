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


const CREATE_PROJECT = gql`
    mutation createProject($input: ProjectInput!) {
        createProject( input: $input){
            _id
        }
    }
`;
const UPDATE_PROJECT = gql`
    mutation updateProject( $_id: ID!, $input: UpdateProjectInput!) {
        updateProject( _id: $_id, input: $input){
            name
        }
    }

`;
const DELETE_PROJECT = gql`
    mutation deleteProject( $_id: ID! ){
        deleteProject(_id: $_id)
    }
`;

export const ProjectsTable = ({ initialData = [] }) => {

    const [createProject, { data }] = useMutation(CREATE_PROJECT, { ignoreResults: false })
    const [updateProject] = useMutation(UPDATE_PROJECT)
    const [deleteProject] = useMutation(DELETE_PROJECT)
    
    const [projectsData, setProjectsData] = useState(initialData)

    const [selectedProject, setSelectedProject] = useState({
        name: '',
        description: '',
        duration: '',
        area: ''
    })
    const [modalAddProject, setModalAddProject] = useState(false);
    const [modalEditProject, setModalEditProject] = useState(false);
    const [modalDeleteProject, setModalDeleteProject] = useState(false);

    const styles = useStyles();

    const handleAddModal = () => {
        setModalAddProject(!modalAddProject);
    }

    const handleEditModal = () => {
        setModalEditProject(!modalEditProject);
    }

    const handleDeleteModal = () => {
        setModalDeleteProject(!modalDeleteProject);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedProject((prevstate) => ({
          ...prevstate,
          [name]: value,
        }));
    };

    const selectedProjectAction = (project, action) => {

        setSelectedProject(project)
        if (action === "Edit") {
            handleEditModal();
        } else {
            handleDeleteModal();
        }

    };

    const createProjectAction = () => {
        let { name, description, duration, area } = selectedProject; 
        createProject({ variables: { input: { name, description, duration, area } } })
        handleAddModal()
    }

    const updateProjectAction = () => {
        let { name, description, duration, area, _id } = selectedProject;
        updateProject({ variables: { _id:_id, input: { name:name, description:description, duration:duration, area:area }} })
        let newDataArray = []
        projectsData.forEach( project => {
            if( project._id === selectedProject._id ){
                let newProjectObject = selectedProject
                newDataArray.push( newProjectObject )
            } else {
                newDataArray.push( project )
            }
        })
        setProjectsData( newDataArray )
        handleEditModal();
    }

    const deleteProjectAction = () => {
        deleteProject( {variables: { _id: selectedProject._id }})
        setProjectsData( projectsData.filter( project => project._id !== selectedProject._id))
        handleDeleteModal()
    }

    useEffect( () => {
        if( data ){
            let projectObject = selectedProject
            projectObject['_id'] = data.createProject._id

            setProjectsData( projectsData.concat( projectObject ))
        }
    }, [data])
    
    const deleteProjectModal = (
        <div className={styles.modal} style={{ width: "500px", fontSize: "19px" }}>
            <p style={{ marginTop: "15px" }}>
                Estás seguro que deseas eliminar a{" "}
                <b>{selectedProject && selectedProject.name}</b>?{" "}
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
                    onClick={() => deleteProjectAction() }
                >
                    Sí
                </Button>
            </div>
        </div>
    );

    const editProjectModal = (
        <div className={styles.modal}>
            <h3>Editar Proyecto</h3>
            <TextField value={ selectedProject.name } name="name" label="Nombre" id="name" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={ selectedProject.description } name="description" label="Descripción" id="description" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={ selectedProject.duration } name="duration" label="Duración" id="duration" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField value={ selectedProject.area } name="area" label="Aréa" id="area" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <br />
            <div style={{ alignSelf: "flex-end" }}>
                <Button color="primary" onClick={() => handleEditModal()}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => updateProjectAction()}
                >
                    Agregar
                </Button>
            </div>
        </div>
    );

    const addProjectModal = (
        <div className={styles.modal}>
            <h3>Agregar Proyecto</h3>
            <TextField label="Nombre" name="name" id="name" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Descripción" name="description" id="description" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Duración" name="duration" id="duration" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <TextField label="Aréa" name="area" id="area" className={styles.inputMaterial} onChange={handleChange} variant="outlined" autoComplete="off" />
            <br />
            <div style={{ alignSelf: "flex-end" }}>
                <Button color="primary" onClick={() => handleAddModal()}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "15px" }}
                    onClick={() => createProjectAction() }
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
                                    <b>Descripcion</b>
                                </TableCell>
                                <TableCell>
                                    <b>Duracion</b>
                                </TableCell>
                                <TableCell>
                                    <b>Aréa</b>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {projectsData.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell
                                        style={{
                                            width: "30vw",
                                            height: "20px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {project.description}
                                    </TableCell>
                                    <TableCell>{project.duration}</TableCell>
                                    <TableCell>{project.area}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            className={styles.margin}
                                            onClick={() => selectedProjectAction(project, "Edit")}
                                        >
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            className={styles.margin}
                                            onClick={() => selectedProjectAction(project, "Delete")}
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

            <Modal open={modalAddProject} onClose={handleAddModal}>
                {addProjectModal}
            </Modal>

            <Modal open={modalEditProject} onClose={handleEditModal}>
                {editProjectModal}
            </Modal>

            <Modal open={modalDeleteProject} onClose={handleDeleteModal}>
                {deleteProjectModal}
            </Modal>

        </div>
    )
}
