import React, { useReducer, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { Display } from './src/components/Display';
import { Keypad } from './src/components/Keypad';
import { HistoryModal } from './src/components/HistoryModal';
import { calculatorReducer, initialState } from './src/logic/calculator';
import { colors } from './src/theme/colors';

export default function App() {
  const [state, dispatch] = useReducer(calculatorReducer, initialState);
  const [historyVisible, setHistoryVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ExpoStatusBar style="light" />
      <Display
        currentValue={state.currentValue}
        previousValue={state.previousValue}
        operator={state.operator}
        historyCount={state.history.length}
        onOpenHistory={() => setHistoryVisible(true)}
      />
      <Keypad dispatch={dispatch} />
      <HistoryModal
        visible={historyVisible}
        history={state.history}
        onClose={() => setHistoryVisible(false)}
        onSelect={(result) => dispatch({ type: 'USE_HISTORY', payload: result })}
        onClearHistory={() => dispatch({ type: 'CLEAR_HISTORY' })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: StatusBar.currentHeight ?? 0,
  },
});
