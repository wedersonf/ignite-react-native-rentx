import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from './styles';

export function Profile(){
  const theme = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  function handleBack() {
    navigation.goBack();
  }

  function handleSignOut() {
    navigation.goBack();
  }

  function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
    setOption(optionSelected);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton 
                color={theme.colors.shape} 
                onPress={handleBack} 
              />
              <HeaderTitle>Editar Perfil</HeaderTitle>
              <LogoutButton onPress={handleSignOut}>
                <Feather 
                  name="power" 
                  size={24} 
                  color={theme.colors.shape} 
                />
              </LogoutButton>
            </HeaderTop>

            <PhotoContainer>
              <Photo 
                source={{ uri: 'https://avatars.githubusercontent.com/u/6026604?v=4' }} 
              />
              <PhotoButton onPress={() => {}} >
                <Feather
                  name="camera"
                  size={24}
                  color={theme.colors.shape}
                />
              </PhotoButton>
            </PhotoContainer>
          </Header>
        
          <Content style={{ marginBottom: useBottomTabBarHeight()}}>
            <Options>
              <Option
                onPress={() => handleOptionChange('dataEdit')}
                active={option === 'dataEdit'}
              >
                <OptionTitle active={option === 'dataEdit'}>
                  Dados
                </OptionTitle>
              </Option>
              <Option
                onPress={() => handleOptionChange('passwordEdit')}
                active={option === 'passwordEdit'}
              >
                <OptionTitle active={option === 'passwordEdit'}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
          
            {option === 'dataEdit' ? 
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  keyboardType="numeric"
                  defaultValue={user.driver_license}
                />
              </Section>
              :
              <Section>
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Nova senha"
                />
                <PasswordInput
                  iconName="lock"
                  placeholder="Senha atual"
                />
              </Section>
            }

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
