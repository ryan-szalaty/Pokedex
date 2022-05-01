import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider} from '@chakra-ui/react';
import { CircularProgress} from '@chakra-ui/react'
import {
    Box,
    Table,
    Thead,
    Tbody,
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

    if (isLoading === false && data.length !== 0) {
        return (
            <ChakraProvider>
                <Box width="100%" letterSpacing="1px">
                    <TableContainer width="90%" mx="auto">
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
                </Box>
        </ChakraProvider>
        )
    }
    else {
        return (
            <ChakraProvider>
                <Box width="100%">
                    <CircularProgress isIndeterminate color='green.300' size='200px' position="relative" top="50%" left="35%"/>
                </Box>
            </ChakraProvider>
        )
    }
}

export default Region;