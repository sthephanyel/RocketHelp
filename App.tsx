import React from 'react';
import {useFonts, Roboto_400Regular, Roboto_700Bold} from '@expo-google-fonts/roboto';

import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';

import { SignIn } from './src/screens/SignIn';
import { Home } from './src/screens/Home';
import { Register } from './src/screens/Register';

import { Routes } from './src/routes';

export default function App() {
  //carrega as fonts antes do aplicativo ser carragado totalmente
  const [fontLoadead] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })
  return (
    //Necessário para que a aplicação consiga utilizar o native-base
    //theme={THEME} -> funciona para que os estilos utilizados sejam os que configuramos na pasta theme, e não os que vem por padrão no framework
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle='light-content'
        backgroundColor='transparent'
        translucent
      />
      {/* if ternario -> é um condicional booleano */}
      {fontLoadead ? <Routes/>:<Loading/>}
    </NativeBaseProvider>
  );
}
