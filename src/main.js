import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'

import './assets/main.css'

const app = createApp(App)

// 将i18n对象添加到全局属性中
app.config.globalProperties.$i18n = i18n

// 添加全局翻译函数
app.config.globalProperties.$t = (key) => i18n.t.value(key)

// 动态设置页面标题和描述
function updateDocumentMetadata() {
  const lang = i18n.currentLang.value
  
  // 设置HTML语言属性
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN'
  
  // 设置页面标题
  if (lang === 'en') {
    document.title = 'Image Cropping Tool'
  } else {
    document.title = '图片裁剪工具'
  }
  
  // 设置页面描述
  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    if (lang === 'en') {
      metaDescription.setAttribute('content', 'A simple and easy-to-use online image cropping tool, supporting circular and rectangular cropping')
    } else {
      metaDescription.setAttribute('content', '一个简单易用的在线图片裁剪工具，支持圆形和矩形裁剪')
    }
  }
}

// 初始更新一次
updateDocumentMetadata()

// 监听语言变化
watch(
  () => i18n.currentLang.value,
  () => {
    updateDocumentMetadata()
  }
)

app.use(router)

app.mount('#app')