const fs = require('fs')
const glob = require('glob')

// Данный скрипт проходится по enum TranslationKey, проверяет его на актуальные переводы и перезаписывает, удаляя неиспользуемые переводы. Далее на основании обновленного enum TranslationKey проходится по json всех переводов и перезаписывает их в соответсивии с обновленным enum TranslationKey.

// Параметры для поиска
const baseDir = 'src' // Папка, в которой будем искать
const excludeDirs = ['node_modules', 'dist'] // Папки для исключения
const excludeFiles = ['exampleFile.js'] // Файлы для исключения
const translationEnumPath = 'src/constants/translations/translation-key.ts' // Путь к файлу с перечислением TranslationKey

// Путь к файлам с переводами
const translationKeysPaths = {
  en: 'src/constants/translations/translations-files/en.json',
  ru: 'src/constants/translations/translations-files/ru.json',
  uk: 'src/constants/translations/translations-files/uk.json',
  ch: 'src/constants/translations/translations-files/zh.json',
}

// Загрузка перечисления TranslationKey
const loadTranslationEnum = () => {
  if (!fs.existsSync(translationEnumPath)) {
    throw new Error(`Translation enum file not found at ${translationEnumPath}`)
  }
  const enumContent = fs.readFileSync(translationEnumPath, 'utf8')
  const enumRegex = /export\s+enum\s+TranslationKey\s+{([^}]*)}/s
  const match = enumContent.match(enumRegex)
  if (!match) {
    throw new Error('TranslationKey enum not found in the file')
  }
  const keys = match[1]
  const keyRegex = /'([^']*)'\s*=\s*'[^']*'/g
  const foundKeys = []
  let keyMatch
  while ((keyMatch = keyRegex.exec(keys)) !== null) {
    foundKeys.push(keyMatch[1])
  }
  return foundKeys
}

// Функция для поиска вхождений ключей в тексте
const findKeysInText = (text, keys) => {
  const foundKeys = new Set()
  keys.forEach(key => {
    const escapedKey = key.replace(/[-[\]/{}()*+?.\\^$|]/g, '\\$&')
    const regex = new RegExp(
      `TranslationKey\\['${escapedKey}'\\]|TranslationKey\\["${escapedKey}"\\]|TranslationKey\\.${escapedKey}`,
      'gi',
    )
    if (regex.test(text)) {
      foundKeys.add(key)
    }
  })
  return foundKeys
}

// Основная функция для обхода файлов
const scanFiles = (dir, keys) => {
  const files = glob.sync(`${dir}/**/*.{js,jsx,ts,tsx}`, { nodir: true })
  const usedKeys = new Set()

  files.forEach(file => {
    if (excludeFiles.some(excludedFile => file.endsWith(excludedFile))) {
      return
    }

    if (excludeDirs.some(excludedDir => file.includes(`/${excludedDir}/`))) {
      return
    }

    const content = fs.readFileSync(file, 'utf8')
    const foundKeys = findKeysInText(content, keys)
    foundKeys.forEach(key => usedKeys.add(key))
  })

  return usedKeys
}

// Обновление перечисления TranslationKey
const updateTranslationEnum = usedKeys => {
  if (!fs.existsSync(translationEnumPath)) {
    throw new Error(`Translation enum file not found at ${translationEnumPath}`)
  }

  const enumContent = fs.readFileSync(translationEnumPath, 'utf8')
  const enumRegex = /export\s+enum\s+TranslationKey\s+{([^}]*)}/s
  const match = enumContent.match(enumRegex)

  if (!match) {
    throw new Error('TranslationKey enum not found in the file')
  }

  const currentKeys = match[1]
  const keyRegex = /'([^']*)'\s*=\s*'[^']*'/g

  let updatedKeys = ''
  let keyMatch
  let isFirst = true

  while ((keyMatch = keyRegex.exec(currentKeys)) !== null) {
    const key = keyMatch[1]
    if (usedKeys.has(key)) {
      if (!isFirst) {
        updatedKeys += ',\n'
      }
      updatedKeys += `'${key}' = '${key}'`
      isFirst = false
    }
  }

  const updatedEnumContent = enumContent.replace(enumRegex, `export enum TranslationKey {\n${updatedKeys}\n}`)

  fs.writeFileSync(translationEnumPath, updatedEnumContent, 'utf8')
}

// Обновление файлов переводов
const updateTranslationFiles = usedKeys => {
  Object.keys(translationKeysPaths).forEach(language => {
    const translationKeysPath = translationKeysPaths[language]
    if (!fs.existsSync(translationKeysPath)) {
      console.warn(`Translation file not found at ${translationKeysPath}`)
      return
    }

    const translationKeys = JSON.parse(fs.readFileSync(translationKeysPath, 'utf8'))
    const filteredTranslations = {}

    Object.keys(translationKeys).forEach(key => {
      if (usedKeys.has(key)) {
        filteredTranslations[key] = translationKeys[key]
      }
    })

    fs.writeFileSync(translationKeysPath, JSON.stringify(filteredTranslations, null, 2), 'utf8')
    console.log(`Updated ${language} translation file at ${translationKeysPath}`)
  })
}

// Запуск скрипта
const run = () => {
  try {
    const allKeys = loadTranslationEnum()
    const usedKeys = scanFiles(baseDir, allKeys)
    const unusedKeys = allKeys.filter(key => !usedKeys.has(key))

    console.log('Unused translation keys:', unusedKeys)

    if (unusedKeys.length > 0) {
      updateTranslationEnum(usedKeys)
      console.log('Translation enum updated successfully.')
    } else {
      console.log('No unused translation keys found.')
    }

    // Обновление файлов переводов после обновления enum
    updateTranslationFiles(usedKeys)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

run()
