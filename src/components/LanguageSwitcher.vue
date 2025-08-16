<template>
  <div class="language-switcher">
    <div class="select-container">
      <select v-model="selectedLang" @change="changeLanguage" class="lang-select">
        <option v-for="lang in availableLanguages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
      <div class="select-arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import i18n from '../i18n'

// 当前语言
const currentLang = computed(() => i18n.currentLang.value)
const selectedLang = ref(currentLang.value)

// 可用语言列表
const availableLanguages = [
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  // 未来可以在这里添加更多语言
  // { code: 'ja', name: '日本語' },
  // { code: 'ko', name: '한국어' },
  // { code: 'fr', name: 'Français' },
]

// 监听当前语言变化
watch(currentLang, (newLang) => {
  selectedLang.value = newLang
})

// 切换语言
const changeLanguage = () => {
  i18n.setLanguage(selectedLang.value)
}
</script>

<style scoped>
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.select-container {
  position: relative;
  display: inline-block;
}

.lang-select {
  appearance: none;
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 36px 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
  transition: background-color 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.lang-select:hover {
  background-color: #3a7bc8;
}

.lang-select:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
}

.select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: white;
}

/* 移动端样式优化 */
@media (max-width: 768px) {
  .language-switcher {
    top: 15px;
    right: 15px;
  }
  
  .lang-select {
    padding: 6px 32px 6px 12px;
    font-size: 0.9rem;
  }
  
  .select-arrow {
    right: 10px;
  }
}
</style>