import { StyleSheet } from "react-native"

const styles = StyleSheet.create({

  image: {
    height: 55,
    width: 55,
    borderRadius: 100,
    margin: 10
  },

  detailsContainer: {
    marginTop: 10,
    flex: 1
  },
  name: {
    fontFamily: "MontserratBold",
    margin: 5
  },
  message: {
    fontFamily: "MontserratMedium",
    marginLeft: 5,
    color: "#A5A5A5"
  },

  timeContainer: {
    flex: 0,
    alignItems: "flex-end",
  },
  time: {
    color: "#A5A5A5",
    fontFamily: "MontserratRegular",
    margin: 15
  }
})

export default styles