import React from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { locationStore } from '../Geolocation/LocationStore';
import { observer } from 'mobx-react-lite';
import { Shift } from '../../tapy/Shift';
// Смены не отоброжаються пофиксить
const ShiftItem = ({ shift }: { shift: Shift }) => {
  return (
    <View>
      <Text style={{ fontWeight: 'bold' }}>{shift.companyName}</Text>
      <Text>{shift.address}</Text>
      <Text>
        Время: {shift.timeStartByCity} - {shift.timeStartByCity}
      </Text>
      <Text>Цена: {shift.priceWorker} </Text>
    </View>
  );
};

const ShiftList = observer(() => {
  if (locationStore.isLoading) {
    return <Text>Загрузка смен...</Text>;
  }

  return (
    <>
      <View style={{ flex: 1 }}>
        <FlatList
          data={locationStore.shifts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ShiftItem shift={item} />}
          ListEmptyComponent={<Text>Нет доступных смен</Text>}
        />
         <Button
          title="Загрузить смены"
          onPress={() => locationStore.getShiftData()}
        />
      </View>
    </>
  );
});

export default ShiftList;
