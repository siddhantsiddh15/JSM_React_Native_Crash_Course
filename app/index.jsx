import React from "react";
import { View, Text, ScrollView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import {CustomButton} from "@/components";
import { StatusBar } from "expo-status-bar";

import {router, Redirect} from 'expo-router';
import { useGlobalContext } from "@/context/GlobalProvider";
const App = () => {

const {loading, isLoggedIn} = useGlobalContext();
if(!loading && isLoggedIn){
    return <Redirect href="/home" />
}

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height : '100%'}} >
        <View className="w-full h-[90vh] items-center justify-center ">
          <Image
            source={images.logo}
            className="w-[100px] h-[50px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[100%] w-full h-[270px]"
            resizeMode="contain"
          />
        <View className="relative mt-5">
            <Text className="font-psemibold text-bold text-3xl text-white text-center px-[10px]">Discover endless possibilities with <Text className="text-secondary-200">Aura</Text></Text>
            <Image
            source={images.path}
            className="absolute -bottom-[62px] right-0 w-[80px] h-[130px]"
            resizeMode="contain"
            />
        </View>

        <Text
            className="text-white text-[12px] font-pregular text-center mt-7 mb-1 px-[14px]"
            >Where creativity meets innovation: 
            <Text className="text-secondary"> Embark on a journey of limitless exploration</Text>
        </Text>
        <CustomButton
        title="Continue with Email"
        containerStyle="mt-[20px] w-[90%]"
        textStyle="text-[16px]"
        isLoading={false}
        handlePress={() => {
            router.push('/sign-in')}}
        />
        </View>
      <StatusBar style="light" />  
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
