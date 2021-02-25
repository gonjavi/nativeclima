import React, { useState, useEffect, Alert } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';


const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgcolor] = useState('rgb(71, 149, 212)'); 

  const { ciudad, pais } = busqueda;

  useEffect(() => {
   const consultarCLima = async () => {
    if (consultar) {
      const appId = '43d2ba90063f19a1c0dd16f2aed1f549';
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
      console.log(url)

      try {
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        guardarResultado(resultado);
        guardarConsultar(false);
        // modifica colores de fondo basado en temperatura
        const kelvin = 273.15;
        const { main } = resultado;
        const actual = main.temp -kelvin;

        if (actual < 10) {
          guardarBgcolor('rgb(105, 108, 149)');
        } else if (actual >= 10 && actual < 25) {
          guardarBgcolor('rgb(71, 149, 212)');
        } else {
          guardarBgcolor('rgb(178, 28, 61)');
        }

      } catch (error) {
        mostrarAlerta();
      }
    }
   }
   consultarCLima();
  },[consultar])

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o país',
      [{ text: 'OK'}]
    )
  }

  const ocultarteclado = () => {
    Keyboard.dismiss();
  }

  const bgColorApp = {
    backgroundColor: bgcolor
  }
  return (
    <>
    <TouchableWithoutFeedback onPress={() => ocultarteclado()}>
      <View style={[styles.app, bgColorApp]}>
        <View style={styles.contenido}>
          <Clima
            resultado={resultado}
          />
          <Formulario
            busqueda={busqueda}
            guardarBusqueda={guardarBusqueda}
            guardarConsultar={guardarConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%',
  }
});

export default App;
