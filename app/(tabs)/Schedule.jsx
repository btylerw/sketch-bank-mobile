import React, { useState } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Layout, Button } from "@ui-kitten/components";

export default function ScheduleTransactions() {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date) => {
    setSelectedDate(date);
    hidePicker();
  };

  const getCronExpress = () => {
    const minute = selectedDate.getMinutes();
    const hour = selectedDate.getHours();
    const day = selectedDate.getDate();
    const cron = `${minute} ${hour} ${day} * *`;
    console.log("Generated cron:", cron);
  };

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button onPress={showPicker}>Pick Date</Button>
      <Button onPress={getCronExpress}>Print Cron</Button>

      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hidePicker}
      />
    </Layout>
  );
}
