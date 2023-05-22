import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  root: {
    background: 'linear-gradient(112.25deg, #CCE2FF 17.37%, #D9F1E3 79.14%)',
    color: '#354256',
    height: '100vh',
    width: '100vw',
  },

  header: {
    minHeight: '40%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  main: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    // marginRight: '15px'
  },

  logo: {
    width: '350px',
    height: '150px',
    objectFit: 'cover',
  },
}))
