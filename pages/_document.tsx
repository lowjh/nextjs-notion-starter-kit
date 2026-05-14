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
          
          {/* 主题色 */}
          <meta name='theme-color' content='#FFFFFF' media='(prefers-color-scheme: light)' />
          <meta name='theme-color' content='#1F2027' media='(prefers-color-scheme: dark)' />
          
          {/* 关键：使用 black-translucent 让网页延伸到状态栏 */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
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
    // 设置背景色
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
