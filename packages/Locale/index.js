import defaultLang from './zh'
let lang = defaultLang

let i18nHandler = function() {
  const vuei18n = Object.getPrototypeOf(this).$t
  if (typeof vuei18n === 'function') {
    return vuei18n.apply(this, arguments)
  }
}

export const t = function(path, replacements = {}, current) {
  let value
  if (this) {
    value = i18nHandler.apply(this, arguments)
    if (value !== null && typeof value !== 'undefined') {
      return value
    }
  }
  const array = path.split('.')
  if (!current) {
    current = lang
  }

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (i === j - 1)
      return value.replace(/{([^}]+)}/g, function(_, key) {
        return replacements[key] || '{' + key + '}'
      })
    if (!value) return ''
    current = value
  }
  return ''
}

export const use = function(l) {
  lang = l || lang
}

export const i18n = function(fn) {
  i18nHandler = fn || i18nHandler
}

/**
 * mixins: [TanslateHandler]
 */
export const TanslateHandler = {
  methods: {
    /**
     * translate('Create {type}', { type: 'ID' }) => '创建 ID'
     * @param {*} path
     * @param {*} replacements
     */
    translate(path, replacements) {
      return t.apply(this, [path, replacements, this.locale])
    }
  }
}

export default { use, t, i18n }
