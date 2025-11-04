import React, { type ReactNode } from 'react';
import "./card.css";

interface CardProps {
    children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
    return (
        <div className="cardDiv">
            {children}
        </div>
    );
}