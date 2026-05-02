import React from "react";
import {
  View,
  Text,
  SectionList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { CONTACTS_SECTIONS } from "../data/contacts";

const ContactItem = ({ item }) => (
  <TouchableOpacity
    style={styles.contactItem}
    onPress={() => Alert.alert(item.name, `📞 ${item.phone}`)}
    activeOpacity={0.7}
  >
    {/* Avatar */}
    <View style={styles.avatarCircle}>
      <Text style={styles.avatarEmoji}>{item.avatar}</Text>
    </View>

    {/* Info */}
    <View style={styles.contactInfo}>
      <Text style={styles.contactName}>{item.name}</Text>
      <Text style={styles.contactPhone}>{item.phone}</Text>
    </View>

    {/* Call icon */}
    <Text style={styles.callIcon}>📞</Text>
  </TouchableOpacity>
);

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

export default function ContactsScreen() {
  const totalContacts = CONTACTS_SECTIONS.reduce(
    (total, section) => total + section.data.length,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>📇 Kontak</Text>
        <Text style={styles.headerSubtitle}>{totalContacts} kontak</Text>
      </View>

      {/* SectionList */}
      <SectionList
        sections={CONTACTS_SECTIONS}
        renderItem={({ item }) => <ContactItem item={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} />
        )}
        keyExtractor={(item) => item.id.toString()}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  headerSubtitle: {
    fontSize: 12,
    color: "#666",
  },

  sectionHeader: {
    backgroundColor: "#f3f4f6",
    padding: 8,
  },

  sectionTitle: {
    fontWeight: "bold",
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },

  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarEmoji: {
    fontSize: 18,
  },

  contactInfo: {
    flex: 1,
  },

  contactName: {
    fontWeight: "bold",
  },

  contactPhone: {
    fontSize: 12,
    color: "#666",
  },

  callIcon: {
    fontSize: 16,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 60,
  },

  listContent: {
    paddingBottom: 20,
  },
});