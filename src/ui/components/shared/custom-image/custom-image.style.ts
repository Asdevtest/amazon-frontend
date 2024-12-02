import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    display: 'flex',
    height: 'fit-content',
    width: 'fit-content',
  },

  root: {
    borderRadius: '4px',
    overflow: 'hidden',
    boxShadow: theme.palette.boxShadow.paper,

    '.ant-image-img': {
      objectFit: 'contain',
    },

    '.ant-image-mask-info': {
      fontSize: '0',

      span: {
        fontSize: 'initial',
        margin: '0 !important',
      },
    },
  },
}))
