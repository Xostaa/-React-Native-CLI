import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { locationStore } from '../Geolocation/LocationStore';
import { observer } from 'mobx-react-lite';
import { CastomButton } from '../../shared/CastomButton';
import { Shift } from '../../tapy/Shift';
import { shiftDetailed } from '../Stores/ShiftDetailedStore';
// Смены не отоброжаються пофиксить

interface ShiftItemProps {
  shift: Shift;
}

const ShiftItem = observer(({ shift }: ShiftItemProps) => {
  const isExpanded = shiftDetailed.isShiftExpanded(shift.id);

  return (
    <View style={style.container}>
      <Text style={style.companyName}>{shift.companyName}</Text>
      <Text>{shift.address}</Text>
      <Text>
        Время: {shift.timeStartByCity} - {shift.timeEndByCity}
      </Text>
      <Text>Цена: {shift.priceWorker} </Text>

      {isExpanded && (
        <>
          <View style={style.detailed}>
            <Image style={style.logo} source={{ uri: shift.logo }}></Image>
            <Text>{shift.dateStartByCity}</Text>
            <Text>Тип услуги: {shift.workTypes[0]?.name}</Text>
            <Text>Требуеться людей: {shift.planWorkers}</Text>
            <Text>Уже работают: {shift.currentWorkers}</Text>
            <Text>У компании {shift.customerFeedbacksCount}</Text>
            <Text>Общий рейтинг {shift.customerRating}</Text>
          </View>
        </>
      )}
      <CastomButton
        onPress={() => {
          shiftDetailed.toggleDetails(shift.id)
        }}
        title={isExpanded ? 'Скрыть' : 'Подробнее'}
      />
    </View>
  );
});

const ShiftList = observer(() => {
  if (locationStore.isLoading) {
    return <Text>Загрузка смен...</Text>;
  }

  return (
    <>
      <View style={style.content}>
        <FlatList
          data={locationStore.shifts}
          keyExtractor={(item) => item.id}
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
  logo: {
    width: 50,
    height: 50,
  },
  detailed: {
    alignItems: 'center',
  },
});

export default ShiftList;
