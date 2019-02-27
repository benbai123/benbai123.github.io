window.skipTestJS = true;
var htmlCM,
	jsCM,
	consoleCM;
window.onload = function () {
	function writeIframe (html) {
		if (!html) return;
		var win = document.getElementById('iframe').contentWindow,
			doc = win.document;
		doc.open();
		doc.write(html);
		doc.close();
	}
	function evalJSInIframe (js) {
		if (!js) return;
		var win = document.getElementById('iframe').contentWindow;
		var doc = win.document;
		var s = doc.createElement('script');
		s.src = 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js';
		s.onload = function () {
			win.eval(js);
		}
		$(doc).on('keyup', keyEvantHandler);
		doc.head.appendChild(s);
	}
	function _exec (ta) {
		$('#iframe').remove();
		$('body').append('<iframe id="iframe" frameBorder="0"></iframe>');
		try {
			var html = htmlCM.getValue(),
				js = jsCM.getValue();
			writeIframe(html);
			evalJSInIframe(js);
		} catch (e) {console.log(e);}
	}
	var cmds = [], curr = 0;
	var exec = _.debounce(function (cm) {
			$('.samples').removeClass('open');
			try {
				var ta = cm.getTextArea();
				ta.value = cm.getValue();
				_exec(ta);
			} catch (e) {}
		}, 500),
		cmd = function (cm, evt) {
			try {
				// ArrowUp, ArrowDown, Enter
				var key = evt.key,
					pos = cm.getCursor(),
					ta = cm.getTextArea();
				if ( (pos.outside || !cm.getValue()) && key=='ArrowUp' && curr>0) {
					curr--;
					cm.setValue(cmds[curr]);
					cm.setCursor(0, 1);
				}
				if ( (pos.outside || !cm.getValue()) && key=='ArrowDown' && curr<cmds.length-1) {
					curr++;
					cm.setValue(cmds[curr]);
					cm.setCursor(cm.lineCount()-1, 1);
				}
				if (key=='Enter' && !evt.shiftKey) {
					var js = ta.value;
					if (js) {
						var suffix = '\n//';
						if (js.indexOf(suffix, js.length - suffix.length) === -1) {
							js += suffix;
						}
						cmds.push(js);
						curr = cmds.length;
						cm.setValue('');
						document.getElementById('iframe').contentWindow.eval(js);
					}
				}
				ta.value = cm.getValue();
			} catch (e) {console.error(e);}
		};
	$('.test-block.exec textarea.html').each(function () {
		var htmlTextarea = $(this);
		htmlCM = CodeMirror.fromTextArea(htmlTextarea[0], {mode: "htmlmixed"});
		htmlCM.on('keyup', exec);
		htmlCM.on('focus', exec);
	});
	$('.test-block.exec textarea.js').each(function () {
		var jsTextarea = $(this);
		jsCM = CodeMirror.fromTextArea(jsTextarea[0], {mode: "javascript"});
		jsCM.on('keyup', exec);
		jsCM.on('focus', exec);
	});
	$('.test-block.exec textarea.test-console').each(function () {
		var jsTextarea = $(this);
		consoleCM = CodeMirror.fromTextArea(jsTextarea[0], {mode: "javascript"});
		consoleCM.on('keyup', cmd);
	});
	
	$('.samples .inst').on('click', function () {
		$('.samples').toggleClass('open');
	});
	
	function applyValue (cm, val) {
		val = val || '';
		val = val.replace(/\t\t\t\t\t/g, ' ').replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
		cm.setValue(val);
		cm.getTextArea().value = val;
	}
	
	function _applyTest ($desc) {
		$('.test-block.src.applied').removeClass('applied');
		var $block = $desc.closest('.test-block'),
			js = $block.find('div.js script')[0]?
				$block.find('div.js script').html()
				: $block.find('div.js').html(),
			cmd = $block.find('div.test-console script')[0]?
				$block.find('div.test-console script').html()
				: $block.find('div.test-console').html();
		$block.addClass('applied');
		applyValue(htmlCM, $block.find('div.html').html());
		applyValue(jsCM, js);
		applyValue(consoleCM, cmd);
		$('.test-block.exec .desc').html($desc.html());
		_exec(htmlCM.getTextArea());
	}
	function applyTest (e) {
		$('.samples').removeClass('open');
		_applyTest($(e.target));
	}
	$('.test-block.src .desc').on('click', applyTest);
	_applyTest($('.test-block.src .desc').eq(0));
	function keyEvantHandler (e) {
		if (e.ctrlKey && e.altKey
			&& (e.key == 'ArrowLeft' || e.keyCode == 37)) {
			e.preventDefault();
			$('.prev a')[0].click();
		}
		if (e.ctrlKey && e.altKey
			&& (e.key == 'ArrowRight' || e.keyCode == 39)) {
			e.preventDefault();
			$('.next a')[0].click();
		}
		if (e.ctrlKey && e.altKey
			&& (e.key == 'ArrowUp' || e.keyCode == 38)) {
			e.preventDefault();
			if ($('.test-block.src.applied')[0] && $('.test-block.src')[0]
				&& $('.test-block.src.applied')[0] != $('.test-block.src')[0]) {
				_applyTest($('.test-block.src.applied').prev('.test-block.src').find('.desc').eq(0));
			}
		}
		if (e.ctrlKey && e.altKey
			&& (e.key == 'ArrowDown' || e.keyCode == 40)) {
			e.preventDefault();
			if ($('.test-block.src.applied')[0] && $('.test-block.src').last()[0]
				&& $('.test-block.src.applied')[0] != $('.test-block.src').last()[0]) {
				_applyTest($('.test-block.src.applied').next('.test-block.src').find('.desc').eq(0));
			}
		}
		if (e.ctrlKey && e.altKey
			&& (e.key == 'Home' || e.keyCode == 36)) {
			e.preventDefault();
			_applyTest($('.test-block.src .desc').eq(0));
		}
		if (e.ctrlKey && e.altKey
			&& (e.key == 'End' || e.keyCode == 35)) {
			e.preventDefault();
			_applyTest($('.test-block.src .desc').last());
		}
	}
	$('body').on('keyup', keyEvantHandler);
	console.log($('.test-block.src').length + ' samples this page');
}