import {Text, View, StyleSheet} from "react-native";

export default function ExerciseListItem({ item }) {
    return (
        <View style={styles.exerciseContainer}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <Text style={styles.exerciseStats}>
                <Text style={styles.subValue}>{item.equipment}</Text> |{' '}
                <Text style={styles.subValue}>{item.muscle}</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    exerciseContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        gap: 5,
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
    }
});