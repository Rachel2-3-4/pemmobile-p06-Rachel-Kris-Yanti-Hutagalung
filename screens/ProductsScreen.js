// ============================================
// FILE: screens/ProductsScreen.js (complete)
// ============================================
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  SectionList,
  TextInput,
  Alert,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default"); // default, price_asc, price_desc, rating_desc
  const [viewMode, setViewMode] = useState("list"); // list, grid, section
  const [refreshing, setRefreshing] = useState(false);

  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = ["Semua", ...new Set(PRODUCTS.map((p) => p.category))];
    return cats;
  }, []);

  // Filter & sort logic
  const processedProducts = useMemo(() => {
    let filtered = [...PRODUCTS];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Sort
    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating_desc") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // For SectionList mode: group by category
  const sectionData = useMemo(() => {
    const sectionsMap = new Map();
    processedProducts.forEach((product) => {
      const cat = product.category;
      if (!sectionsMap.has(cat)) {
        sectionsMap.set(cat, []);
      }
      sectionsMap.get(cat).push(product);
    });
    return Array.from(sectionsMap.entries()).map(([title, data]) => ({
      title,
      data,
    }));
  }, [processedProducts]);

  const handleProductPress = useCallback((product) => {
    Alert.alert(
      product.name,
      `Harga: Rp ${product.price.toLocaleString("id-ID")}\n⭐ Rating: ${product.rating}`
    );
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Reset all filters
    setSearchQuery("");
    setSelectedCategory("Semua");
    setSortBy("default");
    // Simulate network delay
    setTimeout(() => setRefreshing(false), 800);
  }, []);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🔍</Text>
      <Text style={styles.emptyText}>
        {searchQuery
          ? `Produk "${searchQuery}" tidak ditemukan`
          : "Tidak ada produk"}
      </Text>
      <Text style={styles.emptyHint}>
        {searchQuery ? "Coba kata kunci lain" : "Tarik ke bawah untuk refresh"}
      </Text>
    </View>
  );

  const renderFlatListItem = ({ item }) => (
    <ProductCard
      item={item}
      onPress={handleProductPress}
      layout={viewMode === "grid" ? "grid" : "list"}
    />
  );

  const renderSectionItem = ({ item }) => (
    <ProductCard item={item} onPress={handleProductPress} layout="list" />
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Toko Kita</Text>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari produk atau kategori..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <Text style={styles.clearButton} onPress={() => setSearchQuery("")}>
              ✕
            </Text>
          )}
        </View>

        {/* TOOLBAR: View mode + Sort */}
        <View style={styles.toolbar}>
          <View style={styles.viewModeButtons}>
            <TouchableOpacity
              style={[styles.modeBtn, viewMode === "list" && styles.activeMode]}
              onPress={() => setViewMode("list")}
            >
              <Text style={styles.modeIcon}>📋</Text>
              <Text style={styles.modeText}>List</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, viewMode === "grid" && styles.activeMode]}
              onPress={() => setViewMode("grid")}
            >
              <Text style={styles.modeIcon}>⊞</Text>
              <Text style={styles.modeText}>Grid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modeBtn, viewMode === "section" && styles.activeMode]}
              onPress={() => setViewMode("section")}
            >
              <Text style={styles.modeIcon}>📑</Text>
              <Text style={styles.modeText}>Section</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortRow}>
            <TouchableOpacity
              style={[styles.sortChip, sortBy === "default" && styles.activeSort]}
              onPress={() => setSortBy("default")}
            >
              <Text>Default</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortChip, sortBy === "price_asc" && styles.activeSort]}
              onPress={() => setSortBy("price_asc")}
            >
              <Text>💰 Harga Terendah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortChip, sortBy === "price_desc" && styles.activeSort]}
              onPress={() => setSortBy("price_desc")}
            >
              <Text>💸 Harga Tertinggi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sortChip, sortBy === "rating_desc" && styles.activeSort]}
              onPress={() => setSortBy("rating_desc")}
            >
              <Text>⭐ Rating Tertinggi</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* CATEGORY CHIPS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
        >
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryChip,
                selectedCategory === cat && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === cat && styles.categoryChipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* RESULT INFO */}
        <Text style={styles.resultInfo}>
          {viewMode === "section"
            ? `${sectionData.length} kategori`
            : `${processedProducts.length} produk`}
          {searchQuery ? ` untuk "${searchQuery}"` : ""}
        </Text>
      </View>

      {/* DYNAMIC LIST / GRID / SECTION */}
      {viewMode === "section" ? (
        <SectionList
          sections={sectionData}
          renderItem={renderSectionItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={renderEmptyState}
        />
      ) : (
        <FlatList
          data={processedProducts}
          renderItem={renderFlatListItem}
          keyExtractor={(item) => item.id}
          key={viewMode === "grid" ? "grid" : "list"} // force re-render when numColumns changes
          numColumns={viewMode === "grid" ? 2 : 1}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh}
          refreshing={refreshing}
          ListEmptyComponent={renderEmptyState}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  searchIcon: { marginRight: 6 },
  searchInput: { flex: 1, paddingVertical: 8, fontSize: 14 },
  clearButton: { fontSize: 16, paddingHorizontal: 5, color: "#6b7280" },

  toolbar: { marginBottom: 8 },
  viewModeButtons: { flexDirection: "row", marginBottom: 8 },
  modeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  activeMode: { backgroundColor: "#6366f1" },
  modeIcon: { fontSize: 14, marginRight: 4 },
  modeText: { fontSize: 12, fontWeight: "500" },
  sortRow: { flexDirection: "row", marginBottom: 6 },
  sortChip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  activeSort: { backgroundColor: "#e0e7ff" },

  categoryScroll: { flexDirection: "row", marginVertical: 6 },
  categoryChip: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryChipActive: { backgroundColor: "#6366f1" },
  categoryChipText: { fontSize: 13, color: "#374151" },
  categoryChipTextActive: { color: "#ffffff" },

  resultInfo: { marginTop: 8, fontSize: 12, color: "#6b7280" },

  listContent: { paddingBottom: 20, paddingHorizontal: 8 },
  emptyContainer: { alignItems: "center", marginTop: 50 },
  emptyIcon: { fontSize: 40, marginBottom: 10 },
  emptyText: { fontSize: 14, fontWeight: "600" },
  emptyHint: { fontSize: 12, color: "#6b7280", marginTop: 4 },

  sectionHeader: {
    backgroundColor: "#f3f4f6",
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
    borderRadius: 8,
  },
  sectionTitle: { fontWeight: "bold", fontSize: 14 },
});