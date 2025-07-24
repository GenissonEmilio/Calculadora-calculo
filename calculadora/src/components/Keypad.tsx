import type { KeypadProps } from "../types";

const numberButtons = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '±', '0', '.'];
const operationButtons = ['÷', '×', '-', '+', '='];
const controlButtons = ['C', '⌫'];
const scientificButtons = ['sin', 'cos', 'tan', '√', 'π', '^', '()', '²'];

export const Keypad = ({ onPress, scientificMode }: KeypadProps) => {
    const getButtonClass = (value: string): string => {
        if (value === '=') return 'equal';
        if (value === 'C') return 'clear';
        if (value === '⌫') return 'backspace';
        if (operationButtons.includes(value)) return 'operator';
        if (scientificButtons.includes(value)) return 'scientific';
        return '';
    };

    return (
        <div className="keypad">
            {/* Linha superior com botão de modo e controles */}
            <div className="top-controls">
                <button 
                    className="mode-toggle" 
                    onClick={() => onPress('TOGGLE_MODE')}
                >
                    {scientificMode ? 'MB' : 'MC'}
                </button>
                <button className="clear" onClick={() => onPress('C')}>C</button>
                <button className="backspace" onClick={() => onPress('⌫')}>⌫</button>
            </div>

            {/* Área principal */}
            <div className="main-area">
                {/* Números */}
                <div className="numbers">
                    {numberButtons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => onPress(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>

                {/* Operações */}
                <div className="operations">
                    {operationButtons.map((btn) => (
                        <button
                            key={btn}
                            className={getButtonClass(btn)}
                            onClick={() => onPress(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                    
                </div>
            </div>

            {/* Botões científicos (aparecem apenas no modo científico) */}
            {scientificMode && (
                <div className="scientific-buttons">
                    {scientificButtons.map((btn) => (
                        <button
                            key={btn}
                            className="scientific"
                            onClick={() => onPress(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};