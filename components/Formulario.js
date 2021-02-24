import React, {useState} from 'react';
import { Text, StyleSheet, View, TextInput, TouchableWithoutFeedback, Animated } from 'react-native';
import { Picker} from '@react-native-community/picker';

const Formulario = () => {
  const [animacionboton] = useState(new Animated.Value(1));

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: .9,
      useNativeDriver: true
    }).start();
  }

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 2,
      tension: 30,
      useNativeDriver: true
    }).start();
  }

  const estiloAnimacion = {
    transform: [{scale: animacionboton }]
  }

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            placeholderTextColor="lightgray"
          />
        </View>
        <View>
          <Picker
            itemStyle={{ height: 120, backgroundColor: '#fff' }}
          >
            <Picker.Item label="-Seleccione un País --" value="" />
            <Picker.Item label="Estado Unidos" value="US" />
            <Picker.Item label="México" value="MX" />
            <Picker.Item label="Argentina" value="AR" />
            <Picker.Item label="Colombia" value="CO" />
            <Picker.Item label="Costa Rica" value="CR" />
            <Picker.Item label="España" value="ES" />
            <Picker.Item label="Perú" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()}
          onPressOut={() => animacionSalida()}
        >
          <Animated.View
            style={[styles.btnBuscar, estiloAnimacion]}
          >
            <Text  style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
} 

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: 'black',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  }
});

export default Formulario;
