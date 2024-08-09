Link - https://docs.expo.dev/router/installation/#manual-installation

Package name - com.jsm.aura_rn
Name - Aura

First command -
npx create-expo-app ./
./ installs everything in same directory


Second command 
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar

expo-constants - gives access to device information like operating system, battery percentage
expo-status-bar - provides a status bar component
expo-router - includes file based routing capabilites
react-native-screens - allows us to natigate through different components
expo-linking - allos user to navigate specifically to a screen within an app from external link
react-native-safe-area-context - makes our app work on all devices


# Set up Entry point 
- Inside package.json
{
  "main": "expo-router/entry"
}


# Create app/_layout.jsx

# Modify scheme in app.json

npx expo start -c
-c clears any cache

{
  "scheme": "your-app-scheme"
}

# Install nativewind - for css 

npm install nativewind
npm install --save-dev tailwindcss@3.3.2

npx tailwindcss init -> initiate tailwind css

Add babel plugin in babel.config.js
plugins: ["nativewind/babel"],

# SplashScreen.hideAsync()
Hides the native splash screen immediately. Be careful to ensure that your app has content ready to display when you hide the splash screen, or you may see a blank screen briefly.

# SplashScreen.preventAutoHideAsync();
Prevents auto hiding of splash screen before everything on screen is loaded



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.


# Notes random

<Slot/> is like children in react
<Text>Header</Text>
<Slot/>
<Text>Header</Text>

Slot will render the children component

<Stack/> is also a similar approach. This is syntax
<Stack>
   <Stack.Screen name="index" options={{headerShown : false}}/>  
</Stack>

headerShown : false means the title bar of the component won't be shown


(auth) - if we name a folder structure like this, it aloows us to add multiple routes. This folder is supposed as a route group


For <Image/> we have resizeMode="contain" and tintColor={color}

secureTextEntry={label === 'Password' && !showPassword}  -> For showing and hiding password


# FlatList - used to render an array in rreact native

<FlatList
data={[{id: 1}, {id: 2}, {id: 3}]}
keyExtractor={(item) => {item.id}}
renderItem={({item}) => {
   <Text className="3xl">{item.id}</Text>
}}
ListHeaderComponent={() => {
   <View>
   {View component}
   <View>
}}
ListEmptyComponent=() => {
   // render component when list is empty
}
refreshControl={<RefreshControl/>}
/>

> ListHeaderComponent will take a component which will render on top of the data array
> renderItem will take a component which will render individual items from the data array
> keyExtractor is the key in map function in React


>ListEmptyComponent


# to play video files
npm i expo-av


# ImageBackground - same as image

> [query].jsx  - This square bracket means we can extract the value of the pat
const [query] = useLocalSearchParams()

> npm i expo-document-picker
