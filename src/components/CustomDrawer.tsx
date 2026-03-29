import { Box, Button, Drawer, IconButton, Input, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useUploadThing } from "./UploadFileBtn";

type FileType = {
    id: string;
    fileName: string;
    url: string;
};

export default function CustomDrawer({bot ,onClose}:{bot:any , onClose:()=>void}){

    console.log("bot in custom Drawer - ", bot)
    const [files , setFiles]=useState<FileType[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file , setFile]=useState<File | null>(null);

    useEffect(()=>{
        if(!bot?.files) return;

        setFiles([...bot.files]);
    },[bot])
    //uploadthing setup 
    const { startUpload, isUploading } = useUploadThing("pdfUploader",{
        onUploadError(e){
            console.log("error in upload error =", e);
        },
        onUploadBegin(fileName) {
          console.log("upload started file name -", fileName);  
        },
    });
    
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
                            console.log("start upload=" ,startUpload)

                            const res= await startUpload([file], {
                                adminId: bot.adminId,
                                botId: bot.id,
                            });
                            console.log("res upload- ", res)

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
                        {files.length >=1? (<Box>
                               {files.map((f)=>(
                                <Box 
                                    sx={{
                                            display:"flex" , 
                                            flexDirection:"row" ,
                                            justifyContent:"space-between" ,
                                            alignItems:"center",
                                            border:"1px solid gray",
                                            borderRadius:"10px",
                                            p:"5px"
                                        }} 
                                    key={f.id}
                                >
                                    <Typography>{f.fileName}</Typography>
                                    <Button variant="contained" color="secondary">VIEW</Button>
                                    <Button variant="contained">REMOVE</Button>
                                </Box>
                               ))}
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