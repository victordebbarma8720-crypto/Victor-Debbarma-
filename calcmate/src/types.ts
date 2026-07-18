export type Operator = '+' | '-' | '×' | '÷';

export interface HistoryEntry {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  currentValue: string;
  previousValue: number | null;
  operator: Operator | null;
  overwrite: boolean;
  history: HistoryEntry[];
}

export type CalculatorAction =
  | { type: 'DIGIT'; payload: string }
  | { type: 'DECIMAL' }
  | { type: 'OPERATOR'; payload: Operator }
  | { type: 'PERCENT' }
  | { type: 'EQUALS' }
  | { type: 'DELETE' }
  | { type: 'CLEAR' }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'USE_HISTORY'; payload: string };
