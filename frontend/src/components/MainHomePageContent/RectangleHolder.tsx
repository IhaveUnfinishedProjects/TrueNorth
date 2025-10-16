import React from "react";

interface RectangleProps {
    title: string;
    details: string;
    link: string;
    SvgImage: React.FC<React.SVGProps<SVGSVGElement>>;
}

const RectangleHolder: React.FC<RectangleProps> = ({ title, details, link, SvgImage }) => {
    return (

        /* This acts as the rectangle card container. */
        <div 
            className={`
                flex
                flex-row
                w-5/8
                h-35
                bg-[#D9D9D9]
                rounded-2xl
                shadow-lg
                py-3
                px-4
            `}
        >
                {/* The first flex box item contains the text header and explaination */}
                <div className="flex flex-col justify-between">

                    <h2 className="text-[#413737] text-2xl font-bold">
                        {title}
                    </h2>
                    <p className="text-[#413737] text-l font-medium leading-tight">
                        {details}
                    </p>
                    <a href={link} className="text-center border-1 border-white rounded-lg w-1/3">Button</a>

                </div>

                {/* The second flex item containing the SVG image */}
                <div className="flex items-center">
                     <SvgImage className="h-[100%] w-auto pl-10" />
                </div>
                
        </div>
    );
}

export default RectangleHolder;