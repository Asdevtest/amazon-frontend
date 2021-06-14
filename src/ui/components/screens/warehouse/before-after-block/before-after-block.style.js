const {makeStyles} = require('@material-ui/core')

export const useClassNames = makeStyles(theme => ({
  boxesWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttonsWrapper: {},
  currentBox: {
    marginBottom: '20px',
  },
  currentBoxFooter: {
    display: 'flex',
    alignItems: 'flex-end',
    height: '60px',
  },
  newBoxes: {
    marginBottom: '20px',
  },
  box: {
    minWidth: '300px',
    marginBottom: '20px',
  },
  order: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    margin: '0 30px',
  },
  img: {
    width: '32px',
    height: '32px',
    marginRight: '4px',
  },
  imgBox: {
    width: '50px',
    height: '50px',
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
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    width: '40px',
    height: '20px',
  },
  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  orderChip: {
    backgroundColor: 'rgb(0, 123, 255)',
    color: 'white',
    fontSize: '13px',
    borderRadius: '4px',
  },
  select: {
    backgroundColor: 'rgba(0, 123, 255, 1)',
    color: 'white',
  },
  mainPaper: {
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
    marginBottom: '20px',
    padding: '10px',
  },
  chipWrapper: {
    display: 'flex',
    gap: '20px',
  },
  categoryTitle: {
    fontSize: '16px',
    lineHeight: '20px',
    color: 'rgba(61, 81, 112, 1)',
    fontWeight: '600',
    marginBottom: '12px',
  },
  demensionsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minWidth: '200px',
  },
  editBtn: {
    marginTop: '20px',
  },
}))
