const stripe = require("stripe")(
  "sk_test_51HbXY0In97M0GymU2sa8iAP6NoRIcMnM4JKJPbxg2wfVq0EjV4APtnjlurIfqN4hfNLCeE9tsT5N752Y6YlLqWdS00gSWw72eX"
);
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

//Connect Database
connectDB();

//init Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const YOUR_DOMAIN = "https://infinite-depths-22566.herokuapp.com";
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Lord of the Flies",
              images: ["https://i.imgur.com/EHyR2nP.png"]
            },
            unit_amount: 2000
          },
          quantity: 1
        }
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success`,
      cancel_url: `${YOUR_DOMAIN}/cancel`
    });
    res.json({ id: session.id });
  } catch (error) {
    console.log(error);
  }
});

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// Set static folder
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
