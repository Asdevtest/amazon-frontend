import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  newBoxes: {
    marginBottom: '20px',

    [theme.breakpoints.down(1282)]: {
      width: '100%',
      height: 295,

      overflowY: 'auto',
    },
  },

  sectionTitle: {
    color: theme.palette.text.second,
    marginBottom: theme.spacing(1),

    [theme.breakpoints.down(1282)]: {
      display: 'none',
    },

    [theme.breakpoints.down(768)]: {
      marginTop: '40px',
      marginBottom: '40px',
      fontSize: '16px',
      lineHeight: '22px',
      color: theme.palette.text.general,
    },
  },

  redText: {
    color: theme.palette.text.red,
  },

  tableWrapper: {
    width: '100%',
  },

  tableWrapperMobile: {
    display: 'none',

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
  },

  boxesTitleWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },

  boxesTitle: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '140%',
      fontWeight: 600,
      color: theme.palette.text.general,
      textTransform: 'uppercase',
    },
  },

  deleteBtn: {
    color: 'rgba(189, 194, 209, 1)',
    [theme.breakpoints.down(768)]: {
      color: theme.palette.text.general,
    },
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

  unitsWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    paddingTop: 1,
  },

  unitsText: {
    color: theme.palette.text.second,
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

  tableRow: {
    width: 500,

    [theme.breakpoints.down(768)]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
  },

  boxTitleMobile: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: 600,
      color: theme.palette.text.general,
    },
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

  sizeTitle: {
    [theme.breakpoints.down(768)]: {
      fontSize: '12px',
      lineHeight: '16px',
      color: theme.palette.text.second,
    },
  },

  footerBtnsWrapper: {
    [theme.breakpoints.down(768)]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },

  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
