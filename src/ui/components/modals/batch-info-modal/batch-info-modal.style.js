import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  boxCounterWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  boxCounterText: {
    color: theme.palette.text.second,
  },

  boxCounterCount: {
    fontWeight: 600,
    marginLeft: 5,
  },

  modalTitle: {
    fontSize: '18px',
    lineHeight: '25px',
    fontWeight: 600,
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    gap: 40,
  },

  amount: {
    marginLeft: '5px',
  },

  headerSubWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 30,
  },

  datesWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '10px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  storekeeperField: {
    maxWidth: '270px',
    margin: '0 !important',
    display: 'flex !important',
    justifyContent: 'flex-end !important',
  },
  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'flex-end',
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
  },

  searchInput: {
    width: '400px',
    height: '32px',

    input: {
      '&::placeholder': {
        fontSize: 14,
        lineHeight: '19px',
      },
    },
  },

  fieldLabel: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },
  subFieldLabel: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '16px',
    whiteSpace: 'pre-wrap',
    marginBottom: '5px !important',
  },
  infoField: {
    fontSize: 14,
    lineHeight: '19px',
  },
  tableWrapper: {
    height: 350,
    width: '100%',
  },

  disabled: {
    WebkitTextFillColor: `${theme.palette.text.second} !important`,
  },
  batchTitleField: {
    width: '160px !important',
    margin: '0 !important',
  },
  destinationField: {
    width: '270px !important',
    margin: '0 !important',
  },
  volumeWeightField: {
    width: '190px !important',
    margin: '0 !important',
  },
  methodField: {
    width: '270px !important',
    margin: '0 !important',
  },
  dividerField: {
    width: '120px !important',
    margin: '0 !important',
  },
  filesAndButtonWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  shippinCostContainer: {
    width: '190px !important',
    margin: '0 !important',
  },

  closeFieldsWrapper: {
    display: 'flex',
    gap: 30,
  },
}))
