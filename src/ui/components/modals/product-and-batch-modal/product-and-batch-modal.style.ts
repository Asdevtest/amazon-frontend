import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  root: {
    width: 950,
    padding: 10,
  },

  header: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
  },

  updatedContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  updatedText: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.second,
  },

  updatedTitle: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  subHeader: {
    padding: '15px 0',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 50,
  },

  amazonTitle: {
    width: '100%',
    maxHeight: 154,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: 16,
    lineHeight: '22px',

    display: '-webkit-box',
    WebkitLineClamp: 7,
    WebkitBoxOrient: 'vertical',
  },

  additionInfo: {
    maxWidth: 200,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },

  shopContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  shopName: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  shopValue: {
    fontSize: 14,
    lineHeight: '19px',
    overflow: 'hidden',
    textWrap: 'nowrap',
    textOverflow: 'ellipsis',
  },

  fields: {
    padding: '15px 0',
    display: 'flex',
    gap: 5,
  },

  field: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },

  fieldTitle: {
    height: 32,
    marginBottom: 10,
    fontSize: 12,
    lineHeight: '16px',
    textAlign: 'center',
    color: theme.palette.text.second,
  },

  fieldValue: {
    fontSize: 14,
    lineHeight: '19px',
    fontWeight: 500,
    color: theme.palette.text.general,
  },

  fieldIcon: {
    width: '19px !important',
    height: '19px !important',
    color: theme.palette.primary.main,
  },

  blueText: {
    color: theme.palette.primary.main,
  },

  fieldColumn: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 5,
  },

  flexConainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
  },

  stockCostWrapper: {
    width: 100,
    textAlign: 'center',
  },

  additionPurchaseWrapper: {
    width: 160,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
  },

  inputAdditionPurchase: {
    width: 100,
    padding: '2px 5px',
    fontSize: 14,
    lineHeight: '19px',
    textAlign: 'center',
    background: theme.palette.background.general,
    boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.17)',
    border: `1px solid ${theme.palette.background.second}`,
    borderRadius: 6,
    opacity: 1,
    transition: '.3s ease-in-out',

    '&:focus': {
      border: `1px solid ${theme.palette.primary.main}`,
    },

    '&:disabled': {
      opacity: 0.5,
    },
  },

  tableWrapper: {
    marginTop: 15,
    width: '100%',
    height: 380,
  },
}))
