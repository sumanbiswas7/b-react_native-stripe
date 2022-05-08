import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

import { useState } from "react";

export function Component() {
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  async function handlePayPress() {
    async function fetchPaymentIntentClientSecret() {
      const API_URL =
        "http://192.168.0.111:3000/payments/create-payment-intent";
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { error, clientSecret } = await response.json();
      return { error, clientSecret };
    }
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details");
      return;
    }
    const { error, clientSecret } = await fetchPaymentIntentClientSecret();
    if (error) {
      console.log(error);
      return;
    } else {
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        type: "Card",
        billingDetails: {
          email: "sumantest@email.com",
        },
      });
      if (error) {
        alert(`Payment Confirmation Error ${error.message}`);
      } else if (paymentIntent) {
        alert("Payment Successful");
        console.log("Payment successful ", paymentIntent);
      }
    }
  }

  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <CardField
          postalCodeEnabled={false}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
        <TouchableOpacity
          onPress={handlePayPress}
          activeOpacity={0.7}
          disabled={loading}
          style={styles.pay_btn_container}
        >
          <Text style={styles.pay_text}>Pay</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    width: "95%",
    height: 50,
    marginVertical: 30,
  },
  card: {
    backgroundColor: "#efefefef",
    textColor: "#000000",
    fontSize: 15,
  },
  pay_btn_container: {
    backgroundColor: "#000",
    width: "95%",
    justifyContent: "center",
    height: 50,
  },
  pay_text: {
    color: "#FFF",
    fontSize: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
});
