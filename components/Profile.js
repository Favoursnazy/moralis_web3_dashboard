import { FormControl, Text , FormLabel, Button, Input} from "@chakra-ui/react";
import react, {useState} from "react";
import { useMoralis } from "react-moralis";
import CustomContainer from "./CustomContainer";

export default function Profile({user}) {
    const [username, setUsername] = useState("");

    const { setUserData, isUserUpdating } = useMoralis()
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(username.trim() !== "") {
            setUserData({
                username: username
            }).then(() => setUsername(""))
        }
    }
    return (
      <CustomContainer>
          <Text><b>Username: </b> {user.getUsername()}</Text>
          <Text><b>Wallet Addreess: </b> {user.get("ethAddress")}</Text>
          <form onSubmit={handleSubmit}>
              <FormControl mt="6" mb="6">
                  <FormLabel htmlFor="username">Set a new Username</FormLabel> 
                  <Input id="username"  type="text" placeholder="update your username" value={username} onChange={e => setUsername(e.target.value)} />
              </FormControl>
              <Button type="submit" colorScheme="purple" disabled={isUserUpdating}>&nbsp; Change Username</Button>
          </form>
      </CustomContainer>
    )
}