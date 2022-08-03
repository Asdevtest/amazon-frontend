/* eslint-disable no-unused-vars */
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

import React, {useState} from 'react'

import {Divider, Paper, Typography} from '@material-ui/core'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import clsx from 'clsx'
import {ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Bar} from 'recharts'

import {TranslationKey} from '@constants/translations/translation-key'

import {DateMonthYearPicker} from '@components/date-picker/date-picker'
import {Field} from '@components/field/field'
import {Input} from '@components/input'
import {Modal} from '@components/modal'
import {BarsChart} from '@components/shop/shop-wrapper/charts/bars-chart/bars-chart'

import {checkIsPositiveNummberAndNoMoreNCharactersAfterDot} from '@utils/checks'
import {formatDateMonthYear, sortObjectsArrayByFiledDate} from '@utils/date-time'
import {toFixed, toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './second-step.style'

export const SecondStep = ({formFields, setFormFields, renderBackNextBtns, onChangeStatisticsField}) => {
  const classNames = useClassNames()

  const [showBarChat, setShowBarChat] = useState(false)

  const [dateLine, setDateLine] = useState(null)

  const [grossIncomeValue, setGrossIncomeValue] = useState('')
  const [pureIncomeValue, setPureIncomeValue] = useState('')
  const [uniqueCustomersValue, setUniqueCustomersValue] = useState('')
  const [webpageVisitsValue, setWebpageVisitsValue] = useState('')

  const removeIndicator = index => {
    const newFormFields = {...formFields}
    newFormFields.statistics = formFields.statistics.filter((asset, i) => i !== index)
    setFormFields(newFormFields)
  }

  const addIndicator = () => {
    const newFormFields = {...formFields}

    newFormFields.statistics = [
      {
        month: dateLine,
        grossIncome: grossIncomeValue,
        pureIncome: pureIncomeValue,
        uniqueCustomers: uniqueCustomersValue,
        webpageVisits: webpageVisitsValue,
      },
      ...formFields.statistics,
    ].sort(sortObjectsArrayByFiledDate('month'))

    setDateLine(null)
    setGrossIncomeValue('')
    setPureIncomeValue('')

    setUniqueCustomersValue('')
    setWebpageVisitsValue('')

    setFormFields(newFormFields)
  }

  const averageGrossIncome =
    formFields.statistics.reduce((acc, cur) => (acc += +cur.grossIncome), 0) /
      formFields.statistics.reduce((acc, cur) => (acc += cur.grossIncome ? 1 : 0), 0) || 0

  const averagePureIncome =
    formFields.statistics.reduce((acc, cur) => (acc += +cur.pureIncome), 0) /
      formFields.statistics.reduce((acc, cur) => (acc += cur.pureIncome ? 1 : 0), 0) || 0

  const profitability = averagePureIncome / (averageGrossIncome / 100) || 0

  const monthlyMultiplier = formFields.price / averagePureIncome || 0

  const filledTrafficWebpageVisitsMonthes = formFields.statistics.filter(el => el.webpageVisits)

  const trafficСhange = filledTrafficWebpageVisitsMonthes.length
    ? ((filledTrafficWebpageVisitsMonthes[0].webpageVisits -
        filledTrafficWebpageVisitsMonthes[filledTrafficWebpageVisitsMonthes.length - 1].webpageVisits) /
        filledTrafficWebpageVisitsMonthes[filledTrafficWebpageVisitsMonthes.length - 1].webpageVisits) *
      100
    : 0

  const filledTrafficGrossIncomeMonthes = formFields.statistics.filter(el => el.grossIncome)

  const grossIncomeСhange = filledTrafficGrossIncomeMonthes.length
    ? ((filledTrafficGrossIncomeMonthes[0].grossIncome -
        filledTrafficGrossIncomeMonthes[filledTrafficGrossIncomeMonthes.length - 1].grossIncome) /
        filledTrafficGrossIncomeMonthes[filledTrafficGrossIncomeMonthes.length - 1].grossIncome) *
      100
    : 0

  const filledTrafficPureIncomeMonthes = formFields.statistics.filter(el => el.pureIncome)

  const pureIncomeСhange = filledTrafficPureIncomeMonthes.length
    ? ((filledTrafficPureIncomeMonthes[0].pureIncome -
        filledTrafficPureIncomeMonthes[filledTrafficPureIncomeMonthes.length - 1].pureIncome) /
        filledTrafficPureIncomeMonthes[filledTrafficPureIncomeMonthes.length - 1].pureIncome) *
      100
    : 0

  const disableFirstRow = formFields.statistics.length >= 12 || dateLine === null

  console.log('formFields.statistics', formFields.statistics)

  return (
    <>
      <div className={classNames.mainWrapper}>
        <div className={classNames.chartsMainWrapper}>
          <Field
            labelClasses={classNames.spanLabelSmall}
            containerClasses={classNames.chartContainer}
            label={t(TranslationKey.Month)}
            inputComponent={
              <div className={classNames.chartSharedWrapper}>
                <div className={classNames.dateChartWrapper}>
                  <div className={classNames.subLabelWrapper}>
                    <Typography className={classNames.selectedRole}>{t(TranslationKey.Month)}</Typography>
                  </div>

                  <Paper className={classNames.indicatorPaper}>
                    <div className={classNames.dateIndicatorWrapper}>
                      <DateMonthYearPicker
                        disabled={formFields.statistics.length >= 12}
                        value={dateLine}
                        onChange={setDateLine}
                      />

                      {!disableFirstRow ? (
                        <CheckBoxIcon
                          fontSize="medium"
                          classes={{root: classNames.actionButton}}
                          onClick={() => addIndicator()}
                        />
                      ) : (
                        <div
                          className={clsx(classNames.actionDelButton, {
                            [classNames.disabledActionButton]: dateLine === null,
                          })}
                          onClick={() => dateLine !== null && addIndicator()}
                        >
                          {'+'}
                        </div>
                      )}
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={classNames.dateIndicatorWrapper}>
                        <DateMonthYearPicker
                          value={indicator.month}
                          onChange={onChangeStatisticsField(index, 'month')}
                        />

                        <div className={classNames.actionDelButton} onClick={() => removeIndicator(index)}>
                          {'-'}
                        </div>
                      </div>
                    ))}
                  </Paper>
                </div>
              </div>
            }
          />

          <Divider orientation="vertical" className={classNames.divider} />

          <Field
            labelClasses={classNames.spanLabelSmall}
            containerClasses={classNames.chartContainer}
            label={`${t(TranslationKey['Income Indicators'])}, $`}
            inputComponent={
              <div className={classNames.chartSharedWrapper}>
                <div className={classNames.chartWrapper}>
                  <div className={classNames.subLabelWrapper}>
                    <Typography className={classNames.selectedRole}>{`${t(
                      TranslationKey['Gross income'],
                    )}, $`}</Typography>
                    <img src="/assets/icons/chart.svg" onClick={() => setShowBarChat(!showBarChat)} />
                  </div>

                  <Paper className={classNames.indicatorPaper}>
                    <div className={classNames.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={grossIncomeValue}
                        className={classNames.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setGrossIncomeValue(e.target.value)
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={classNames.indicatorWrapper}>
                        <Input
                          value={indicator.grossIncome}
                          className={classNames.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'grossIncome')}
                        />
                      </div>
                    ))}
                  </Paper>
                </div>

                <div className={classNames.chartWrapper}>
                  <div className={classNames.subLabelWrapper}>
                    <Typography className={classNames.selectedRole}>{`${t(
                      TranslationKey['Pure profit'],
                    )}, $`}</Typography>
                    <img src="/assets/icons/chart.svg" />
                  </div>

                  <Paper className={classNames.indicatorPaper}>
                    <div className={classNames.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={pureIncomeValue}
                        className={classNames.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setPureIncomeValue(e.target.value)
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={classNames.indicatorWrapper}>
                        <Input
                          value={indicator.pureIncome}
                          className={classNames.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'pureIncome')}
                        />
                      </div>
                    ))}
                  </Paper>
                </div>
              </div>
            }
          />
          <Divider orientation="vertical" className={classNames.divider} />
          <Field
            labelClasses={classNames.spanLabelSmall}
            containerClasses={classNames.chartContainer}
            label={`${t(TranslationKey['Traffic Indicators'])}, $`}
            inputComponent={
              <div className={classNames.chartSharedWrapper}>
                <div className={classNames.chartWrapper}>
                  <div className={classNames.subLabelWrapper}>
                    <Typography className={classNames.selectedRole}>{t(TranslationKey['Unique visitors'])}</Typography>
                    <img src="/assets/icons/chart.svg" />
                  </div>

                  <Paper className={classNames.indicatorPaper}>
                    <div className={classNames.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={uniqueCustomersValue}
                        className={classNames.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setUniqueCustomersValue(e.target.value)
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={classNames.indicatorWrapper}>
                        <Input
                          value={indicator.uniqueCustomers}
                          className={classNames.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'uniqueCustomers')}
                        />
                      </div>
                    ))}
                  </Paper>
                </div>

                <div className={classNames.chartWrapper}>
                  <div className={classNames.subLabelWrapper}>
                    <Typography className={classNames.selectedRole}>{t(TranslationKey['View page'])}</Typography>
                    <img src="/assets/icons/chart.svg" />
                  </div>

                  <Paper className={classNames.indicatorPaper}>
                    <div className={classNames.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={webpageVisitsValue}
                        className={classNames.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setWebpageVisitsValue(e.target.value)
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={classNames.indicatorWrapper}>
                        <Input
                          value={indicator.webpageVisits}
                          className={classNames.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'webpageVisits')}
                        />
                      </div>
                    ))}
                  </Paper>
                </div>
              </div>
            }
          />
        </div>

        <Field
          labelClasses={classNames.spanLabelSmall}
          label={t(TranslationKey['The totals'])}
          containerClasses={classNames.totalsContainer}
          inputComponent={
            <div className={classNames.totalsWrapper}>
              <div className={classNames.totalsSubWrapper}>
                <Field
                  labelClasses={classNames.totalLabel}
                  containerClasses={classNames.totalContainer}
                  label={t(TranslationKey['Average. Monthly income'])}
                  inputComponent={
                    <Typography className={classNames.totalText}>
                      {toFixedWithDollarSign(averageGrossIncome, 2)}
                    </Typography>
                  }
                />

                <Field
                  labelClasses={classNames.totalLabel}
                  containerClasses={classNames.totalContainer}
                  label={t(TranslationKey['Average. Monthly net profit'])}
                  inputComponent={
                    <Typography className={classNames.totalText}>
                      {toFixedWithDollarSign(averagePureIncome, 2)}
                    </Typography>
                  }
                />
              </div>

              <div className={classNames.totalsSubWrapper}>
                <Field
                  labelClasses={classNames.totalLabel}
                  containerClasses={classNames.totalContainer}
                  label={t(TranslationKey.Profitability)}
                  inputComponent={
                    <Typography className={classNames.totalText}>{`${toFixed(profitability, 2)} %`}</Typography>
                  }
                />

                <Field
                  labelClasses={classNames.totalLabel}
                  containerClasses={classNames.totalContainer}
                  label={t(TranslationKey['Monthly multiplier'])}
                  inputComponent={
                    <Typography className={classNames.totalText}>{`${toFixed(monthlyMultiplier, 2)} x`}</Typography>
                  }
                />
              </div>

              <div>
                <Field
                  oneLine
                  labelClasses={classNames.totalLabel}
                  containerClasses={classNames.totalContainer}
                  label={'Трафик (12 месяцев)'}
                  inputComponent={
                    <>
                      {trafficСhange < 0 ? <ArrowDropDownIcon color="error" /> : <ArrowDropUpIcon color="success" />}
                      <Typography className={clsx(classNames.green, {[classNames.red]: trafficСhange < 0})}>{`${toFixed(
                        trafficСhange,
                        2,
                      )} %`}</Typography>
                    </>
                  }
                />

                <div className={classNames.profitWrapper}>
                  <Field
                    oneLine
                    labelClasses={classNames.totalLabel}
                    containerClasses={classNames.totalContainer}
                    label={'Доход (12 месяцев)'}
                    inputComponent={
                      <>
                        {grossIncomeСhange < 0 ? (
                          <ArrowDropDownIcon color="error" />
                        ) : (
                          <ArrowDropUpIcon color="success" />
                        )}
                        <Typography
                          className={clsx(classNames.green, {[classNames.red]: grossIncomeСhange < 0})}
                        >{`${toFixed(grossIncomeСhange, 2)} %`}</Typography>
                      </>
                    }
                  />

                  <Field
                    oneLine
                    labelClasses={classNames.totalLabel}
                    containerClasses={classNames.totalContainer}
                    label={'Прибыль (12 месяцев)'}
                    inputComponent={
                      <>
                        {pureIncomeСhange < 0 ? (
                          <ArrowDropDownIcon color="error" />
                        ) : (
                          <ArrowDropUpIcon color="success" />
                        )}
                        <Typography
                          className={clsx(classNames.green, {[classNames.red]: pureIncomeСhange < 0})}
                        >{`${toFixed(pureIncomeСhange, 2)} %`}</Typography>
                      </>
                    }
                  />
                </div>
              </div>

              <div className={classNames.btnsWrapper}>{renderBackNextBtns()}</div>
            </div>
          }
        />

        <Modal openModal={showBarChat} setOpenModal={() => setShowBarChat(!showBarChat)}>
          {/* <BarsChart data={formFields.statistics.map((el, i) => ({...el, name: i}))} /> */}

          <div style={{width: '1300px', height: '500px'}}>
            <ResponsiveContainer width={'100%'} height={500}>
              <BarChart
                data={formFields.statistics.map((el, i) => ({...el, month: formatDateMonthYear(el.month)}))}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />

                <Bar dataKey="grossIncome" fill="#006CFF" />
                <Bar dataKey="pureIncome" fill="#CCE2FF" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Modal>
      </div>
    </>
  )
}
