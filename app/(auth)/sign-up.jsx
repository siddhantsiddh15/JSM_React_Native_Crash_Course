import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { FormField } from "@/components";
import { CustomButton } from "@/components";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import {useGlobalContext} from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    // confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const { setUser, setIsLoggedIn } = useGlobalContext();

  const setFormValue = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  const handleSubmit = async () => {
    if (!form.userName || !form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setLoading(true);

    try {
      const result = await createUser(form.email, form.password, form.userName);
      setUser(result);
      setIsLoggedIn(true);
      // set it to global state using context

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error in Sign Up", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-4 items-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[50px]"
          />
          <Text className="text-xl font-pmedium text-center text-secondary-100">
            Sign Up to Aora
          </Text>
          <FormField
            label="Username"
            placeholder="Choose your username"
            value={form.userName}
            handleChangeText={(text) => setFormValue("userName", text)}
            otherStyles="mt-4 w-[90%]"
          />
          <FormField
            label="Email"
            placeholder="Enter your email"
            value={form.email}
            handleChangeText={(text) => setFormValue("email", text)}
            keyboardType="email-address"
            otherStyles="mt-4 w-[90%]"
          />
          <FormField
            label="Password"
            placeholder="Enter your Password"
            value={form.password}
            handleChangeText={(text) => setFormValue("password", text)}
            otherStyles="mt-4 w-[90%]"
          />
          {/* <FormField 
                        label="Confirm Password"
                        placeholder="Re-Enter your Password"
                        value={form.confirmPassword}
                        handleChangeText={(text) => setFormValue('confirmPassword', text)}
                        otherStyles="mt-4 w-[90%]"
                    /> */}

          <CustomButton
            handlePress={() => handleSubmit()}
            containerStyle="mt-10 w-[90%]"
            title="Sign Up"
            isLoading={loading}
          />

          {/* sign up text */}
          <View>
            <Text className="text-gray-100 font-pregular text-center mt-4 text-[12px]">
              Already have an account?
              <Link href="/sign-in" className="text-secondary-200">
                {" "}
                Log In
              </Link>
            </Text>
          </View>
        </View>
        {/* <StatusBar style="light" /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
