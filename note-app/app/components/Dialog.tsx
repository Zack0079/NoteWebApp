
type Props = {
    title: String;
    desc: String;
    closeButton: String;
    agreeButton: String;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

export default function Dialog({isOpen, title, desc, closeButton, agreeButton, onClose, onConfirm }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/75 z-50">
            <div className="bg-white shadow-xl p-6 w-100 shadow">

                {title && <h2 className="text-2xl mb-4 font-bold">{title}</h2>}

                {desc && <p className="text-gray-600 mb-10 ">
                    {desc}
                </p>}


                <div className="flex justify-end gap-2">
                    <button
                        className="px-4 py-2 bg-gray-200 "
                        onClick={onClose}
                    >
                        {closeButton}
                    </button>

                    <button
                        className="px-4 py-2 bg-black text-white "
                        onClick={onConfirm}
                    >
                        {agreeButton}
                    </button>
                </div>
            </div>
        </div>
    );
}