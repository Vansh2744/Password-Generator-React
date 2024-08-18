import { useState, useRef, useCallback, useEffect } from "react";
function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeChar, setIncludeChar] = useState(false);
  const copyRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (includeNumber) {
      str += "0123456789";
    }
    if (includeChar) {
      str += "!@#$%^&*(){}[]";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random()*str.length + 1));
    }
    setPassword(pass);
  }, [length, includeNumber, includeChar]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword, length, includeNumber, includeChar]);

  const copyClipboard=()=>{
       window.navigator.clipboard.writeText(password);
       copyRef.current?.select()
//     copyRef.current?.setSelectionRange(0,3);
  }

  return (
    <>
      <div className="bg-slate-900 w-screen h-svh flex flex-col text-center">
        <h1 className="h-8 text-white mt-10 text-4xl">PASSWORD GENERATOR</h1>
        <div className="bg-slate-600 w-7/12 h-96 text-white mt-14 rounded-lg m-auto">
          <div className="flex flex-col gap-10">
            <div className="flex flex-row justify-center text-center">
              <input
                className="mt-10 w-5/12 h-10 rounded-s-md text-center text-black text-lg"
                type="text"
                placeholder="password"
                value={password}
                readOnly
                ref={copyRef}
              />
              <button onClick={copyClipboard} className="bg-blue-600 w-20 h-10 mt-10 rounded-e-md hover:bg-blue-500 focus:bg focus:bg-blue-800">
                Copy
              </button>
            </div>
            <div className="flex gap-10 justify-around">
              <div>
                <input
                  type="range"
                  max={100}
                  min={8}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
                <label>length:{length}</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={() => setIncludeNumber((prev) => !prev)}
                />
                <label>Numbers</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  onChange={() => setIncludeChar((prev) => !prev)}
                />
                <label>Character</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
