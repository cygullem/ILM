import { useState, useEffect } from "react";
import EditModal from "./Modal/Edit";
import DeleteModal from "./Modal/Delete";
import MarkAsDone from "./Modal/MarkAsDone";

function App() {
	const [items, setItems] = useState<{ id: number, value: string }[]>([]);
	const [doneItems, setDoneItems] = useState<number[]>([]);
	const [input, setInput] = useState('');
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [markAsDone, setMarkAsDone] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

	useEffect(() => {
		const storedItems = localStorage.getItem('items');
		const storedDoneItems = localStorage.getItem('doneItems');
		if (storedItems) {
			setItems(JSON.parse(storedItems));
		}
		if (storedDoneItems) {
			setDoneItems(JSON.parse(storedDoneItems));
		}
	}, []);

	const handleAddItem = () => {
		if (input.trim() !== "") {
			const newItem = { id: Date.now(), value: input };
			const newItems = [...items, newItem];
			setItems(newItems);
			localStorage.setItem('items', JSON.stringify(newItems));
			setInput('');
		}
	};

	const handleEditItem = (id: number, newValue: string) => {
		const updatedItems = items.map(item =>
			item.id === id ? { ...item, value: newValue } : item
		);
		setItems(updatedItems);
		localStorage.setItem('items', JSON.stringify(updatedItems));
		setIsEditModalOpen(false);
	};

	const handleDeleteItem = (id: number) => {
		const updatedItems = items.filter(item => item.id !== id);
		setItems(updatedItems);
		localStorage.setItem('items', JSON.stringify(updatedItems));

		const updatedDoneItems = doneItems.filter(doneId => doneId !== id);
		setDoneItems(updatedDoneItems);
		localStorage.setItem('doneItems', JSON.stringify(updatedDoneItems));

		setIsDeleteModalOpen(false);
	};

	const handleMarkAsDone = (id: number) => {
		const updatedDoneItems = [...doneItems, id];
		setDoneItems(updatedDoneItems);
		localStorage.setItem('doneItems', JSON.stringify(updatedDoneItems));
		setMarkAsDone(false);
	};

	const handleDeleteDoneItem = (id: number) => {
		// Remove from doneItems
		const newDoneItems = doneItems.filter(doneItem => doneItem !== id);
		setDoneItems(newDoneItems);
		localStorage.setItem('doneItems', JSON.stringify(newDoneItems));

		// Also remove from items
		const updatedItems = items.filter(item => item.id !== id);
		setItems(updatedItems);
		localStorage.setItem('items', JSON.stringify(updatedItems));
	};


	return (
		<>
			<div className="home-bg h-screen w-full flex flex-col items-center justify-center bg-[#212429] scrollbar-none">
				<div className="flex flex-col items-center justify-center p-2 rounded-lg w-full sm:w-[400px] md:w-[500px] lg:w-1/3">
					<h1 className="home-text text-lg text-white text-start w-[700px]">Things to be done:</h1>

					<div className="action flex flex-col sm:flex-row gap-2 w-[700px]">
						<input
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
							placeholder="Enter Item"
							className="bg-[#33353C] text-white p-2 rounded-md mt-2 w-full sm:w-[300px] flex-1"
						/>

						<button
							onClick={handleAddItem}
							className="bg-[#4B5563] text-white p-2 rounded-md mt-2 cursor-pointer active:scale-[.957]"
						>
							Add Item
						</button>
					</div>

					<div className="flex flex-col-sm sm:flex-row items-start justify-center gap-2 w-[700px]">
						{/* To Do List */}
						<div className="bg-[#33353C] flex flex-col gap-2 mt-4 w-full h-[350px] max-h-[350px] overflow-y-auto rounded-lg p-2 scrollbar-none">
							<p className="text-white text-sm">TO DO</p>
							{items
								.filter(item => !doneItems.includes(item.id))
								.map(item => (
									<div key={item.id} className="flex items-center justify-between p-2 rounded-md text-white bg-[#4B5563]">
										{item.value}
										<div className="cursor-pointer h-full flex items-center justify-center gap-1">
											<div
												onClick={() => { setSelectedItemId(item.id); setMarkAsDone(true); }}
												className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
												<i className="fa-solid fa-check text-sm text-green-400"></i>
											</div>
											<div
												onClick={() => { setSelectedItemId(item.id); setIsEditModalOpen(true); }}
												className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
												<i className="fa-solid fa-pen text-sm text-yellow-400" />
											</div>
											<div
												onClick={() => { setSelectedItemId(item.id); setIsDeleteModalOpen(true); }}
												className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
												<i className="fa-solid fa-trash text-sm text-red-400"></i>
											</div>
										</div>
									</div>
								))}
						</div>

						{/* Done List */}
						<div className="bg-[#33353C] flex flex-col gap-2 mt-4 w-full h-[350px] max-h-[350px] overflow-y-auto rounded-lg p-2 scrollbar-none">
							<p className="text-white text-sm">ALREADY DONE</p>
							{doneItems
								.map(id => {
									const item = items.find(item => item.id === id);
									return item && (
										<div key={id} className="flex items-center justify-between p-2 rounded-md text-white bg-green-700">
											{item.value}
											<div
												onClick={() => handleDeleteDoneItem(id)}
												className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957] cursor-pointer"
											>
												<i className="fa-solid fa-trash text-sm text-red-400"></i>
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</div>

				{/* Modals */}
				<EditModal
					isOpen={isEditModalOpen}
					onClose={() => setIsEditModalOpen(false)}
					onSave={handleEditItem}
					item={items.find(item => item.id === selectedItemId)?.value || ""}
					itemId={selectedItemId}
				/>

				<DeleteModal
					isOpen={isDeleteModalOpen}
					onClose={() => setIsDeleteModalOpen(false)}
					onDelete={() => handleDeleteItem(selectedItemId as number)}
					item={items.find(item => item.id === selectedItemId)?.value || ""}
				/>

				<MarkAsDone
					isOpen={markAsDone}
					onClose={() => setMarkAsDone(false)}
					onMarkAsDone={() => handleMarkAsDone(selectedItemId as number)}
					item={items.find(item => item.id === selectedItemId)?.value || ""}
				/>
			</div>
		</>
	);
}

export default App;
