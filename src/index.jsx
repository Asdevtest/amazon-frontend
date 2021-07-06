/* eslint-disable prefer-const */
import React from 'react'

// import { validate } from 'class-validator';
import ReactDOM from 'react-dom'
import 'reflect-metadata'

// import { BoxesCreateBoxContract } from '@models/boxes-model/boxes-model.contracts';
import '@services/mobx-persist-configure'

import {reportWebVitals} from '@utils/report-web-vitals'

import {App} from './app'

ReactDOM.render(<App />, document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
