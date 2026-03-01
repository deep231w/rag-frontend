import { Box, Container, Paper } from "@mui/material";
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
                <Paper elevation={8} sx={{p:4}}>
                    <SignInAuthComponent/>
                </Paper>
            </Container>           
        </Box>

    )
}