import React, { useState, useEffect } from 'react'; // Import useEffect from react
import { Button, Card, Avatar, Input } from '@material-tailwind/react';
import axios from 'axios';

export default function Chatbot() {
  const [isDefaultOpen, setDefaultOpen] = useState(true);
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [typingSpeed, setTypingSpeed] = useState(50);

  useEffect(() => {

    const typeText = () => {
      for (let i = 0; i <= generatedText.length; i++) {
        setTimeout(() => {
          setDisplayedText(generatedText.substring(0, i));
        }, typingSpeed * i);
      }
    };
    if (generatedText) {
      typeText();
    } else {
      setDisplayedText(''); 
    }
  }, [generatedText, typingSpeed]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const sendTextToBackend = async () => {

    setDefaultOpen(!isDefaultOpen);
    try {
      const response = await axios.post('http://localhost:6173/sendText', {
        text: inputText,
      });
      if (response.data.success) {
        setGeneratedText(response.data.generatedText);
      } else {
        console.error('Failed to generate text:', response.data.message);
      }

      setInputText('');
    } catch (error) {
      console.error('Error sending text:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="flex items-center justify-between h-16 px-4 border-b bg-white">
        <div className="flex items-center space-x-4">
          <button className="p-2">
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Gemini</span>
            <ChevronDownIcon className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="gradient" className="hidden md:block">
            Try Gemini Advanced
          </Button>
          <button className="p-2">
            <LayoutGridIcon className="w-6 h-6" />
          </button>
          <Avatar src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww" alt="User" />
        </div>
      </header>
      <main className="flex flex-col items-center justify-center flex-1 p-4 space-y-8">
        {isDefaultOpen && (
            <div className='w-full lg:w-3/4 xl:w-2/3 mx-auto'>
                <div className="text-center">
                <h1 className="text-4xl font-bold text-gradient">Hello,</h1>
                <p className="text-2xl text-muted">How can I help you today?</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4">
                    <p>Give me ways to add certain foods to my diet</p>
                    <FishIcon className="w-6 h-6 mt-4" />
                </Card>
                <Card className="p-4">
                    <p>Help me incorporate more plant-based options in my diet</p>
                    <TreesIcon className="w-6 h-6 mt-4" />
                </Card>
                <Card className="p-4">
                    <p>Help me write a refund email for a product that's damaged</p>
                    <MailIcon className="w-6 h-6 mt-4" />
                </Card>
                <Card className="p-4">
                    <p>Revise my writing and fix my grammar</p>
                    <FilePenIcon className="w-6 h-6 mt-4" />
                </Card>
                </div>
            </div>          
        )}

        {generatedText && (
          
          <div className='w-full lg:w-3/4 xl:w-2/3 mx-auto'>
            <h3 className="text-lg font-bold">Generated Text:</h3>
            <p className="mt-2">{displayedText}</p> 
          </div>
        )}

        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between max-w-2xl mx-auto p-4 bg-white rounded-md shadow-md">
          <Input 
          placeholder="Enter a prompt here" 
          className="flex-1 mr-2" 
          value={inputText}
          onChange={handleInputChange}
          />
          <button className="p-2 bg-white rounded-full" onClick={sendTextToBackend}>
            Send
          </button>
          <button className="p-2">
            <ImageIcon className="w-6 h-6" />
          </button>
          <button className="p-2">
            <MicIcon className="w-6 h-6" />
          </button>
        </div>
      </main>
    </div>
  );
}

function ChevronDownIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function FishIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
      <path d="M18 12v.5" />
      <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
      <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
      <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
      <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
    </svg>
  );
}

function ImageIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a5 5 0 0 1 5 5v5a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="23" />
      <line x1="8" x2="16" y1="23" y2="23" />
    </svg>
  );
}

function TreesIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
      <path d="M7 16v6" />
      <path d="M13 19v3" />
      <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5" />
    </svg>
  );
}

function FilePenIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m14 2 4 4" />
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-6-6Z" />
      <path d="M16 10.53a4 4 0 0 0-6 5.66L7 20" />
    </svg>
  );
}
