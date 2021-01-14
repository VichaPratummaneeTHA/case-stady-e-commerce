import React, {Fragment} from 'react'
import {Typography, Button, Divider} from '@material-ui/core'
import {Elements, CardElement, ElementsConsumer} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({
  shippingData,
  checkoutToken,
  handleBackStep,
  handleCaptureCheckout,
  handleNextStep
}) => {

  console.log(shippingData)

  const handleOnSubmit = async (event, elements, stripe) => {

    if(!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    })

    if(error){
      console.log('[error]', error);
    }else{
      const orderData = {
        line_items: checkoutToken.live.line_items,
        customer: {
          firstname: shippingData.firstName,
          lastname: shippingData.lastName,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address1,
          town_city: shippingData.city,
          country_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zip,
          country: shippingData.shippingCountry  
        },
        fulfillment: { shipping_method: shippingData.shippingOption},
        payment: {
          gatway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      console.log(orderData);
      handleCaptureCheckout(checkoutToken.id, orderData)
      handleNextStep()

    }
    event.preventDefault();
  }

  return (
    <Fragment>
      <Review 
        checkoutToken={checkoutToken}
      />
      <Divider/>
      <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment Method</Typography>
      <div>

      <Elements stripe={stripePromise}>
      
        <ElementsConsumer>
          {
            ({elements, stripe}) => (
              <form onSubmit={event => handleOnSubmit(event, elements, stripe)}>
                <CardElement />
                <br/> <br/>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <Button onClick={() => handleBackStep()} to='/cart' variant='outlined' color='secondary'>Back</Button>

                  <Button type='submit' variant='contained' color='primary' disabled={!stripe}>Pay for {checkoutToken.live.subtotal.formatted_with_symbol}</Button>
                </div>
              </form>
            )     
          }
        </ElementsConsumer> 
      </Elements>
      </div>
     
    </Fragment>
  )
}

export default PaymentForm
