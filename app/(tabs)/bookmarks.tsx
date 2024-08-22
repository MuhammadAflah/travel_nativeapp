import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useAppSelector } from "@/state/store";
import Colors from "@/constants/Colors";
import { Link, Stack, useRouter } from "expo-router";
import { ListingType } from "@/types/listingType";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import Animated, { SlideInRight } from "react-native-reanimated";

const Page = () => {
  const travelDetails = useAppSelector((state) => state.user.bookMarks);
  const router = useRouter();
  const animationKey = Date.now().toString();

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: "Bookmarks",
            headerLeft: () => (
              <TouchableOpacity onPress={() => router.back()}>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    paddingLeft: 6,
                  }}
                >
                  <Feather name="arrow-left" size={20} />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Link href={`/listing/${item.id}`} asChild>
          <TouchableOpacity style={styles.listWrapper}>
            <Animated.View
              key={animationKey}
              style={{ flexDirection: "row" }}
              entering={SlideInRight.delay(200)}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 10,
                }}
              />
              <View style={styles.content}>
                <Text
                  style={styles.itemTxt}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={18}
                      color={Colors.primaryColor}
                    />
                    <Text style={{ marginLeft: 5, fontSize: 12 }}>
                      {item.location}
                    </Text>
                  </View>
                  <Text style={{ color: Colors.primaryColor, fontSize: 12 }}>
                    ${item.price}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 10 }}>
                  <View style={styles.highlightIcon}>
                    <Ionicons
                      name="star"
                      size={18}
                      color={Colors.primaryColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.highlightTxtVal}>{item.rating}</Text>
                  </View>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </Link>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={travelDetails}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.bgColor,
    marginTop: 10,
  },
  listWrapper: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 8,
  },
  content: {
    marginLeft: 8,
    justifyContent: "center",
    flex: 1,
    marginRight: 12,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
  highlightIcon: {
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 5,
    alignItems: "center",
  },
  highlightTxtVal: {
    fontSize: 14,
    fontWeight: "600",
    alignItems: "center",
    justifyContent: "center",
  },
});
