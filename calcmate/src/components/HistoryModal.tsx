import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../theme/colors';
import { displayValue } from '../logic/calculator';
import { HistoryEntry } from '../types';

interface HistoryModalProps {
  visible: boolean;
  history: HistoryEntry[];
  onClose: () => void;
  onSelect: (result: string) => void;
  onClearHistory: () => void;
}

export function HistoryModal({ visible, history, onClose, onSelect, onClearHistory }: HistoryModalProps) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>History</Text>
            <View style={styles.headerActions}>
              {history.length > 0 && (
                <TouchableOpacity onPress={onClearHistory} accessibilityLabel="Clear history">
                  <Text style={styles.clearText}>Clear</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={onClose} accessibilityLabel="Close history" style={styles.closeButton}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>

          {history.length === 0 ? (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No calculations yet</Text>
            </View>
          ) : (
            <FlatList
              data={history}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.entry}
                  onPress={() => {
                    onSelect(item.result);
                    onClose();
                  }}
                >
                  <Text style={styles.entryExpression} numberOfLines={1}>
                    {item.expression}
                  </Text>
                  <Text style={styles.entryResult} numberOfLines={1}>
                    = {displayValue(item.result)}
                  </Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.historyBackground,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '70%',
    paddingTop: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: '600',
  },
  clearText: {
    color: colors.danger,
    fontSize: 15,
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    color: colors.textSecondary,
    fontSize: 18,
  },
  empty: {
    paddingVertical: 48,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  entry: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: colors.historyEntryBorder,
  },
  entryExpression: {
    color: colors.textSecondary,
    fontSize: 14,
    marginBottom: 4,
  },
  entryResult: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: '500',
  },
});
