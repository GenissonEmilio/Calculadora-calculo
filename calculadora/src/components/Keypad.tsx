import { AiOutlineBackward } from "react-icons/ai";
import { FaDivide, FaTimes, FaPlus, FaMinus, FaEquals } from "react-icons/fa";
import type { KeypadProps } from "../types";

export const Keypad = ({ onPress, scientificMode }: KeypadProps) => {
    const getButtonClass = (value: string): string => {
        if (value === '=') return 'equal operator';
        if (value === 'C') return 'clear';
        if (['%', '()', '1/x', 'x²', '√x'].includes(value)) return 'function';
        if (['÷', '×', '-', '+', '⌫'].includes(value)) return 'operator';
        if (['π', 'eˣ', 'mod', 'sin', 'cos', 'log'].includes(value)) return 'scientific';
        if (value === '0') return 'zero';
        return '';
    };

    return (
        <div className="keypad">
            {/* Área principal */}
            <div className="main-buttons">
                {/* Linha 1 */}
                <div className="button-row">
                    <button className="function" onClick={() => onPress('%')}>%</button>
                    <button className="function" onClick={() => onPress('()')}>()</button>
                    <button className="clear" onClick={() => onPress('C')}>C</button>
                </div>

                {/* Linha 2 */}
                <div className="button-row">
                    <button className="function" onClick={() => onPress('1/')}>1/x</button>
                    <button className="function" onClick={() => onPress('x²')}>x²</button>
                    <button className="function" onClick={() => onPress('√(')}>√x</button>
                </div>

                {/* Números */}
                <div className="button-row">
                    <button onClick={() => onPress('7')}>7</button>
                    <button onClick={() => onPress('8')}>8</button>
                    <button onClick={() => onPress('9')}>9</button>
                </div>
                <div className="button-row">
                    <button onClick={() => onPress('4')}>4</button>
                    <button onClick={() => onPress('5')}>5</button>
                    <button onClick={() => onPress('6')}>6</button>
                </div>
                <div className="button-row">
                    <button onClick={() => onPress('1')}>1</button>
                    <button onClick={() => onPress('2')}>2</button>
                    <button onClick={() => onPress('3')}>3</button>
                </div>
                <div className="last-row">
                    <button onClick={() => onPress('±')}>±</button>
                    <button className="zero" onClick={() => onPress('0')}>0</button>
                    <button onClick={() => onPress('.')}>.</button>
                </div>

                {/* Modo Científico */}
                {scientificMode && (
                    <>
                        <div className="scientific-buttons">
                            <button className="scientific" onClick={() => onPress('π')}>π</button>
                            <button className="scientific" onClick={() => onPress('eˣ')}>eˣ</button>
                            <button className="scientific" onClick={() => onPress('mod')}>mod</button>
                        </div>
                        <div className="scientific-buttons">
                            <button className="scientific" onClick={() => onPress('sin')}>sin</button>
                            <button className="scientific" onClick={() => onPress('cos')}>cos</button>
                            <button className="scientific" onClick={() => onPress('log')}>log</button>
                        </div>
                    </>
                )}
            </div>

            {/* Operações - agora com ícones */}
            <div className="operation-buttons">
                <button className="operator" onClick={() => onPress('⌫')}>
                    <AiOutlineBackward size={20} />
                </button>
                <button className="operator" onClick={() => onPress('÷')}>
                    <FaDivide size={18} />
                </button>
                <button className="operator" onClick={() => onPress('×')}>
                    <FaTimes size={18} />
                </button>
                <button className="operator" onClick={() => onPress('-')}>
                    <FaMinus size={18} />
                </button>
                <button className="operator" onClick={() => onPress('+')}>
                    <FaPlus size={18} />
                </button>
                <button className="equal operator" onClick={() => onPress('=')}>
                    <FaEquals size={18} />
                </button>
            </div>
        </div>
    );
};
