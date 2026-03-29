import { Box, Modal, Typography } from "@mui/material";
import { Document, Page } from 'react-pdf';

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
            <Box>
                <Typography>Pdf Viewer</Typography>
                {file &&
                    <Document 
                        file={file.url}
                    >
                        <Page pageNumber={1}/>
                    </Document>
                }
            </Box>
        </Modal>
    )
}