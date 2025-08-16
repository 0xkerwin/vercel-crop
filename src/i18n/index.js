import { ref, computed } from 'vue'
import en from './en'
import zh from './zh'

// 支持的语言列表
const languages = {
  en,
  zh
}

// 默认语言为英文
const currentLang = ref(localStorage.getItem('cropperLang') || 'en')

// 保存语言选择到本地存储
const setLanguage = (lang) => {
  if (languages[lang]) {
    currentLang.value = lang
    localStorage.setItem('cropperLang', lang)
  }
}

// 获取当前语言的翻译
const t = computed(() => {
  return (key) => {
    const keys = key.split('.')
    let result = languages[currentLang.value]
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k]
      } else {
        // 如果找不到翻译，返回英文版本
        let fallback = languages['en']
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk]
          } else {
            return key // 如果英文版本也没有，返回原始key
          }
        }
        return fallback
      }
    }
    
    return result
  }
})

export default {
  currentLang,
  languages,
  setLanguage,
  t
}