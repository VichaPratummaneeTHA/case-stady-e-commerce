import React, {Fragment} from 'react'
import {Typography, Button, Card, CardActions, CardContent, CardMedia} from '@material-ui/core'
import useStyles from './styles'

const CardItem = ({
  item:{
    id,
    media:{
      source
    },
    name,
    line_total:{
      formatted_with_symbol
    },
    quantity
  },
  onRemoveCart, onUpdateCartQty
}) => {

  const classes = useStyles();

  return (
    <Fragment>
      <Card>
        <CardMedia className={classes.media} image={source} alt={name}/>
        <CardContent className={classes.cardContent}>
          <Typography variant='h4'>{name}</Typography>
          <Typography variant='h5'>{formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <div className={classes.buttons}>
            <Button tpye='button' size='small' onClick={()=> onUpdateCartQty(id, quantity -1)}> - </Button>
            <Typography>{quantity}</Typography>
            <Button  tpye='button' size='small' onClick={()=> onUpdateCartQty(id, quantity +1)} > + </Button>
          </div>
          <Button variant='contained' type='button' color='secondary' onClick={()=> onRemoveCart(id)}>Remove</Button>
        </CardActions>
      </Card>
    </Fragment>
  )
}

export default CardItem
