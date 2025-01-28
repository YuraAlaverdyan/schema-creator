import React, { ReactNode } from "react";
import { Modal as ModalMUI, Box } from "@mui/material";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  children: ReactNode;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, children, onClose }) => {
  return ReactDOM.createPortal(
    <ModalMUI open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        {children}
      </Box>
    </ModalMUI>,
    document.body
  );
};
