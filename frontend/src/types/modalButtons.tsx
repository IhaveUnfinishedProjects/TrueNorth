/* 
    This provides the interface for the 
    props that are passed into the Modal.tsx
    file, which specify the display text and 
    destination for the modal buttons.
*/ 

export interface ModalButtonProps {
    text: string;
    route?: string;
}