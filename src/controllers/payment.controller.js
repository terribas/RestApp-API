import { json } from 'body-parser';
import userController from '../controllers/user.controller'
import User from '../models/User';
import config from '../config';


export const createPaymentMethod = async (req, res) => {
    const stripe = require('stripe')(config.STRIPE_KEY); // https://stripe.com/docs/keys#obtain-api-keys
    console.log("createPaymentMethod")
    
  try {
    const card = req.body.card
    console.log('TARJETA RECIBIDA ' + JSON.stringify(card))
    /*const theCard = {
        number: '4242424242424242',
        //4000002500003155
        //number: '4000000000003220', //asdas44ds
        exp_month: 5,
        exp_year: 2022,
        cvc: '314', s
      }*/
      const paymentM = await stripe.paymentMethods.create({
        type: 'card',
        card: card
      });
      if (paymentM.id) {
        return res.status(200).json({
          'paymentMethod' : paymentM,
        });
      } else {
        return res.status(404)
      }
  } catch (error) {
    console.log("error createPaymentMethod")
    console.log(error)
    return res.status(404).json({
      "error": "Error 404",
    })
  }
};
  

export const pay = async (request, response) => {
  const stripe = require('stripe')(config.STRIPE_KEY); // https://stripe.com/docs/keys#obtain-api-keys
  try {
  // Create the PaymentIntent
    let intent; 
    const amount = request.body.amount
    if(request.body.payment_method_id) {
      intent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'eur',
        payment_method: request.body.payment_method_id,
        confirm: true,
        confirmation_method: 'manual',
        use_stripe_sdk: true,
      });
  
    } else if (request.body.payment_intent_id){
      intent = await stripe.paymentIntents.confirm(
        request.body.payment_intent_id
      )
    }
      return generateResponse(response, intent);
  } catch (e) {
    if (e.type === 'StripeCardError') {
      return response.send({ error: e.message });
    } else {
      return response.status(500).send({ error: e.type });
    }
  }
};

export const saveCard_v2 = async (request, response) => {  
  const stripe = require('stripe')(config.STRIPE_KEY); // https://stripe.com/docs/keys#obtain-api-keys
  try{    
    const id = request.body.user._id
    const user = await User.findById(id);
    const paymentMethodId = request.body.paymentMethodId
    
    if (user){
      console.log("tengo user")
      console.log(user)
    } else { 
      return response.status(500).send({ error: "no se ha encontrado usuario" });
    }

    //Creamos el cliente de stripe.
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId
    });
    if (customer){
      console.log("TENEMOS CLIENTE")
      console.log(customer)
    } else {
      console.log("F EN EL CHAT")
      return response.status(500).send({ error: "no se ha encontrado customer" })
    }

    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, 
      {
        customer: customer.id,
      }
    );
    if (paymentMethod){
      
      console.log("entro en update")
      let doc = await User.findByIdAndUpdate(user._id , {
        "stripe_key": customer.id,
      }, {
        new : true
      })  
    }

    return response.status(200).json({
      customer_id: customer.id,
    });
  } catch(error){
    console.log(error)
    return response.status(500).send({ error: "unexpected error" })
  }
}

export const getCard = async (request, response) => {  
  const stripe = require("stripe")(config.STRIPE_KEY); // https://stripe.com/docs/keys#obtain-api-keys
  try{
    
    const id = request.body.user._id
    const user = await User.findById(id);
    const customer_id = user.stripe_key
    if (customer_id){
      console.log("customer_id")
      console.log(customer_id)
    } else {
      return response.status(200).json({
        tarjeta:false
      })
    }
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer_id,
      type: 'card',      
    })
    if (paymentMethods){
      console.log(paymentMethods)
      return response.status(200).json({
        tarjeta:true,
        requiresAction: true, 
        paymentMethods: paymentMethods
      });
    } else {
      return response.status(200).json({
        tarjeta:false
      })
    }

  }catch(err){
    console.log("error en getCard")
    console.log(err)
    return response.status(500).json({error: 'Unexpected status '});
  }
}

export const payWithCard = async (request, response) =>{
  const stripe = require("stripe")(config.STRIPE_KEY);
  try{
    console.log("pay with card")
    const id = request.body.user._id
    console.log(id)
    const user = await User.findById(id);
    const customerId = user.stripe_key
    const paymentMethodiD = request.body.paymentMethodiD
    
    console.log(paymentMethodiD)
    console.log(customerId)
    let intent;
    const amount = request.body.amount

    intent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      confirm: true,
      confirmation_method: 'manual',
      customer: customerId ,
      payment_method: paymentMethodiD,
      use_stripe_sdk: true,
    });
    return generateResponse(response, intent);
  } catch(error){
    console.log(error)
    return response.status(500).json({error: 'Unexpected status: ' + error});
  }
}

export const deleteCard = async (request, response) => {
  try {
    console.log("delecard")
    const id = request.body.user._id
    const user = await User.findById(id);  
    //const empty = ''
    console.log(user)
    if (user){
      let doc = await User.findByIdAndUpdate(user._id , {
        "stripe_key": "",
      }, {
        new : true
      })
      console.log("asddddf")
      return response.status(200).json({borrado:true})
    } else{
      return response.status(500).json({borrado:false}) 
    }
    
    return response.status(200).json({borrado:true})
  } catch(error){
    return response.status(500).json({borrado:false, error:error})
  }
}

function generateResponse(response, intent) {
  if (intent.status === 'succeeded') {
    // Handle post-payment fulfillment
    return response.status(200).json({ success: true });
  } else if (intent.status === 'requires_action') {
    // Tell the client to handle the action
    return response.status(200).json({
      requiresAction: true, 
      clientSecret: intent.client_secret
    });
  } else {
    // Any other status would be unexpected, so error
    return response.status(500).json({error: 'Unexpected status ' + intent.status});
  }
}



  
  
  