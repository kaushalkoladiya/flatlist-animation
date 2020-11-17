import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from "react-native";

// API
import { getMovies } from "../../api/";
// TYPES
import { Movie } from "../../../types";
// Components
import ListItem from "./ListItem";
import Backdrop from "./Backdrop";

const { width } = Dimensions.get("window");
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;

const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);

export default function App() {
  const [movies, setMovies] = React.useState<Movie[] | []>([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const fetchData = async () => {
      const data: Array<Movie> | any = await getMovies();
      // Add empty items to create fake space
      // [empty_item, ...movies, empty_item]
      // setMovies(data);
      setMovies([{ key: "empty-left" }, ...data, { key: "empty-right" }]);
      // setMovies()
    };

    if (movies.length === 0) {
      fetchData();
    }
  }, [movies]);

  if (movies.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Backdrop movies={movies} scrollX={scrollX} />
      <StatusBar hidden />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        data={movies}
        keyExtractor={(item: Movie) => item.key}
        horizontal
        bounces={false}
        decelerationRate={Platform.OS === "ios" ? 0 : 0.98}
        renderToHardwareTextureAndroid
        contentContainerStyle={{ alignItems: "center" }}
        snapToInterval={ITEM_SIZE}
        snapToAlignment="start"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        renderItem={({ item, index }: { item: Movie; index: number }) => (
          <ListItem item={item} index={index} key={index} scrollX={scrollX} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
