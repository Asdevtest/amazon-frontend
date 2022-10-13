import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  '@global': {
    '@keyframes animate_gradient': {
      '0%': {
        backgroundPosition: '0% 50%',
      },
      '50%': {
        backgroundPosition: '100% 50%',
      },
      '100%': {
        backgroundPosition: '0% 50%',
      },
    },
  },

  modalMessageWrapper: {
    width: '425px',
    minHeight: '168px',

    padding: '0 20px',
    // gap: '20px',
  },

  warningModalMessageWrapper: {
    background: '#fff',
    borderRadius: '10px 10px',
    // padding: '10px',
  },

  modalMessage: {
    // maxWidth: '350px',
    textAlign: 'center',
  },

  warningModalMessage: {
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    margin: 0,
  },

  modalMessageBtn: {
    alignSelf: 'flex-end',
  },
  buttonsWrapper: {
    width: '100%',
    display: 'flex',
    gap: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allowedRoleContainer: {
    margin: 0,
  },

  warningButtonsWrapper: {
    borderRadius: '0 0 10px 10px',
    background: '#fff',
    marginTop: '22px',
  },

  titleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '18px',
    lineHeight: '140%',
    fontWeight: 600,
  },

  warningTitle: {
    // width: '100%',
    borderRadius: '10px',
    backgroundSize: '400% 400%',
    animation: 'animate_gradient 1.5s ease infinite',

    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '140%',
    textAlign: 'center',
    color: '#354256',
    verticalAlign: 'middle',
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

  shopsSelect: {},
  selectMenu: {
    width: '317px',
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
    backgroundColor: '#CCE2FF',
    borderRadius: '4px',
    fontSize: '14px',
    lineHeight: '16px',
    fontWeight: '400',
    color: theme.palette.text.general,
    maxWidth: '250px',
  },

  selectedShopText: {
    maxWidth: '200px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  removeShopButton: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },

  shopsFieldAddButton: {
    width: '131px',
    height: '40px',
  },

  deleteIcon: {
    cursor: 'url(/assets/icons/cursor-two.svg) 5 0, auto',
  },
  fieldLabel: {
    fontSize: '14px',
    lineHeight: '19px',
    color: '#656565',
  },
}))
