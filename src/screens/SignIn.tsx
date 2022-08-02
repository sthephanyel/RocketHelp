import {useState} from 'react';
import {VStack, Heading, Icon, useTheme} from 'native-base';
import Logo from '../assets/logo_primary.svg';
import { Input } from '../components/Input';

import { Envelope, Key } from 'phosphor-react-native';
import { Button } from '../components/Button';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {colors} = useTheme();

    function handleSignIn(){
        if(!email || !password){
            // com o return, o if encerra nesse campo
           return Alert.alert('Entrar','Informe E-mail e Senha');
        }
        setIsLoading(true);

        auth()
        .signInWithEmailAndPassword(email, password)
        // Esse .then retorna algumas informações do usuário
        // .then(response =>{
        //     console.log(response)
        // })
        .catch((error)=>{
            console.log(error);
            console.log(error.code);
            setIsLoading(false);

            //validação para caso algum erro de sintaxe das credenciais seja verificado
            if(error.code === 'auth/invalid-email'){
                return Alert.alert('Entrar','E-mail inválido');
            }
            if(error.code === 'auth/wrong-password'){
                return Alert.alert('Entrar','E-mail ou Senha inválido');
            }
            if(error.code === 'auth/user-not-found'){
                return Alert.alert('Entrar','E-mail ou Senha inválido');
            }

            return Alert.alert('Entrar','Não foi possivel acessar');
        })
    }

    return(
        <VStack flex={1} alignItems='center' bg='gray.600' px={8} pt={24}>
            <Logo/>
            <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
                Acesse sua conta
            </Heading>

            <Input 
                placeholder="E-mail"
                mb={4}
                InputLeftElement={<Icon as={<Envelope color={colors.gray[300]}/>} ml={4}/>}
                onChangeText={setEmail}
            />
            <Input 
                placeholder="Senha"
                mb={8}
                InputLeftElement={<Icon as={<Key color={colors.gray[300]}/>} ml={4}/>}
                secureTextEntry
                onChangeText={setPassword}
                />

            <Button
                title="Entrar"
                w="full"
                onPress={handleSignIn}
                // Cria um loading no botao e não permite clicar de novo
                isLoading={isLoading}
            />
        </VStack>
    );
}