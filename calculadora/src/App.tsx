import { useState, useEffect } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { evaluateExpression } from './logic/calculatorEngine';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'basic' | 'scientific'>('basic');
  const [_isParenthesisOpen, setIsParenthesisOpen] = useState(false);

  // 🔹 extraímos a lógica do "=" para uma função separada
  const calculateResult = () => {
    try {
      const calcResult = evaluateExpression(expression);
      setResult(String(calcResult));
    } catch {
      setResult('Erro');
    }
  };

  const handleButtonPress = (value: string) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '±') {
      setExpression(prev => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
    } else if (value === 'TOGGLE_MODE') {
      setMode(prev => prev === 'basic' ? 'scientific' : 'basic');
    } else if (value === 'eˣ') {
      setExpression(prev => prev + 'e^(');
      setIsParenthesisOpen(true);
    } else if (value === 'log') {
      setExpression(prev => prev + 'log(');
      setIsParenthesisOpen(true);
    } else if (value === 'sin') {
      setExpression(prev => prev + 'sin(');
      setIsParenthesisOpen(true);
    } else if (value === 'x!') {
      setExpression(prev => {
        const lastNumberMatch = prev.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          return prev.replace(/(\d+\.?\d*)$/, `factorial(${lastNumber})`);
        }
        return prev + 'factorial(';
      });
    } else if (value === 'cos') {
      setExpression(prev => prev + 'cos(');
      setIsParenthesisOpen(true);
    } else if (value === '()') {
      setExpression(prev => {
        const openCount = (prev.match(/\(/g) || []).length;
        const closeCount = (prev.match(/\)/g) || []).length;
        const isOpen = openCount > closeCount;
        
        if (isOpen) {
          setIsParenthesisOpen(false);
          return prev + ')';
        } else {
          const lastChar = prev.slice(-1);
          const canOpen = ['+', '-', '×', '÷', '^', '(', ''].includes(lastChar) || 
                        /[0-9]/.test(lastChar) === false;
          
          setIsParenthesisOpen(canOpen);
          return prev + (canOpen ? '(' : '×(');
        }
      });
    } else if (value === 'x²') {
      setExpression(prev => {
        const lastNumberMatch = prev.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          return prev.replace(/(\d+\.?\d*)$/, `(${lastNumber})^2`);
        }
        return prev + '^2';
      });
    } else {
      setExpression(prev => prev + value);
    }
  };

  // 🟢 Captura teclado físico
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (/^[0-9]$/.test(key)) {
        handleButtonPress(key);
      } else if (['+', '-', '*', '/', '^'].includes(key)) {
        handleButtonPress(key === '*' ? '×' : key === '/' ? '÷' : key);
      } else if (key === 'Enter') {
        event.preventDefault(); // evita submit em forms
        calculateResult(); // chama a mesma lógica do "="
      } else if (key === 'Backspace') {
        handleButtonPress('⌫');
      } else if (key === '.') {
        handleButtonPress('.');
      } else if (key === '(' || key === ')') {
        handleButtonPress('()');
      } else if (key === '%') {
        handleButtonPress('%');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  return (
    <div className="app">
      <div className="tabs">
        <button 
          className={`tab ${mode === 'basic' ? 'active' : ''}`}
          onClick={() => setMode('basic')}
        >
          Básica
        </button>
        <button 
          className={`tab ${mode === 'scientific' ? 'active' : ''}`}
          onClick={() => setMode('scientific')}
        >
          Científica
        </button>
      </div>
      <div className="calculator-container">
        <Display expression={expression} result={result} />
        <Keypad 
          onPress={handleButtonPress} 
          scientificMode={mode === 'scientific'} 
        />
      </div>
    </div>
  );
}

export default App;
