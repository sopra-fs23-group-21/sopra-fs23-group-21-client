// PlayerCard.tsx

import React from 'react';
import { Box, Text, VStack, Image } from '@chakra-ui/react';


export default function PlayerCard({user}:{user:AdminProps}){
    return (
        <VStack spacing={2} alignItems="center">
            <Image
                boxSize="150px"
                borderRadius="full"
                src={user.head}
            />
            <Box
                borderRadius="md"
                p="4"
                boxShadow="base"
                textAlign="center"
                width="100%"
                bg="rgba(0, 0, 0, 0.8)"
            >
                <Text fontSize="xl" fontWeight="bold" color="white">
                    {user.name}
                </Text>
                <Text fontSize="md" color="white">
                    Remaining Card: {user.handCard?.length}
                </Text>
                {
                    user.isContinue &&
                    <Text fontSize="md">
                        Already Ready!
                    </Text>
                }
                <Text fontSize="md" color="white">
                    {'on' == user.status ? 'Waiting......' : '' }
                </Text>
            </Box>
        </VStack>
    );
};
