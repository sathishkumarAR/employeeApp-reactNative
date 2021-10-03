import React from 'react';
import { StyleSheet, View, Modal, TouchableWithoutFeedback } from 'react-native';

function ModalCustom({visible, transparent,close,animationType, children}) {
    return (
        <View>
            <Modal
                visible={visible}
                transparent={transparent}
                onRequestClose={close}
                animationType={animationType}
            >
            <TouchableWithoutFeedback onPress={close}>
                <View style={styles.modalOverlay} />
            </TouchableWithoutFeedback>

            <View style={styles.modalContent}>
                {children}
            </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        position:"absolute",
        bottom:0,
        width:"100%"
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})

export default ModalCustom;