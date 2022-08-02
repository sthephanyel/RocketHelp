import {useState} from 'react';
import { VStack } from 'native-base';
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  function handleNewOrderRegister(){
    if(!patrimony || !description) {
      return Alert.alert('Registrar','Preencha todos os campos')
    }
    setIsLoading(true);
    // Cria uma coleção dentro do BD do firebase
    firestore()
    .collection('orders')
    // Em seguida adiciona dentro dessa coleção as informações descritas
    .add({
      patrimony,
      description,
      status: 'open',
      // recurso proprio do firebase que verifica o horário
      created_at: firestore.FieldValue.serverTimestamp()
    })
    .then(()=>{
      // Envia uma mensagem de alert informando que deu tudo certo
      //e retorna para tela anterior após esse processo
      Alert.alert('Solicitação','Solicitação registrada com sucesso')
      navigation.goBack();
    })
    .catch(err => {
        console.log(err)
        setIsLoading(false);
        return Alert.alert('Solicitação','Não foi possivel registrar o pedido')
      })
  }
  return (
    <VStack flex={1} p={6} bg="gray.600">
        <Header title="Solicitação"/>
        <Input
          placeholder="Número do patrimônio"
          mt={4}
          onChangeText={setPatrimony}
        />
        <Input
          placeholder="Descrição do problema"
          flex={1}
          mt={5}
          multiline
          textAlignVertical='top'
          onChangeText={setDescription}
        />
        <Button
          title="Cadastrar"
          mt={5}
          isLoading={isLoading}
          onPress={handleNewOrderRegister}
        />
    </VStack>
  );
}