import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// common components imports
import Logo from '../../components/Logo/Logo'
import LogoBackground from '../../components/Logo/LogoBackground'

// styles imports
import HomeStyles from "../../styles/Home.styles"
import styles from '../../styles/Home.styles'

const Home = () => {

    const navigation = useNavigation()

    React.useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    },[navigation])

    return (
        <SafeAreaView>
            <View>
                <View style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                    <LogoBackground/>
                    <Logo/>
                    <View style={{top: 50, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                        <Text style={{fontFamily: "MontserratBold", fontSize: 28, color: "#2DCC70"}}>Welcome</Text>
                        <Text style={{marginTop: 20, color: "#80D48F", fontFamily: "Montserrat"}}>Care about waste management</Text>
                        <Text style={{color: "#80D48F", fontFamily: "Montserrat"}}>Care about the future</Text>
                        <TouchableOpacity style={{borderRadius: 38, backgroundColor: "#09E4AF", alignItems: "center", padding: 10, width: 300, marginTop: 20}} onPress={() => navigation.navigate("Login")}>
                            <Text style={{fontFamily: "MontserratRegular", color: "white", fontSize: 20}}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{borderRadius: 38, backgroundColor: "inherit", alignItems: "center", padding: 10, width: 300, borderColor: "#09E4AF", borderWidth: 2, marginTop: 10}} onPress={() => navigation.navigate("Signup")}>
                            <Text style={{fontFamily: "MontserratRegular", color: "#2DCC70", fontSize: 20}}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={{marginTop: 20, display: "flex", alignItems: "center"}}>
                             <Text style={styles.lowerText}>By logging in or registering, you agree to our</Text>
                             <Text style={styles.lowerText}>Terms of Service and Privacy Policy</Text>
                         </View>
                    </View>
                  </View>
             </View>
        </SafeAreaView>
    )
}

export default Home
