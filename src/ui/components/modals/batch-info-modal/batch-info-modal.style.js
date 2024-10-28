import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  form: {
    height: '82vh',
    display: 'flex',
    flexDirection: 'column',
    width: '1280px',
    gap: 20,
  },

  boxCounterWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },

  boxCounterText: {
    color: theme.palette.primary.main,
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
    marginBottom: '4px',
  },

  infoWrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  },

  rowContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  fieldWrapper: {
    width: '130px',
  },

  tariffWrapper: {
    width: '268px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userDataWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },

  userLinkWrapper: {
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
  },

  searchInput: {
    width: '267px',
  },

  fieldLabel: {
    fontWeight: '600',
    fontSize: '18px',
    whiteSpace: 'nowrap',
    lineHeight: '140%',
  },

  subFieldLabel: {
    color: theme.palette.text.second,
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '14px',
    marginBottom: '5px',
    height: '24px',
  },

  infoField: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '19px',
  },

  shippinCostContainer: {
    width: '130px !important',
    height: '51px',
    margin: '0 !important',
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
