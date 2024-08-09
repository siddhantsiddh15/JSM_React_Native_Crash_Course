import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { FormField } from "@/components";
import { CustomButton } from "@/components";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {signIn, getCurrentUser} from '@/lib/appwrite';
import {useGlobalContext} from '@/context/GlobalProvider';

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  setFormValue = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };
  const {setUser, setIsLoggedIn} = useGlobalContext();
  const handleSubmit = async () => {   
        if(!form.email || !form.password){
            Alert.alert('Error', 'Please fill all fields')
            return;
        }

        setLoading(true);

        try{
            await signIn(form.email, form.password);
            const result = await getCurrentUser();
            console.log('>>>>>>Result', result)
            setUser(result);
            setIsLoggedIn(true)
            // set it to global state using context
            Alert.alert('Success', 'Logged in successfully')
            router.replace('/home')
        }catch(error){
            Alert.alert('Error in Sign In', error.message)
        }finally{
            setLoading(false);
        }
    }

  return (
    <SafeAreaView className="bg-primary h-full w-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-12 items-center">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[100px] h-[50px]"
          />
          <Text className="text-xl font-pmedium text-center text-secondary-100">
            Log In to Aora
          </Text>
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

          <CustomButton
            handlePress={() => handleSubmit()}
            containerStyle="mt-10 w-[90%]"
            title="Log In"
            isLoading={loading}
          />

          {/* sign up text */}
          <View>
            <Text className="text-gray-100 font-pregular text-center mt-4 text-[12px]">
              Don't have an account?
              <Link href="/sign-up" className="text-secondary-200">
                {" "}
                Sign Up
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    {/* <StatusBar style="light" /> */}
    </SafeAreaView>
  );
};

export default SignIn;
