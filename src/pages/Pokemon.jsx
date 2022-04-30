import React, {useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider, Tab } from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import {
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

function Pokemon() {
    const [data, setData] = useState([]);
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();

    useEffect(() => {
        setIsLoading(true);
        axios.get(location.state.pokemon_data)
        .then(result => {
            setData(result.data);
        })
        .catch(err => {
            console.log(err);
        });

        axios.get(`https://pokeapi.co/api/v2/pokemon/${location.state.name}`)
        .then(result => {
            setImage(result.data.sprites.front_default);
        })
        .catch(err => {
            console.log(err);
        })
        setIsLoading(false);
    }, []);

    console.log(data);

    if (isLoading === false && data.length != 0 && image) {
        return (
            <ChakraProvider>    
                <TableContainer width="90vw">
                    <Table variant="striped">
                        <TableCaption>Data retrieved from PokeAPI.</TableCaption>
                            <Thead width="90%">
                                <Tr>
                                    <Th fontSize="0.8rem">Data for {location.state.name}</Th>
                                </Tr>
                            </Thead>
                            <Tbody width="90%">
                                <Tr>
                                    <Td><img src={image} /></Td>
                                </Tr>
                                <Tr>
                                   <Td>Base Happiness: {data.base_happiness}</Td>
                                   <Td>Capture Rate: {data.capture_rate}</Td>
                                </Tr>
                                <Tr>
                                   <Td>Egg Groups: {data.egg_groups.map(group => <p>{group.name.toUpperCase()}</p>)}</Td>
                                   <Td>Habitat: {data.habitat ? data.habitat.name.toUpperCase() : "UNKNOWN"}</Td>
                                </Tr>
                                <Tr>
                                   <Td>Description:<p>{data.flavor_text_entries[0].flavor_text}</p></Td>
                                   <Td>Growth Rate: {data.growth_rate.name.toUpperCase()}</Td>
                                </Tr>
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

export default Pokemon;