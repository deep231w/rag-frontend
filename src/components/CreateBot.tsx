import { Alert, Box, Button, Icon, IconButton, Snackbar, SvgIcon, TextField, Typography, type AlertColor } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import PdfIcon from "../assets/icons/PdfIcon";
import PdficonSVG from "../assets/icons/pdfIconSVG.svg";


export default function CreateBot() {
  const admin= JSON.parse(localStorage.getItem("admin") || "null");

  const [botName , setBotName]=useState<string>("");
  const [success, setSuccess]=useState<boolean>(false);
  const [description  ,setDescription]=useState<string | null>(null);
  const [files , setFiles]=useState<File[] >([]);
  const [dragging , setDragging]=useState(false);

  const inputRef= useRef<HTMLInputElement | null>(null);

  const [alert , setAlert]=useState<{
    message:string,
    servirity:AlertColor,
    open:boolean
  }>({
    message:"", 
    servirity:"info",
    open:false
  })

  async function createButton() {
    console.log("admin is = ", admin)

    if(!botName || !admin){
      console.log("error , missing creds");
      return;
    }
    try{
      const res =await axios.post(`${import.meta.env.VITE_API_URL}/bot/create`,{
        name:botName,
        adminId:admin.userId
      })

      console.log("bot create response- ", res);

      if(res.status==200){
        setSuccess(true)
        setAlert({open:true ,servirity:"success", message:"bot create"});
      }
    }catch(e){
      console.log("error in create bot= ", e);
      setAlert({open:true ,servirity:"error", message:"bot creation failed!!"});
    }
  }

  function handleClose (){
    setSuccess(false);
  }

  useEffect(() => {
      if (success) {
        const timer = setTimeout(() => {
          setSuccess(false);
        }, 3000);

        return () => clearTimeout(timer);
      }
    }, [success]);


  //handle file 
  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    setDragging(false);

    const selectedFiles = e.dataTransfer.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      setFiles((prev) => {
        const newFiles = [...prev, ...filesArray];

        return newFiles.filter(
          (file, index, self) =>
            index === self.findIndex((f) => f.name === file.name)
        );
      });
      // console.log("Dropped file:", droppedFile);\
    }
  }
  
  function handleFileChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      setFiles((prev) => {
        const newFiles = [...prev, ...filesArray];

        return newFiles.filter(
          (file, index, self) =>
            index === self.findIndex((f) => f.name === file.name)
        );
      });

      e.target.value = "";
    }
  }


  useEffect(()=>{
    console.log("files: -", files)
  },[files])
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        // justifyItems:"center",
        // alignContent:"center",
        // alignItems:"center"
        
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 600 }}
      >
        <Typography variant="h2" textAlign="center">
          Create Bot
        </Typography>
        <Box
            sx={{
                pt:5,
                display:"flex",
                flexDirection:"column"
            }}
            gap={3}
        >
            <TextField
                onChange={(e)=>setBotName(e.target.value)}
                label="Bot Name"
                fullWidth
                sx={{
                }}
            />

            <TextField
                onChange={(e)=>setDescription(e.target.value)}
                label="Description"
                fullWidth
                multiline
                rows={6}
            />
            <input
              type="file"
              accept=".pdf"
              hidden
              multiple
              ref={inputRef}
              onChange={handleFileChange}
            />
            {files.length >0 ?<MultipleFiles files={files}/>:
            
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={()=>inputRef.current?.click()}

                sx={{
                  border:dragging ?"2px solid #6366f1" :"1px solid rgba(255, 255, 255, 0.23)",
                  height:350,
                  borderRadius:1, 
                  display:"flex",
                  justifyContent:"center",
                  alignItems:"center",

                  cursor:"pointer",

                  background:dragging?"rgba(99,102,241,0.08)" : "rgba(255,255,255,0.05)",   
                  backdropFilter: "blur(10px)",         
                  WebkitBackdropFilter: "blur(10px)",   
                  flexDirection:"column"
                }}
            >
              <IconButton sx={{}} disabled>
                <AddToPhotosOutlinedIcon  sx={{fontSize:50 ,color:"rgba(255, 255, 255, 0.28)"}}/>
              </IconButton>
              
              <Typography fontSize={15}>Drag & Drop file OR click here to Upload</Typography>
            </Box>}
            <Button 
                variant="contained"
                color="secondary"
                onClick={createButton}
            > 
                Create
            </Button>

        </Box>
        
      </Box>
      {success && 
        <Snackbar
          open={alert.open}
          autoHideDuration={6000} 
          onClose={handleClose}
        >
          <Alert
                onClose={handleClose}
                severity={alert.servirity}
                variant="filled"
                sx={{ width: '100%' }}
          >
            {alert.message}
          </Alert>
        </Snackbar>}
    </Box>
  );
}

function MultipleFiles({files}:{files:File[]}){
  return (
    <Box
  sx={{
    display: "flex",
    flexWrap: "wrap",   // 🔥 next row automatically
    gap: 2,
    mt: 2,
  }}
>
  {files.map((f) => (
    <Box
      key={f.name}
      sx={{
        width: 140,
        minHeight: 140,

        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "16px",

        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(10px)",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        p: 2,

        transition: "0.2s ease",

        "&:hover": {
          background: "rgba(255,255,255,0.07)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Box
        component="img"
        src={PdficonSVG}
        alt="pdf"
        sx={{
          width: 50,
          height: 50,
          mb: 1,
        }}
      />

      <Typography
        fontSize={13}
        textAlign="center"
        sx={{
          wordBreak: "break-word",
        }}
      >
        {f.name}
      </Typography>
    </Box>
  ))}
</Box>
  )
}