import { addLead } from "@/store/leadsSlice";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { useDispatch } from "react-redux";

const years: string[] = ["1st", "2nd", "3rd", "4th"];
const departments: string[] = ["CSE", "IT", "ECE", "EE", "ME"];

type Errors = {
  name?: string;
  email?: string;
  id?: string;
  phone?: string;
  year?: string;
  department?: string;
  role?: string;
};

export default function App() {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) newErrors.name = "Name is required";

    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!id.trim()) newErrors.id = "Student ID is required";

    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (phone.length !== 10) newErrors.phone = "Phone must be 10 digits";

    if (!year) newErrors.year = "Year is required";

    if (!department) newErrors.department = "Department is required";

    if (!role.trim()) newErrors.role = "Role is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const leadData = {
      name,
      email,
      id,
      phone,
      year,
      department,
      role,
    };

    console.log("Lead Added:", leadData);
    dispatch(addLead(leadData));

    setName("");
    setEmail("");
    setId("");
    setPhone("");
    setYear("");
    setDepartment("");
    setRole("");
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center bg-gray-100 px-4">
          <View className="w-full max-w-md bg-white border border-gray-300 rounded-xl p-6 shadow-lg">
            <Text className="text-2xl font-bold text-center mb-6">
              Add Student Lead
            </Text>
            <View className="gap-4">
              {/* Name */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter name"
                  className={`border rounded-lg px-4 py-3 bg-gray-50 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.name}
                  </Text>
                )}
              </View>
              {/* Email */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Email
                </Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className={`border rounded-lg px-4 py-3 bg-gray-50 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </Text>
                )}
              </View>
              {/* Student ID */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Student ID
                </Text>
                <TextInput
                  value={id}
                  onChangeText={setId}
                  placeholder="Enter student ID"
                  className={`border rounded-lg px-4 py-3 bg-gray-50 ${
                    errors.id ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.id && (
                  <Text className="text-red-500 text-xs mt-1">{errors.id}</Text>
                )}
              </View>
              {/* Phone */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  className={`border rounded-lg px-4 py-3 bg-gray-50 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.phone && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.phone}
                  </Text>
                )}
              </View>
              {/* Year */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Year
                </Text>
                <View
                  className={`border rounded-lg bg-gray-50 ${
                    errors.year ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Picker selectedValue={year} onValueChange={setYear}>
                    <Picker.Item label="Select Year" value="" enabled={false} />
                    {years.map((yr) => (
                      <Picker.Item key={yr} label={yr} value={yr} />
                    ))}
                  </Picker>
                </View>
                {errors.year && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.year}
                  </Text>
                )}
              </View>
              {/* Department */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Department
                </Text>
                <View
                  className={`border rounded-lg bg-gray-50 ${
                    errors.department ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <Picker
                    selectedValue={department}
                    onValueChange={setDepartment}
                  >
                    <Picker.Item
                      label="Select Department"
                      value=""
                      enabled={false}
                    />
                    {departments.map((dept) => (
                      <Picker.Item key={dept} label={dept} value={dept} />
                    ))}
                  </Picker>
                </View>
                {errors.department && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </Text>
                )}
              </View>
              {/* Role */}
              <View>
                <Text className="text-sm font-medium text-gray-700 mb-1">
                  Role
                </Text>
                <TextInput
                  value={role}
                  onChangeText={setRole}
                  placeholder="Enter role"
                  className={`border rounded-lg px-4 py-3 bg-gray-50 ${
                    errors.role ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.role && (
                  <Text className="text-red-500 text-xs mt-1">
                    {errors.role}
                  </Text>
                )}
              </View>
              <Pressable
                onPress={handleSubmit}
                className="bg-blue-600 rounded-lg py-3 mt-2 active:bg-blue-700"
              >
                <Text className="text-white text-center font-semibold text-base">
                  Add Lead
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
