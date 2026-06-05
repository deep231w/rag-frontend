import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpAuthComponent(){
    const navigate= useNavigate();
    const [email ,setEmail]=useState<string>("");
    const [password, setPassword]=useState<string>("");
    const [name, setName]=useState<string>("");


    async function signup() {
        if(!email || !password || !name){
            throw new Error("please enter credentials");
            return;
        }

        try{
            const response= await axios.post(`${import.meta.env.VITE_API_URL}/admin/signup`,{
                name:name,
                email:email,
                password:password
            })
            console.log("response of admin signin- ", response);

            if(response.status==200){
                localStorage.setItem("admin", JSON.stringify(response.data.admin));
                localStorage.setItem("token", response.data.token);
                navigate("/home/dashboard")
                console.log("admin loggedin successfully");
            }

        }catch(e){
            console.log("error in signinButton", e);
            throw e;
        }
    }

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
                        <TextField 
                            onChange={(e)=>setName(e.target.value)}
                            id="" 
                            label="Name" 
                            variant="outlined"
                        />
                        <TextField 
                            onChange={(e)=>setEmail(e.target.value)}
                            id="" 
                            label="Email" 
                            variant="outlined"
                        />
                        <TextField 
                            onChange={(e)=>setPassword(e.target.value)}
                            id="" 
                            label="Password" 
                            variant="outlined"
                        />

                        <Button
                            onClick={signup} 
                            variant="contained"
                        >
                            Sign Up
                        </Button>
                        
                        <Box display={"flex"}  justifyContent={"center"} alignItems={"center"}>
                            <Typography>Having Account ? <Link to={"/signin"} >SignIn</Link></Typography>
                        </Box>
                        
                    </Paper>    

                </Container>
        </Box>
    )
}