import React, { useState } from 'react';


const Inbox = () => {
  

  return (
    <div className='w-full lg:w-3/4 xl:w-2/3 mx-auto'>
      <div className="flex items-center w-full max-w-2xl p-4 bg-white rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter a prompt here"
          className="flex-1 mr-2"
          value={inputText}
          onChange={handleInputChange}
        />
        <button className="p-2" onClick={sendTextToBackend}>
          Send
        </button>
      </div>
      {generatedText && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="text-lg font-bold">Generated Text:</h3>
          <p className="mt-2">{generatedText}</p>
        </div>
      )}
    </div>
  );
};

export default Inbox;
