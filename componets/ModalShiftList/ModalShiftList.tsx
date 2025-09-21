import { Modal,StyleSheet} from 'react-native';
import ShiftList from '../ShiftList/ShiftList';
import { modalStore } from '../Stores/ModalStore';
import { observer } from 'mobx-react-lite';
import { CastomButton } from '../../shared/CastomButton';


export const ModalShiftList = observer(() => {
  return (
    <Modal
      style={style.content}
      visible={modalStore.status}
      onRequestClose={modalStore.closs}
      animationType="slide"
    >
        
      <ShiftList />
        <CastomButton onPress={() => modalStore.closs()} title='Закрыть окно' />
    </Modal>
  );
});

const style = StyleSheet.create({
    content: {
        flex: 1,
        overflow: "scroll"
    }
})