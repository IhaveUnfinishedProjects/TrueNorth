import React, { type ReactNode } from 'react';
import "./card.css";

interface CardProps {
    children: ReactNode;
    className?: string; // Optional class name 
}

export const Card = ({ children, className="" }: CardProps) => {
    return (
        <div className={`cardDiv ${className}`}>
            {children}
        </div>
    );
}

export default Card;