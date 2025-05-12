import React, { useState, useEffect } from "react";
import { Text, Button, Layout, Input } from "@ui-kitten/components"
import { View, FlatList, StyleSheet, Modal, Platform, Pressable, Alert } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import axios from "axios";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useUserContext } from "@/contexts/UseContext";
import { styles } from "@/components/styles";


export default function Transactions() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [transactions, setTransactions] = useState([]);
    const { user, updated, toggleUpdate }: any = useUserContext();
    const { themeType }: any = useThemeContext();
    const serverUrl = process.env.EXPO_PUBLIC_API_URL;

    // API call that retrieves all of the user's transaction data
    const fetchTransactions = async () => {
        try {
            await axios.get(`${serverUrl}/transactions/getTransactions`, {
                params: { acc_id: user.acc_id }
            })
            .then(response => {
                const data = response.data;
                // Change date in every entry to YYYY-MM-DD format
                const formattedTransactions = data.map((tx: any) => ({
                    ...tx,
                    date: new Date(tx.date).toISOString().split('T')[0],
                }));
                // Data is sent from oldest to newest
                // So we're reversing this array to show the most recent transactions first
                const arr = formattedTransactions.reverse();
                setTransactions(arr);
            })
        } catch(err) {
            console.error(err);
        }
    }

    // Make API call on first page render
    useEffect(() => {
        fetchTransactions();
        // updated is in the dependency array to re-fresh the Transactions list when it is updated
    }, [updated]);

    // Creates a View for each individual transaction
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.date}</Text>
        </View>
    );
    
    const handleAddTransaction = async (newTx: any) => {
        /* TODO: Add POST request here to insert new transactions to database */
        try {
            const amount = Number(newTx.price);
            await axios.post(`${serverUrl}/transactions/addTransaction`, {
                acc_id: user.acc_id,
                transName: newTx.name,
                transPrice: amount,
                transDate: newTx.date,
                balance: user.balance,
            }).then(() => {
                Alert.alert('Transaction successfully added!');
                setModalVisible(false);
                // Re-rendering transactions list when a new one is added
                toggleUpdate();
            })
        } catch(err) {
            console.error(err);
            Alert.alert('Issue adding transaction');
            setModalVisible(false);
        }
    };
    
    // Modal that allows user to add in a new transaction
    const TransactionModal = ({ visible, onClose, onAdd }: any) => {
        const [form, setForm] = useState({ name: '', price: '', date: '' });

        const handleAdd = () => {
            onAdd({...form, price: `-${form.price}`});
            setForm({ name: '', price: '', date: '' });
        }

        // Populates a calendar to select a date
        // ONLY WORKS FOR ANDROID
        const showDatePicker = () => {
            DateTimePickerAndroid.open({
            value: new Date(),
            mode: 'date',
            is24Hour: true,
            onChange: (event, selectedDate) => {
                if (selectedDate) {
                const dateStr = selectedDate.toISOString().split('T')[0]; // format YYYY-MM-DD
                setForm({ ...form, date: dateStr });
                }
            },
            });
        };

        return (
            <Modal
                visible={visible}
                animationType="slide"
                transparent={true}
            >
                <View style={styles.modalOverlay}>
                    <View style={themeType === 'light' ? styles.modalContent : styles.modalContentDark}>
                    <Text style={styles.modalTitle}>Add Transaction</Text>

                    <Input
                        placeholder="Name"
                        style={styles.input}
                        value={form.name}
                        onChangeText={(text) => setForm({ ...form, name: text })}
                    />
                    <Input
                        placeholder="Price"
                        style={styles.input}
                        value={form.price}
                        onChangeText={(text) => setForm({ ...form, price: text })}
                    />
                    <Pressable onPress={showDatePicker} style={styles.input}>
                        <Text>{form.date || 'Select Date'}</Text>
                    </Pressable>
                    <Button onPress={handleAdd}>Add</Button>
                    <Button onPress={onClose}>Cancel</Button>
                    </View>
                </View>
            </Modal>
        )
    };

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', gap: 10}}>
            <TransactionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onAdd={handleAddTransaction}
            />
            <Text category="h4">Transactions</Text>
            <View style={styles.container}>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.cell, styles.headerText]}>NAME</Text>
                    <Text style={[styles.cell, styles.headerText]}>PRICE</Text>
                    <Text style={[styles.cell, styles.headerText]}>DATE</Text>
                </View>
                <View style={{ maxHeight: 500 }}>
                    <FlatList
                        data={transactions}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </View>
            <Button onPress={() => setModalVisible(true)}>Add Transaction</Button>
        </Layout>
    )
}