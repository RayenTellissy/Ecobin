import { StyleSheet } from "react-native"

export const currentUserStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#80D48F",
    alignSelf: "flex-end",
    padding: 10,
    margin: 5,
    maxWidth: "70%"
  },

  message: {
    fontFamily: "MontserratMedium"
  },

  time: {
    color: "#80D48F",
    fontFamily: "Montserrat",
    marginTop: 5
  }
})

export const otherUserStyles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#dedfe3",
    alignSelf: "flex-start",
    padding: 10,
    margin: 5,
    maxWidth: "70%"
  },

  message: {
    fontFamily: "MontserratMedium"
  },

  time: {
    color: "#80D48F",
    fontFamily: "Montserrat",
    marginTop: 5
  }
})
