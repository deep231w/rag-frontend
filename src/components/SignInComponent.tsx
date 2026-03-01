import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";

export default function SignInAuthComponent(){

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
                        <Typography variant="h4">SignIn</Typography>
                        <TextField id="" label="Email" variant="outlined"/>
                        <TextField id="" label="Password" variant="outlined"/>
                        <Button variant="contained">Sign In</Button>
                    </Paper>    
                </Container>
        </Box>
    )
}