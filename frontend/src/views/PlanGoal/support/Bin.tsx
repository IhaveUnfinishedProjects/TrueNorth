import BinSVG from "@assets/binButton.svg?react";
import type { Step } from "./Data.js";

interface BinImageProps {
    step: Step;
    remove: (step: Step) => void;
};

export const BinImage: React.FC<BinImageProps> = ({ step, remove }) => {
    return (
        <button className="contents" onClick={() => remove(step)}>
            <BinSVG className="text-brown-900 w-6 h-6 mb-[2.6rem]"/>
        </button>
    );
}

export default BinImage;