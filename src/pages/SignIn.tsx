import { Box, Container } from "@mui/material";
import SignInAuthComponent from "../components/SignInComponent";

export default function SignIn(){
    return(
        <Box
            sx={{
                height:"100vh",
                display:"flex",
                alignItems:"center",
                alignContent:"center"
            }}
        >
            <Container maxWidth="sm">
                    <SignInAuthComponent/>
           </Container>           
        </Box>

    )
}