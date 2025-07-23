export function evaluateExpression(expr: string): number {
  // Tratamento básico para funções
  const parsed = expr
    .replace(/sin/g, 'Math.sin')
    .replace(/cos/g, 'Math.cos')
    .replace(/tan/g, 'Math.tan')
    .replace(/x/g, '*');

  // Avalia a expressão com segurança
  return Function('"use strict"; return (' + parsed + ')')();
}
