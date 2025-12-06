'use client';

import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [display, setDisplay] = useState('');
  const [error, setError] = useState('');

  const buttons = [
    { label: 'MR', color: 'bg-[#E07A5F]' },
    { label: 'M+', color: 'bg-[#F4A261]' },
    { label: 'M-', color: 'bg-[#E9C46A]' },
    { label: '÷', color: 'bg-[#81B29A]' },
    
    { label: '7', color: 'bg-[#9DB4C0]' },
    { label: '8', color: 'bg-[#9DB4C0]' },
    { label: '9', color: 'bg-[#9DB4C0]' },
    { label: '×', color: 'bg-[#81B29A]' },
    
    { label: '4', color: 'bg-[#9DB4C0]' },
    { label: '5', color: 'bg-[#9DB4C0]' },
    { label: '6', color: 'bg-[#9DB4C0]' },
    { label: '-', color: 'bg-[#81B29A]' },
    
    { label: '1', color: 'bg-[#9DB4C0]' },
    { label: '2', color: 'bg-[#9DB4C0]' },
    { label: '3', color: 'bg-[#9DB4C0]' },
    { label: '+', color: 'bg-[#81B29A]' },
    
    { label: '0', color: 'bg-[#9DB4C0]', span: 'col-span-2' },
    { label: 'C', color: 'bg-[#B8A9C9]' },
    { label: '=', color: 'bg-[#E07A5F]' },
  ];

  const handleButtonClick = (label: string) => {
    if (label === 'C') {
      setDisplay('');
      setError('');
    } else if (label === '=') {
      handleLogin();
    } else if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(label)) {
      setDisplay(prev => prev + label);
      setError('');
    } else if (['+', '-', '×', '÷'].includes(label)) {
      setDisplay(prev => prev + label);
      setError('');
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: display })
      });

      const data = await response.json();

      if (data.success) {
        setError('');
        setDisplay(data.username === 'MAU' ? '✦ MAU ✦' : '✦ DURU ✦');
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        setError('Invalid password');
        setDisplay('');
      }
    } catch (err) {
      setError('Login failed');
      setDisplay('');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleButtonClick(e.key);
      } else if (e.key === 'Enter') {
        handleLogin();
      } else if (e.key === 'Backspace') {
        setDisplay(prev => prev.slice(0, -1));
        setError('');
      } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        handleButtonClick('C');
      } else if (['+', '-', '*', '/'].includes(e.key)) {
        const symbol = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key;
        handleButtonClick(symbol);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display]);

  return (
    <div className="min-h-screen bg-[#F8F4F1] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="w-full max-w-sm relative z-10">
        <div 
          className="bg-[#FEFEFE] border-8 border-black p-6"
          style={{
            boxShadow: '16px 16px 0px 0px rgba(0,0,0,1)'
          }}
        >
          <div 
            className="bg-[#A8DADC] border-4 border-black p-6 mb-6 min-h-20 flex items-center justify-end"
          >
            <span className={`text-3xl font-mono font-bold text-black ${display.includes('✦') ? 'w-full text-center' : ''}`}>
              {display}
            </span>
          </div>

          {error && (
            <div className="mb-4 text-center text-red-600 font-bold">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, idx) => (
              <button
                key={idx}
                onClick={() => handleButtonClick(btn.label)}
                className={`
                  ${btn.color} 
                  ${btn.span || ''} 
                  border-4 border-black 
                  h-16 
                  text-xl 
                  font-bold 
                  text-black 
                  transition-all 
                  duration-100
                  active:translate-x-1 
                  active:translate-y-1
                  hover:opacity-90
                `}
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)'
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}