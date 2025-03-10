import React from 'react';

interface MarkAsDoneProps {
    isOpen: boolean;
    onClose: () => void;
    onMarkAsDone: () => void;
    item: string;
}

const MarkAsDone: React.FC<MarkAsDoneProps> = ({ isOpen, onClose, onMarkAsDone, item }) => {
    if (!isOpen) return null;

    return (
        <div className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
            <div className="bg-[#33353C] p-6 rounded-lg shadow-xl relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                <p className='text-white text-xs mb-2'>Mark as done: {item}?</p>
                <div className='flex justify-end gap-4 mt-4'>
                    <button
                        className='cursor-pointer'
                        onClick={onMarkAsDone}
                    >
                        <i className="fa-solid fa-check text-green-400"></i>
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
}

export default MarkAsDone;