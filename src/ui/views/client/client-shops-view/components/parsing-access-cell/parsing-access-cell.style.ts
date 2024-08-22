import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  issued: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    background: '#B3E7C7',
    color: '#0B903E',
    border: '1px solid #0B903E',
    borderRadius: '20px',
    fontSize: '14px',
    lineHeight: '19px',
    padding: '5px 10px',
  },

  button: {
    width: '100%',
  },
}))
