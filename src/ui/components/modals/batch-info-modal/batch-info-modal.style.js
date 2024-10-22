import { makeStyles } from 'tss-react/mui'

import { display } from '@mui/system'

export const useStyles = makeStyles()(theme => ({
  form: {
    height: '82vh',
    display: 'flex',
    flexDirection: 'column',
    width: '1250px',
    gap: 20,
  },

  boxCounterWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  boxCounterText: {
    color: theme.palette.primary.main,
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
    alignItems: 'center',
    gap: '10px',
  },

  datesTitle: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontSize: 14,
    lineHeight: '19px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '40px',
  },

  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  },

  rowContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'center',
  },

  fieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  searchWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
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
    width: '300px',
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
    whiteSpace: 'nowrap',
    marginBottom: '5px',
  },

  infoField: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19px',
  },

  tableWrapper: {
    display: 'flex',
    height: 350,
    width: '100%',
  },

  filesAndButtonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },

  closeFieldsWrapper: {
    display: 'flex',
    gap: 30,
  },
}))
