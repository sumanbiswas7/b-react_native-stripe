import { View, Text, StyleSheet } from "react-native";
import { STRIPE_PUBLISHABLE_KEY } from "@env";
import { StripeProvider } from "@stripe/stripe-react-native";

export function Component() {
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <View style={styles.container}>
        <Text>Component</Text>
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
});
