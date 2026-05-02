import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import ProductsScreen from "./screens/ProductsScreen";
import ContactsScreen from "./screens/ContactsScreen";

export default function App() {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <View style={styles.container}>
      {/* Render screen */}
      {activeTab === "products" ? (
        <ProductsScreen />
      ) : (
        <ContactsScreen />
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Products */}
        <TouchableOpacity
          style={[
            styles.navButton,
            activeTab === "products" && styles.navButtonActive,
          ]}
          onPress={() => setActiveTab("products")}
        >
          <Text style={styles.navIcon}>🛍️</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "products" && styles.navLabelActive,
            ]}
          >
            Produk
          </Text>
        </TouchableOpacity>

        {/* Contacts */}
        <TouchableOpacity
          style={[
            styles.navButton,
            activeTab === "contacts" && styles.navButtonActive,
          ]}
          onPress={() => setActiveTab("contacts")}
        >
          <Text style={styles.navIcon}>📇</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "contacts" && styles.navLabelActive,
            ]}
          >
            Kontak
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bottomNav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingBottom: 8,
  },
  navButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  navButtonActive: {
    backgroundColor: "#f9fafb",
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: "#9ca3af",
  },
  navLabelActive: {
    color: "#6366f1",
  },
});