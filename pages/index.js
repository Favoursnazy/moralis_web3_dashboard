import { Flex, Text, Button, Box, Tab, TabList, Tabs, TabPanel, TabPanels } from '@chakra-ui/react';
import { useMoralis } from 'react-moralis'
import Head from 'next/head';
import Header from '../components/Header';
import Profile from '../components/Profile'
import Balance from '../components/Balance';
import Transactions from '../components/Transactions';
import Nfts from '../components/Nfts';
import Send from '../components/Send';

export default function Home() {
  const { isAuthenticated, authenticate, user, logout, isLoggingOut} = useMoralis();
  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Login | Dashboard</title>
        </Head>

        <Flex
          direction='column'
          justifyContent='center'
          alignItems='center'
          width='100vw'
          height='100vh'
          bgGradient='linear(to-br, teal.400, purple.300)'
        >
          <Text
            fontSize='5xl'
            fontWeight='bold'
            color='white'>Dashboard3</Text>
          <Button
            colorScheme='purple'
            size="lg"
            mt="6"
            onClick={() => authenticate({
              signingMessage: "Sign in to Login to Web3dashboard "
            })}
          >Login With Metamask</Button>
        </Flex>
      </>
    )
  }
  return (
    <>
      <Head>
        <title>Dashboard3</title>
      </Head>
      <Flex direction="column" width="100vw" height="100vh">
        <Header user={user} logout={logout} isLoggingOut={isLoggingOut} />
        <Box flex="1" bg="purple.100" py="20" px="44">
          <Tabs size="lg" colorScheme="purple" align="center" variant="enclosed">
            <TabList>
               <Tab fontWeight="bold">Profile</Tab>
               <Tab fontWeight="bold">Balance</Tab>
               <Tab fontWeight="bold">Transactions</Tab>
               <Tab fontWeight="bold">NFTs</Tab>
               <Tab fontWeight="bold">Send ETH</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Profile  user={user}/>
              </TabPanel>
              <TabPanel>
                <Balance user={user}/>
              </TabPanel>
              <TabPanel>
                <Transactions  user={user}/>
              </TabPanel>
              <TabPanel>
                <Nfts  user={user}/>
              </TabPanel>
              <TabPanel>
                <Send user={user} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Flex>
    </>
  )
}
