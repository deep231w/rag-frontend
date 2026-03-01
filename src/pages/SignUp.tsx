import { Box, Container, Paper } from "@mui/material";
import AuthComponent from "../components/SignUpAuthComponent";

export default function SignUp(){

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
                    <AuthComponent/>
                </Paper>
            </Container>
            
        </Box>
    )
}