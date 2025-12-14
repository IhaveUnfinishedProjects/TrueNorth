/**
 * Specifies the properties the buttons
 * for a modal can take. 
 * text is the display,
 * route is an option link / route to somewhere
 * name is the buttons html name.
 */
export interface ModalButtonProps {
    text: string;
    route?: string;
    name?: string;
}