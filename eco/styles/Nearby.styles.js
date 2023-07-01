import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  upperContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35
  },
  nearby: {
    fontFamily: "MontserratBold",
    fontSize: 30,
    color: "#2DCC70"
  },
  searchContainer: {
    margin: 20,
    borderWidth: 1.5,
    borderColor: "black",
    borderRadius: 30,
    height: 45,
    justifyContent: "center"
  },
  search: {
    marginLeft: 20,
    fontFamily: "MontserratRegular"
  },
  searchIcon: {
    position: "absolute",
    right: 20
  },
  loadingText: {
    fontSize: 26,
    color: "#28B446",
    fontFamily: "MontserratBold"
  },
  scrollContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderScroll: {
    color: "#BAB9D0",
    fontFamily: "MontserratRegular"
  }
})

export default styles