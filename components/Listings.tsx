import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ListingType } from "@/types/listingType";
import Colors from "@/constants/Colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useDispatch } from "react-redux";
import { addBookMark } from "@/state/userSlice";

interface listingProps {
  listings: any[];
  category: string;
}

const Listings: React.FC<listingProps> = ({ listings, category }) => {
  const [filteredData, setFilteredData] = useState<ListingType[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("update listing");
    setLoading(true);
    const filteredListings =
      category === "All"
        ? listings
        : listings.filter((item) => item.category === category);
    setFilteredData(filteredListings);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category, listings]);

  const handleSave = (item: ListingType) => {
    dispatch(addBookMark({ bookMarks: item }));
  };

  const renderItems: ListRenderItem<ListingType> = ({ item }) => {
    return (
      <Link href={`/listing/${item.id}`} asChild>
        <TouchableOpacity>
          <View style={styles.item}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: 200,
                height: 200,
                borderRadius: 10,
                marginBottom: 30,
              }}
            />
            <TouchableOpacity
              onPress={() => handleSave(item)}
              style={styles.bookmark}
            >
              <View>
                <Ionicons
                  name="bookmark-outline"
                  size={20}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
            <Text style={styles.itemTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
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
          </View>
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View>
      <FlatList
        data={loading ? [] : filteredData}
        renderItem={renderItems}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Listings;

const styles = StyleSheet.create({
  item: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    marginRight: 20,
    width: 220,
  },
  bookmark: {
    position: "absolute",
    top: 185,
    right: 30,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  itemTxt: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.black,
    marginBottom: 10,
  },
});
