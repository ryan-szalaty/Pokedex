import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { ChakraProvider, Tab } from '@chakra-ui/react';
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

import Region from './Region';

function Pokedex() {
    const [regions, setRegions] = useState([]);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokedex')
        .then(result => {
            setRegions(result.data.results);
        })
        .catch(err => {
            console.log(err);
        });
    });

    return (
        <ChakraProvider>
            <TableContainer width="50%">
                <Table variant="striped">
                    <TableCaption>Data retrieved from PokeAPI.</TableCaption>
                        <Thead>
                            <Tr>
                                <Th fontSize="0.8rem">Search Pokemon by Region:</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {regions.map(region => 
                            <Tr>
                                <Td key={regions.indexOf(region)}>
                                <Link 
                                to={`/regions/${regions.indexOf(region)}`}
                                state={{
                                    region_data: region.url,
                                    id: regions.indexOf(region)
                                }}
                                >{region.name.toUpperCase()}
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

export default Pokedex;