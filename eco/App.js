import React, { useCallback } from "react"
import { SplashScreen } from "expo-router";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Account from "./navigation/screens/Account"
import AboutMe from "./navigation/screens/AboutMe";
import LaunchPage from './component/LaunchPage';
import MainContainer from './navigation/MainContainer';
import WalkthroughScreen from './component/WalkthroughScreen';
import Login from './navigation/screens/Login';
import Home from './navigation/screens/Home'
import Signup from './navigation/screens/Signup'
import ConfirmSignup from "./navigation/screens/ConfirmSignup";
import Nearby from "./navigation/screens/Nearby";
import Contacts from "./navigation/screens/Contacts";
import shopping from './navigation/screens/shopping'
import cart from './navigation/screens/cart'
import Exchange from './navigation/screens/Exchange'
import Guide from './component/Guide'
import FAQ from './component/FAQ'
import Transaction from './navigation/screens/Transaction'
import Conversation from "./navigation/screens/Conversation";
import CreateConversation from "./navigation/screens/CreateConversation";
import ForgotPassword from "./navigation/screens/ForgotPassword";
import ChangePassword from "./navigation/screens/ChangePassword";

const Stack = createStackNavigator();

const App = () => {
  
  const [fontsLoaded] = useFonts({
    Montserrat: require("./fonts/Montserrat-Light.ttf"),
    MontserratBold: require("./fonts/Montserrat-Bold.ttf"),
    MontserratRegular: require("./fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("./fonts/Montserrat-Medium.ttf")
  })
  
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      SplashScreen.hideAsync()
    }
  })
  
  if(!fontsLoaded){
    return null
  }
  
  onLayoutRootView()  

  return (
    <NavigationContainer>
      <Stack.Navigator> 
    
{/* 
       <Stack.Screen
          name="LaunchPage"
          component={LaunchPage}
          options={{ headerShown: false }}
        /> */}
       <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Transaction"
          component={Transaction}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nearby"
          component={Nearby}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="FAQ"
          component={FAQ}
          options={{ headerShown: false }}
        />

      <Stack.Screen
          name="Guide"
          component={Guide}
          options={{ headerShown: false }}
        />
        
         <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Contacts"
          component={Contacts}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateConversation"
          component={CreateConversation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ConfirmSignup"
          component={ConfirmSignup}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="shopping"
          component={shopping}
          options={{ headerShown: false }}
        />
           <Stack.Screen
          name="Exchange"
          component={Exchange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="cart"
          component={cart}
          options={{ headerShown: false }}
        />
        
         <Stack.Screen
          name="WalkthroughScreen"
          component={WalkthroughScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainContainer"
          component={MainContainer}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="AboutMe"
          component={AboutMe}
          options={{
            title: 'About Me',
             headerShown: false }}
        />
         <Stack.Screen
          name="Account"
          component={Account}
          options={{
            title: 'Account',
             headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

