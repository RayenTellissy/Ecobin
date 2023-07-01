import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 4,
    width: 295,
    height: 68,
    margin: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10
  },
  name: {
    fontFamily: "MontserratRegular",
    fontSize: 16,
    marginLeft: 20
  },
  logo:{ 
    height: 50,
    width: 50
  }
})

export default styles