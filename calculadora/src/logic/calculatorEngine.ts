// calculatorEngine.ts

// ===== Função fatorial para auxiliar nas séries de Taylor =====
// Calcula n! (fatorial de n)
function factorial(n: number): number {
  if (n === 0 || n === 1) return 1; // 0! e 1! são 1
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i; // Multiplica result por i a cada iteração
  }
  return result;
}

// Validação extra para fatorial (n inteiro e não negativo)
function factorialFunc(x: number): number {
  if (x < 0) throw new Error('Fatorial de número negativo');
  if (!Number.isInteger(x)) throw new Error('Fatorial de número não inteiro');
  
  let result = 1;
  for (let i = 2; i <= x; i++) {
    result *= i; // Multiplicação iterativa para calcular fatorial
  }
  return result;
}

// ===== Converter graus para radianos =====
function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180); // Fórmula: radianos = graus * π/180
}

// ===== Seno usando série de Taylor =====
// Aproxima o seno de um ângulo em graus
function taylorSin(x: number): number {
  // Primeiro Converter graus para radianos
  const radians = degreesToRadians(x); // Converter para radianos
  let normalized = radians % (2 * Math.PI); // Normalizar para ciclo de 2π
  if (normalized > Math.PI) normalized -= 2 * Math.PI;
  if (normalized < -Math.PI) normalized += 2 * Math.PI;
  
  let result = 0;
  const terms = 12; // Número de termos da série de Taylor
  
  // Série de Taylor: sin(x) ≈ Σ (-1)^n * x^(2n+1)/(2n+1)!
  for (let n = 0; n < terms; n++) {
    const term = Math.pow(-1, n) // Alterna sinal (+/-)
     * Math.pow(normalized, 2 * n + 1) // Potência: x^(2n+1)
     / factorial(2 * n + 1); // Divide pelo fatorial correspondente
    result += term; // Soma cada termo da série
  }
  
  return result;
}

// ===== Cosseno usando série de Taylor =====
function taylorCos(x: number): number {
  // Converter graus para radianos
  const radians = degreesToRadians(x);
  
  // Reduzir o ângulo para o intervalo [-π, π]
  let normalized = radians % (2 * Math.PI);
  if (normalized > Math.PI) normalized -= 2 * Math.PI;
  if (normalized < -Math.PI) normalized += 2 * Math.PI;
  
  let result = 0;
  const terms = 12;
  
  // Série de Taylor: cos(x) ≈ Σ (-1)^n * x^(2n)/(2n)!
  for (let n = 0; n < terms; n++) {
    const term = Math.pow(-1, n) * Math.pow(normalized, 2 * n) / factorial(2 * n);
    result += term;
  }
  
  return result;
}

// ===== Logaritmo na base 10 usando série de Taylor =====
function taylorLog10(x: number): number {
  if (x <= 0) throw new Error('Logaritmo de número não positivo');
  
  let count = 0;
  let tempX = x;
  
  // Ajusta x para ficar no intervalo [1, 10) usando propriedades de log
  while (tempX >= 10) {
    tempX /= 10;
    count++;
  }
  
  while (tempX < 1) {
    tempX *= 10;
    count--;
  }
  
  // Se ainda maior que 2, divide por 10 novamente
  if (tempX > 2) {
    tempX /= 10;
    count++;
  }
  
  const z = tempX - 1; // Série de Taylor para ln(1+z)
  let result = 0;
  const terms = 30; // Mais termos para maior precisão
  const ln10 = 2.302585092994046; // ln(10)
  
  // Série de Taylor: ln(1+z) ≈ Σ (-1)^(n+1) * z^n / n
  for (let n = 1; n <= terms; n++) {
    const term = Math.pow(-1, n + 1) * Math.pow(z, n) / (n * ln10); // Divide por ln10 para converter para log10
    result += term;
  }
  
  // Adicionar o contador (propriedade: log₁₀(10ⁿ * x) = n + log₁₀(x))
  return count + result; // Ajusta pelo multiplicador de potência de 10
}

// ===== Exponencial usando série de Taylor =====
function taylorExp(x: number): number {
  // Para valores grandes, usa e^x = (e^(x/2))^2 para melhor convergência
  if (x > 1) {
    const halfExp = taylorExp(x / 2);
    return halfExp * halfExp;
  }
  
  // Para valores negativos, usa e^(-x) = 1 / e^x
  if (x < 0) {
    return 1 / taylorExp(-x);
  }
  
  let result = 0;
  const terms = 30;
  
  // Série de Taylor: e^x ≈ Σ x^n / n!
  for (let n = 0; n < terms; n++) {
    result += Math.pow(x, n) / factorial(n); // Math.pow(x,n) = x^n
  }
  
  return result;
}

// ===== Avaliar expressão com funções personalizadas =====
export function evaluateExpression(expr: string): number {
  const processFunctions = (expression: string): string => {
    let processed = expression;

    // Substitui factorial(...) pela função factorialFunc
    processed = processed.replace(/factorial\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(factorialFunc(innerValue));
      } catch (e) {
        console.error('Erro em factorial:', e);
        return match;
      }
    });
    
    // Substitui sin(...) pela função taylorSin
    processed = processed.replace(/sin\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorSin(innerValue));
      } catch (e) {
        console.error('Erro em sin:', e);
        return match;
      }
    });
    
    // Substitui cos(...) pela função taylorCos
    processed = processed.replace(/cos\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorCos(innerValue));
      } catch (e) {
        console.error('Erro em cos:', e);
        return match;
      }
    });
    
    // Substitui log(...) pela função taylorLog10
    processed = processed.replace(/log\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        const result = taylorLog10(innerValue);
        return String(result);
      } catch (e) {
        console.error('Erro em log:', e, 'inner:', inner);
        return match;
      }
    });
    
    // Substitui e^(...) pela função taylorExp
    processed = processed.replace(/e\^\(([^()]+)\)/g, (match, inner) => {
      try {
        const innerValue = evaluateSimpleExpression(inner);
        return String(taylorExp(innerValue));
      } catch (e) {
        console.error('Erro em e^:', e);
        return match;
      }
    });
    
    return processed;
  };

  // Função auxiliar para avaliar expressões simples
  function evaluateSimpleExpression(simpleExpr: string): number {
    const parsed = simpleExpr
      .replace(/√/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/\^/g, '**')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '**2')
      .replace(/x³/g, '**3');

    try {
      return Function('"use strict"; return (' + parsed + ')')();
    } catch (e) {
      console.error('Erro em expressão simples:', e, 'expr:', simpleExpr);
      throw new Error('Expressão interna inválida');
    }
  }

  try {
    // Primeiro processa as funções personalizadas
    const processedExpr = processFunctions(expr);
    
    // Processa funções e depois avalia expressão final
    const finalParsed = processedExpr
      .replace(/√/g, 'Math.sqrt')
      .replace(/π/g, 'Math.PI')
      .replace(/\^/g, '**')
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/²/g, '**2')
      .replace(/x³/g, '**3');

    const result = Function('"use strict"; return (' + finalParsed + ')')();
    return result;
  } catch (e) {
    console.error('Erro na avaliação final:', e, 'expr:', expr);
    throw new Error('Expressão inválida');
  }
}