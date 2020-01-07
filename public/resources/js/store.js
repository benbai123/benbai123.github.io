/*
	由實際資料組成符合 app 使用的格式
*/
import data from './data.js';

// 將 hilghlights 加上 id, 開關用
let hid = 0;
data.works.highlights.forEach((item) => {
	item.id = 'highlight_'+hid;
	hid++;
});

const store = new Vuex.Store({
		state: {
			header: '能力自評及過去作品',
			article: {
				abilities: data.abilities,
				highlights: data.works.highlights
			},
			footer: (({ Github, Blogs }) => ({ Github, Blogs }))(data.works)
		},
		mutations: {
			
		}
	})
export default store;