import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { displayValue } from '../logic/calculator';
import { Operator } from '../types';

interface DisplayProps {
  currentValue: string;
  previousValue: number | null;
  operator: Operator | null;
  historyCount: number;
  onOpenHistory: () => void;
}

export function Display({ currentValue, previousValue, operator, historyCount, onOpenHistory }: DisplayProps) {
  const expression = previousValue !== null && operator ? `${displayValue(previousValue.toString())} ${operator}` : ' ';
  const shown = displayValue(currentValue);
  const fontSize = shown.length > 9 ? 44 : shown.length > 6 ? 56 : 72;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.historyButton}
        onPress={onOpenHistory}
        accessibilityLabel="View calculation history"
      >
        <Text style={styles.historyIcon}>🕘</Text>
        {historyCount > 0 && (
          <View style={styles.historyBadge}>
            <Text style={styles.historyBadgeText}>{historyCount > 99 ? '99+' : historyCount}</Text>
          </View>
        )}
      </TouchableOpacity>
      <Text style={styles.expression} numberOfLines={1}>
        {expression}
      </Text>
      <Text style={[styles.current, { fontSize }]} numberOfLines={1} adjustsFontSizeToFit>
        {shown}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: colors.displayBackground,
  },
  historyButton: {
    position: 'absolute',
    top: 56,
    left: 20,
    padding: 8,
  },
  historyIcon: {
    fontSize: 26,
  },
  historyBadge: {
    position: 'absolute',
    top: 2,
    right: 0,
    backgroundColor: colors.operatorBg,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyBadgeText: {
    color: colors.equalsText,
    fontSize: 10,
    fontWeight: '700',
  },
  expression: {
    color: colors.textSecondary,
    fontSize: 24,
    marginBottom: 8,
  },
  current: {
    color: colors.textPrimary,
    fontWeight: '300',
  },
});
