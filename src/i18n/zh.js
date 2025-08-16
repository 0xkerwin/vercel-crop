export default {
  title: '专业头像裁剪工具',
  home: {
    hero: {
      title: '完美呈现您的社交媒体形象',
      subtitle: '为Instagram、X、Facebook、LinkedIn等平台创建专业的个人头像和帖子图片',
      startButton: '开始裁剪'
    },
    features: {
      circular: {
        title: '社交媒体专用',
        description: '为Instagram、X、Facebook、LinkedIn等平台创建完美的个人头像'
      },
      rectangular: {
        title: '自定义宽高比',
        description: '优化图片适配Instagram帖子(1:1)、故事(9:16)、Facebook封面(16:9)等多种格式'
      },
      download: {
        title: '多种格式导出',
        description: '支持JPEG格式便于分享，PNG格式保留透明度，WebP格式兼顾质量与大小'
      }
    },
    socialMedia: {
      title: '适配任何平台',
      description: '我们的工具帮助您创建完美适配各种社交媒体的图片',
      platforms: [
        {
          name: 'Instagram',
          profileSize: '头像: 320×320像素',
          postSize: '帖子: 1:1, 4:5, 16:9',
          description: '创建吸引眼球的个人头像和帖子图片，在信息流中脱颖而出'
        },
        {
          name: 'X (Twitter)',
          profileSize: '头像: 400×400像素',
          postSize: '帖子: 16:9',
          description: '创建有影响力的个人头像和标题图片，使您的个人资料更专业'
        },
        {
          name: 'Facebook',
          profileSize: '头像: 170×170像素',
          postSize: '封面: 851×315像素',
          description: '优化您的个人资料或企业主页，使用完美尺寸的图片'
        },
        {
          name: 'LinkedIn',
          profileSize: '头像: 400×400像素',
          postSize: '横幅: 1584×396像素',
          description: '通过格式正确的个人头像和横幅图片，给人留下专业印象'
        }
      ]
    },
    howToUse: {
      title: '如何使用',
      steps: {
        upload: {
          title: '上传图片',
          description: '从您的设备中选择并上传需要裁剪的图片'
        },
        select: {
          title: '选择裁剪方式',
          description: '为目标平台选择合适的宽高比，并调整裁剪区域'
        },
        download: {
          title: '下载并分享',
          description: '下载优化后的图片，直接上传到您的社交媒体账号'
        }
      }
    },
    cta: {
      title: '准备提升您的社交媒体形象吗？',
      subtitle: '几秒钟内为所有社交平台创建专业级图片，无需注册。',
      button: '开始使用'
    }
  },
  upload: {
    title: '上传图片',
    intro: '轻松创建适合各种社交媒体平台的完美头像和图片。无论是圆形还是方形，都能一键生成符合平台要求的尺寸。',
    formats: '支持 JPG、PNG、GIF 格式，最大 10MB',
    dragHint: '拖拽图片到此处或点击下方按钮',
    button: '选择图片'
  },
  platforms: {
    instagram: 'Instagram',
    twitter: 'Twitter/X',
    facebook: 'Facebook',
    linkedin: 'LinkedIn',
    wechat: '微信'
  },
  features: {
    sizes: '多种尺寸预设，适合各平台要求',
    shapes: '圆形/方形裁剪，满足不同平台风格',
    filters: '9种滤镜效果，让头像更加出彩'
  },
  crop: {
    complete: '完成裁剪',
    reupload: '重新上传',
    basic: '基本设置',
    advanced: '高级选项',
    shape: '裁剪形状',
    rect: '矩形',
    circle: '圆形',
    ratio: '宽高比',
    free: '自由',
    square: '正方形',
    sizes: '尺寸预设',
    original: '原始',
    small: '小尺寸',
    medium: '中等尺寸',
    large: '大尺寸',
    rotate: '旋转',
    rotateLeft: '向左旋转',
    rotateRight: '向右旋转',
    zoomIn: '放大',
    zoomOut: '缩小',
    format: '输出格式',
    quality: '图片质量',
    lowQuality: '低质量',
    highQuality: '高质量',
    moreRatios: '更多宽高比',
    moreSizes: '更多尺寸',
    recrop: '重新裁剪',
    changeImage: '更换图片',
    download: '下载图片',
    preview: '预览',
    backToHome: '返回首页'
  },
  filters: {
    normal: '原图',
    grayscale: '黑白',
    sepia: '复古',
    warm: '暖色',
    cool: '冷色',
    bright: '明亮',
    vintage: '老照片',
    dramatic: '戏剧',
    fade: '褪色'
  },
  language: '语言',
  languageName: '中文',
  switchTo: '切换到英文',
  errors: {
    imageOnly: '请选择图片文件',
    maxSize: '图片大小超出最大限制'
  }
}