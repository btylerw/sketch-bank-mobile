import { Text, Button, Layout, Input } from "@ui-kitten/components"
import { View, Modal, Pressable, Alert } from "react-native"
import { useUserContext } from "@/contexts/UseContext";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { styles } from "@/components/styles";
import { useThemeContext } from "@/contexts/ThemeContext";
import axios from "axios";

export default function HomePage() {
    const [modalVisible, setModalVisible] = useState(false);
    const [balance, setBalance] = useState(0);
    const { loggedIn, user, updated, toggleUpdate }: any = useUserContext();
    const router = useRouter();
    const { themeType }: any = useThemeContext();
    const serverUrl = process.env.EXPO_PUBLIC_API_URL;

    // When user logs out, return to login page
    useEffect(() => {
        if (!loggedIn) {
            router.replace('/');
        }
    }, [loggedIn]);

    
    // Gets the user's current account balance
    const getBalance = async () => {
        try {
            await axios.get(`${serverUrl}/users/getBalance`, {
                params: {acc_id: user.acc_id}
            }).then(response => {
                if (response.data) {
                    setBalance(response.data[0].balance);
                }
            })
        } catch(err) {
            console.error(err);
        }
    }
    
    useEffect(() => {
        getBalance();
    }, [updated]);

    // API call that updates database to handle a fund transfer
    const handleFundTransfer = async (transferData: any) => {
        try {
            const amount = Number(transferData.amount);
            // An account cannot send funds to itself
            if (Number(transferData.acc_id) === user.acc_id) {
                throw('Cannot transfer funds to own account')
            } 
            await axios.post(`${serverUrl}/transactions/transferFunds`, {
                sender_id: user.acc_id,
                receiver_id: transferData.acc_id,
                amount: amount,
                balance: Number(user.balance),
            }).then(() => {
                Alert.alert('Transaction successfully added!');
                toggleUpdate();
                setModalVisible(false);
            })
        } catch(err) {
            console.error(err);
            const errorMessage = (err === 'Cannot transfer funds to own account' ? err : 'Issue adding transaction');
            Alert.alert(errorMessage);
            setModalVisible(false);
        }
    }

    // Modal that allows user to add in a new transaction
    const TransferModal = ({ visible, onClose, onTransfer }: any) => {
        const [form, setForm] = useState({ acc_id: '', amount: '', date: '' });
    
        const handleTransfer = () => {
            onTransfer({...form, date: new Date()});
            setForm({ acc_id: '', amount: '', date: '' });
        }

    
        return (
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={themeType === 'light' ? styles.modalContent : styles.modalContentDark}>
                        <Text style={styles.modalTitle}>Transfer Funds</Text>
        
                        <Input
                            placeholder="Account Number"
                            keyboardType="numeric"
                            style={styles.input}
                            value={form.acc_id}
                            onChangeText={(text) => setForm({ ...form, acc_id: text })}
                        />
                        <Input
                            placeholder="Amount"
                            keyboardType="numeric"
                            style={styles.input}
                            value={form.amount}
                            onChangeText={(text) => setForm({ ...form, amount: text })}
                        />
                        <Button onPress={handleTransfer}>Add</Button>
                        <Button onPress={onClose}>Cancel</Button>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{gap: 10}}>
                <TransferModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onTransfer={handleFundTransfer}
                />
                {user && <Text category="h4">Welcome {user.fname}!</Text>}
                {user && <Text category="h4">Account Balance: ${balance}</Text>}
                <Button onPress={() => setModalVisible(true)}>Transfer Funds</Button>
            </View>
        </Layout>
    )
};