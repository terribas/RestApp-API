export const createPaymentMethod = async (req, res) => {
    const stripe = require("stripe")("sk_test_51IsANIBMsQSe7vj6zREYNfQhYeQhjs4gBWF6cYWgwIHBedw7wqHAkKClnnnr8acecOsX5hrLShtUx62Lbe6NQa0700ll925vnS"); // https://stripe.com/docs/keys#obtain-api-keys
    console.log("createPaymentMethod")
    
    try {
        //const theCard = req.body.theCard
        const theCard = {
          //number: '4242424242424242',
          //4000002500003155
          number: '4000002500003155', //asda
          exp_month: 5,
          exp_year: 2022,
          cvc: '314',
        }
        console.log(theCard)
        const paymentM = await stripe.paymentMethods.create({
            type: 'card',
            card: theCard
        });
  
        if (paymentM.id) {
          console.log("Todo ok")
          console.log(paymentM)
            return res.status(200).json({
              'paymentMethod' : paymentM,
            });
        } else {
          console.log("Algo ha salido mal")
            return res.status(404)
        }
    } catch (error) {
        console.log("error")
        console.log(error)
        return res.status(404).json({
          "error": "Error 404",
      })
    }
  };
  

  export const pay = async (request, response) => {
    const stripe = require("stripe")("sk_test_51IsANIBMsQSe7vj6zREYNfQhYeQhjs4gBWF6cYWgwIHBedw7wqHAkKClnnnr8acecOsX5hrLShtUx62Lbe6NQa0700ll925vnS"); // https://stripe.com/docs/keys#obtain-api-keys
    try {
      // Create the PaymentIntent
      let intent; //da
      if(request.body.payment_method_id) {
        console.log("Creacion intent de pago")
        intent = await stripe.paymentIntents.create({
          amount: 1099,
          currency: 'eur',
          payment_method: request.body.payment_method_id,
          confirm: true,
          confirmation_method: 'manual',
          use_stripe_sdk: true,
        });
  
      } else if (request.body.payment_intent_id){
        console.log("entro en else if")
        intent = await stripe.paymentIntents.confirm(
          request.body.payment_intent_id
        )
      }
        // A PaymentIntent can be confirmed some time after creation,
        // but here we want to confirm (collect payment) immediately.
      return generateResponse(response, intent);
    } catch (e) {
      if (e.type === 'StripeCardError') {
        console.log("StripeCardError")
        // Display error on client
        return response.send({ error: e.message });
      } else {
        console.log("ha pasado algo")
        // Something else happened
        return response.status(500).send({ error: e.type });
      }
    }
  };
  
  function generateResponse(response, intent) {
    if (intent.status === 'succeeded') {
      // Handle post-payment fulfillment
      return response.status(200).json({ success: true });
    } else if (intent.status === 'requires_action') {
      console.log("Crack esto requiere de accion...")
      console.log(intent.client_secret)
      // Tell the client to handle the action
      return response.status(200).json({
        requiresAction: true, 
        clientSecret: intent.client_secret
      });
    } else {
      // Any other status would be unexpected, so error
      console.log("wtf")
      return response.status(500).json({error: 'Unexpected status ' + intent.status});
    }
  }

  
  
  
  