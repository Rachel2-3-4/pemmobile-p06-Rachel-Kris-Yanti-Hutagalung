import React, { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ProductCard = ({ item, onPress, layout = "list" }) => {
  const isGrid = layout === "grid";

  return (
    <TouchableOpacity
      style={[styles.card, isGrid && styles.cardGrid]}
      onPress={() => onPress(item)}
      activeOpacity={0.85}
    >
      <View style={[styles.imageContainer, isGrid && styles.imageContainerGrid]}>
        <Text style={styles.emoji}>{item.image || "📦"}</Text>
      </View>

      <View style={[styles.info, isGrid && styles.infoGrid]}>
        <Text style={styles.category} numberOfLines={1}>
          {item.category || "Kategori"}
        </Text>
        <Text style={styles.name} numberOfLines={isGrid ? 2 : 2}>
          {item.name}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.rating}>⭐ {item.rating || 0}</Text>
          <Text style={styles.sold}>
            {(item.sold || 0).toLocaleString("id-ID")} terjual
          </Text>
        </View>
        <Text style={styles.price}>
          Rp {(item.price || 0).toLocaleString("id-ID")}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardGrid: {
    flexDirection: "column",
    width: "100%",
    marginHorizontal: 0,
    marginVertical: 6,
    alignItems: "center",
    padding: 10,
  },
  imageContainer: {
    width: 72,
    height: 72,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  imageContainerGrid: {
    width: "100%",
    height: 100,
    marginRight: 0,
    marginBottom: 8,
  },
  emoji: { fontSize: 36 },
  info: { flex: 1 },
  infoGrid: { alignItems: "center", width: "100%" },
  category: {
    fontSize: 11,
    fontWeight: "700",
    color: "#6366f1",
    marginBottom: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    textAlign: "left",
  },
  metaRow: {
    flexDirection: "row",
    marginBottom: 6,
    flexWrap: "wrap",
  },
  rating: { fontSize: 12, marginRight: 10 },
  sold: { fontSize: 11, color: "#999" },
  price: {
    fontSize: 16,
    fontWeight: "bold",
  },
});