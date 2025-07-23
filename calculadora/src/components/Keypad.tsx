interface KeypadProps {
  onPress: (value: string) => void;
  scientificMode: boolean;
}


const basicButtons: string[] = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  '(', ')', 'C'
];

const scientificButtons: string[] = [
  'sin', 'cos', 'tan', '√',
  'π', '^', 'lim', 'd/dx'
];


export const Keypad = ({ onPress, scientificMode }: KeypadProps) => {
    const allButtons = scientificMode
    ? [...scientificButtons, ...basicButtons]
    : basicButtons;
    const getButtonClass = (value: string): string => {
        if (value === '=') return 'equal';
        if (value === 'C') return 'clear';
        if (['/', '*', '-', '+', '^', 'sin', 'cos', 'tan', 'lim', 'd/dx', '√'].includes(value)) return 'operator';
        return '';
    };

    return (
    <div className="keypad">
        {allButtons.map((btn: string, i: number) => (
        <button
            key={i}
            className={getButtonClass(btn)}
            onClick={() => onPress(btn)}
        >
            {btn}
        </button>
        ))}
    </div>
);

};
