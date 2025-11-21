import React, { type ReactNode } from 'react';
import "./card.css";

interface CardProps {
    children: ReactNode;
}

export const Card = ({ children }: CardProps) => {
    return (
        <div className="cardDiv">
            {children}
        </div>
    );
}

export default Card;