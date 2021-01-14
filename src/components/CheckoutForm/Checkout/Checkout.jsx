import React, {Fragment, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core'
import useStyles from './styles'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import {commerce} from '../../../lib/commerce'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({cart, order, handleCaptureCheckout, errorMessage}) => {

  const [checkoutToken, setCheckoutToken] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const classes = useStyles()
  const history = useHistory()

  // console.log(shippingData)
  const handleNextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const handleBackStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    
    if(cart.id){

      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {type: 'cart'});
          console.log(token);
          setCheckoutToken(token)
        } catch {
          if(activeStep !== steps.length){
            history.push('/')
          }
        }
    }
      generateToken();
   }

 
  }, [cart]);

  const next = (data) => {
    setShippingData(data)
    handleNextStep();
  }

  const Form = () => (activeStep === 0 ? 
   
    <AddressForm 
      checkoutToken={checkoutToken}
      next={next}
      shippingData={shippingData}
      handleNextStep={handleNextStep}
    />
   : 
    <PaymentForm 
      shippingData={shippingData}
      checkoutToken={checkoutToken}
      handleBackStep={handleBackStep}
      handleCaptureCheckout={handleCaptureCheckout}
      handleNextStep={handleNextStep}
    />
  )

  let Confirmation = () => ( order.customer ? (
    <Fragment>
    <div>
      <Typography variant='h5'>Thank You for your purchase ...</Typography>
      {order.customer.firstname} {order.customer.lastname}!
      <Divider className={classes.divider}/>
      <Typography variant='subtitle2'>Order Reference : {order.customer_reference}</Typography>
    </div>
    <br/>
    <Button component={Link} to='/' variant='outlined' type='button'>Back To Home</Button>
    </Fragment>
  ) : (
    <Fragment>
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    </Fragment>
  ))

  // Chech Error 

  if(errorMessage){
    Confirmation = () => {
      <Fragment>
        <Typography variant='h5'>
          Error : {errorMessage}
        </Typography>
        <br/>
        <Button component={Link} to='/' type='button' variant='outlined'>Back To Home</Button>
      </Fragment>
    }
  }


  return (
    <Fragment>
    <div className={classes.toolbar} />
      <main className={classes.layout}>

        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className='classes.stepper'>
            {
              steps.map( (step, index) => (
                <Step key={index}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))
            }
          </Stepper>

          {activeStep === steps.length ? (<Confirmation />) : (checkoutToken && <Form />)}
          
        </Paper>

      </main>

    </Fragment>
  )
}

export default Checkout
