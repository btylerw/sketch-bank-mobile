import React, { useState, useEffect } from "react";
import { View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Layout, Button, Input, Text } from "@ui-kitten/components";
import { useUserContext } from "@/contexts/UseContext";
import axios from "axios";
import { styles } from "@/components/styles";

export default function ScheduleTransactions() {
    const [isPickerVisible, setPickerVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [jobs, setJobs] = useState([]);
    const [jobName, setJobName] = useState('');
    const [jobAmount, setJobAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const serverUrl = process.env.EXPO_PUBLIC_API_URL;
    const { user, updated, toggleUpdate } = useUserContext();

    const showPicker = () => setPickerVisible(true);
    const hidePicker = () => setPickerVisible(false);

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hidePicker();
    };

    // API call that creates a new job for user on the database and creates a new entry in it's reference table
    const submitJob = async () => {
        const day = selectedDate.getDate();
        const cron = `0 * ${day} * *`;
        try {
            await axios.post(`${serverUrl}/schedule/schedule-job`, {
                    acc_id: user.acc_id,
                    amount: jobAmount,
                    label: jobName,
                    cron: cron
            }).then(() => {
                toggleUpdate();
            })
        } catch(err) {
            console.error(err);
        }
    }

    // Retrieves all user's job data
    const getJobs = async () => {
        try {
            await axios.get(`${serverUrl}/schedule/getJobs`, {
                params: {acc_id: user.acc_id},
            }).then(response => {
                setJobs(response.data.rows);
                setLoading(true);
            })
        } catch(err) {
            console.error(err);
        }
    }

    // API call that will remove a job
    const handleRemoveJob = async (id, jobname) => {
        try {
            await axios.post(`${serverUrl}/schedule/removeJobs`, {
                id: id,
                jobname: jobname,
            }).then(() => {
                toggleUpdate();
            })
        } catch(err) {
            console.error(err);
        }
    }

    // Creates a unique view for every cron job for this user
    const renderJobs = () => {
        return jobs.map((item, index) => (
            <View style={styles.jobRow} key={index}>
                <Text style={styles.cell}>{item.description}</Text>
                <Text style={styles.cell}>{item.amount}</Text>
                <Text style={styles.cell}>{item.day}</Text>
                <Button onPress={() => handleRemoveJob(item.id, item.jobname)}>Remove Job</Button>
            </View>
        ))
    }

    // Get all of the user's cron jobs at render, and whenever updated
    useEffect(() => {
        getJobs();
    }, [updated]);

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {loading && renderJobs()}
        <Text>Schedule a Recurring Payment</Text>
        <Input
            placeholder="Payment Name"
            style={styles.input}
            value={jobName}
            onChangeText={(value) => setJobName(value)}
        />
        <Input
            placeholder="Select Amount"
            style={styles.input}
            value={jobAmount}
            keyboardType="numeric"
            onChangeText={(value) => setJobAmount(value)}
        />
        <Button onPress={showPicker}>Pick Date</Button>
        <Button onPress={submitJob}>Submit Schedule</Button>
        <DateTimePickerModal
            isVisible={isPickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hidePicker}
        />
    </Layout>
  );
}
