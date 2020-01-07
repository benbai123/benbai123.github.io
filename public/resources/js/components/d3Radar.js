const vueD3Rader = {
	props: ['data', 'config'],
	template: '<div></div>',
	mounted () {
		Object.assign(RadarChart.defaultConfig, this.config);
		RadarChart.draw(this.$el, [{
			axes: this.data.map(
				(item) => ({axis: item[0], value: item[1]}))
		}]);
	}
};

Vue.component('d3-radar', vueD3Rader)