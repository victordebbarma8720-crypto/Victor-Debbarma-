import { CalculatorAction, CalculatorState, HistoryEntry, Operator } from '../types';

export const MAX_DIGITS = 12;

export const initialState: CalculatorState = {
  currentValue: '0',
  previousValue: null,
  operator: null,
  overwrite: false,
  history: [],
};

function compute(a: number, operator: Operator, b: number): number {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      return b === 0 ? NaN : a / b;
  }
}

/** Rounds away floating-point noise and returns a plain numeric string, or 'Error'. */
export function formatNumber(value: number): string {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 'Error';
  const rounded = Math.round(value * 1e8) / 1e8;
  return rounded.toString();
}

/** Adds thousands separators to a raw numeric string for display, preserving the decimal part as typed. */
export function displayValue(currentValue: string): string {
  if (currentValue === 'Error') return 'Error';
  const negative = currentValue.startsWith('-');
  const unsigned = negative ? currentValue.slice(1) : currentValue;
  const [intPart, decPart] = unsigned.split('.');
  const withCommas = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const result = decPart !== undefined ? `${withCommas}.${decPart}` : withCommas;
  return negative ? `-${result}` : result;
}

export function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'DIGIT': {
      if (state.currentValue === 'Error') {
        return { ...state, currentValue: action.payload, overwrite: false, previousValue: null, operator: null };
      }
      if (state.overwrite) {
        return { ...state, currentValue: action.payload, overwrite: false };
      }
      if (state.currentValue === '0') {
        return { ...state, currentValue: action.payload };
      }
      const digitsOnly = state.currentValue.replace('-', '').replace('.', '');
      if (digitsOnly.length >= MAX_DIGITS) return state;
      return { ...state, currentValue: state.currentValue + action.payload };
    }

    case 'DECIMAL': {
      if (state.currentValue === 'Error') {
        return { ...state, currentValue: '0.', overwrite: false, previousValue: null, operator: null };
      }
      if (state.overwrite) {
        return { ...state, currentValue: '0.', overwrite: false };
      }
      if (state.currentValue.includes('.')) return state;
      return { ...state, currentValue: state.currentValue + '.' };
    }

    case 'OPERATOR': {
      if (state.currentValue === 'Error') return state;
      if (state.operator && !state.overwrite) {
        const result = compute(state.previousValue ?? 0, state.operator, parseFloat(state.currentValue));
        const resultStr = formatNumber(result);
        return {
          ...state,
          currentValue: resultStr,
          previousValue: resultStr === 'Error' ? null : result,
          operator: resultStr === 'Error' ? null : action.payload,
          overwrite: true,
        };
      }
      return {
        ...state,
        previousValue: parseFloat(state.currentValue),
        operator: action.payload,
        overwrite: true,
      };
    }

    case 'PERCENT': {
      if (state.currentValue === 'Error') return state;
      const current = parseFloat(state.currentValue);
      // With a pending operator (e.g. 500 - 20%), % is relative to the previous value —
      // this is what makes discount/tax calculations ("price - 20%") come out correctly.
      const result =
        state.operator && state.previousValue !== null
          ? (state.previousValue * current) / 100
          : current / 100;
      return { ...state, currentValue: formatNumber(result), overwrite: false };
    }

    case 'EQUALS': {
      if (state.currentValue === 'Error' || state.operator === null || state.previousValue === null) {
        return state;
      }
      const current = parseFloat(state.currentValue);
      const result = compute(state.previousValue, state.operator, current);
      const resultStr = formatNumber(result);
      const entry: HistoryEntry = {
        id: `${Date.now()}`,
        expression: `${formatNumber(state.previousValue)} ${state.operator} ${formatNumber(current)}`,
        result: resultStr,
        timestamp: Date.now(),
      };
      return {
        ...state,
        currentValue: resultStr,
        previousValue: null,
        operator: null,
        overwrite: true,
        history: [entry, ...state.history].slice(0, 50),
      };
    }

    case 'DELETE': {
      if (state.currentValue === 'Error' || state.overwrite) {
        return { ...state, currentValue: '0', overwrite: false };
      }
      const isLastDigit =
        state.currentValue.length <= 1 || (state.currentValue.length === 2 && state.currentValue.startsWith('-'));
      if (isLastDigit) {
        return { ...state, currentValue: '0' };
      }
      return { ...state, currentValue: state.currentValue.slice(0, -1) };
    }

    case 'CLEAR':
      return { ...state, currentValue: '0', previousValue: null, operator: null, overwrite: false };

    case 'CLEAR_HISTORY':
      return { ...state, history: [] };

    case 'USE_HISTORY':
      return { ...state, currentValue: action.payload, previousValue: null, operator: null, overwrite: true };

    default:
      return state;
  }
}
