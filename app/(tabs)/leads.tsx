import { deleteLead } from "@/store/leadsSlice";
import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  year: string;
  role: string;
}

interface RootState {
  leads: Lead[];
}

const Leads = () => {
  const leads = useSelector((state: RootState) => state.leads);
  const dispatch = useDispatch();
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleViewDetails = (lead: Lead) => {
    setSelectedLead(lead);
    setModalVisible(true);
  };

  const handleDelete = (id: string) => {
    Alert.alert("Delete Lead", "Are you sure you want to delete this lead?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => dispatch(deleteLead(id)),
      },
    ]);
  };

  const renderLeadItem = ({ item }: { item: Lead }) => (
    <View className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-sm">
      <View className="flex-row justify-between items-start">
        <View className="flex-1">
          <Text className="text-lg font-semibold text-gray-800">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            {item.department} • {item.year} Year
          </Text>
          <Text className="text-sm text-gray-500">{item.role}</Text>
        </View>
      </View>
      <View className="flex-row mt-3 gap-2">
        <Pressable
          onPress={() => handleViewDetails(item)}
          className="flex-1 bg-blue-500 py-2 rounded-lg active:bg-blue-600"
        >
          <Text className="text-white text-center font-medium">
            View Details
          </Text>
        </Pressable>
        <Pressable
          onPress={() => handleDelete(item.id)}
          className="flex-1 bg-red-500 py-2 rounded-lg active:bg-red-600"
        >
          <Text className="text-white text-center font-medium">Delete</Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-4">
      <Text className="text-2xl font-bold text-center mb-4">Student Leads</Text>

      {leads.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 text-lg">No leads added yet</Text>
          <Text className="text-gray-400 text-sm mt-1">
            Add leads from the Home tab
          </Text>
        </View>
      ) : (
        <FlatList
          data={leads}
          keyExtractor={(item) => item.id}
          renderItem={renderLeadItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white w-11/12 max-w-md rounded-xl p-6 shadow-xl">
            <Text className="text-xl font-bold text-center mb-4">
              Lead Details
            </Text>

            {selectedLead && (
              <View className="gap-3">
                <View>
                  <Text className="text-xs text-gray-500 uppercase">Name</Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.name}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">Email</Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.email}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">Phone</Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.phone}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">
                    Student ID
                  </Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.id}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">
                    Department
                  </Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.department}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">Year</Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.year}
                  </Text>
                </View>
                <View>
                  <Text className="text-xs text-gray-500 uppercase">Role</Text>
                  <Text className="text-base text-gray-800">
                    {selectedLead.role}
                  </Text>
                </View>
              </View>
            )}

            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-gray-800 py-3 rounded-lg mt-6 active:bg-gray-900"
            >
              <Text className="text-white text-center font-semibold">
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Leads;
