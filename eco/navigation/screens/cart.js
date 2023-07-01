import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Modal, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { server_url } from '../../secret';

const CartComponent = () => {
  const route = useRoute();
  const { userId, balance: initialBalance } = route.params;
  console.log(userId);
  const navigation = useNavigation();
  const [cartProducts, setCartProducts] = useState([]);
  const [balance, setBalance] = useState(initialBalance);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCartProducts();
  }, [userId]);

  const fetchCartProducts = async () => {
    try {
      const response = await axios.get(`${server_url}/users/${userId}/cart`);
      const data = response.data;
      console.log(data);
      setCartProducts(data);
    } catch (error) {
      console.log('Error fetching cart products:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setIsLoading(true);
      await axios.delete(`${server_url}/users/${userId}`, {
        data: { productId },
      });
      const updatedCartProducts = cartProducts.filter((product) => product.id !== productId);
      setCartProducts(updatedCartProducts);
    } catch (error) {
      console.log('Error deleting product from cart:', error);
    } finally {
      setIsLoading(false);
      fetchCartProducts();
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
    console.log('Going back to the previous page');
  };

  const handleConfirmPurchase = () => {
    setConfirmModalVisible(true);
  };

  const handleModalClose = () => {
    setConfirmModalVisible(false);
  };

  const handlePurchaseConfirmation = async () => {
    console.log('Confirming the purchase');

    try {
      const totalPoints = cartProducts.reduce((sum, product) => sum + product.points, 0);

      if (balance < totalPoints) {
        Alert.alert('Insufficient Balance', 'You do not have enough balance to make this purchase.', [{ text: 'OK' }]);
        return;
      }

      setIsLoading(true); // Start the loading state

      await axios.post(`${server_url}/users/${userId}/purchase`, {
        cart: cartProducts.map((product) => product.id),
      });

      Alert.alert('Purchase Confirmed', 'Your order has been confirmed.', [{ text: 'OK' }]);

      setIsLoading(false); // End the loading state

      setConfirmModalVisible(false);
      setPhoneNumber('');

      // Update the balance after successful purchase
      const newBalance = balance - totalPoints;
      setBalance(newBalance);

      fetchCartProducts();

    } catch (error) {
      console.log('Error confirming the purchase:', error);
      setIsLoading(false); // End the loading state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cart</Text>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceText}>
          <Image source={require('../../assets/star.png')} style={styles.starImage} /> Balance: {balance}
        </Text>
      </View>
      {cartProducts.map((product, index) => (
        <View
          key={product.id}
          style={[
            styles.productContainer,
            index % 2 === 0 ? styles.evenContainer : styles.oddContainer,
          ]}
        >
          <Image source={{ uri: product.image }} style={styles.productImage} />
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productPoints}>Points: {product.points}</Text>
          </View>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteProduct(product.id)}
          >
            <Image source={require('../../assets/supp.png')} style={styles.deleteButtonImage} />
          </TouchableOpacity>
        </View>
      ))}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPurchase}>
        <Text style={styles.confirmButtonText}>Confirm </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
        <Text style={styles.goBackButtonText}>Go Back</Text>
      </TouchableOpacity>

      <Modal visible={confirmModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Exchange</Text>
            <Text style={styles.modalMessage}>Are you sure you want to proceed with the purchase?</Text>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity style={styles.modalCancelButton} onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirmButton} onPress={handlePurchaseConfirmation}>
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000000" />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginTop: 50,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  evenContainer: {
    backgroundColor: '#f0f0f0',
  },
  oddContainer: {
    backgroundColor: '#ffffff',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPoints: {
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  deleteButtonImage: {
    width: 25,
    height: 25,
  },
  confirmButton: {
    width: 200,
    height: 50,
    marginLeft:80,
    backgroundColor: '#6CC51D',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  goBackButton: {
    width: 200,
    height: 50,
    marginLeft:80,
    backgroundColor: '#B2B2B2',
    borderRadius: 18,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  goBackButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  phoneNumberInput: {
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCancelButton: {
    marginRight: 100,
    backgroundColor: '#2DCC70',
    borderRadius: 8,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalConfirmButton: {
    backgroundColor: '#2DCC70',
    borderRadius: 8,
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  balanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  starImage: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
});

export default CartComponent;