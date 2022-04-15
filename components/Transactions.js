import CustomContainer from "../components/CustomContainer"
import { useMoralisWeb3Api } from "react-moralis"
import react, { useState, useEffect } from "react"
import { Divider, Text, Link} from "@chakra-ui/react"

export default function Transactions({user}) {

    const Web3API = useMoralisWeb3Api()

    const  BASE_URL = "https://rinkeby.etherscan.io/tx/"

    const [transactions, setTransactions] = useState()

    const fetchTransactions = async () => {
        const data = await Web3API.account.getTransactions({
            chain: "rinkeby",
            address: user.get("ethAddress"),
            limit: 5
        })

        if (data) {
            setTransactions(data.result);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, [])
    

    return (
        <CustomContainer>
            <Text fontSize="xl" mb="6" fontWeight="bold">my last five transactions</Text>
            {transactions && transactions.map((transaction) => (
                <div key={transaction.hash}>
                    <Link href={`${BASE_URL}${transaction.hash}` } isExternal>&nbsp; {transaction.hash}</Link>
                    <Divider />
                </div>
            ))}
        </CustomContainer>
    )
}