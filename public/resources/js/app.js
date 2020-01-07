// app 用的資料
import store from './store.js';
// 載入雷達圖元件
import './components/d3Radar.js';

new Vue({
	el: '#app',
	store,
	computed: {
		// 主要資料內容
		...Vuex.mapState([
			'header', 'article', 'footer'
		]),
		// 雷達圖用的 config
		radarConfig: () => ({
			radius: 3,
			w: 200,
			h: 200,
			maxValue: 10,
			color: () => '#add8e6',
			backgroundTooltipOpacity: 0
		})
	},
})