import {
    FormLabel,
    NumberDecrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    FormControl,
    Text,
    NumberIncrementStepper,
    Input,
    Button,
    useToast
}
    from "@chakra-ui/react"
import CustomContainer from "../components/CustomContainer"
import react, { useState } from "react";
import { useWeb3Transfer } from "react-moralis";
import Moralis from "moralis";

export default function Send() {

    const [amount, setAmount] = useState(0);
    const [reciever, setReciever] = useState("")

    const handleChange = (value) => setAmount(value)

    const { fetch, isFetching } = useWeb3Transfer({
        amount: Moralis.Units.ETH(amount),
        receiver: reciever,
        type: "native"
    })

    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await Moralis.enableWeb3();

        fetch({
            onSuccess: () => {
                toast({
                    title: "ETH successfully sent",
                    description: "fresh ETH are showing up into the reciever wallet",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                })
                setReciever("")
            },
            onError: (errors) => {
                {
                    errors && errors.length > 0 && errors.map(error => {
                        toast({
                            title: "ERROR",
                            description: error,
                            status: "error",
                            duration: 9000,
                            isClosable: true,
                        })
                    })
                }
            }
        })
    }

    console.log(amount);

    return (
        <CustomContainer>
            <Text fontSize="xl" fontWeight="bold">Send Ethereum</Text>
            <form onSubmit={handleSubmit}>
                <FormControl mt="4">
                    <FormLabel htmlFor="amount">
                        Amout of Ethereum To Send
                    </FormLabel>
                    <NumberInput min={0.1} step={0.1} onChange={handleChange}>
                        <NumberInputField id="amount" value={amount} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <FormLabel mt="4" htmlFor="reciever" >Address to Send</FormLabel>
                    <Input id="reciever" placeholder="Reciever Address" value={reciever} onChange={e => setReciever(e.target.value)} />
                </FormControl>
                <Button disabled={isFetching} mt="4" type="submit" colorScheme="purple">Send</Button>
            </form>
        </CustomContainer>
    )
}