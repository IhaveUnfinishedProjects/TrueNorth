export default function Empty() {
    return (
        <div className="flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Hey, it looks kinda empty in here.
                </h2>
                <p className="text-gray-600">Start by creating a goal</p>
            </div>
        </div>
    );
}