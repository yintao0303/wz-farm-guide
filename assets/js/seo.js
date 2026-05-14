/**
 * 王者农场攻略站 - SEO 增强脚本
 * 自动注入结构化数据（JSON-LD）
 */

;(function() {
  const BASE_URL = 'https://wz-farm-guide.pages.dev'
  const SITE_NAME = '王者农场攻略站'

  // 页面SEO配置（每个页面只需在这里注册）
  const pageSEO = {
    '/': {
      title: '王者农场攻略站 - 最全种植养成攻略',
      desc: '王者荣耀农场模式最全攻略站，包含作物图鉴、升级路线、英雄作物机制、巨大化技巧、偷菜祝福攻略等一站式指南。',
      type: 'WebPage',
    },
    '/guide/basics.html': {
      title: '基础入门 - 王者农场攻略站',
      desc: '王者荣耀农场模式新手入门指南：如何进入、基础操作、界面介绍、种植流程、资源系统详解，一篇搞懂所有基础概念。',
      type: 'Article',
    },
    '/guide/crops.html': {
      title: '作物图鉴 - 王者农场攻略站',
      desc: '王者农场全作物数据一览：种植时间、经验收益、金币售价、等级要求、培育等级机制、最优种植策略、收益效率排行。',
      type: 'Article',
    },
    '/guide/leveling.html': {
      title: '升级攻略 - 王者农场攻略站',
      desc: '王者农场等级提升全攻略：1-58级最优升级路线、作物选择策略、跳过技巧、关键等级节点解锁内容、氪金加速方案。',
      type: 'Article',
    },
    '/guide/heroes.html': {
      title: '英雄作物攻略 - 王者农场攻略站',
      desc: '王者农场英雄化变异机制详解：浇水触发、祝福触发、卡等级玄学、公式化祝福、英雄作物图鉴、英雄+巨大化共存技巧。',
      type: 'Article',
    },
    '/guide/giant.html': {
      title: '巨大化种植攻略 - 王者农场攻略站',
      desc: '王者农场巨大化种植全攻略：560倍巨大化秘籍、蓝莓巨大化教程、触发方法步骤、倍率说明、英雄+巨大共存技巧。',
      type: 'Article',
    },
    '/guide/social.html': {
      title: '社交系统攻略 - 王者农场攻略站',
      desc: '王者农场社交玩法攻略：偷菜与反偷菜技巧、祝福机制详解、卡祝福方法、浇水互助、周末翻倍收益指南、祝福礼仪。',
      type: 'Article',
    },
    '/guide/seeds.html': {
      title: '种子合成 - 王者农场攻略站',
      desc: '王者农场种子合成系统攻略：合成配方、材料获取、合成优先级策略、新版本更新内容详解。',
      type: 'Article',
    },
    '/guide/faq.html': {
      title: '常见问题 - 王者农场攻略站',
      desc: '王者农场常见问题汇总：培育等级机制、转区刷经验说明、作物售价影响因素、英雄化概率、未来更新预告。',
      type: 'FAQPage',
    },
  }

  // 获取当前页面路径
  const path = window.location.pathname
  const seo = pageSEO[path] || pageSEO['/']

  // 当前页面URL
  const pageUrl = BASE_URL + path

  // === 1. JSON-LD 结构化数据（WebSite + 页面类型） ===
  const ld = []

  // WebSite 结构化（整个网站）
  ld.push({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: BASE_URL,
    description: '王者荣耀农场模式非官方攻略站',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: BASE_URL + '/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  })

  // 页面级结构化
  if (seo.type === 'FAQPage') {
    ld.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '王者农场在哪里进入？',
          acceptedAnswer: { '@type': 'Answer', text: '打开《王者荣耀》主界面，找到「农场」入口即可进入。' },
        },
        {
          '@type': 'Question',
          name: '培育等级和农场等级有什么区别？',
          acceptedAnswer: { '@type': 'Answer', text: '农场等级是整体进度，培育等级是每种作物单独的熟练度，影响该作物的售价。' },
        },
        {
          '@type': 'Question',
          name: '跳过木瓜种橘子可行吗？',
          acceptedAnswer: { '@type': 'Answer', text: '可行。不少玩家选择在40-45级跳过木瓜，直接到45级种橘子。' },
        },
        {
          '@type': 'Question',
          name: '英雄化作物真的不会被偷吗？',
          acceptedAnswer: { '@type': 'Answer', text: '根据玩家实测，英雄化作物确实可能无法被好友偷取。' },
        },
      ],
    })
  } else {
    ld.push({
      '@context': 'https://schema.org',
      '@type': seo.type,
      headline: seo.title,
      description: seo.desc,
      url: pageUrl,
      author: { '@type': 'Person', name: '王者农场攻略站' },
      publisher: { '@type': 'Organization', name: SITE_NAME },
      mainEntityOfPage: pageUrl,
    })
  }

  // 面包屑结构化
  const breadcrumbItems = path === '/'
    ? [{ '@type': 'ListItem', position: 1, name: '首页' }]
    : [
        { '@type': 'ListItem', position: 1, name: '首页', item: BASE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: seo.title.split(' - ')[0], item: pageUrl },
      ]

  ld.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  })

  // 注入 JSON-LD
  ld.forEach(data => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
  })

  // === 2. 自动修复缺失的 OG 标签（如果 HTML 中没写的话）===
  function addMeta(property, content, isName = false) {
    if (!content) return
    const attr = isName ? 'name' : 'property'
    if (!document.querySelector(`meta[${attr}="${property}"]`)) {
      const meta = document.createElement('meta')
      meta.setAttribute(attr, property)
      meta.content = content
      document.head.appendChild(meta)
    }
  }

  addMeta('og:title', seo.title)
  addMeta('og:description', seo.desc)
  addMeta('og:url', pageUrl)
  addMeta('og:type', seo.type === 'Article' ? 'article' : 'website')
  addMeta('og:site_name', SITE_NAME)
  addMeta('twitter:card', 'summary')
  addMeta('twitter:title', seo.title)
  addMeta('twitter:description', seo.desc)

  // === 3. 自动添加 canonical URL（如果 HTML 中没写的话）===
  if (!document.querySelector('link[rel="canonical"]')) {
    const link = document.createElement('link')
    link.rel = 'canonical'
    link.href = pageUrl
    document.head.appendChild(link)
  }
})()
