import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  row: {
    minWidth: '300px',
    outline: '1px solid rgba(143, 152, 165, 0.5)',
  },

  standartCell: {
    width: '100px',
    height: '100%',
  },

  descriptionWrapper: {
    width: 300,
    display: 'flex',
    marginBottom: 5,
  },

  img: {
    marginRight: 20,
    width: '70px',
    height: '70px',
    objectFit: 'contain',
    objectPosition: 'center',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    width: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down(768)]: {
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '21px',
      overflow: 'visible',
      textOverflow: 'inherit',
      whiteSpace: 'pre-wrap',
    },
  },

  asinWrapper: {
    display: 'flex',
    gap: 5,
  },

  unitsText: {
    color: theme.palette.text.second,
  },

  linkSpan: {
    color: theme.palette.primary.main,
  },

  unitsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    paddingTop: 1,
  },

  inputWrapper: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: '4px',
    maxWidth: '90px',
    height: '30px',

    [theme.breakpoints.down(768)]: {
      border: '1px solid rgba(143, 152, 165, 1)',
      maxWidth: '45px',
    },
  },

  error: {
    border: '1px solid red',

    [theme.breakpoints.down(768)]: {
      border: '1px solid red',
    },
  },

  input: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '2px',
  },

  sizesCell: {
    minWidth: '140px',
    display: 'flex',
    gap: '5px',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },

  sizeWrapper: {
    display: 'flex',
    gap: '5px',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      gap: '1px',
    },
  },

  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
    },
  },
}))
