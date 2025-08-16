<template>
  <div class="crop-container">
    <div class="crop-header">
      <div class="back-button">
        <router-link to="/" class="back-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          {{ $t('crop.backToHome') }}
        </router-link>
      </div>
      <div class="crop-actions">
        <button @click="resetCrop" class="reset-btn">{{ $t('crop.recrop') }}</button>
      </div>
    </div>
    
    <div class="crop-main">
      <div class="upload-section" v-if="!imageUrl">
        <div class="upload-box" @dragover.prevent @drop="onDrop">
          <input type="file" @change="onFileChange" ref="fileInput" accept="image/*" class="file-input" />
          <div class="upload-content">
            <div class="upload-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <p class="upload-text">{{ $t('upload.dragHint') }}</p>
            <button class="upload-btn" @click="triggerFileInput">{{ $t('upload.button') }}</button>
          </div>
        </div>
      </div>
      
      <div class="editor-section" v-else>
        <div class="crop-editor">
          <img ref="image" :src="imageUrl" style="max-width: 100%;" />
        </div>
        
        <!-- 预览区域移到设置旁边，更加显眼 -->
        <div class="crop-sidebar">
          <div class="crop-preview">
            <p class="preview-label">{{ $t('crop.preview') }}</p>
            <div class="preview-container">
              <div class="preview-box" ref="preview"></div>
            </div>
            <button @click="downloadCroppedImage" class="download-btn full-width-btn">
              {{ $t('crop.download') }}
            </button>
          </div>
          
          <div class="crop-settings">
            <div class="setting-group">
              <label>{{ $t('crop.basic') }}</label>
              <div class="mode-options">
                <button 
                  @click="setShape('rect')" 
                  :class="{ active: cropShape === 'rect' }"
                >
                  {{ $t('crop.rect') }}
                </button>
                <button 
                  @click="setShape('circle')" 
                  :class="{ active: cropShape === 'circle' }"
                >
                  {{ $t('crop.circle') }}
                </button>
              </div>
            </div>
            
            <div class="setting-group">
              <label>{{ $t('crop.format') }}</label>
              <div class="format-options">
                <button 
                  @click="outputType = 'jpeg'" 
                  :class="{ active: outputType === 'jpeg' }"
                >
                  JPEG
                </button>
                <button 
                  @click="outputType = 'png'" 
                  :class="{ active: outputType === 'png' }"
                >
                  PNG
                </button>
                <button 
                  @click="outputType = 'webp'" 
                  :class="{ active: outputType === 'webp' }"
                >
                  WEBP
                </button>
              </div>
            </div>
            
            <div class="setting-group">
              <label>{{ $t('crop.ratio') }}</label>
              <div class="ratio-options">
                <button 
                  @click="setAspectRatio(NaN)" 
                  :class="{ active: !aspectRatio }"
                >
                  {{ $t('crop.free') }}
                </button>
                <button 
                  @click="setAspectRatio(1)" 
                  :class="{ active: aspectRatio === 1 }"
                >
                  1:1
                </button>
                <button 
                  @click="setAspectRatio(4/3)" 
                  :class="{ active: aspectRatio === 4/3 }"
                >
                  4:3
                </button>
                <button 
                  @click="setAspectRatio(16/9)" 
                  :class="{ active: aspectRatio === 16/9 }"
                >
                  16:9
                </button>
              </div>
            </div>
            
            <div class="setting-group">
              <label>{{ $t('crop.rotate') }}</label>
              <div class="transform-options">
                <button @click="rotate(-90)" :title="$t('crop.rotateLeft')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 10 4 15 9 20"></polyline>
                    <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                  </svg>
                </button>
                <button @click="rotate(90)" :title="$t('crop.rotateRight')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="15 10 20 15 15 20"></polyline>
                    <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
                  </svg>
                </button>
                <button @click="scaleX">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
                    <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
                    <path d="M16 21h3a2 2 0 0 0 2-2v-3"></path>
                  </svg>
                </button>
                <button @click="scaleY">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7"></path>
                    <polyline points="9 5 12 2 15 5"></polyline>
                    <line x1="12" y1="2" x2="12" y2="14"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="setting-group">
              <label>{{ $t('crop.zoomIn') }}/{{ $t('crop.zoomOut') }}</label>
              <div class="zoom-options">
                <button @click="zoom(0.1)" :title="$t('crop.zoomIn')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
                <button @click="zoom(-0.1)" :title="$t('crop.zoomOut')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            <div class="setting-group">
              <button @click="changeImage" class="change-image-btn">{{ $t('crop.changeImage') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import i18n from '../i18n'

// 获取翻译函数
const $t = (key) => i18n.t.value(key)

// 图片相关状态
const imageUrl = ref('')
const outputType = ref('jpeg')
const cropShape = ref('rect')
const aspectRatio = ref(NaN)
const cropperInstance = ref(null)

// 引用
const fileInput = ref(null)
const image = ref(null)
const preview = ref(null)

// 监听图片URL变化
watch(imageUrl, (newVal) => {
  if (newVal) {
    nextTick(() => {
      initCropper()
    })
  } else {
    destroyCropper()
  }
})

// 初始化裁剪器
const initCropper = () => {
  if (cropperInstance.value) {
    destroyCropper()
  }
  
  cropperInstance.value = new Cropper(image.value, {
    aspectRatio: aspectRatio.value,
    viewMode: 1,
    dragMode: 'move',
    autoCropArea: 0.8,
    restore: false,
    guides: true,
    center: true,
    highlight: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    toggleDragModeOnDblclick: false,
    preview: preview.value,
    ready() {
      // 如果是圆形裁剪，设置裁剪框为圆形
      if (cropShape.value === 'circle') {
        const cropBox = document.querySelector('.cropper-view-box')
        if (cropBox) {
          cropBox.style.borderRadius = '50%'
          cropBox.style.overflow = 'hidden'
        }
        
        const face = document.querySelector('.cropper-face')
        if (face) {
          face.style.borderRadius = '50%'
        }
        
        // 设置预览框为圆形
        updatePreviewShape('circle')
      }
    }
  })
}

// 更新预览框形状
const updatePreviewShape = (shape) => {
  if (preview.value) {
    if (shape === 'circle') {
      preview.value.style.borderRadius = '50%'
    } else {
      preview.value.style.borderRadius = '0'
    }
  }
}

// 销毁裁剪器
const destroyCropper = () => {
  if (cropperInstance.value) {
    cropperInstance.value.destroy()
    cropperInstance.value = null
  }
}

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value.click()
}

// 文件变更处理
const onFileChange = (e) => {
  const file = e.target.files[0]
  if (!file) return
  
  if (!file.type.includes('image/')) {
    alert($t('errors.imageOnly'))
    return
  }
  
  loadImage(file)
}

// 拖放处理
const onDrop = (e) => {
  e.preventDefault()
  const file = e.dataTransfer.files[0]
  if (!file) return
  
  if (!file.type.includes('image/')) {
    alert($t('errors.imageOnly'))
    return
  }
  
  loadImage(file)
}

// 加载图片
const loadImage = (file) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    imageUrl.value = e.target.result
  }
  reader.readAsDataURL(file)
}

// 设置裁剪形状
const setShape = (shape) => {
  cropShape.value = shape
  
  if (!cropperInstance.value) return
  
  const cropBox = document.querySelector('.cropper-view-box')
  const face = document.querySelector('.cropper-face')
  
  if (shape === 'circle') {
    if (cropBox) {
      cropBox.style.borderRadius = '50%'
      cropBox.style.overflow = 'hidden'
    }
    if (face) {
      face.style.borderRadius = '50%'
    }
    // 设置为1:1比例
    cropperInstance.value.setAspectRatio(1)
    // 更新预览框为圆形
    updatePreviewShape('circle')
  } else {
    if (cropBox) {
      cropBox.style.borderRadius = '0'
      cropBox.style.overflow = 'visible'
    }
    if (face) {
      face.style.borderRadius = '0'
    }
    // 恢复之前的比例
    cropperInstance.value.setAspectRatio(aspectRatio.value)
    // 更新预览框为矩形
    updatePreviewShape('rect')
  }
}

// 设置宽高比
const setAspectRatio = (ratio) => {
  aspectRatio.value = ratio
  
  if (cropperInstance.value) {
    cropperInstance.value.setAspectRatio(ratio)
  }
  
  // 如果是圆形，强制设置为1:1
  if (cropShape.value === 'circle') {
    aspectRatio.value = 1
    if (cropperInstance.value) {
      cropperInstance.value.setAspectRatio(1)
    }
  }
}

// 旋转
const rotate = (degree) => {
  if (cropperInstance.value) {
    cropperInstance.value.rotate(degree)
  }
}

// 水平翻转
const scaleX = () => {
  if (cropperInstance.value) {
    const scaleX = cropperInstance.value.getImageData().scaleX
    cropperInstance.value.scaleX(-scaleX)
  }
}

// 垂直翻转
const scaleY = () => {
  if (cropperInstance.value) {
    const scaleY = cropperInstance.value.getImageData().scaleY
    cropperInstance.value.scaleY(-scaleY)
  }
}

// 缩放
const zoom = (ratio) => {
  if (cropperInstance.value) {
    cropperInstance.value.zoom(ratio)
  }
}

// 重置裁剪
const resetCrop = () => {
  if (cropperInstance.value) {
    cropperInstance.value.reset()
  }
}

// 更换图片
const changeImage = () => {
  imageUrl.value = ''
}

// 下载裁剪后的图片
const downloadCroppedImage = () => {
  if (!cropperInstance.value) return
  
  // 获取裁剪后的画布
  const canvas = cropperInstance.value.getCroppedCanvas({
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'high'
  })
  
  if (!canvas) return
  
  // 如果是圆形裁剪，需要额外处理
  let finalCanvas = canvas
  if (cropShape.value === 'circle') {
    // 创建一个新的画布，尺寸与裁剪结果相同
    finalCanvas = document.createElement('canvas')
    const ctx = finalCanvas.getContext('2d')
    
    // 设置画布尺寸
    finalCanvas.width = canvas.width
    finalCanvas.height = canvas.height
    
    // 清除画布
    ctx.clearRect(0, 0, finalCanvas.width, finalCanvas.height)
    
    // 如果不是PNG格式，先填充白色背景
    if (outputType.value !== 'png') {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height)
    }
    
    // 创建圆形裁剪区域
    ctx.beginPath()
    ctx.arc(
      canvas.width / 2,    // 圆心x坐标
      canvas.height / 2,   // 圆心y坐标
      Math.min(canvas.width, canvas.height) / 2,  // 半径
      0,                   // 起始角度
      Math.PI * 2          // 结束角度
    )
    ctx.closePath()
    ctx.clip()
    
    // 绘制原始裁剪结果
    ctx.drawImage(canvas, 0, 0)
  }
  
  const mimeType = outputType.value === 'jpeg' ? 'image/jpeg' : 
                  outputType.value === 'png' ? 'image/png' : 'image/webp'
  
  // 对于圆形PNG，使用透明背景
  const quality = outputType.value === 'jpeg' ? 0.9 : undefined
  
  finalCanvas.toBlob((blob) => {
    if (!blob) return
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute('href', url)
    link.setAttribute('download', `cropped-image.${outputType.value}`)
    link.click()
    
    // 清理URL对象
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 100)
  }, mimeType, quality)
}
</script>

<style scoped>
.crop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
  position: relative;
}

.crop-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.back-button {
  display: flex;
  align-items: center;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background-color: #f8f9fa;
  color: #333;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #e9ecef;
}

.back-btn svg {
  stroke: #333;
}

.crop-actions {
  display: flex;
  gap: 10px;
}

.crop-main {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 响应式布局 - 移动端优先 */
/* 移动端布局 (默认) */
.editor-section {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.crop-editor {
  width: 100%;
  height: 300px;
}

.crop-sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.crop-settings {
  width: 100%;
}

.upload-section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 250px;
}

.upload-box {
  width: 100%;
  max-width: 600px;
  height: 200px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-box:hover {
  border-color: #4a90e2;
  background-color: rgba(74, 144, 226, 0.05);
}

.file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.upload-content {
  text-align: center;
  padding: 0 15px;
}

.upload-icon {
  color: #4a90e2;
  margin-bottom: 10px;
}

.upload-icon svg {
  width: 36px;
  height: 36px;
}

.upload-text {
  margin-bottom: 10px;
  color: #666;
  font-size: 0.9rem;
}

.upload-btn {
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;
  font-size: 0.9rem;
}

.upload-btn:hover {
  background-color: #3a7bc8;
}

.crop-editor {
  height: 300px;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.crop-settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.setting-group {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
}

.setting-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
  font-size: 0.9rem;
}

.mode-options,
.format-options,
.ratio-options,
.transform-options,
.zoom-options {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

/* 统一按钮样式 */
.mode-options button,
.format-options button,
.ratio-options button,
.transform-options button,
.zoom-options button,
.change-image-btn,
.reset-btn,
.download-btn {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* 文本按钮样式 */
.mode-options button,
.format-options button,
.ratio-options button {
  flex: 1;
  min-width: 50px;
  padding: 8px 6px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 0.85rem;
}

/* 图标按钮样式 */
.transform-options button,
.zoom-options button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  color: #333;
}

/* 激活状态 */
button.active {
  background-color: #4a90e2;
  color: white;
  box-shadow: 0 2px 5px rgba(74, 144, 226, 0.3);
}

/* 悬停效果 */
.mode-options button:hover,
.format-options button:hover,
.ratio-options button:hover,
.transform-options button:hover,
.zoom-options button:hover {
  background-color: #e9ecef;
}

/* 更换图片按钮 */
.change-image-btn {
  width: 100%;
  padding: 10px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 0.9rem;
}

.change-image-btn:hover {
  background-color: #e9ecef;
}

/* 重置按钮 */
.reset-btn {
  padding: 8px 14px;
  background-color: #f8f9fa;
  color: #333;
  font-size: 0.9rem;
}

.reset-btn:hover {
  background-color: #e9ecef;
}

/* 下载按钮 */
.download-btn {
  padding: 8px 14px;
  background-color: #4a90e2;
  color: white;
  font-size: 0.9rem;
}

.download-btn:hover {
  background-color: #3a7bc8;
  box-shadow: 0 2px 5px rgba(74, 144, 226, 0.3);
}

.crop-preview {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.preview-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 8px;
}

.preview-container {
  margin: 10px 0;
  display: flex;
  justify-content: center;
}

.preview-box {
  width: 150px;
  height: 150px;
  border: 1px solid #ddd;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.full-width-btn {
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(74, 144, 226, 0.3);
}

/* 平板布局 */
@media (min-width: 768px) {
  .crop-container {
    padding: 15px;
  }
  
  .crop-header {
    margin-bottom: 20px;
  }
  
  .crop-main {
    gap: 20px;
  }
  
  .editor-section {
    flex-direction: row;
    gap: 20px;
  }
  
  .crop-editor {
    flex: 1;
    height: 400px;
  }
  
  .crop-sidebar {
    width: 250px;
  }
  
  .upload-section {
    min-height: 350px;
  }
  
  .upload-box {
    height: 250px;
  }
  
  .upload-icon svg {
    width: 42px;
    height: 42px;
  }
  
  .upload-text {
    font-size: 1rem;
  }
  
  .upload-btn {
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 6px;
  }
  
  .setting-group {
    padding: 15px;
  }
  
  .setting-group label {
    font-size: 1rem;
  }
  
  .mode-options button,
  .format-options button,
  .ratio-options button {
    min-width: 55px;
    padding: 9px 7px;
    font-size: 0.9rem;
  }
  
  .transform-options button,
  .zoom-options button {
    width: 40px;
    height: 40px;
  }
  
  .preview-box {
    width: 180px;
    height: 180px;
  }
  
  .full-width-btn {
    padding: 12px;
    font-size: 1rem;
  }
  
  .reset-btn,
  .download-btn {
    padding: 9px 16px;
    font-size: 0.95rem;
  }
}

/* 桌面布局 */
@media (min-width: 1024px) {
  .crop-container {
    padding: 20px;
  }
  
  .crop-sidebar {
    width: 280px;
  }
  
  .crop-editor {
    height: 450px;
  }
  
  .upload-section {
    min-height: 400px;
  }
  
  .upload-box {
    height: 300px;
  }
  
  .upload-icon svg {
    width: 48px;
    height: 48px;
  }
  
  .upload-text {
    margin-bottom: 15px;
  }
  
  .upload-btn {
    padding: 12px 24px;
    font-size: 1.05rem;
    border-radius: 6px;
  }
  
  .mode-options button,
  .format-options button,
  .ratio-options button {
    min-width: 60px;
    padding: 10px 8px;
    font-size: 1rem;
  }
  
  .transform-options button,
  .zoom-options button {
    width: 44px;
    height: 44px;
  }
  
  .preview-box {
    width: 200px;
    height: 200px;
  }
  
  .full-width-btn {
    padding: 14px;
    font-size: 1.1rem;
  }
  
  .reset-btn,
  .download-btn {
    padding: 10px 18px;
    font-size: 1rem;
  }
  
  .change-image-btn {
    padding: 12px;
    font-size: 1rem;
  }
}
</style>