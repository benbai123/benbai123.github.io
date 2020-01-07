/*
	實際資料
*/
const data = {
	abilities: [
		['前端', 9], ['後端', 9], ['開發/測試', 8], ['基礎OS/演算法', 7], ['佈署/維運', 6]
	],
	works: {
		Github: [{
			name: 'https://github.com/benbai123',
			url: 'https://github.com/benbai123'
		}],
		Blogs: [{
			name: 'potatoes and carrots no bones',
			url: 'http://ben-bai.blogspot.com'
		}, {
			name: 'Happy (?) Rails Trial',
			url: 'http://happy-rails-trial.blogspot.com'
		}],
		highlights: [
			{
				title: '前端基礎知識整理',
				urls: ['https://github.com/benbai123/Front-end-Developer-Interview-Questions/tree/master/answer'],
				desc: `對 HTML/CSS/JS 等各種前端相關知識的整理，
				是 fork 別人整理問題的專案再加上答案及中文翻譯。
				有將它分享在臉書 Front-End Developers Taiwan 的社團
				ref: <a target="_blank" href="https://i.imgur.com/jllHLaR.png">https://i.imgur.com/jllHLaR.png</a>`
			}, {
				title: '一些 ZK 元件的應用 (JAVA/jQuery)',
				urls: ['http://ben-bai.blogspot.com/2013/01/zk-tree-rod-and-load-on-demand.html', 'http://ben-bai.blogspot.com/2013/04/zk-macro-component-using-macro.html', 'https://www.zkoss.org/wiki/Small_Talks/2012/December/Handle_Huge_Data_in_ZK_Pivottable'],
				desc: `截錄一些文章下方的回應
				ZK Tree: ROD and Load on Demand TreeModel/TreeNode - 
				<blockquote>Can't tell how helpful this post and the source code is. Awesome job. Saved me a ton of time.</blockquote> ZK Macro Component: Using Macro Component to Create a Keypad Component - 
				<blockquote>Gr8 Work Ben...Will it be added in ZK Official website</blockquote>`
			}, {
				title: 'JSP/JAVA 相關練習',
				urls: ['https://github.com/benbai123/JSP_Servlet_Practice'],
				desc: `個人整理的一些 JAVA 練習，除了 JSP/Web 外也有包含 Selenium 瀏覽器自動化測試的部份。
				其中像 <a target="_blank" href="http://ben-bai.blogspot.com/2012/01/jsp-practice-simple-chat.html">http://ben-bai.blogspot.com/2012/01/jsp-practice-simple-chat.html</a> 在 google 搜尋 "jsp chat" 的第一頁
				受到對岸朋友肯定，推薦為新手的學習資源。
				ref: <a target="_blank" href="https://zhuanlan.zhihu.com/p/22112669">https://zhuanlan.zhihu.com/p/22112669</a> 				实例（五），源码下载（包含几个小项目）`
			}, {
				title: 'C 語言練習',
				urls: ['https://github.com/benbai123/C_Cplusplus_Practice', 'https://ben-bai.blogspot.com/search/label/C'],
				desc: `一些 C 相關的練習，
				其中 google 搜尋 "ansi c string starts with" 在第一頁可找到以下這篇
				<a target="_blank" href="http://ben-bai.blogspot.com/2013/03/c-string-startswith-endswith-indexof.html">http://ben-bai.blogspot.com/2013/03/c-string-startswith-endswith-indexof.html</a>`
			}, {
				title: 'Jenkins/Selenium/Docker 整合應用',
				urls: ['https://github.com/benbai123/RubyOnRails/tree/master/Practice/RubyOnRails/Test/Selenium/WorkinCase/SeleniumTest'],
				desc: `於 Docker 中跑 Jenkins 來操作 Selenium,
				並有實作 ruby 版本的圖檔比對來實現 Visual Testing`
			}
		]
	}
}

export default data;