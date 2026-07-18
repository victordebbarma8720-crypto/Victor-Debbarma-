import React from 'react';
import { StyleSheet, View } from 'react-native';
import { CalcButton } from './CalcButton';
import { CalculatorAction, Operator } from '../types';

interface KeypadProps {
  dispatch: React.Dispatch<CalculatorAction>;
}

export function Keypad({ dispatch }: KeypadProps) {
  const digit = (d: string) => dispatch({ type: 'DIGIT', payload: d });
  const operate = (op: Operator) => dispatch({ type: 'OPERATOR', payload: op });

  return (
    <View style={styles.keypad}>
      <View style={styles.row}>
        <CalcButton label="C" variant="function" onPress={() => dispatch({ type: 'CLEAR' })} />
        <CalcButton label="⌫" variant="function" onPress={() => dispatch({ type: 'DELETE' })} accessibilityLabel="Delete" />
        <CalcButton label="%" variant="function" onPress={() => dispatch({ type: 'PERCENT' })} />
        <CalcButton label="÷" variant="operator" onPress={() => operate('÷')} />
      </View>
      <View style={styles.row}>
        <CalcButton label="7" onPress={() => digit('7')} />
        <CalcButton label="8" onPress={() => digit('8')} />
        <CalcButton label="9" onPress={() => digit('9')} />
        <CalcButton label="×" variant="operator" onPress={() => operate('×')} />
      </View>
      <View style={styles.row}>
        <CalcButton label="4" onPress={() => digit('4')} />
        <CalcButton label="5" onPress={() => digit('5')} />
        <CalcButton label="6" onPress={() => digit('6')} />
        <CalcButton label="-" variant="operator" onPress={() => operate('-')} />
      </View>
      <View style={styles.row}>
        <CalcButton label="1" onPress={() => digit('1')} />
        <CalcButton label="2" onPress={() => digit('2')} />
        <CalcButton label="3" onPress={() => digit('3')} />
        <CalcButton label="+" variant="operator" onPress={() => operate('+')} />
      </View>
      <View style={styles.row}>
        <CalcButton label="0" flex={2} onPress={() => digit('0')} />
        <CalcButton label="." onPress={() => dispatch({ type: 'DECIMAL' })} />
        <CalcButton label="=" variant="equals" onPress={() => dispatch({ type: 'EQUALS' })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  keypad: {
    paddingHorizontal: 10,
    paddingBottom: 24,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
});
