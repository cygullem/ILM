import { useState, useEffect } from "react";
import EditModal from "./Modal/Edit";
import DeleteModal from "./Modal/Delete";
import MarkAsDone from "./Modal/MarkAsDone";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [markAsDone, setMarkAsDone] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [doneItems, setDoneItems] = useState<number[]>([]);

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
      const newItems = [...items, input];
      setItems(newItems);
      localStorage.setItem('items', JSON.stringify(newItems));
      setInput('');
    }
  }

  const handleEditItem = (index: number, newItem: string) => {
    const newItems = [...items];
    newItems[index] = newItem;
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
    setIsEditModalOpen(false);
  };

  const handleDeleteItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
    setIsDeleteModalOpen(false);
  };

  const handleMarkAsDone = (index: number) => {
    const newDoneItems = [...doneItems, index];
    setDoneItems(newDoneItems);
    localStorage.setItem('doneItems', JSON.stringify(newDoneItems));
    setMarkAsDone(false);
  };

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#212429] scrollbar-none">
        <div className="flex flex-col items-center justify-center p-2 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
          <h1 className="text-lg text-white text-start w-full">Things to be done:</h1>

          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Item"
              className="bg-[#33353C] text-white p-2 rounded-md mt-2 w-full sm:w-[300px]"
            />

            <button
              onClick={handleAddItem}
              className="bg-[#4B5563] flex-1 text-white p-2 rounded-md mt-2 cursor-pointer active:scale-[.957]"
            >
              Add Item
            </button>
          </div>

          <div className="bg-[#33353C] flex flex-col gap-2 mt-4 w-full h-[350px] max-h-[350px] overflow-y-auto rounded-lg p-2 scrollbar-none">
            {items
              .map((item, index) => ({ item, index }))
              .sort((a, b) => Number(doneItems.includes(a.index)) - Number(doneItems.includes(b.index)))
              .map(({ item, index }) => (
                <div key={index} className={`flex items-center justify-between p-2 rounded-md text-white ${doneItems.includes(index) ? 'bg-green-700' : 'bg-[#4B5563]'}`}>
                  {item}

                  {!doneItems.includes(index) && (
                    <div className="cursor-pointer h-full flex items-center justify-center gap-1">
                      <div
                        onClick={() => { setSelectedItemId(index); setMarkAsDone(true); }}
                        className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
                        <i className="fa-solid fa-check text-sm text-green-400"></i>
                      </div>
                      <div
                        onClick={() => { setSelectedItemId(index); setIsEditModalOpen(true); }}
                        className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
                        <i
                          className="fa-solid fa-pen text-sm text-yellow-400"
                        />
                      </div>
                      <div
                        onClick={() => { setSelectedItemId(index); setIsDeleteModalOpen(true); }}
                        className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
                        <i className="fa-solid fa-trash text-sm text-red-400"></i>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>

        <EditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleEditItem}
          item={items[selectedItemId as number]}
          itemId={selectedItemId}
        />

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={() => handleDeleteItem(selectedItemId as number)}
          item={items[selectedItemId as number]}
        />

        <MarkAsDone
          isOpen={markAsDone}
          onClose={() => setMarkAsDone(false)}
          onMarkAsDone={() => handleMarkAsDone(selectedItemId as number)}
          item={items[selectedItemId as number]}
        />
      </div>
    </>
  )
}

export default App
