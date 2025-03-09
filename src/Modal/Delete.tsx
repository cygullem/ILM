import React from 'react';

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    item: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, onClose, onDelete, item }) => {
    if (!isOpen) return null;

    return (
        <div className="z-[1000] fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm">
            <div className="bg-[#33353C] p-6 rounded-lg shadow-xl relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
                <p className='text-white text-xs mb-2'>Are you sure you want to delete: {item}?</p>
                <div className='flex justify-end gap-4 mt-4'>
                    <button
                        className='cursor-pointer'
                        onClick={onDelete}
                    >
                        <i className="fa-solid fa-check text-green-200"></i>
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

export default DeleteModal;