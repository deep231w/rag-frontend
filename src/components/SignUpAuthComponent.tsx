import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function AuthComponent(){

    return(
        <Box
            sx={{
                height:"auto",
                display:"flex",
                alignItems:"center",
                alignContent:"center"
            }}
        >
                <Container maxWidth="sm">
                    <Paper elevation={0} sx={{
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                    >
                        <Typography variant="h4">SignUp</Typography>
                        <TextField id="" label="Name" variant="outlined"/>
                        <TextField id="" label="Email" variant="outlined"/>
                        <TextField id="" label="Password" variant="outlined"/>
                        <Button variant="contained">Sign Up</Button>
                    </Paper>    
                </Container>
        </Box>
    )
}