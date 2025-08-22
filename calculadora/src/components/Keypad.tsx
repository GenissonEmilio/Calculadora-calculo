import type { KeypadProps } from "../types";
import { FaDeleteLeft } from "react-icons/fa6";

export const Keypad = ({ onPress, scientificMode }: KeypadProps) => {
    

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
                            <button className="scientific" onClick={() => onPress('x!')}>x!</button>
                        </div>
                        <div className="scientific-buttons">
                            <button className="scientific" onClick={() => onPress('sin')}>sin</button>
                            <button className="scientific" onClick={() => onPress('cos')}>cos</button>
                            <button className="scientific" onClick={() => onPress('log')}>log</button>
                        </div>
                    </>
                )}
            </div>

            {/* Operações - Agora com ⌫ */}
            <div className="operation-buttons">
                <button className="operator" onClick={() => onPress('⌫')}>
                    <FaDeleteLeft size={20}/>
                </button>
                <button className="operator" onClick={() => onPress('÷')}>÷</button>
                <button className="operator" onClick={() => onPress('×')}>×</button>
                <button className="operator" onClick={() => onPress('-')}>-</button>
                <button className="operator" onClick={() => onPress('+')}>+</button>
                <button className="equal operator" onClick={() => onPress('=')}>=</button>
            </div>
        </div>
    );
};