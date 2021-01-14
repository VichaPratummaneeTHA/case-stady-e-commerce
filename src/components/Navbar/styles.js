import {makeStyles} from '@material-ui/core/styles'

export default makeStyles (() => ({
  appBar: {
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.12)'
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    textDecoration: 'none'
  },
  image: {
    marginRight: '10px',
  },
  grow: {
    flexGrow: 1,
  }

}))