/**
 * 王者农场攻略站 - 广告管理脚本
 *
 * 使用说明：
 * 1. 在 adnetworks 中配置你的广告网络代码
 * 2. 在页面 HTML 中添加 <div class="ad-slot" data-ad-slot="slot-name"></div>
 * 3. 广告会自动渲染到对应的广告位
 *
 * 切换广告网络：修改 defaultNetwork 的值
 */

const AD_CONFIG = {
  // 当前使用的广告网络: 'adsense' | 'baidu' | 'custom'
  defaultNetwork: 'custom',

  // 广告网络配置
  networks: {
    // Google AdSense
    adsense: {
      publisherId: 'ca-pub-xxxxxxxxxxxxxx', // 替换为你的发布商ID
      script: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
    },

    // 百度联盟
    baidu: {
      publisherId: '', // 替换为你的百度联盟ID
    },

    // 自定义广告代码（用于任何广告网络）
    custom: {
      // 每个广告位的自定义代码
      slots: {
        'home-banner': '',
        'home-cards-mid': '',
        'content-top': '',
        'content-mid': '',
        'content-bottom': '',
        'sidebar': '',
      },
    },
  },
}

/**
 * 广告位尺寸配置（用于占位显示）
 */
const AD_SLOT_SIZES = {
  'home-banner': { width: '728px', height: '90px', label: '横幅广告(728×90)' },
  'home-cards-mid': { width: '336px', height: '280px', label: '中矩形广告(336×280)' },
  'content-top': { width: '728px', height: '90px', label: '横幅广告(728×90)' },
  'content-mid': { width: '336px', height: '280px', label: '中矩形广告(336×280)' },
  'content-bottom': { width: '728px', height: '90px', label: '横幅广告(728×90)' },
  'sidebar': { width: '300px', height: '250px', label: '矩形广告(300×250)' },
}

/**
 * 初始化所有广告位
 */
function initAds() {
  const slots = document.querySelectorAll('[data-ad-slot]')
  slots.forEach(el => {
    const slotName = el.dataset.adSlot
    renderAd(el, slotName)
  })
}

/**
 * 渲染单个广告位
 */
function renderAd(container, slotName) {
  const network = AD_CONFIG.defaultNetwork
  const size = AD_SLOT_SIZES[slotName]

  if (!size) return

  // 如果已配置该广告位的代码，优先使用
  const customCode = AD_CONFIG.networks.custom?.slots?.[slotName]
  if (network === 'custom' && customCode) {
    container.innerHTML = customCode
    container.style.display = 'block'
    return
  }

  // 否则显示占位提示
  container.innerHTML = `
    <div style="
      display:flex; align-items:center; justify-content:center;
      width:100%; min-height:${size.height}; max-width:${size.width};
      margin:0 auto; background:#f0fdf4; border:2px dashed #bbf7d0;
      border-radius:12px; color:#86efac; font-size:0.85rem; text-align:center;
      padding:16px; cursor:pointer; transition:all 0.3s;
    "
    onclick="this.style.display='none'"
    title="点击关闭占位">
      📢 广告位 · ${size.label}<br>
      <span style="font-size:0.75rem;color:#a8a29e;margin-top:4px;">
        在 assets/js/ads.js 中配置广告代码后自动替换
      </span>
    </div>
  `
  container.style.display = 'block'
}

// DOM 加载完成后初始化广告
document.addEventListener('DOMContentLoaded', initAds)
