import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

const MAPPING = {
  'home.fill': 'home',
  'person-add.fill': 'person-add',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
} as Partial<
  Record<
    import('expo-symbols').SymbolViewProps['name'],
    React.ComponentProps<typeof MaterialIcons>['name']
  >
>;

export type IconSymbolName = keyof typeof MAPPING;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
}) {
  if (!MAPPING[name]) {
    console.warn(`O nome do ícone "${name}" não está mapeado em MAPPING.`);
  }

  return (
    <MaterialIcons
      style={style}
      color={color}
      size={size}
      name={MAPPING[name] || 'help-outline'}
    />
  );
}
