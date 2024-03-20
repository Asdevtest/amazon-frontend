import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    height: 309,
    overflowY: 'auto',
    borderTop: `1px solid #E0E0E0`,
  },

  product: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'flex-start',
    gap: 20,
    borderBottom: `1px solid #E0E0E0`,
  },

  photosWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
  },

  descriptionWrapper: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  parametersWrapper: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },

  parameters: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 20,
  },

  field: {
    width: '130px !important',
    margin: '0 !important',
  },

  input: {
    height: 40,
    borderRadius: 7,
  },

  label: {
    marginBottom: 5,
  },

  button: {
    padding: '0 20px',
  },

  iconContainer: {
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  boxLabelsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },

  boxLabelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(100% / 2 - 5px)',
    gap: 5,
  },

  checkbox: {
    padding: 0,
  },

  text: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.general,
  },

  amazonTitle: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 5,
    WebkitBoxOrient: 'vertical',
  },

  bigText: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  blueColor: {
    padding: '10px 0',
    color: theme.palette.primary.main,
  },
}))
