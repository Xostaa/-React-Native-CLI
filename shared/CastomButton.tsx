import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export function CastomButton(props: { title: string; onPress: () => void }) {
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        <View style={style.container}>
          <Text style= {style.content}>{props.title}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(19, 118, 231, 1)",
    borderRadius: 5,
  },
  content: {
    color: "white",
    fontSize: 20,
    fontWeight: "normal"
  }
});
