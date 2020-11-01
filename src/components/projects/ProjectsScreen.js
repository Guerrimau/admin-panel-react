import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { ProjectsTable } from './ProjectsTable';

const PROJECTS_QUERY = gql`
    query{
        getProjects{
            _id
            area
            name
            duration
            description
        }
    }
`;

export const ProjectsScreen = () => {

    const { data, loading, error } = useQuery( PROJECTS_QUERY )

    return (
        <div>
            <h2 style={{ marginLeft: "15vw" }}>Proyectos</h2>
            {
                loading 
                    ? <CircularProgress style={{ marginLeft: "50vw", marginTop: "50px" }} />
                    : error ? <h2>Sucedio un error</h2>
                            : <ProjectsTable initialData={ data.getProjects } />
            }
        </div>
    )
}
 