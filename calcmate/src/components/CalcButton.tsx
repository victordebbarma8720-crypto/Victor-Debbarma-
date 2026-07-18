import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';

export type ButtonVariant = 'number' | 'function' | 'operator' | 'equals';

interface CalcButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  flex?: number;
  accessibilityLabel?: string;
}

const VARIANT_STYLES: Record<ButtonVariant, { bg: string; text: string }> = {
  number: { bg: colors.numberBg, text: colors.numberText },
  function: { bg: colors.functionBg, text: colors.functionText },
  operator: { bg: colors.operatorBg, text: colors.operatorText },
  equals: { bg: colors.equalsBg, text: colors.equalsText },
};

export function CalcButton({ label, onPress, variant = 'number', flex = 1, accessibilityLabel }: CalcButtonProps) {
  const { bg, text } = VARIANT_STYLES[variant];
  const style: ViewStyle = { flex, backgroundColor: bg };

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Text style={[styles.label, { color: text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 72,
    borderRadius: 20,
    marginHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 28,
    fontWeight: '500',
  },
});
