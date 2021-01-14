import React, {Fragment, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core'
import {useForm, FormProvider} from 'react-hook-form'
import {commerce} from '../../lib/commerce'

import CustomTextField from './CustomTextField'

const AddressForm = ({
  checkoutToken,
  next
}) => {
 
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingOptions, setShippingOptions] = useState([]);

  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOption, setShippingOption] = useState('');

  const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name}))
  const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
  const options = shippingOptions.map(shippingOption => (
    {
    id: shippingOption.id, 
    label: `${shippingOption.description} - (${shippingOption.price.formatted_with_symbol})` 
    }
  ))
  
  const fetchshippingCountries = async (checkoutTokenId) => {

    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries)
    // setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubDivisions = async (countryCode) => {

    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchshippingOptions = async (checkoutTokenId, country, region = null) => {

    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region});

    setShippingOptions(options);
    setShippingOption(options[0].id)
    
  }

  useEffect(() => {
    fetchshippingCountries(checkoutToken.id)
  }, [checkoutToken.id]);

  useEffect(() => {
    if(shippingCountry) fetchSubDivisions(shippingCountry)
  }, [shippingCountry]);

  useEffect(() => {
    if(shippingSubdivision) fetchshippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
  }, [checkoutToken.id, shippingCountry, shippingSubdivision]);

  const methods = useForm();
  return (
    <Fragment>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form onSubmit= {methods.handleSubmit(data => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
          <Grid container spacing={3}>
            <CustomTextField 
              name= 'firstName'
              label= 'First Name'
              required
            />
            <CustomTextField 
              name= 'lastName'
              label= 'Last Name'
              required
            />
            <CustomTextField 
              name= 'address1'
              label= 'Address'
              required
            />
            <CustomTextField 
              name= 'email'
              label= 'Email'
              required
            />
            <CustomTextField 
              name= 'city'
              label= 'City'
              required
            />
            <CustomTextField 
              name= 'zip'
              label= 'Zip / Postal code'
              required
            />
            {/* 1 */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>

              <Select value={shippingCountry || ''} onChange={event => setShippingCountry(event.target.value)} fullWidth>
              {countries.map(country => (
                <MenuItem key={country.id} value={country.id} >
                    {country.label}
                </MenuItem>
              ))}
              </Select>

            </Grid>
            {/* 2 */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select value={shippingSubdivision || ''} onChange={event => setShippingSubdivision(event.target.value)} fullWidth>
              {
                subdivisions.map(subdivision => (
                  <MenuItem key={subdivision.id} value={subdivision.id}>
                    {subdivision.label}
                </MenuItem>
                ))
              }
              </Select>
            </Grid>
            {/* 3 */}
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption || ''} onChange={event => setShippingOption(event.target.value)} fullWidth>
              {
                options.map( option => (
                  <MenuItem key={option.id} value={option.id}>
                   {option.label}
                </MenuItem>
                ))
              }
              </Select>
            </Grid>
          </Grid>
          <br/>
          <div style={{ display: 'flex', justifyContent: 'space-between'}}>
              <Button component={Link} to='/cart' variant='outlined' color='secondary'>Back To Cart</Button>
              <Button type='submit' variant='contained' color='primary'>Next Step </Button>
          </div>
        </form>
      </FormProvider>
    </Fragment>
  )
}

export default AddressForm
