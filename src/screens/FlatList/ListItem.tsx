import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import Genres from "../../components/Genres";
import Rating from "../../components/Rating";

interface ListItemProps {
  item: any;
  index: number;
  scrollX: any;
}

const { width } = Dimensions.get("window");
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE) / 2;

const ListItem = ({ item, index, scrollX }: ListItemProps) => {
  if (!item.poster) {
    return <View style={{ width: EMPTY_ITEM_SIZE }} />;
  }

  const inputRange = [
    (index - 2) * ITEM_SIZE,
    (index - 1) * ITEM_SIZE,
    index * ITEM_SIZE,
  ];

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 50, 100],
    extrapolate: "clamp",
  });

  return (
    <View style={{ width: ITEM_SIZE }}>
      <Animated.View
        style={{
          marginHorizontal: SPACING,
          padding: SPACING * 2,
          alignItems: "center",
          transform: [{ translateY }],
          backgroundColor: "white",
          borderRadius: 34,
        }}
      >
        <Image source={{ uri: item.poster }} style={styles.posterImage} />
        <Text style={{ fontSize: 24 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Rating rating={item.rating} />
        <Genres genres={item.genres} />
        <Text style={{ fontSize: 12 }} numberOfLines={3}>
          {item.description}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
});

export default React.memo(ListItem);
