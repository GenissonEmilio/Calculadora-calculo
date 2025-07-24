import { useState } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { evaluateExpression } from './logic/calculatorEngine';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [scientificMode, setScientificMode] = useState(false);
  const [isParenthesisOpen, setIsParenthesisOpen] = useState(false);

  const handleButtonPress = (value: string) => {
    if (value === '=') {
      try {
        const calcResult = evaluateExpression(expression);
        setResult(String(calcResult));
      } catch {
        setResult('Erro');
      }
    } else if (value === 'C') {
      setExpression('');
      setResult('');
    } else if (value === '⌫') {
      setExpression(prev => prev.slice(0, -1));
    } else if (value === '±') {
      setExpression(prev => (prev.startsWith('-') ? prev.slice(1) : `-${prev}`));
    } else if (value === 'TOGGLE_MODE') {
      setScientificMode(prev => !prev);
    } else if (value === 'x²') {
      // Lógica especial para o quadrado
      setExpression(prev => {
        // Encontra o último número digitado
        const lastNumberMatch = prev.match(/(\d+\.?\d*)$/);
        if (lastNumberMatch) {
          const lastNumber = lastNumberMatch[0];
          return prev.replace(/(\d+\.?\d*)$/, `(${lastNumber})^2`);
        }
        return prev + '^2'; // Fallback caso não encontre número
      });
    } else if (value === '()') {
      setExpression(prev => {
        const lastChar = prev.slice(-1);
        const shouldOpen = !isParenthesisOpen || 
                         ['+', '-', '×', '÷', '^', '('].includes(lastChar) || 
                         prev === '';
        
        setIsParenthesisOpen(shouldOpen);
        return prev + (shouldOpen ? '(' : ')');
      })
    } else {
      setExpression(prev => prev + value);
    }
  };

  return (
    <div className="app">
      <Display expression={expression} result={result} />
      <Keypad 
        onPress={handleButtonPress} 
        scientificMode={scientificMode} 
      />
    </div>
  );
}

export default App;