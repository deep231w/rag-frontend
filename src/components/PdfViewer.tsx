import { Box, Modal, Typography } from "@mui/material";
import { Document, Page } from 'react-pdf';
import { pdfjs } from "react-pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker?url";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

type Props = {
    open: boolean;
    onClose: () => void;
    file: any;
};
export  function PdfViewer({open, onClose ,file}:Props){
    console.log("file in pdf viewer- ", file);
    return(
        <Modal
            open={open}
            onClose={onClose}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "80%",
                    height: "80%",
                    bgcolor: "background.paper",
                    p: 2,
                    overflow: "auto"
                }}
            >
                <Typography>Pdf Viewer</Typography>
                {file &&
                    <iframe src={file.url} width="100%" height="100%" />
                }
            </Box>
        </Modal>
    )
}