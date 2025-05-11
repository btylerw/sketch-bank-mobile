import React, { useState } from "react";
import { Text, Button, Layout, Input } from "@ui-kitten/components"
import { View, FlatList, StyleSheet, Modal, Platform, Pressable } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";


export default function Transactions() {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [newTransaction, setNewTransaction] = useState<{name: string, price: string, date: string}>({ name: '', price: '', date: '' });
    const [transactions, setTransactions] = useState([
        {id: '1', name: 'Groceries', price: '$25.00', date: '2025-05-10'}
    ])
    
    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.date}</Text>
        </View>
    )
    
    const handleAddTransaction = (newTx: any) => {
        setTransactions([...transactions, { ...newTx, id: Date.now().toString() }]);
        setModalVisible(false);
    };
    
    const TransactionModal = ({ visible, onClose, onAdd }: any) => {
        const [form, setForm] = useState({ name: '', price: '', date: '' });

        const handleAdd = () => {
            onAdd(form);
            setForm({ name: '', price: '', date: '' });
        }

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
                    <View style={styles.modalContent}>
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
    }

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

const styles = StyleSheet.create({
  container: {
    width: '90%',
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  headerText: {
    fontWeight: 'bold',
  },
    modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});