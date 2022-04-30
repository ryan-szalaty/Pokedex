import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, Tab } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import {
    Box,
    Text,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react';

function Region() {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(location.state.region_data)
        .then(result => {
            setData(result.data);
        })
        .catch(err => {
            console.log(err);
        });
        setIsLoading(false);
    }, []);

    console.log(data);

    if (isLoading === false && data.length != 0) {
        return (
            <ChakraProvider>
            <TableContainer width="50%">
                <Table variant="striped">
                    <TableCaption>Data retrieved from PokeAPI.</TableCaption>
                        <Thead>
                            <Tr>
                                <Th fontSize="0.8rem">Search for Pokemon in {data.name.toUpperCase()}:</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {data.pokemon_entries.map(entry => 
                            <Tr>
                                <Td key={entry.id}>
                                <Link 
                                to={`/regions/${location.state.id}/${entry.pokemon_species.name}`}
                                state={{
                                    pokemon_data: entry.pokemon_species.url,
                                    name: entry.pokemon_species.name,
                                    id: entry.id
                                }}
                                >{entry.pokemon_species.name.toUpperCase()}
                                </Link>
                                </Td>
                            </Tr>
                        )}
                        </Tbody>
                </Table>
            </TableContainer>
        </ChakraProvider>
        )
    }
    else {
        return (
            <ChakraProvider>
                <CircularProgress isIndeterminate color='green.300' size='200px'/>
            </ChakraProvider>
        )
    }
}

export default Region;