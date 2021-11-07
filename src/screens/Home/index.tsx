import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNetInfo } from '@react-native-community/netinfo';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
  Container,
  Header,
  TotalCars,
  CarList,
} from './styles';

import api from '../../service/api';
import { CarDTO } from '../../dtos/CarDTO';

export function Home(){
  const navigation = useNavigation();
  const netInfo = useNetInfo();

  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate('CarDetails', { car });
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        if (isMounted) {
          setCars(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if(isMounted) {
          setLoading(false);
        }
      }
    }

    fetchCars();

    return () => {
      isMounted = false;
    }
  }, []);

  useEffect(() => {
    if (netInfo.isConnected) {
      Alert.alert('Voce esta online');
    } else {
      Alert.alert('Voce esta offline');
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Logo
          width={RFValue(108)}
          height={RFValue(12)}
        />

        {!loading && (
          <TotalCars>
            Total de {cars.length} carro{cars.length === 1 ? '' : 's'}
          </TotalCars>
        )}
      </Header>
      { loading 
        ? <LoadAnimation /> 
        : <CarList
            data={cars}
            keyExtractor={item => item.id}
            renderItem={({ item }) => 
              <Car data={item} onPress={() => handleCarDetails(item)} />
            }
          />
      }
    </Container>
  );
}
