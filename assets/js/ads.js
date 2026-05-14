/**
 * 王者农场攻略站 - 广告管理脚本
 *
 * 当前使用：Google AdSense
 *
 * 接入步骤：
 * 1. 去 https://adsense.google.com 申请账号
 * 2. 申请通过后把 e79d36aac4a51f8d1b3c6547d64c2426 替换为你的发布商ID
 * 3. 在 AdSense 后台创建广告单元，获取 data-ad-slot 值
 * 4. 填入下方 AD_UNITS 配置中
 */

const AD_CONFIG = {
  // ===== 修改这里 =====
  publisherId: 'ca-pub-xxxxxxxxxxxxxx', // 替换为你的发布商ID（格式: ca-pub-xxxxxxxxxxxxxx）
  // ===================

  // 广告单元配置（在 AdSense 后台创建广告单元后，把 data-ad-slot 填进来）
  adUnits: {
    // 广告位名称: { slotId: 'AdSense的data-ad-slot值', format: 'auto'/'fixed' }
    'home-banner':    { slotId: '', format: 'horizontal' },
    'home-cards-mid': { slotId: '', format: 'rectangle' },
    'content-top':    { slotId: '', format: 'horizontal' },
    'content-mid':    { slotId: '', format: 'rectangle' },
    'content-bottom': { slotId: '', format: 'horizontal' },
  },

  // 当前状态（无需修改）
  ready: false,
}

/**
 * 广告位尺寸配置（占位提示用）
 */
const AD_SLOT_SIZES = {
  'home-banner':    { label: '横幅广告 728×90', style: 'min-height:90px;max-width:728px' },
  'home-cards-mid': { label: '中矩形广告 336×280', style: 'min-height:280px;max-width:336px' },
  'content-top':    { label: '横幅广告 728×90', style: 'min-height:90px;max-width:728px' },
  'content-mid':    { label: '中矩形广告 336×280', style: 'min-height:280px;max-width:336px' },
  'content-bottom': { label: '横幅广告 728×90', style: 'min-height:90px;max-width:728px' },
}

/**
 * 初始化广告
 */
document.addEventListener('DOMContentLoaded', () => {
  // 检查是否有广告位
  const slots = document.querySelectorAll('[data-ad-slot]')
  if (!slots.length) return

  const pid = AD_CONFIG.publisherId
  const isReady = pid && pid !== 'ca-pub-xxxxxxxxxxxxxx'

  if (isReady) {
    // 加载 AdSense 脚本（每个页面只加载一次）
    AD_CONFIG.ready = true
    loadAdSenseScript(pid)
  }

  // 渲染所有广告位
  slots.forEach(el => renderAd(el, isReady))
})

/**
 * 加载 AdSense 脚本
 */
function loadAdSenseScript(publisherId) {
  // 防止重复加载
  if (document.querySelector('script[src*="adsbygoogle"]')) return

  const script = document.createElement('script')
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`
  script.async = true
  script.crossOrigin = 'anonymous'
  document.head.appendChild(script)
}

/**
 * 渲染单个广告位
 */
function renderAd(container, isReady) {
  const name = container.dataset.adSlot
  const size = AD_SLOT_SIZES[name]

  if (!size) {
    container.style.display = 'none'
    return
  }

  if (!isReady) {
    // 未配置发布商ID → 显示占位提示
    container.innerHTML = `
      <div style="
        display:flex;align-items:center;justify-content:center;flex-direction:column;
        ${size.style};width:100%;margin:0 auto;
        background:#f0fdf4;border:2px dashed #bbf7d0;border-radius:12px;
        color:#86efac;font-size:0.85rem;text-align:center;padding:20px;
      ">
        <div>📢 ${size.label}</div>
        <div style="font-size:0.75rem;color:#a8a29e;margin-top:4px;">
          在 assets/js/ads.js 中填入 AdSense 发布商ID后自动展示广告
        </div>
      </div>
    `
    container.style.display = 'block'
    return
  }

  // 渲染 AdSense 广告
  const unit = AD_CONFIG.adUnits[name]
  if (!unit) return

  const ins = document.createElement('ins')
  ins.className = 'adsbygoogle'
  ins.style.display = 'block'
  ins.dataset.adClient = AD_CONFIG.publisherId

  if (unit.slotId) {
    ins.dataset.adSlot = unit.slotId
  }

  if (unit.format === 'horizontal') {
    ins.dataset.adFormat = 'horizontal'
    ins.style.width = '728px'
    ins.style.height = '90px'
  } else if (unit.format === 'rectangle') {
    ins.dataset.adFormat = 'rectangle'
    ins.style.width = '336px'
    ins.style.height = '280px'
  } else {
    ins.dataset.adFormat = 'auto'
    ins.style.width = '100%'
  }

  container.innerHTML = ''
  container.appendChild(ins)
  container.style.display = 'block'

  try {
    ;(adsbygoogle = window.adsbygoogle || []).push({})
  } catch (e) {
    // AdSense 尚未加载完成
  }
}
