import React, {useEffect, useState} from 'react';
import { useLocation} from 'react-router-dom';
import axios from 'axios';
import { ChakraProvider} from '@chakra-ui/react';
import { CircularProgress} from '@chakra-ui/react';
import {
    ListItem,
    UnorderedList,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Text,
    Image
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

    if (isLoading === false && data.length !== 0 && image) {
        return (
            <ChakraProvider>    
                <Box width="80%" height="100%" mx="auto" my="10%" p="20px" display="flex" flexDirection="column" bg="#DCD7D7" border="solid 5px black" letterSpacing="1px">
                    <Box width="95%" height="95%" display="flex" flexDirection="column" alignItems="center" border="solid 5px gray" mx="auto" my="10px" bg="gray.100">
                        <Text align="center" mt="20px" fontWeight="700">{location.state.name.toUpperCase()}</Text>
                        <Image src={image} boxSize="50%"/>
                        <Text align="center" my="20px" fontWeight="700">Description:</Text>
                        <Text align="left" width="95%" mb="20px">{data.flavor_text_entries[0].flavor_text}</Text>
                    </Box>
                    <Box width="95%" height="95%" display="flex" flexDirection="column" alignItems="left" mx="auto">
                        <TableContainer width="100%" height="100%">
                            <Table variant="striped">
                                <TableCaption>Data Acquired for {location.state.name.toUpperCase()} from PokeAPI</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Stats:</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    <Tr>
                                        <Td><Text align="left">Base Happiness:</Text></Td>
                                        <Td><Text align="left">{data.base_happiness}</Text></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Text align="left">Capture Rate:</Text></Td>
                                        <Td><Text align="left">{data.capture_rate}</Text></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Text align="left">Egg Groups:</Text></Td>
                                        <Td><UnorderedList align="left">{data.egg_groups.map(group => <ListItem listStyleType="none">{group.name.toUpperCase()}</ListItem>)}</UnorderedList></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Text align="left">Habitat:</Text></Td>
                                        <Td><Text align="left">{data.habitat ? data.habitat.name.toUpperCase() : "UNKNOWN"}</Text></Td>
                                    </Tr>
                                    <Tr>
                                        <Td><Text align="left">Growth Rate:</Text></Td>
                                        <Td><Text align="left">{data.growth_rate.name.toUpperCase()}</Text></Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
            </ChakraProvider>
        )
    }
    else {
        return (
            <ChakraProvider>
                <Box width="100%">
                    <CircularProgress isIndeterminate color='green.300' size='200px' position="relative" top="200px" left="38.5%"/>
                </Box>
            </ChakraProvider>
        )
    }
}

export default Pokemon;