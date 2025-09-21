import { ImageBackg } from '../../shared/ImageBackg';
import { locationStore } from '../Geolocation/LocationStore';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
export function Main() {
  return (
    <ImageBackg source={require('E:/Rezyme/Test/MyProject/assets/fon.png')}>
      <View style={style.container}>
        <View style={style.content}>
          <Text style={style.title}>Мы подобрали смены для вас!</Text>
          <TouchableOpacity onPress={async () =>  await locationStore.getShiftData()}>
            <Image
              style={style.img}
              source={require('E:/Rezyme/Test/MyProject/assets/button.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackg>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 30,
  },
  title: {
    width: "60%",
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
  },
  img: {
    width: 60,
    height: 60,
  },
});
