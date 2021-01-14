import React, { Fragment} from 'react'
import {AppBar, Toolbar, IconButton, Badge, Typography} from '@material-ui/core'
import {ShoppingCart} from '@material-ui/icons'
import {Link, useLocation} from 'react-router-dom'


import useStyles from './styles'
import logo from '../../assets/commerce.png'



const Navbar = ({
  totalItems
}) => {

  const classes = useStyles();
  const location = useLocation();

  return (
    <Fragment>
      <AppBar position='fixed' className='{classes.appBar}' color='inherit'>
        <Toolbar>

          <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
            <img src={logo} alt="Vicha E-Commerce" height='25px' className={classes.image}/>
            Vicha E-Commerce
          </Typography>
          
          <div className={classes.grow}/>
          {location.pathname === '/' && 
            <div >
                <IconButton component={Link} to='/cart' aria-label='Show Cart Items' color='inherit'>
                    <Badge badgeContent={totalItems} color='secondary'>
                      <ShoppingCart />
                    </Badge>
                </IconButton>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Fragment>
  )
}

export default Navbar
