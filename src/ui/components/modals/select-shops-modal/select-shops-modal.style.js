import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  modalMessageWrapper: {
    width: '425px',
    minHeight: '168px',
    padding: '0 20px',
  },

  modalMessage: {
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.general,
  },

  buttonsWrapper: {
    marginTop: 20,
    width: '100%',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allowedRoleContainer: {
    margin: 0,
  },

  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
    color: theme.palette.text.general,
  },

  button: {
    height: '40px',
    width: '98px',
  },

  cancelButton: {
    height: '40px',
    width: '98px',
    color: theme.palette.text.general,
  },

  shopsFieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  select: {
    width: '167px',
    border: '1px solid #e0e0e0',
    padding: '10px 15px',
    borderRadius: '4px',
  },

  shopsSelect: {
    width: '214px',
    height: 40,
    color: theme.palette.text.general,
  },

  selectMenu: {
    width: '317px',
    color: theme.palette.text.general,
  },

  selectText: {
    maxWidth: 280,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  selectedShopsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
    margin: '10px 0 20px',
  },

  selectedShop: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    padding: '5px 15px',
    backgroundColor: theme.palette.background.second,
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.general,
    maxWidth: '250px',
  },

  selectedShopText: {
    maxWidth: '200px',
    fontSize: '14px',
    lineHeight: '19px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  removeShopButton: {
    cursor: 'pointer',
  },

  shopsFieldAddButton: {
    width: '131px',
    height: '40px',
  },

  deleteIcon: {
    cursor: 'pointer',
  },
  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },
}))
