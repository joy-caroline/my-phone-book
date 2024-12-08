import { useState } from 'react';
import { TouchableOpacity, Text, View, TextInput, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Contact } from '@/database/useContactsDatabase';

export type ContactFormProps = {
    contact?: Contact;
}

export const ContactForm = ({ contact }: ContactFormProps) => {
    const router = useRouter();

    const [nome, setNome] = useState(contact ? contact.name : '');
    const [telefone, setTelefone] = useState(contact ? contact.phone : '');
    const [email, setEmail] = useState(contact ? contact.email : '');

    const handleCadastro = () => {
        if (!nome || !email || !telefone) {
            Alert.alert('Erro', 'Todos os campos são obrigatórios!');
            return;
        }
        Alert.alert('Sucesso', `contato ${nome} cadastrado com sucesso!`);
        setNome("");
        setTelefone("");
        setEmail("");
        router.back(); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cadastro</Text>

            <Text className='label'>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o nome da pessoa"
                value={nome}
                onChangeText={setNome}
            />
            <Text className='label'>Número de telefone</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o número de contato"
                value={telefone}
                onChangeText={setTelefone}
            />
            <Text className='label'>Endereço de e-mail</Text>
            <TextInput
                style={styles.input}
                placeholder="Digite o endereço de e-mail"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            {!contact ?
                <TouchableOpacity
                    style={[styles.customButton]} onPress={handleCadastro}>
                    <Text style={styles.customButtonText}>Salvar contato</Text>
                </TouchableOpacity>
                :
                (
                    <View>
                        <TouchableOpacity
                            style={[styles.customButton]} onPress={handleCadastro}>
                            <Text style={styles.customButtonText}>Excluir contato</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.customButton]} onPress={handleCadastro}>
                            <Text style={styles.customButtonText}>Editar contato</Text>
                        </TouchableOpacity>
                    </View>
                )
            }

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#212934',
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    customButton: {
        backgroundColor: '#BBBBBB', 
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    customButtonText: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});