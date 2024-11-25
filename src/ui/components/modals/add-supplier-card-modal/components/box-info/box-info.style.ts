import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  boxInfoWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },

  boxInfoInputsWrapper: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'space-between',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },

  deliveryField: {
    width: 'calc(100% / 2 - 5px)',
  },
}))
