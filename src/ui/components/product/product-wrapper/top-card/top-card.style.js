import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(() => ({
  label: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
  },
  input: {
    width: '100%',
  },
  text: {
    color: 'rgba(61, 81, 112, 1)',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '22px',
  },
  iconButton: {
    height: '40px',
    width: '40px',
    color: 'white',
    backgroundColor: 'rgba(0, 123, 255, 1)',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'rgba(0, 123, 255, 1)',
    },
  },
  title: {
    fontSize: '24px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '24px',
  },
  table: {
    border: '1px solid rgb(224, 224, 224)',
    '& td': {
      flexShrink: 0,
      color: 'rgba(61, 81, 112, 1)',
      borderBottom: 'none',
    },
    '& th': {
      color: 'rgba(61, 81, 112, 1)',
      fontWeight: 700,
      lineHeight: '15px',
      fontSize: '15px',
      padding: '8px',
    },
    '& tbody': {
      borderBottom: '1px solid rgba(224, 224, 224, 1)',
    },
  },
  alert: {
    marginBottom: '24px',
  },
  mainCardWrapper: {
    padding: '16px',
    marginBottom: '24px',
  },
  parseButtonsWrapper: {
    display: 'flex',
    marginBottom: '16px',
  },
  buttonParseAmazon: {
    marginRight: '16px',
    height: '50px',
  },
  productFieldBox: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
  },
  productCheckboxBox: {
    alignItems: 'center',
    display: 'flex',
  },
  typoCheckbox: {
    marginRight: '16px',
  },
  supplierContainer: {
    marginBottom: '20px',
  },
  supplierIcon: {
    marginRight: '16px',
  },
  supplierIconBackground: {
    backgroundColor: 'rgba(224, 32, 32, 1)',
  },
  tableCellPadding: {
    padding: '16px 24px',
  },
  centerTableCellPadding: {
    padding: '16px 24px',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },
  rightBoxComments: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'flex-start',
  },
  heightFieldAuto: {
    height: 'auto',
  },
  buttonsWrapper: {
    display: 'flex',
  },
  buttonNormal: {
    flexGrow: 1,
    marginRight: '16px',
  },
  buttonDelete: {
    flexGrow: 1,
  },
  carouselWrapper: {
    padding: '16px',
    marginBottom: '16px',
    height: '350px',
  },
  carouselImageWrapper: {
    width: '100%',
    height: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carouselImage: {
    height: '100%',
  },

  imageFileInputWrapper: {
    marginLeft: '20px',
  },
}))
