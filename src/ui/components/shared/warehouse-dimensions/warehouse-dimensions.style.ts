import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  numberInputFieldsBlocksWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: 10,
  },

  numberInputFieldsWrapper: {
    width: '100%',
    height: 70,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  numberInputField: {
    margin: '5px 5px',
  },

  label: {
    marginBottom: 0,
  },
}))
