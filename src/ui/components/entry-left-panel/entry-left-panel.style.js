import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  leftPanel: {
    display: 'flex',
    flex: '0 0 45%',
    flexDirection: 'column',
    padding: '48px',
    background: 'linear-gradient(112.25deg, #CCE2FF 17.37%, #D9F1E3 79.14%)',
    color: '#354256',
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
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  title: {
    fontSize: '44px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 700,
  },
  footer: {
    minHeight: '40%',
    display: 'flex',
    alignItems: 'flex-end',
  },

  logo: {
    width: '283px',
    height: '150px',
    objectFit: 'contain',
  },
}))
