import { useState } from 'react'

import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { Divider, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { DateMonthYearPicker } from '@components/shared/date-picker/date-picker'
import { Field } from '@components/shared/field/field'
import { Input } from '@components/shared/input'
import { Modal } from '@components/shared/modal'

import { checkIsPositiveNummberAndNoMoreNCharactersAfterDot } from '@utils/checks'
import { formatDateMonthYear, sortObjectsArrayByFiledDate } from '@utils/date-time'
import { toFixed, toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './second-step.style'

import { ChartsForm } from './charts-form/charts-form'

export const SecondStep = ({ formFields, setFormFields, renderBackNextBtns, onChangeStatisticsField }) => {
  const { classes: styles, cx } = useStyles()

  const [showBarChat, setShowBarChat] = useState(false)

  const [isRevenueBeggin, setIsRevenueBeggin] = useState(true)

  const [dateLine, setDateLine] = useState(null)

  const [grossIncomeValue, setGrossIncomeValue] = useState('')
  const [pureIncomeValue, setPureIncomeValue] = useState('')
  const [uniqueCustomersValue, setUniqueCustomersValue] = useState('')
  const [webpageVisitsValue, setWebpageVisitsValue] = useState('')

  const removeIndicator = index => {
    const newFormFields = { ...formFields }
    newFormFields.statistics = formFields.statistics.filter((asset, i) => i !== index)
    setFormFields(newFormFields)
  }

  const addIndicator = () => {
    const newFormFields = { ...formFields }

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

  const monthlyMultiplier = averagePureIncome ? formFields.price / averagePureIncome : 0

  const filledTrafficWebpageVisitsMonthes = formFields.statistics.filter(el => el.webpageVisits)

  const trafficСhange =
    filledTrafficWebpageVisitsMonthes.length > 1
      ? ((filledTrafficWebpageVisitsMonthes[0].webpageVisits -
          filledTrafficWebpageVisitsMonthes[filledTrafficWebpageVisitsMonthes.length - 1].webpageVisits) /
          filledTrafficWebpageVisitsMonthes[filledTrafficWebpageVisitsMonthes.length - 1].webpageVisits) *
        100
      : 0

  const filledTrafficGrossIncomeMonthes = formFields.statistics.filter(el => el.grossIncome)

  const grossIncomeСhange =
    filledTrafficGrossIncomeMonthes.length > 1
      ? ((filledTrafficGrossIncomeMonthes[0].grossIncome -
          filledTrafficGrossIncomeMonthes[filledTrafficGrossIncomeMonthes.length - 1].grossIncome) /
          filledTrafficGrossIncomeMonthes[filledTrafficGrossIncomeMonthes.length - 1].grossIncome) *
        100
      : 0

  const filledTrafficPureIncomeMonthes = formFields.statistics.filter(el => el.pureIncome)

  const pureIncomeСhange =
    filledTrafficPureIncomeMonthes.length > 1
      ? ((filledTrafficPureIncomeMonthes[0].pureIncome -
          filledTrafficPureIncomeMonthes[filledTrafficPureIncomeMonthes.length - 1].pureIncome) /
          filledTrafficPureIncomeMonthes[filledTrafficPureIncomeMonthes.length - 1].pureIncome) *
        100
      : 0

  const disableFirstRow = formFields.statistics.length >= 12 || dateLine === null

  return (
    <>
      <div className={styles.mainWrapper}>
        <div className={styles.chartsMainWrapper}>
          <Field
            labelClasses={styles.chartLabel}
            containerClasses={styles.chartContainer}
            label={t(TranslationKey.Month)}
            inputComponent={
              <div className={styles.chartSharedWrapper}>
                <div className={styles.dateChartWrapper}>
                  <div className={styles.subLabelWrapper}>
                    <Typography className={styles.chartSubLabel}>{t(TranslationKey['Add month'])}</Typography>
                  </div>

                  <div className={styles.indicatorPaper}>
                    <div className={styles.dateIndicatorWrapper}>
                      <DateMonthYearPicker
                        disabled={formFields.statistics.length >= 12}
                        value={dateLine}
                        onChange={setDateLine}
                      />

                      {!disableFirstRow ? (
                        <CheckBoxIcon
                          fontSize="medium"
                          classes={{ root: styles.actionButton }}
                          onClick={() => addIndicator()}
                        />
                      ) : (
                        <div
                          className={cx(styles.actionDelButton, {
                            [styles.disabledActionButton]: dateLine === null,
                          })}
                          onClick={() => dateLine !== null && addIndicator()}
                        >
                          {'+'}
                        </div>
                      )}
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={styles.dateIndicatorWrapper}>
                        <DateMonthYearPicker
                          value={indicator.month}
                          onChange={onChangeStatisticsField(index, 'month')}
                        />

                        <div className={styles.actionDelButton} onClick={() => removeIndicator(index)}>
                          {'-'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />

          <Divider orientation="vertical" className={styles.divider} />

          <Field
            labelClasses={styles.chartLabel}
            containerClasses={styles.chartContainer}
            label={`${t(TranslationKey['Income Indicators'])}, $*`}
            inputComponent={
              <div className={styles.chartSharedWrapper}>
                <div className={styles.chartWrapper}>
                  <div className={styles.subLabelWrapper}>
                    <Typography className={styles.chartSubLabel}>{`${t(
                      TranslationKey['Gross income'],
                    )}, $`}</Typography>
                    <img
                      src="/assets/icons/chart.svg"
                      className={styles.chartIcon}
                      onClick={() => {
                        setShowBarChat(!showBarChat)
                        setIsRevenueBeggin(true)
                      }}
                    />
                  </div>

                  <div className={styles.indicatorPaper}>
                    <div className={styles.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={grossIncomeValue}
                        className={styles.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setGrossIncomeValue(Number(e.target.value))
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={styles.indicatorWrapper}>
                        <Input
                          value={indicator.grossIncome}
                          className={styles.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'grossIncome')}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.chartWrapper}>
                  <div className={styles.subLabelWrapper}>
                    <Typography className={styles.chartSubLabel}>{`${t(TranslationKey['Pure profit'])}, $`}</Typography>
                    <img
                      src="/assets/icons/chart.svg"
                      className={styles.chartIcon}
                      onClick={() => {
                        setShowBarChat(!showBarChat)
                        setIsRevenueBeggin(true)
                      }}
                    />
                  </div>

                  <div className={styles.indicatorPaper}>
                    <div className={styles.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={pureIncomeValue}
                        className={styles.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setPureIncomeValue(Number(e.target.value))
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={styles.indicatorWrapper}>
                        <Input
                          value={indicator.pureIncome}
                          className={styles.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'pureIncome')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
          <Divider orientation="vertical" className={styles.divider} />
          <Field
            labelClasses={styles.chartLabel}
            containerClasses={styles.chartContainer}
            label={`${t(TranslationKey['Traffic Indicators'])}*`}
            inputComponent={
              <div className={styles.chartSharedWrapper}>
                <div className={styles.chartWrapper}>
                  <div className={styles.subLabelWrapper}>
                    <Typography className={styles.chartSubLabel}>{t(TranslationKey['Unique visitors'])}</Typography>
                    <img
                      src="/assets/icons/chart.svg"
                      className={styles.chartIcon}
                      onClick={() => {
                        setShowBarChat(!showBarChat)
                        setIsRevenueBeggin(false)
                      }}
                    />
                  </div>

                  <div className={styles.indicatorPaper}>
                    <div className={styles.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={uniqueCustomersValue}
                        className={styles.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setUniqueCustomersValue(Number(e.target.value))
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={styles.indicatorWrapper}>
                        <Input
                          value={indicator.uniqueCustomers}
                          className={styles.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'uniqueCustomers')}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.chartWrapper}>
                  <div className={styles.subLabelWrapper}>
                    <Typography className={styles.chartSubLabel}>{t(TranslationKey['View page'])}</Typography>
                    <img
                      src="/assets/icons/chart.svg"
                      className={styles.chartIcon}
                      onClick={() => {
                        setShowBarChat(!showBarChat)
                        setIsRevenueBeggin(false)
                      }}
                    />
                  </div>

                  <div className={styles.indicatorPaper}>
                    <div className={styles.indicatorWrapper}>
                      <Input
                        disabled={disableFirstRow}
                        value={webpageVisitsValue}
                        className={styles.indicatorInput}
                        onChange={e =>
                          checkIsPositiveNummberAndNoMoreNCharactersAfterDot(event.target.value, 2) &&
                          setWebpageVisitsValue(Number(e.target.value))
                        }
                      />
                    </div>

                    {formFields.statistics.map((indicator, index) => (
                      <div key={index} className={styles.indicatorWrapper}>
                        <Input
                          value={indicator.webpageVisits}
                          className={styles.indicatorInput}
                          onChange={onChangeStatisticsField(index, 'webpageVisits')}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            }
          />
        </div>

        <Field
          labelClasses={styles.chartLabel}
          label={t(TranslationKey['The totals'])}
          containerClasses={styles.totalsContainer}
          inputComponent={
            <div className={styles.totalsWrapper}>
              <div className={styles.totalsSubMainWrapper}>
                <div className={styles.totalsSubWrapper}>
                  <Field
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalContainer}
                    label={t(TranslationKey['Average. Monthly net profit'])}
                    inputComponent={
                      <Typography className={styles.totalText}>
                        {toFixedWithDollarSign(averagePureIncome, 2)}
                      </Typography>
                    }
                  />
                  <Field
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalContainer}
                    label={t(TranslationKey.Profitability)}
                    inputComponent={
                      <Typography className={styles.totalText}>{`${toFixed(profitability, 2)} %`}</Typography>
                    }
                  />
                </div>

                <div className={styles.totalsSubWrapper}>
                  <Field
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalContainer}
                    label={t(TranslationKey['Average. Monthly income'])}
                    inputComponent={
                      <Typography className={styles.totalText}>
                        {toFixedWithDollarSign(averageGrossIncome, 2)}
                      </Typography>
                    }
                  />

                  <Field
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalContainer}
                    label={t(TranslationKey['Monthly multiplier'])}
                    inputComponent={
                      <Typography className={styles.totalText}>{`${toFixed(monthlyMultiplier, 2)} x`}</Typography>
                    }
                  />
                </div>
              </div>

              <div className={styles.totalsPercentsWrapper}>
                <Field
                  oneLine
                  labelClasses={styles.totalLabel}
                  containerClasses={styles.totalsPercentsContainer}
                  label={t(TranslationKey['Traffic (12 months)'])}
                  inputComponent={
                    <div className={styles.percentWrapper}>
                      {trafficСhange < 0 ? (
                        <ArrowDropDownIcon color="error" />
                      ) : (
                        <ArrowDropUpIcon color="success" className={styles.green} />
                      )}
                      <Typography className={cx(styles.green, { [styles.red]: trafficСhange < 0 })}>{`${toFixed(
                        isNaN(trafficСhange) ? 0 : trafficСhange,
                        2,
                      )} %`}</Typography>
                    </div>
                  }
                />

                <div className={styles.profitWrapper}>
                  <Field
                    oneLine
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalsPercentsContainer}
                    label={t(TranslationKey['Income (12 months)'])}
                    inputComponent={
                      <div className={styles.percentWrapper}>
                        {grossIncomeСhange < 0 ? (
                          <ArrowDropDownIcon color="error" />
                        ) : (
                          <ArrowDropUpIcon color="success" className={styles.green} />
                        )}
                        <Typography className={cx(styles.green, { [styles.red]: grossIncomeСhange < 0 })}>{`${toFixed(
                          isNaN(grossIncomeСhange) ? 0 : grossIncomeСhange,
                          2,
                        )} %`}</Typography>
                      </div>
                    }
                  />

                  <Field
                    oneLine
                    labelClasses={styles.totalLabel}
                    containerClasses={styles.totalsPercentsContainer}
                    label={t(TranslationKey['Profit (12 months)'])}
                    inputComponent={
                      <div className={styles.percentWrapper}>
                        {pureIncomeСhange < 0 ? (
                          <ArrowDropDownIcon color="error" />
                        ) : (
                          <ArrowDropUpIcon color="success" className={styles.green} />
                        )}
                        <Typography className={cx(styles.green, { [styles.red]: pureIncomeСhange < 0 })}>{`${toFixed(
                          isNaN(pureIncomeСhange) ? 0 : pureIncomeСhange,
                          2,
                        )} %`}</Typography>
                      </div>
                    }
                  />
                </div>
              </div>

              <div className={styles.btnsWrapper}>{renderBackNextBtns()}</div>
            </div>
          }
        />

        <Modal openModal={showBarChat} setOpenModal={() => setShowBarChat(!showBarChat)}>
          <ChartsForm
            data={formFields.statistics
              .map(el => ({
                ...el,
                month: formatDateMonthYear(el.month),
              }))
              .reverse()}
            isRevenueBeggin={isRevenueBeggin}
          />
        </Modal>
      </div>
    </>
  )
}
