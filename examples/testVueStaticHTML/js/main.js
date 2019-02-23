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
	doc.head.appendChild(s);
}
var htmlCM,
	jsCM,
	consoleCM;
function _exec (ta) {
	console.log('_exec');
	$('#iframe').remove();
	$('body').append('<iframe id="iframe" frameBorder="0"></iframe>');
	try {
		var html = htmlCM.getValue(),
			js = jsCM.getValue();
		console.log(html);
		console.log(js);
		writeIframe(html);
		evalJSInIframe(js);
	} catch (e) {console.log(e);}
}
window.onload = function () {
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
					cm.setCursor(0, cmds[curr].length-1);
				}
				if (key=='Enter' && !evt.shiftKey) {
					var js = ta.value;
					console.log(js);
					if (js) {
						cmds.push(js);
						curr = cmds.length;
						cm.setValue('');
						document.getElementById('iframe').contentWindow.eval(js);
					}
				}
				ta.value = cm.getValue();
			} catch (e) {}
		};
	$('.test-block.exec textarea.html').each(function () {
		var htmlTextarea = $(this);
		htmlCM = CodeMirror.fromTextArea(htmlTextarea[0], {mode: "htmlmixed"});
		htmlCM.on('keyup', exec);
		htmlCM.on('focus', exec);
		console.log(htmlCM);
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
		val = val.replace(/\t\t\t\t\t/g, ' ');
		cm.setValue(val);
		cm.getTextArea().value = val;
	}
	
	function _applyTest ($desc) {
		$('.samples').removeClass('open');
		var $block = $desc.closest('.test-block');
		applyValue(htmlCM, $block.find('textarea.html').val());
		applyValue(jsCM, $block.find('textarea.js').val());
		applyValue(consoleCM, $block.find('textarea.test-console').val());
		$('.test-block.exec .desc').html($desc.html());
		_exec(htmlCM.getTextArea());
	}
	function applyTest (e) {
		_applyTest($(e.target));
	}
	$('.test-block.src .desc').on('click', applyTest);
	_applyTest($('.test-block.src .desc').eq(0));
}