import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  title: {
    fontFamily: "MontserratBold",
    fontSize: 22,
    color: "#09E4AF",
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 200
  },
  button: {
    padding: 15,
    borderRadius: 15,
    margin: 15
  }
})

export default styles
