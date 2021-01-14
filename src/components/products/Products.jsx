import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './product/Product'
import useStyles from './styles'

const Products = ({
  products,
  onAddToCart
}) => {

  const classes = useStyles();

 return(
<main className={classes.content}>
  <div className={classes.toolbar}/>
  <Grid container justify='center' spacing={4}>
    {
      products.map(p => (
        <Grid item key={p.id} xs={12} sm={6} md={4} lg={3}>
          <Product 
            product = {p}
            onAddToCart = {onAddToCart}
          />
        </Grid>
      ))
    }
  </Grid>
</main>
 )

}

export default Products
