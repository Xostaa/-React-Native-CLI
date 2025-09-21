import {
  ImageBackground,
  ImageBackgroundProps,
  StyleSheet,
} from 'react-native';

export function ImageBackg(prop: ImageBackgroundProps) {
  return <ImageBackground style = {styles.img} {...prop} />;
}

const styles = StyleSheet.create({
  img: {
    height: '100%',
  },
});
