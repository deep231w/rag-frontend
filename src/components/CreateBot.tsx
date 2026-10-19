import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
  type AlertColor,
} from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import AddToPhotosOutlinedIcon from '@mui/icons-material/AddToPhotosOutlined';
import PdficonSVG from "../assets/icons/pdfIconSVG.svg";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useUploadThing } from "./UploadFileBtn";


export default function CreateBot() {
  const admin = JSON.parse(localStorage.getItem("admin") || "null");

  const [botName, setBotName] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [description, setDescription] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const [alert, setAlert] = useState<{
    message: string;
    servirity: AlertColor;
    open: boolean;
  }>({
    message: "",
    servirity: "info",
    open: false,
  });

  const { startUpload, isUploading } = useUploadThing("pdfUploader", {
    onUploadError(e) {
      console.log("error in upload error =", e);
    },
    onUploadBegin(fileName) {
      console.log("upload started file name -", fileName);
    },
  });

  function removeFile(indexToRemove: number) {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  }

  async function createButton() {
    console.log("admin is = ", admin);

    if (!botName || !admin) {
      console.log("error , missing creds");
      return;
    }
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/bot/create`, {
        name: botName,
        adminId: admin.userId,
        description: description,
      });

      console.log("bot create response- ", res);
      const createdBot = res.data.bot;
      if (files.length > 0) {
        await startUpload(files, {
          botId: createdBot._id,
          adminId: admin.userId,
        });
      }

      setSuccess(true);
      setAlert({ open: true, servirity: "success", message: "bot create" });
    } catch (e) {
      console.log("error in create bot= ", e);
      setAlert({ open: true, servirity: "error", message: "bot creation failed!!" });
    }
  }

  function handleClose() {
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
        return newFiles.filter((file, index, self) => index === self.findIndex((f) => f.name === file.name));
      });
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;

    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);

      setFiles((prev) => {
        const newFiles = [...prev, ...filesArray];
        return newFiles.filter((file, index, self) => index === self.findIndex((f) => f.name === file.name));
      });

      e.target.value = "";
    }
  }

  useEffect(() => {
    console.log("files: -", files);
  }, [files]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <Box sx={{ width: "100%", maxWidth: 720 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
            Create Bot
          </Typography>
          <Typography variant="body2" sx={{ color: "#9AA4B2" }}>
            Define the bot, attach the source documents, and start indexing.
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
          <TextField
            onChange={(e) => setBotName(e.target.value)}
            label="Bot Name"
            fullWidth
            value={botName}
          />

          <TextField
            onChange={(e) => setDescription(e.target.value)}
            label="Description"
            fullWidth
            multiline
            rows={5}
            value={description ?? ""}
          />

          <input type="file" accept=".pdf" hidden multiple ref={inputRef} onChange={handleFileChange} />

          {files.length > 0 ? (
            <MultipleFiles files={files} removeFile={removeFile} onAddMore={() => inputRef.current?.click()} />
          ) : (
            <Box
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              sx={{
                border: dragging ? "1px solid #E4B72C" : "1px dashed #303744",
                backgroundColor: dragging ? "rgba(228, 183, 44, 0.08)" : "#151920",
                borderRadius: 2,
                height: 220,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                cursor: "pointer",
                transition: "border-color 0.2s ease, background-color 0.2s ease",
              }}
            >
              <IconButton sx={{ pointerEvents: "none" }} disabled>
                <AddToPhotosOutlinedIcon sx={{ fontSize: 44, color: "#9AA4B2" }} />
              </IconButton>
              <Typography sx={{ color: "#9AA4B2", textAlign: "center", px: 2 }}>
                Drag & drop PDF files here or click to browse
              </Typography>
            </Box>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", pt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={createButton}
              disabled={isUploading || !botName || files.length === 0}
              sx={{ minWidth: 168 }}
            >
              {isUploading ? "Uploading..." : "Create Bot"}
            </Button>
          </Box>
        </Box>
      </Box>

      {success && (
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={alert.servirity} variant="filled" sx={{ width: "100%" }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
}

function MultipleFiles({ files, removeFile, onAddMore }: { files: File[]; removeFile: (index: number) => void; onAddMore: () => void }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(132px, 1fr))",
        gap: 1.5,
        mt: 0.5,
      }}
    >
      {files.map((f, index) => (
        <Box
          key={`${f.name}-${index}`}
          sx={{
            position: "relative",
            width: "100%",
            minHeight: 148,
            border: "1px solid #303744",
            borderRadius: 2,
            backgroundColor: "#151920",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 1.5,
            gap: 1,
            transition: "border-color 0.2s ease, background-color 0.2s ease",
            "&:hover": {
              borderColor: "#4B5568",
              backgroundColor: "#1B2028",
            },
          }}
        >
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 6,
              right: 6,
              backgroundColor: "rgba(17, 24, 39, 0.8)",
              border: "1px solid #303744",
              "&:hover": { backgroundColor: "rgba(38, 45, 56, 0.9)" },
            }}
            onClick={() => removeFile(index)}
          >
            <CloseOutlinedIcon fontSize="small" />
          </IconButton>

          <Box component="img" src={PdficonSVG} alt="pdf" sx={{ width: 40, height: 40, opacity: 0.9 }} />

          <Typography sx={{ fontSize: 12, textAlign: "center", wordBreak: "break-word", color: "#E8ECF2" }}>
            {f.name}
          </Typography>
        </Box>
      ))}

      <Box
        onClick={onAddMore}
        sx={{
          width: "100%",
          minHeight: 148,
          border: "1px dashed #303744",
          borderRadius: 2,
          backgroundColor: "#151920",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition: "border-color 0.2s ease, background-color 0.2s ease",
          "&:hover": {
            borderColor: "#E4B72C",
            backgroundColor: "rgba(228, 183, 44, 0.04)",
          },
        }}
      >
        <AddToPhotosOutlinedIcon sx={{ fontSize: 34, color: "#9AA4B2" }} />
        <Typography sx={{ mt: 1, fontSize: 12, color: "#9AA4B2" }}>Add More</Typography>
      </Box>
    </Box>
  );
}