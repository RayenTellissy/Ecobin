import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"

  },
  title: {
    fontFamily: "MontserratBold",
    color: "#09E4AF",
    fontSize: 22,
    margin: 15
  },
  input: {
    backgroundColor: "#ECECEC",
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 15,
    fontFamily: "MontserratMedium",
    width: 300,
    margin: 15
  },
  button: {
    padding: 15,
    borderRadius: 15,
    margin: 15
  }
})

export default styles