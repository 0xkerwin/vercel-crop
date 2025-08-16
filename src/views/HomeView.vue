<template>
  <div class="home">
    <div class="hero">
      <h2>{{ $t('home.hero.title') }}</h2>
      <p>{{ $t('home.hero.subtitle') }}</p>
      <router-link to="/crop" class="btn btn-primary">{{ $t('home.hero.startButton') }}</router-link>
    </div>

    <div class="features">
      <div class="feature-card">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
        <h3>{{ $t('home.features.circular.title') }}</h3>
        <p>{{ $t('home.features.circular.description') }}</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </div>
        <h3>{{ $t('home.features.rectangular.title') }}</h3>
        <p>{{ $t('home.features.rectangular.description') }}</p>
      </div>

      <div class="feature-card">
        <div class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </div>
        <h3>{{ $t('home.features.download.title') }}</h3>
        <p>{{ $t('home.features.download.description') }}</p>
      </div>
    </div>
    
    <!-- 新增社交媒体平台部分 -->
    <div class="social-media-section">
      <h2>{{ $t('home.socialMedia.title') }}</h2>
      <p class="section-description">{{ $t('home.socialMedia.description') }}</p>
      
      <div class="platform-cards">
        <div class="platform-card" v-for="(platform, index) in socialMediaPlatforms" :key="index">
          <div class="platform-icon" :class="platform.icon">
            <img :src="platform.iconUrl" :alt="platform.name" v-if="platform.iconUrl" />
            <span v-else>{{ platform.name.charAt(0) }}</span>
          </div>
          <h3>{{ platform.name }}</h3>
          <div class="platform-specs">
            <p class="platform-size">{{ platform.profileSize }}</p>
            <p class="platform-size">{{ platform.postSize }}</p>
          </div>
          <p class="platform-description">{{ platform.description }}</p>
        </div>
      </div>
    </div>

    <div class="how-to-use">
      <h2>{{ $t('home.howToUse.title') }}</h2>
      <div class="steps">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>{{ $t('home.howToUse.steps.upload.title') }}</h3>
            <p>{{ $t('home.howToUse.steps.upload.description') }}</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>{{ $t('home.howToUse.steps.select.title') }}</h3>
            <p>{{ $t('home.howToUse.steps.select.description') }}</p>
          </div>
        </div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>{{ $t('home.howToUse.steps.download.title') }}</h3>
            <p>{{ $t('home.howToUse.steps.download.description') }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="cta">
      <h2>{{ $t('home.cta.title') }}</h2>
      <p>{{ $t('home.cta.subtitle') }}</p>
      <router-link to="/crop" class="btn btn-primary">{{ $t('home.cta.button') }}</router-link>
    </div>
  </div>
</template>

<script setup>
import i18n from '../i18n'
import { computed } from 'vue'

// 获取翻译函数
const $t = (key) => i18n.t.value(key)

// 社交媒体平台数据
const socialMediaPlatforms = computed(() => {
  return [
    {
      name: 'Instagram',
      icon: 'instagram',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/132px-Instagram_logo_2016.svg.png',
      profileSize: $t('home.socialMedia.platforms.0.profileSize'),
      postSize: $t('home.socialMedia.platforms.0.postSize'),
      description: $t('home.socialMedia.platforms.0.description')
    },
    {
      name: 'X (Twitter)',
      icon: 'twitter',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/X_logo_2023.svg/150px-X_logo_2023.svg.png',
      profileSize: $t('home.socialMedia.platforms.1.profileSize'),
      postSize: $t('home.socialMedia.platforms.1.postSize'),
      description: $t('home.socialMedia.platforms.1.description')
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/150px-Facebook_Logo_%282019%29.png',
      profileSize: $t('home.socialMedia.platforms.2.profileSize'),
      postSize: $t('home.socialMedia.platforms.2.postSize'),
      description: $t('home.socialMedia.platforms.2.description')
    },
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/150px-LinkedIn_logo_initials.png',
      profileSize: $t('home.socialMedia.platforms.3.profileSize'),
      postSize: $t('home.socialMedia.platforms.3.postSize'),
      description: $t('home.socialMedia.platforms.3.description')
    }
  ]
})
</script>

<style scoped>
.home {
  padding-bottom: 2rem;
}

.hero {
  text-align: center;
  padding: 2rem 1rem 4rem;
}

.hero h2 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-primary {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  text-decoration: none;
  padding: 0.8rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  box-shadow: 0 4px 15px rgba(110, 142, 251, 0.4);
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(110, 142, 251, 0.6);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.icon {
  margin-bottom: 1.5rem;
  color: #6e8efb;
}

.feature-card h3 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.feature-card p {
  color: #666;
}

/* 社交媒体平台部分样式 */
.social-media-section {
  padding: 4rem 1rem;
  background-color: #f9f9f9;
  text-align: center;
  margin: 2rem 0;
}

.social-media-section h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
}

.section-description {
  font-size: 1.1rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto 3rem;
}

.platform-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.platform-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.platform-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.platform-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
}

.platform-icon img {
  max-width: 100%;
  max-height: 100%;
}

.platform-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.platform-specs {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f5f7ff;
  border-radius: 8px;
}

.platform-size {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #555;
}

.platform-description {
  color: #666;
  font-size: 0.95rem;
}

.how-to-use {
  padding: 4rem 1rem;
  background-color: #fff;
  text-align: center;
}

.how-to-use h2 {
  font-size: 2rem;
  margin-bottom: 3rem;
  color: #333;
}

.steps {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.step {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
  display: flex;
  align-items: flex-start;
  text-align: left;
}

.step-number {
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
  flex-shrink: 0;
}

.step-content h3 {
  margin-bottom: 0.5rem;
  color: #333;
}

.step-content p {
  color: #666;
}

.cta {
  text-align: center;
  padding: 4rem 1rem;
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.1), rgba(167, 119, 227, 0.1));
  border-radius: 12px;
  margin: 2rem auto;
  max-width: 800px;
}

.cta h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #333;
}

.cta p {
  color: #666;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .steps {
    flex-direction: column;
    align-items: center;
  }
  
  .step {
    max-width: 100%;
  }
  
  .platform-cards {
    grid-template-columns: 1fr;
  }
  
  .platform-icon {
    width: 50px;
    height: 50px;
  }
}
</style>