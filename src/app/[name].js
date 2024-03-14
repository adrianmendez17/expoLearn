import { View, Text, StyleSheet, ScrollView} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import exercises from '../../assets/data/exercises.json'
import { Stack } from "expo-router";

export default function ExerciseDetailsScreen() {
    const params = useLocalSearchParams();

    const exercise = exercises.find(item => item.name == params.name);

    if (!exercise) {
        return <Text>Exercise not found</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />
            <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseStats}>
                    <Text style={styles.subValue}>{exercise.equipment}</Text> |{' '}
                    <Text style={styles.subValue}>{exercise.muscle}</Text>
                </Text>
            </View>

            <Text style={styles.exerciseInstructions}>
                {exercise.instructions}
            </Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    exerciseHeader: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,

    },
    exerciseName: {
        fontSize: 30,
        fontWeight: '500',
        color: 'black'
    },
    exerciseStats: {
        fontSize: 15,
        color: 'dimgray'
    },
    subValue: {
        textTransform: 'capitalize'
    },
    exerciseInstructions: {
        fontSize: 16,
        lineHeight: 20,

    }
});