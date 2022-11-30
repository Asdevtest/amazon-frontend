import {makeStyles} from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
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
    color: theme.palette.text.second,
    marginBottom: '10px',
    marginTop: '10px',
  },
  title: {
    display: '-webkit-box',
    '-webkitLineClamp': 4,
    '-webkitBoxOrient': 'vertical',
    height: 85,
    whiteSpace: 'normal',

    overflow: 'hidden',
    textOverflow: 'ellipsis',

    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',

    width: '100px',
  },
  titleOfCurBox: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    width: '250px',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.second,
    marginRight: theme.spacing(1),
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

    // color: `${theme.palette.text.second} !important`,
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
    minWidth: 50,
    display: 'flex',
    alignItems: 'center',

    flexDirection: 'column',
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
    color: theme.palette.text.second,
  },

  labelWrapper: {
    margin: 0,
  },

  deleteBtnWrapper: {
    width: '40px',
    height: '40px',
    marginLeft: '10px',
    backgroundColor: 'inherit',
    margin: 0,
    padding: 0,

    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
  },
  editBtnWrapper: {
    width: '40px',
    height: '40px',
    backgroundColor: 'inherit',
    margin: 0,
    padding: 0,

    '&:hover': {
      backgroundColor: '#e4e4e4',
    },
    marginLeft: 10,
  },

  deleteBtn: {
    color: 'grey',
  },
  editBtn: {
    color: 'grey',
  },
}))
