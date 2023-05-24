/* eslint-disable no-unused-vars */
import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainFilterBtn: {
    color: theme.palette.primary.main,
    border: 'none',
    height: 44,
  },

  mainFilterBtnInsert: {
    display: 'flex',
  },

  mainFilterBtnInsertText: {
    fontWeight: 600,
    marginLeft: 5,
  },

  mainWrapper: {
    padding: 10,
  },

  titleText: {
    color: theme.palette.text.second,
  },

  searchInputWrapper: {
    width: 255,
    height: 30,

    margin: '5px 0 10px',
  },
  searchInput: {
    border: '1px solid #E0E0E0',
    width: '100%',
    height: '100%',
  },

  shopsBody: {
    width: 255,
    minHeight: 50,
    maxHeight: 400,
    overflowY: 'auto',
    textAlign: 'center',

    boxShadow: 'inset 0px -4px 13px rgba(135, 135, 135, 0.15)',
  },
  shop: {
    display: 'flex',
    alignItems: 'center',
  },
  shopName: {
    width: '100%',
    textAlign: 'left',

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))
