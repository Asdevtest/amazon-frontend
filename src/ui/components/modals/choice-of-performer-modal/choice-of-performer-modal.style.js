/* eslint-disable no-unused-vars */
import { keyframes } from '@emotion/react'

import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    width: 1700,
    height: 770,
  },
  cardsWrapper: {
    padding: '10px 0',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
  },
  dashboardCardWrapper: {
    width: '100%',
  },

  searchInput: {
    width: 390,
  },

  upWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: '140%',
  },
}))
