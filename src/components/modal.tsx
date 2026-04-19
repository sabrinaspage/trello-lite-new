import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";

import "./modal.css"

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
    isOpen: boolean;
}

export const Modal = ({ onClose, children, isOpen}: ModalProps) => {
    useEffect(() => {
        if(!isOpen) return;
        const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [isOpen, onClose])

    if(!isOpen) return null;

    return createPortal(<div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>,document.body);
}