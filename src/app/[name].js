import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {useLocalSearchParams} from "expo-router";
import exercises from '../../assets/data/exercises.json'
import { Stack } from "expo-router";
import { useState } from "react";

export default function ExerciseDetailsScreen() {
    const params = useLocalSearchParams();

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

    const exercise = exercises.find(item => item.name == params.name);

    if (!exercise) {
        return <Text>Exercise not found</Text>;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen options={{ title: exercise.name }} />
            <View style={styles.exercisePanel}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <Text style={styles.exerciseStats}>
                    <Text style={styles.subValue}>{exercise.equipment}</Text> |{' '}
                    <Text style={styles.subValue}>{exercise.muscle}</Text>
                </Text>
            </View>

            <View style={styles.exercisePanel}>
                <Text style={styles.exerciseInstructions} numberOfLines={isInstructionExpanded ? 0 : 3}>
                    {exercise.instructions}
                </Text>
                <Text
                    onPress={() => setIsInstructionExpanded(!isInstructionExpanded)}
                    style={styles.seeMore}
                >{isInstructionExpanded ? "See less" : "See more"}</Text>
            </View>


        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    exercisePanel: {
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
    },
    seeMore: {
        alignSelf: 'center',
        padding: 5,
        fontWeight: 600,
        color: 'gray',
    },
});