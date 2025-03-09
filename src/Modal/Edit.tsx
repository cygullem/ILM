import React, { useState, useEffect } from 'react';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (index: number, newItem: string) => void;
    item: string;
    itemId: number | null;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, onSave, item, itemId }) => {
    const [input, setInput] = useState(item);

    useEffect(() => {
        setInput(item);
    }, [item]);

    const handleSave = () => {
        if (itemId !== null) {
            onSave(itemId, input);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
            <div className="bg-[#33353C] p-6 rounded-lg shadow-xl relative w-full sm:w-96">
                <p className='text-white text-xs mb-2'>Editing: {item}</p>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className='bg-[#33353C] text-white p-2 rounded-md mt-2 w-full border border-gray-500'
                />
                <div className='flex justify-end gap-4 mt-4'>
                    <button
                        className='cursor-pointer'
                        onClick={handleSave}
                    >
                        <i className="fa-solid fa-floppy-disk text-green-200"></i>
                    </button>
                    <button
                        className='cursor-pointer'
                        onClick={onClose}
                    >
                        <i className="fa-solid fa-xmark text-red-400"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditModal;