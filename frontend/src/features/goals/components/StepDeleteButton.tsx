import BinSVG from "@assets/binButton.svg?react";
import type { Step } from "@features/index.js";

interface BinImageProps {
    step: Step;
    remove: (step: Step) => void;
};

export const BinImage: React.FC<BinImageProps> = ({ step, remove }) => {
    return (
        <button className="contents" onClick={() => remove(step)}>
            <BinSVG className="text-brown-900 w-[1.4rem] h-[1.4rem] ml-[1rem] mr-[1rem]"/>
        </button>
    );
}

export default BinImage;