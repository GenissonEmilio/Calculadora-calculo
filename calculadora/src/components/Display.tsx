interface DisplayProps {
  expression: string;
  result: string;
}

export const Display = ({ expression, result }: DisplayProps) => (
  <div className="display">
    <div className="expression">{expression}</div>
    <div className="result">{result}</div>
  </div>
);
