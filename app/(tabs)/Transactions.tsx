import React from "react";
import { Text, Button, Layout } from "@ui-kitten/components"
import { View } from "react-native";

export default function Transactions() {
    return (
        <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{gap: 10}}>
                <Text category="h4">This is the transactions page</Text>
            </View>
        </Layout>
    )
}