import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },

  img: {
    width: '40px',
    height: '40px',
    marginRight: '4px',
    objectFit: 'contain',
    objectPosition: 'center',
  },
  sectionTitle: {
    color: theme.palette.text.secondary,
    fontSize: '20px',
    marginBottom: '10px',
    marginTop: '10px',
  },
  title: {
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    height: 85,
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '100px',
  },

  inputWrapper: {
    borderRadius: '4px',
    width: '100px',
    height: '40px',
  },
  input: {
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    padding: '6px 8px',
  },
  row: {
    minWidth: '300px',
    whiteSpace: 'normal',
    outline: '1px solid rgba(143, 152, 165, 0.5)',
  },

  normalCell: {
    minWidth: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCell: {
    width: 40,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  sizesWrapper: {
    minWidth: '110px',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  sizeWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  descriptionWrapper: {
    display: 'flex',
  },

  qtyCell: {
    minWidth: '80px',
  },

  checkboxWithLabelWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: 155,
  },

  hidden: {
    display: 'none',
  },

  label: {
    margin: 0,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.secondary,
  },

  labelWrapper: {
    margin: 0,
  },

  sizesSubWrapper: {
    display: 'flex',
    gap: '140px',
    marginBottom: 10,
  },

  transparencyCodesText: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '19px',
    color: theme.palette.text.red,
  },

  itemsNotEqualTotal: {
    color: theme.palette.text.red,
  },

  itemsEqualTotal: {
    color: theme.palette.text.green,
  },
}))
