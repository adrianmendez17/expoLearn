import {View, Text, StyleSheet, ScrollView, ActivityIndicator} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import exercises from '../../assets/data/exercises.json'
import { Stack } from "expo-router";
import { useState } from "react";
import { gql } from 'graphql-request';
import { useQuery } from "@tanstack/react-query";
import graphqlClient, { GraphQLClient} from "../graphqlClient";

const exerciseQuery = gql`
    query exercises($name: String) {
        exercises(name: $name) {
            muscle
            name
            instructions
            equipment
        }
    }
`

export default function ExerciseDetailsScreen() {
    const { name } = useLocalSearchParams();
    const {data, isLoading, error} = useQuery({
        queryKey: ['exercises', name],
        queryFn: () => graphqlClient.request(exerciseQuery, { name })
    });

    const [isInstructionExpanded, setIsInstructionExpanded] = useState(false);

    if (isLoading) {
        return <ActivityIndicator/>;
    }

    if (error) {
        return <Text>Failed to fetch data.</Text>;
    }

    const exercise = data.exercises[0];

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