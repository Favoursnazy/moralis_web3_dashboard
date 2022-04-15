import { Center, Flex, Text, Button } from "@chakra-ui/react";

export default function Header({user, logout, isLoggingOut}) {

    return (
        <header>
            <Flex py="6" px="10" justifyContent="space-between" bg="purple.400" color="white">
                <Center>
                <Text fontSize="xl" fontWeight="bold" >Dashboard3</Text>
                </Center>
                <Center>
                    <Text>{user.getUsername()}</Text>
                    <Button ml="4" colorScheme="purple" onClick={logout} disabled={isLoggingOut}>Logout</Button>
                </Center>
            </Flex>
        </header>
    )
}