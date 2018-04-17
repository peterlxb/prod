const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);

module.exports = app => {
  app.post('/api/stripe', async (req,res) => {
    if(!req.user) {
      return res.status(401).send({error: 'You must log in'});
    }

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id, // obtained with Stripe.js
      description: "Charge for $5"
    });
    //console.log(req.body);
    //console.log(charge);
    req.user.credits += 5;
    const user = await req.user.save();

    res.send(user);
  });
}
