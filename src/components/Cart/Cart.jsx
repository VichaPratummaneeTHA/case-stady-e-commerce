import React, {Fragment} from 'react'
import {Link} from 'react-router-dom'
import { Container, Typography, Button, Grid } from '@material-ui/core';
import CardItem from './CartItem/CardItem'
import useStyles from './styles';

const Cart = ({
  cart,
  handleRemoveCart,
  handleEmptyCart,
  handleUpdateCartQty
}) => {

  const classes = useStyles();
 
  if(!cart.line_items) return 'Loading ...'
  return (
    <Container>
      <div className={classes.toolbar} />
      {console.log(cart)}
      <div>
      <Typography className={classes.title} variant='h3' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items ? (
    <Fragment>
      <Typography variant='subtitle1'>
      You have no items in your shopping cart,
        <Link to='/' className={classes.link}> start adding some</Link> !!!
      </Typography>
    </Fragment>
      ) : (
     <Fragment>  
      <Grid container spacing={3}>
          {
            cart.line_items.map( item => (
             
              <Grid item xs={12} sm={4} key={item.id}>
             
                <CardItem 
                  item= {item}
                  onRemoveCart = {handleRemoveCart}
                  onUpdateCartQty = {handleUpdateCartQty}
                />
              </Grid>
            ))
          }
          <div className={classes.cartDetails}>
            <Typography variant='h4'>
              Subtotal: {cart.subtotal.formatted_with_symbol}
            </Typography>

            <div>
              <Button 
                className={classes.emptyButton}
                onClick={() => handleEmptyCart()}
                size='large'
                type='button'
                variant='contained'
                color='secondary'
                >Empty Cart</Button>
              <Button 
                component = {Link} to = '/checkout'
                className={classes.checkoutButton}
                size='large'
                type='button'
                variant='contained'
                color='primary'
                >Checkout</Button>
            </div>
          </div>
        </Grid>    
      </Fragment>)
      }
      </div>
    </Container>
  )
}

export default Cart
