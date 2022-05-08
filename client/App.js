import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Component } from "./Component";

export default function App() {
  return (
    <>
      <Component />
      <StatusBar style="auto" />
    </>
  );
}
