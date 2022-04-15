import { useERC20Balances, useMoralisWeb3Api } from "react-moralis";
import CustomContainer from "./CustomContainer";
import react, { useEffect, useState } from "react"
import Moralis from "moralis";
import { Divider, Text } from "@chakra-ui/react";

export default function Balance({ user }) {

    const Web3API = useMoralisWeb3Api()
    const { fetchERC20Balances, data } = useERC20Balances()

    const [ethBalance, setEthBalance] = useState(0);

    const fetchNativeBalance = async () => {
        const result = await Web3API.account.getNativeBalance({
            chain: "rinkeby",
            address: user.get("ethAddress")
        }).catch(e => console.log(e))

        if (result && result.balance) {
            setEthBalance(Moralis.Units.FromWei(result.balance));
        }
    }

    useEffect(() => {
        fetchNativeBalance()
        fetchERC20Balances({
            params: {
                chain: "rinkeby",
                address: user.get("ethAddress")
            }
        })
    }, [])

    return (
        <CustomContainer>
            <Text mb="6" fontSize={{ base: '24px', md: '40px', lg: '56px' }} fontWeight="bold"> ERC20 Tokens </Text>
            {ethBalance && <Text>&nbsp; {ethBalance} <b>ETH</b></Text>}
            <Divider />
            {data && data.map(token => (
                <div key={token.symbol}>
                    <Text fontSize={{ base: '24px', md: '40px', lg: '56px' }}>&nbsp;  {Moralis.Units.FromWei(token.balance)} <b>{token.symbol}</b></Text>
                    <Divider />
                </div>
            ))}
        </CustomContainer>
    )
}