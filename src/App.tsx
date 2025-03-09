import { useState } from "react";
function App() {
  const [ items, setItems ] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleAddItem = () => {
    if(input.trim() !== ""){
      setItems([...items, input]);
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
              <div key={index} className="bg-[#4B5563] p-2 rounded-md text-white">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
