const translationGetters = require('../src/constants/translations/index.ts').translationGetters
const translationKeys = require('../src/constants/translations/translation-key.ts').TranslationKey
const languageKeys = require('../src/constants/translations/language-key.ts').LanguageKey
const languageOptions = require('../src/constants/translations/language-options.ts').languageOptions

let hasError = false

for (let index = 0; index < Object.keys(languageKeys).length; index++) {
  const languageKey = Object.keys(languageKeys)[index]
  const languageValue = languageKeys[Object.keys(languageKeys)[index]]
  if (languageKey !== languageValue) {
    hasError = true
    console.error(`Language key and value are not the same for key: "${languageKey}"`)
  }
  if (!Object.keys(translationGetters).includes(languageKey)) {
    hasError = true
    console.error(`Language key "${languageKey}" is not in translationGetters`)
  }
  if (!languageOptions.find(languageOption => languageOption.key === languageKey)) {
    hasError = true
    console.error(`Language key: "${languageKey}" is not in languageOptions`)
  }
}

for (let index = 0; index < Object.keys(translationGetters).length; index++) {
  const langugeKey = Object.keys(translationGetters)[index]
  const translationFileFunc = translationGetters[Object.keys(translationGetters)[index]]
  const translationFile = translationFileFunc()
  if (!translationFile) {
    hasError = true
    console.error(`No translation for language key: "${langugeKey}"`)
  }
  for (let index = 0; index < Object.keys(translationKeys).length; index++) {
    const translationKey = Object.keys(translationKeys)[index]
    if (!Object.keys(translationFile).includes(translationKey)) {
      hasError = true
      console.error(`Translation key: "${translationKey}" was not included for language key: "${langugeKey}"`)
    }
  }
}

for (let index = 0; index < Object.keys(translationKeys).length; index++) {
  const translationKey = Object.keys(translationKeys)[index]
  const translationKeyValue = translationKeys[Object.keys(translationKeys)[index]]
  if (translationKey !== translationKeyValue) {
    hasError = true
    console.error(`Translation key and value are not the same for key: "${translationKey}"`)
  }
}

if (hasError) {
  throw Error('translations-check had errors, please review them in console')
} else {
  console.warn('translations-check succeed')
}
