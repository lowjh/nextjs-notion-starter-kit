import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  override render() {
    return (
      <Html lang='zh-CN'>
        <Head>
          <link rel='shortcut icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' sizes='32x32' href='favicon.png' />
          <link rel='manifest' href='/manifest.json' />
          
          {/* iOS Safari 安全区域支持 */}
          <meta 
            name='viewport' 
            content='width=device-width, initial-scale=1, viewport-fit=cover, minimum-scale=1, maximum-scale=1, user-scalable=no' 
          />
          
          {/* 主题色 - 支持深色/浅色模式 */}
          <meta name='theme-color' content='#FFFFFF' media='(prefers-color-scheme: light)' />
          <meta name='theme-color' content='#1F2027' media='(prefers-color-scheme: dark)' />
          
          {/* iOS 状态栏样式 - 使用 black-translucent 让网页延伸到状态栏 */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          
          {/* iOS 启动图 */}
          <link rel='apple-touch-startup-image' href='/favicon.png' />
        </Head>

        <body>
          <script
            dangerouslySetInnerHTML={{
              __html: `
/** Inlined version of noflash.js from use-dark-mode */
;(function () {
  var storageKey = 'darkMode'
  var classNameDark = 'dark-mode'
  var classNameLight = 'light-mode'
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight)
    document.body.classList.remove(darkMode ? classNameLight : classNameDark)
    // 设置 html 和 body 背景色以覆盖 iOS 安全区域
    var bgColor = darkMode ? '#1F2027' : '#FFFFFF'
    document.documentElement.style.backgroundColor = bgColor
    document.body.style.backgroundColor = bgColor
    
    // 强制设置视口高度（修复 iOS Safari 高度问题）
    document.documentElement.style.minHeight = '100vh'
    document.documentElement.style.minHeight = '-webkit-fill-available'
    document.body.style.minHeight = '100vh'
    document.body.style.minHeight = '-webkit-fill-available'
  }
  var preferDarkQuery = '(prefers-color-scheme: dark)'
  var mql = window.matchMedia(preferDarkQuery)
  var supportsColorSchemeQuery = mql.media === preferDarkQuery
  var localStorageTheme = null
  try {
    localStorageTheme = localStorage.getItem(storageKey)
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme)
  }
  // Determine the source of truth
  if (localStorageExists) {
    // source of truth from localStorage
    setClassOnDocumentBody(localStorageTheme)
  } else if (supportsColorSchemeQuery) {
    // source of truth from system
    setClassOnDocumentBody(mql.matches)
    localStorage.setItem(storageKey, mql.matches)
  } else {
    // source of truth from document.body
    var isDarkMode = document.body.classList.contains(classNameDark)
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode))
  }
})();
`
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
