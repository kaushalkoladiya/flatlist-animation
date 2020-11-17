import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  const filledStars = Math.floor(rating / 2);
  const maxStars = Array(5 - filledStars).fill("star");
  const r = [...Array(filledStars).fill("star"), ...maxStars];

  return (
    <View style={styles.rating}>
      <Text style={styles.ratingNumber}>{rating}</Text>
      {Array(Math.floor(rating))
        .fill("star")
        .map((type, index) => {
          return <AntDesign key={index} name={type} size={12} color="tomato" />;
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingNumber: { marginRight: 4, fontSize: 14 },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
  },
});
