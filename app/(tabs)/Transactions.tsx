import React from "react";
import { Text, Button, Layout } from "@ui-kitten/components"
import { View, FlatList, StyleSheet } from "react-native";

export default function Transactions() {
    const transactions = [
        { id: '1', name: 'Groceries', price: '$25.00', date: '2025-05-10' },
        { id: '2', name: 'Coffee', price: '$3.50', date: '2025-05-09' },
        { id: '3', name: 'Subscription', price: '$12.99', date: '2025-05-08' },
    ];

    const renderItem = ({ item }: any) => (
        <View style={styles.row}>
            <Text style={styles.cell}>{item.name}</Text>
            <Text style={styles.cell}>{item.price}</Text>
            <Text style={styles.cell}>{item.date}</Text>
        </View>
    )

    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text category="h4">Transactions</Text>
            <View style={styles.container}>
            <View style={[styles.row, styles.header]}>
                <Text style={[styles.cell, styles.headerText]}>NAME</Text>
                <Text style={[styles.cell, styles.headerText]}>PRICE</Text>
                <Text style={[styles.cell, styles.headerText]}>DATE</Text>
            </View>
            <FlatList
                data={transactions}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
            </View>
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
});