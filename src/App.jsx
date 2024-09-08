import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]?";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    navigator.clipboard.writeText(password);
  };

  // useEffect(() => {
  //   passwordGenerator()
  // }, [length, numberAllowed, charAllowed, passwordGenerator]);



  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-lg rounded-lg p-6 mt-10 bg-gray-800 text-white'>
        <h1 className='text-3xl font-semibold text-center mb-6'>Password Generator</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input
            type="text"
            value={password}
            className='outline-none w-full py-2 px-4 bg-gray-900 text-white text-lg'
            placeholder='Generated Password'
            readOnly
            ref={passwordRef}
          />
          <button 
            className='outline-none bg-blue-600 hover:bg-blue-700 transition-colors px-4 py-2 text-white text-lg'
            // onClick={() => navigator.clipboard.writeText(password)}
            onClick={copyPasswordToClipboard}
          >
            Copy
          </button>
        </div>

        <div className='mb-5'>
          <label className='block text-lg font-medium mb-2'>Length: {length}</label>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='w-full cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
          />
        </div>

        <div className='flex flex-col gap-y-3'>
          <div className='flex items-center'>
            <input
              type="checkbox"
              checked={numberAllowed}
              className='cursor-pointer mr-2'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label className='text-lg'>Include Numbers</label>
          </div>

          <div className='flex items-center'>
            <input
              type="checkbox"
              checked={charAllowed}
              className='cursor-pointer mr-2'
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label className='text-lg'>Include Special Characters</label>
          </div>
        </div>

        <button 
          className='w-full mt-6 bg-green-600 hover:bg-green-700 transition-colors py-2 rounded text-lg font-semibold'
          onClick={passwordGenerator}
        >
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
