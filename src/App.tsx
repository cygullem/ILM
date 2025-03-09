import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState<string[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
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

  return (
    <>
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#212429] ">
        <div className="flex flex-col items-center justify-center p-2 rounded-lg">
          <h1 className="text-lg text-white text-start w-full">Item List</h1>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Item"
              className="bg-[#33353C] text-white p-2 rounded-md mt-2 w-[300px]"
            />

            <button
              onClick={handleAddItem}
              className="bg-[#4B5563] text-white p-2 rounded-md mt-2 cursor-pointer active:scale-[.957]"
            >
              Add Item
            </button>
          </div>

          <div className="bg-[#33353C] flex flex-col gap-2 mt-4 w-full h-[300px] max-h-[300px] overflow-y-auto rounded-lg p-2">
            {items.map((item, index) => (
              <div key={index} className="bg-[#4B5563] flex items-center justify-between p-2 rounded-md text-white">
                {item}

                <div
                  className="cursor-pointer h-full flex items-center justify-center gap-1"
                >
                  <div className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
                    <i className="fa-solid fa-pen text-sm text-yellow-400"></i>
                  </div>
                  <div className="flex items-center justify-center bg-[#33353C] p-2 rounded-md active:scale-[.957]">
                    <i className="fa-solid fa-trash text-sm text-red-400"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
