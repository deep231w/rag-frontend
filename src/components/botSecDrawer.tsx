import { Box, Button, Drawer, IconButton, InputAdornment, Paper, TextField, Typography, CircularProgress } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { useUploadThing } from "./UploadFileBtn";
import axios from "axios";
import { RenderColdStartNotice, useRenderColdStartNotice } from "./RequestLoadingNotice";

type FileType = {
    id: string;
    fileName: string;
    url: string;
};

export default function BotSecDrawer(
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
    const [chatLoading, setChatLoading] = useState(false);
    const [uploadLoading, setUploadLoading] = useState(false);
    const chatNoticeVisible = useRenderColdStartNotice(chatLoading);
    const uploadNoticeVisible = useRenderColdStartNotice(uploadLoading);
    
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
                return
        }

        const newConvElemen= {
            role:"user",
            content:question
        }

        setMessages(prev => [...prev, newConvElemen]);
        setQuestion('');
        setChatLoading(true);

        try{
            console.log("bot and admin id- ", bot, admin)
            const res=  await axios.post(`${import.meta.env.VITE_API_URL}/askai`,{
                    botId:bot.id,
                    adminId:admin.userId,
                    question:question
            });

            console.log("response of ai- " ,res);
            const ans=  res.data.answer;
            console.log("ans of ai -", ans);

            setMessages(prev=>[
                ...prev,
                {
                    role:"assistant",
                    content:ans
                }
            ])
        }catch(e){
            console.log("error in handle Ai Question query",e)
        } finally {
            setChatLoading(false);
        }
    }

    useEffect(()=>{
        if(!bot?.files) return;

        setFiles([...bot.files]);
    },[bot])
    
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
        <Drawer
            anchor="right"
            open
            onClose={onClose}
            ModalProps={{ keepMounted: false }}
            sx={{ zIndex: 1150 }}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "100vw", sm: 700 },
                        maxWidth: "100vw",
                        top: { xs: "68px", sm: 0 },
                        height: { xs: "calc(100dvh - 68px)", sm: "100dvh" },
                        maxHeight: { xs: "calc(100dvh - 68px)", sm: "100dvh" },
                        borderLeft: "1px solid #303744",
                        backgroundColor: "#151920",
                        boxSizing: "border-box",
                        boxShadow: "0 12px 28px rgba(0,0,0,0.55)",
                        overflow: "hidden",
                    },
                },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    p: { xs: 2, sm: 3 },
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    boxSizing: "border-box",
                    minWidth: 0,
                    minHeight: 0,
                    gap: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                        minWidth: 0,
                    }}
                >
                    <Typography sx={{ textAlign: "left", fontWeight: 600, fontSize: { xs: 22, sm: 28 }, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} variant="h4">{bot?.botName}</Typography>
                    <IconButton
                        aria-label="Close bot panel"
                        onClick={onClose}
                        size="large"
                        sx={{
                            width: 40,
                            height: 40,
                            border: "1px solid #303744",
                            backgroundColor: "#1B2028",
                            color: "#E8ECF2",
                            flexShrink: 0,
                            "&:hover": {
                                backgroundColor: "#222833",
                            },
                            "&:focus-visible": {
                                outline: "2px solid #E4B72C",
                                outlineOffset: "2px",
                            },
                        }}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        pt: 0,
                        width: "100%",
                        gap: 1.5,
                        flexDirection: { xs: "column", sm: "row" },
                        minWidth: 0,
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
                        sx={{
                            minWidth: 0,
                            flex: 1,
                            "& .MuiInputBase-root": {
                                minWidth: 0,
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            },
                        }}
                    />
                    <input type="file" accept="application/pdf" hidden ref={fileInputRef} onChange={handleFileSelect} />
                    <Button variant="contained" color="primary" onClick={()=>fileInputRef.current?.click()} sx={{ flexShrink: 0 }}>
                        Select
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!file || isUploading}
                        onClick={async () => {
                            if (!file) return;
                            setUploadLoading(true);
                            try {
                                const res= await startUpload([file], {
                                    adminId: bot.adminId,
                                    botId: bot.id,
                                });
                                console.log("res upload- ", res)
                            } finally {
                                setUploadLoading(false);
                                setFile(null);
                            }
                        }}
                        sx={{ flexShrink: 0 }}
                    >
                        {isUploading || uploadLoading ? "uploading" : "upload"}
                    </Button>
                </Box>

                {uploadLoading && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#9AA4B2" }}>
                        <CircularProgress size={16} thickness={4} sx={{ color: "#E4B72C" }} />
                        <Typography variant="body2">Uploading document…</Typography>
                    </Box>
                )}
                <RenderColdStartNotice visible={uploadNoticeVisible} />

                <Box
                    sx={{
                        pt: 0,
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        flex: 1,
                        overflow: "hidden",
                    }}
                >
                    <Typography
                        variant="h6"
                        color="gray"
                        sx={{ textAlign: "left", width: "100%", mb: 1 }}
                    >
                        Files
                    </Typography>
                    <Box sx={{ display: "flex" , flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
                        {files.length >=1? (
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 1, overflowY: "auto", minHeight: 0, pr: 0.5 }}>
                               {files.map((f)=>(
                                <Box 
                                    sx={{
                                            display:"flex" , 
                                            flexDirection:{ xs: "column", sm: "row" },
                                            justifyContent:"space-between" ,
                                            alignItems:{ xs: "flex-start", sm: "center" },
                                            border:"1px solid #303744",
                                            borderRadius: "10px",
                                            p:1,
                                            gap:1,
                                            backgroundColor: "#1B2028",
                                            minWidth: 0,
                                        }} 
                                    key={f.id}
                                >
                                    <Typography sx={{ color: "#E8ECF2", wordBreak: "break-word", overflowWrap: "anywhere", flex: 1, minWidth: 0 }}>
                                        {f.fileName}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 1, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "flex-end", sm: "flex-start" } }}>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={()=>{
                                                setPdfFile(f)
                                                isOpenPdf()
                                            }}
                                            sx={{ flexShrink: 0 }}
                                        >
                                            VIEW
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={()=>removeFileHandle(f)}
                                            sx={{ flexShrink: 0 }}
                                        >
                                            REMOVE
                                        </Button>
                                    </Box>
                                </Box>
                               ))}
                        </Box>):
                        (<Box sx={{display:"flex" , justifyContent:"center", minHeight: 80, alignItems: "center"}}>
                            <Typography sx={{textAlign:"center" }} variant="h6">No Files Available!</Typography>
                        </Box>)}
                    </Box>
                </Box>

                <Box sx={{display:"flex" , pt: 0 , flexDirection:"column" , gap:1.5, minHeight:0, flex: 1, overflow: "hidden" }}>
                    <Typography sx={{textAlign:"left"}} color="" variant="h6">
                        Chat With  {" "}
                            <Box component="span" sx={{ fontWeight: 700, color: "primary.main" }}>
                                {bot.botName}
                            </Box>
                    </Typography>
                    <Box sx={{display:"flex" ,flexDirection:"column" , gap:1, minHeight:0, flex:1, overflow: "hidden"}}>
                        <Paper
                            sx={{
                                color:"gray" ,
                                height:"100%",
                                minHeight: 0,
                                display:"flex" ,
                                flexDirection: "column",
                                overflowY: "auto",
                                backgroundColor: "#1B2028",
                                border: "1px solid #303744",
                                p: 1,
                                gap: 1,
                            }}
                        >
                            {messages.map((m ,i)=>(
                                <Box
                                    key={i}
                                    sx={{
                                        p: 1.25,
                                        display: "flex",
                                        flexDirection: "column",
                                        maxWidth: "82%",
                                        alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                                        borderRadius: 2,
                                        bgcolor: m.role === "user" ? "#E4B72C" : "#222833",
                                        color: m.role === "user" ? "#101318" : "#E8ECF2",
                                        wordBreak: "break-word",
                                        overflowWrap: "anywhere",
                                    }}
                                >
                                    {m.content}
                                </Box>
                            ))}
                        </Paper>
                        {chatLoading && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "#9AA4B2" }}>
                                <CircularProgress size={16} thickness={4} sx={{ color: "#E4B72C" }} />
                                <Typography variant="body2">Bot is thinking…</Typography>
                            </Box>
                        )}
                        <RenderColdStartNotice visible={chatNoticeVisible} />
                        <Box sx={{display:"flex" , flexDirection:"row" , gap:1, alignItems:"center", width:"100%", minWidth:0}}>
                            <TextField
                                label="Type ..."
                                variant="outlined"
                                size="small"  
                                fullWidth  
                                value={question ?? ""}
                                onChange={(e)=>setQuestion(e.target.value)}
                                sx={{ minWidth: 0, flex: 1 }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleAiQuestionQuery}
                                disabled={!question || chatLoading}
                                sx={{ flexShrink: 0 }}
                            >
                                {chatLoading ? "Sending..." : "Send"}
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Drawer>
    )
}