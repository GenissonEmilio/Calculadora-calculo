import { useState } from 'react';
import { Display } from './components/Display';
import { Keypad } from './components/Keypad';
import { evaluateExpression } from './logic/calculatorEngine';
import './App.css';

function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [scientificMode, setScientificMode] = useState(false);

  const toggleScientificMode = () => {
    setScientificMode(prev => !prev);
  };

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
    } else {
      setExpression(prev => prev + value);
    }
  };

  return (
    <div className="app">
      <button onClick={toggleScientificMode} className="toggle-mode">
        {scientificMode ? 'Modo Básico' : 'Modo Científico'}
      </button>

      <Display expression={expression} result={result} />
      <Keypad onPress={handleButtonPress} scientificMode={false} />
    </div>
  );
}

export default App;
