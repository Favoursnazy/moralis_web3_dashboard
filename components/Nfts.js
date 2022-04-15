import { Box, Image, Text } from "@chakra-ui/react"
import { useNFTBalances } from "react-moralis"
import react, { useEffect } from "react"
import CustomContainer from "../components/CustomContainer"

export default function Nfts({user}) {

    const {getNFTBalances, data} = useNFTBalances()

    useEffect(() => {
        getNFTBalances({
            params: {
                chain: "rinkeby",
                address: user.get("ethAddress")
            }
        }) 
    }, [])


    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold"> My NFTs</Text>
            {data && data.total === 0 && <Text> You do no Have NFTs in this Wallet </Text> }

            {data && data.result.map(nft => {
                <Box mt="4" px="2" py="2" borderWidth="1px" borderRadius="md" key={nft.token.uri}>
                    {nft.image &&     <Image src={nft.image} /> }
                    <p>{nft.token.uri}</p>
                </Box>
            })}
        </CustomContainer>
    )
}