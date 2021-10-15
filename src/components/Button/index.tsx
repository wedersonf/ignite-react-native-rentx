import React from 'react';

import {
  Container,
  Title
} from './styles';

interface Props {
  title: string;
  color?: string;
  onPress: () => void;
  enabled?: boolean;
}

export function Button({
  title,
  color,
  onPress,
  enabled = true,
  ...rest
}: Props){
  return (
    <Container 
      {...rest} 
      color={color}
      onPress={onPress}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : .5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
}
