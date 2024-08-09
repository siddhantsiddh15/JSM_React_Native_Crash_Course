import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { Tabs, Redirect } from "expo-router";

import { icons } from "@/constants";
const TabIcon = ({ focused, icon, color, name }) => {
  return (
    <View className={`flex items-center justify-center gap-1 mt-2 mb-4 pt-2
    border-t-2 border-transparent ${focused ? "border-black-200" : ""}
    `}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-4 h-4"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  return (
    <SafeAreaView className="h-full">
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FF8E01",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            height: 60,
            backgroundColor: "black",
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                focused={focused}
                name="Home"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.plus}
                color={color}
                focused={focused}
                name="Create"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                focused={focused}
                name="Profile"
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabLayout;
