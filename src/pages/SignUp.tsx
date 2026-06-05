import { Box, Container } from "@mui/material";
import SignUpAuthComponent from "../components/SignUpAuthComponent";

export default function SignUp(){

    return(
        <Box
            sx={{
                height:"100vh",
                display:"flex",
                justifyContent:"center",
                alignItems:"center"
            }}
        >
            <Container maxWidth="sm">
                    <SignUpAuthComponent/>
            </Container>
            
        </Box>
    )
}