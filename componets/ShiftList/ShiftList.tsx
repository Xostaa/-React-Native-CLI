import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { locationStore } from '../Geolocation/LocationStore';
import { observer } from 'mobx-react-lite';
import { CastomButton } from '../../shared/CastomButton';
import { Shift } from '../../tapy/Shift';
import { moreDetailed } from '../Stores/MoreDetailedStore';
// Смены не отоброжаються пофиксить
const ShiftItem = ({ shift }: { shift: Shift }) => {
  return (
    <View style={style.container}>
      <Text style={style.companyName}>{shift.companyName}</Text>
      <Text>{shift.address}</Text>
      <Text>
        Время: {shift.timeStartByCity} - {shift.timeStartByCity}
      </Text>
      <Text>Цена: {shift.priceWorker} </Text>

      {moreDetailed.status && (
        <>
          <Text>ТУТ БУДЕТ ПОДРОБНОЕ ОПИСАНИЕ</Text>
          <Text>ТУТ БУДЕТ ПОДРОБНОЕ ОПИСАНИЕ</Text>
          <Text>ТУТ БУДЕТ ПОДРОБНОЕ ОПИСАНИЕ</Text>
        </>
      )}
      <CastomButton onPress={moreDetailed.open} title={'Подробнее'} />
      
    </View>
  );
};

const ShiftList = observer(() => {
  if (locationStore.isLoading) {
    return <Text>Загрузка смен...</Text>;
  }

  return (
    <>
      <View style={style.content}>
        <FlatList
          data={locationStore.shifts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <ShiftItem shift={item} />}
          ListEmptyComponent={
            <Text style={style.notShift}>Нет доступных смен</Text>
          }
        />
      </View>
    </>
  );
});

const style = StyleSheet.create({
  container: {
    padding: 10,
    margin: 2,
    borderRadius: 3,
    borderWidth: 3,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  notShift: {
    fontSize: 35,
  },
  companyName: {
    fontWeight: 'bold',
  },
});

export default ShiftList;
