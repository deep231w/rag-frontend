import { Box, Button, Drawer, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useUploadThing } from "./UploadFileBtn";
import axios from "axios";

type FileType = {
    id: string;
    fileName: string;
    url: string;
};

export default function CustomDrawer(
    {
        bot ,
        onClose ,
        isOpenPdf , 
        setPdfFile,
        admin
    }:{
        bot:any , 
        onClose:()=>void ,
        isOpenPdf:()=>void,
        setPdfFile:(data:any)=>void,
        admin:any
    }){

    console.log("bot in custom Drawer - ", bot)
    const [files , setFiles]=useState<FileType[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [file , setFile]=useState<File | null>(null);
    const [messages ,setMessages]=useState([
        {
            role:"user",
            content:"hello"
        },
        {
            role: "assistant",
            content:"Hi! How can I help you ?"
        }
    ])


    //AI question Query
    const [question , setQuestion ]= useState<string | null>(null);
    
    const handleAiQuestionQuery = async ()=>{
        if(!question || !bot || !admin){
                console.log("creds missing during handle Question query")
                // throw new Error("Credential missing in AI query")
                return
        }

        const newConvElemen= {
            role:"user",
            content:question
        }

        setMessages([...messages ,newConvElemen]);
        setQuestion(null);

        try{

            const res=  await axios.post(`${import.meta.env.VITE_API_URL}/askai`,{
                params:{
                    botId:bot._id,
                    adminId:admin._id,
                    question:question
                }
            });

            console.log("response of ai- " ,res);

        }catch(e){
            console.log("error in handle Ai Question query")
        }
    }

    //pdf view modal set
    // const [PdfForView ,setPdfForView]=useState<any>();

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

    //remove file handler 
    const removeFileHandle=async(f:any)=>{
        try{
            console.log("file- ", f);
            const res=await axios(`${import.meta.env.BASE_URL}/removefile`,{
                params:{

                }
            })

            console.log("res of remove file -" ,res);
        }catch(e){
            console.log("error in remove file is -", e);
        }
    }



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
                                    <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        onClick={()=>{
                                            // setPdfForView(f)
                                            setPdfFile(f)
                                            isOpenPdf()
                                        }}

                                    >
                                        VIEW
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={()=>removeFileHandle(f)}
                                    >
                                        REMOVE
                                    </Button>
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
                    <Typography sx={{textAlign:"left"}} color="" variant="h6">
                        Chat With  {" "}
                            <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
                                {bot.botName}
                            </Box>
                    </Typography>
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
                                onChange={(e)=>setQuestion(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAiQuestionQuery}
                                disabled={!question}
                            >Send</Button>
                        </Box>
                        
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}