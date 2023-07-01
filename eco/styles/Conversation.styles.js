import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 100,
    marginLeft: 15,
  },
  name: {
    fontFamily: "MontserratBold",
    fontSize: 17,
    marginLeft: 15
  },

  inputContainer: {
    backgroundColor: "#e8e8e8",
    height: "15%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  noMessages: {
    fontSize: 20,
    alignSelf: "center",
    fontFamily: "MontserratMedium",
    margin: 20
  },
  noMessageName: {
    color: "#09E4AF"
  }
})

export default styles