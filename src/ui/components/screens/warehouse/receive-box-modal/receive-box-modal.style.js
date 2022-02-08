import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    minWidth: '1500px',
  },

  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  currentBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '5px',
  },
  divider: {
    margin: '0 10px',
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
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '160px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  titleOfCurBox: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '250px',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },

  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '90px',
    height: '30px',
  },
  input: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '2px',
  },
  row: {
    minWidth: '300px',
    outline: '1px solid rgba(143, 152, 165, 0.5)',
  },

  sizesCell: {
    minWidth: '140px',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  standartCell: {
    minWidth: '100px',
  },

  sizeWrapper: {
    display: 'flex',
    gap: '5px',
  },
  descriptionWrapper: {
    display: 'flex',
  },
  qtyWrapper: {
    display: 'flex',
    gap: '5px',
  },
  buttonsWrapper: {
    marginTop: '30px',
  },
  qtyCell: {
    minWidth: '80px',
  },
  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
  },

  button: {
    marginRight: '10px',
  },
}))
