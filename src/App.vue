<template>
  <header>
    <div class="header-content">
      <h1>{{ $t('title') }}</h1>
      <p>{{ $t('upload.intro') }}</p>
      <LanguageSwitcher class="header-language-switcher" />
    </div>
  </header>
  <main>
    <RouterView />
  </main>
  <footer>
    <p>© {{ new Date().getFullYear() }} {{ $t('title') }} | {{ $t('upload.formats') }}</p>
  </footer>
</template>

<script setup>
import { RouterView } from 'vue-router'
import i18n from './i18n'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #f8f9fa;
  line-height: 1.6;
}

header {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
  min-height: calc(100vh - 200px);
}

footer {
  text-align: center;
  padding: 1.5rem;
  background-color: #f1f1f1;
  color: #666;
  font-size: 0.9rem;
}

.header-language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
}

.btn {
  display: inline-block;
  background-color: #6e8efb;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #5a7df0;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #a777e3;
}

.btn-secondary:hover {
  background-color: #9566d2;
}
</style>