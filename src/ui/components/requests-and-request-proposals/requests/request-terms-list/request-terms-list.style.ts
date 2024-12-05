import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  body: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    alignSelf: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },

  bodyWithBorder: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 4,
    padding: '30px 15px',
    justifyContent: 'space-around',
  },

  fieldLabel: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: theme.palette.text.second,
    marginBottom: 5,
  },

  fieldContainer: {
    height: '60px',
    marginBottom: '25px !important',
    maxWidth: '100px',
    '&:last-child': {
      marginBottom: '0px !important',
    },
  },

  accentText: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 600,

    color: theme.palette.text.general,
  },

  yellowColor: {
    color: `#C69109`,
  },

  redColor: {
    color: `#D70D0D`,
  },
}))
