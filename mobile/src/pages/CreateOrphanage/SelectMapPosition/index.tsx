import React, { useCallback, useState } from 'react';
import { View, Text } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker, MapEvent } from 'react-native-maps';

import mapMarkerImg from '../../../images/map-marker.png';

import styles from './styles';

const SelectMapPosition: React.FC = () => {
  const navigation = useNavigation();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
  });

  const hasPositionSelected = position.latitude !== 0;

  const handleNextStep = useCallback(() => {
    navigation.navigate('OrphanageData', { position });
  }, [position]);

  const handleSelectMapPosition = useCallback((event: MapEvent) => {
    setPosition(event.nativeEvent.coordinate);
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: -24.0020616,
          longitude: -46.4182875,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
        style={styles.mapStyle}
        onPress={handleSelectMapPosition}
      >
        {hasPositionSelected && (
          <Marker
            icon={mapMarkerImg}
            coordinate={{
              latitude: position.latitude,
              longitude: position.longitude,
            }}
          />
        )}
      </MapView>

      {hasPositionSelected && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
          <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
      )}
    </View>
  );
};

export default SelectMapPosition;
