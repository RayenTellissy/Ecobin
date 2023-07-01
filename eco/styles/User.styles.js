import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 20,
    margin: 10
  },
  name: {
    margin: 10,
    fontFamily: "MontserratRegular",
    fontSize: 18
  }
})

export default styles