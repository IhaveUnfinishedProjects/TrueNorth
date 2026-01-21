import BinSVG from "@assets/binButton.svg?react";

interface BinImageProps <T> {
    item: T;
    remove: (remove: T) => void;
};

export const BinImage = <T,>({ item, remove }: BinImageProps<T>) => {
    return (
        <button className="contents" onClick={() => remove(item)}>
            <BinSVG className="bin-button text-brown-900 w-[1.4rem] h-[1.4rem]"/>
        </button>
    );
}

export default BinImage;
