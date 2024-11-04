import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  newBoxes: {
    marginBottom: '20px',
  },

  sectionTitle: {
    color: theme.palette.text.second,
    marginBottom: 20,
  },

  warningText: {
    color: '#F3AF00',
  },

  tableWrapper: {
    width: '100%',
  },

  tableWrapperMobile: {
    display: 'none',
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
  },

  error: {
    border: '1px solid red',
  },

  input: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '2px',
  },

  tableRow: {
    width: 500,
  },

  sizeWrapper: {
    display: 'flex',
    gap: '5px',
  },

  sectionTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))
