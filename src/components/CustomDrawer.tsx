import { Box, Button, Drawer, IconButton, Input, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useUploadThing } from "./UploadFileBtn";
export default function CustomDrawer({bot ,onClose}:{bot:any , onClose:()=>void}){

    console.log("bot in custom Drawer - ", bot)
    const [files , setFiles]=useState(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file , setFile]=useState<File | null>(null);

    //uploadthing setup 
    const { startUpload, isUploading } = useUploadThing("pdfUploader");
    
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
            if (selectedFile) {
                setFile(selectedFile);
                console.log("selected file is - ", selectedFile);
            }
    };




    return(
        <Drawer anchor="right" open onClose={onClose}>
            <Box
                sx={{width:700 , p:3, mt:5 , display:"flex" , flexDirection:"column"  }}
            >
                <Typography sx={{textAlign:"center"}} variant="h4">{bot?.botName}</Typography>

                <Box
                    sx={{
                        display:"flex",
                        pt:4,
                        width:"100%",
                        gap:2
                    }}
                    
                >
                    <TextField
                        disabled
                        variant="outlined"
                        size="small"  
                        fullWidth  
                        value={file?.name || "Not Selected"}
                        slotProps={{
                            input:{
                                readOnly:true,
                                endAdornment:file && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={()=>setFile(null)}
                                        >
                                            <CloseIcon
                                                fontSize="small"
                                            />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <input
                        type="file"
                        accept="application/pdf"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={()=>fileInputRef.current?.click()}
                    >
                        Select
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!file || isUploading}
                        onClick={async () => {
                            if (!file) return;

                            await startUpload([file], {
                            adminId: bot.adminId,
                            botId: bot.id,
                            });

                            setFile(null);
                        }}
                    >
                        {isUploading? "uploading":"upload"}
                    </Button>
                </Box>

                {/* uploaded files */}
                <Box
                    sx={{
                        pt:3
                    }}
                >
                    <Typography
                        variant="h6"
                        color="gray"
                        sx={{ textAlign: "left", width: "100%" }}
                    >
                        Files
                    </Typography>
                    <Box sx={{display:"flex" , flexDirection:"column"}}>
                        {/* input boxex in column */}
                        {files ? (<Box>
                               
                        </Box>):
                        (<Box sx={{display:"flex" , justifyContent:"center"}}>
                            <Typography sx={{textAlign:"center" }} variant="h6">No Files Available!</Typography>
                        </Box>)}
                    </Box>
                </Box>

                {/* test chat performance */}
                <Box sx={{display:"flex" , pt:3 , flexDirection:"column" , gap:2}}>
                    <Typography sx={{textAlign:"left"}} color="gray" variant="h6">Test {bot.botName}'s Response</Typography>
                    <Box sx={{display:"flex" ,flexDirection:"column" , gap:1}}>
                        <Paper
                            sx={{color:"gray" , height:"490px"}}
                        >

                        </Paper>
                        <Box sx={{display:"flex" , flexDirection:"row" , gap:2}}>
                            <TextField
                                label="Type ..."
                                variant="outlined"
                                size="small"  
                                fullWidth  
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                            >Send</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}