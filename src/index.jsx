import React from 'react'

import {ThemeProvider} from '@material-ui/styles'
import ReactDOM from 'react-dom'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import {reportWebVitals} from '@utils/report-web-vitals'

ReactDOM.render(
  <div className="App">
    <ThemeProvider theme={muiTheme}>
      <MainNav />
    </ThemeProvider>
  </div>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
