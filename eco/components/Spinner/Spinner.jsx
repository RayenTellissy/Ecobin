import { View, Image, Animated } from "react-native"
import * as Animatable from "react-native-animatable"

// styles imports
import styles from "../../styles/Spinner.styles"

const Spinner = () => {

  return (
    <Animated.View style={styles.container}>
      <Animatable.View style={styles.loaderContainer} animation="fadeIn" duration={100}>
        <Animatable.Image
          animation="rotate"
          easing="linear"
          iterationCount="infinite"
          source={{ uri: 'https://i.ibb.co/7WN6XFp/recycle-symbol.png' }}
          style={styles.loaderIcon}
        />
      </Animatable.View>
    </Animated.View>
  )
}

export default Spinner