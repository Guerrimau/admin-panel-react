import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { UsersTable } from './UsersTable';

const USERS_QUERY = gql`
    query{
        getUsers{
            _id
            name
            lastname
            email
            age
            area
        }
    }
`;

export const UsersScreen = () => {

    const { data, loading, error } = useQuery( USERS_QUERY )

    return (
        <div>
            <h2 style={{ marginLeft: "15vw" }}>Empleados</h2>
            {
                loading 
                    ? <CircularProgress style={{ marginLeft: "50vw", marginTop: "50px" }} />
                    : error ? <h2>Sucedio un error</h2>
                            : <UsersTable initialData={ data.getUsers }/>
            }
        </div>
    )
}
