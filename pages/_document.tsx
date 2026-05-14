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
            content='width=device-width, initial-scale=1, viewport-fit=cover' 
          />
          
          {/* 主题色 - 关键：使用 black 让状态栏与网页一体 */}
          <meta name='theme-color' content='#FFFFFF' media='(prefers-color-scheme: light)' />
          <meta name='theme-color' content='#1F2027' media='(prefers-color-scheme: dark)' />
          
          {/* iOS 状态栏样式 - 使用 black 而不是 black-translucent */}
          {/* black = 状态栏黑色，网页从顶部开始（推荐用于深色模式） */}
          {/* black-translucent = 网页延伸到状态栏下方（会导致颜色不一致） */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black' />
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
    // 设置 html 背景色
    var bgColor = darkMode ? '#1F2027' : '#FFFFFF'
    document.documentElement.style.backgroundColor = bgColor
    document.body.style.backgroundColor = bgColor
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
    setClassOnDocumentBody(localStorageTheme)
  } else if (supportsColorSchemeQuery) {
    setClassOnDocumentBody(mql.matches)
    localStorage.setItem(storageKey, mql.matches)
  } else {
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
