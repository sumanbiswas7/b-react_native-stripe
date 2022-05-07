const app = require("express")();
const { Stripe } = require("stripe");
require("dotenv").config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

app.get("/", async (req, res) => {
  res.send(`React-Native & Stripe server is running at port ${PORT}`);
});

app.post("/payments/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 50,
      currency: "inr",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

const PORT = process.env.port || 3000;
app.listen(PORT, () =>
  console.log(`Express Server is running at port ${PORT}`)
);
