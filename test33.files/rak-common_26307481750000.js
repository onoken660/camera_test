var RakClass = {
	define : function() {
		return function() {
			this.init.apply(this, arguments);
		}
	},
	extend : function(x_dest, x_src) {
		for (var i in x_src.prototype) {
			x_dest.prototype[i] = x_src.prototype[i];
		}
		x_dest.SUPER = x_src;
	}
};
var RakAgent = {};
RakAgent.IE = 'IE';
RakAgent.Edge = 'Edge';
RakAgent.NN = 'NN';
RakAgent.OP = 'OP';
RakAgent.FF = 'FF';
RakAgent.MZ = 'MZ';
RakAgent.UK = 'UK';
if (navigator.userAgent.indexOf('Opera') > -1) {
	RakAgent.g_browser = RakAgent.OP;
	RakAgent.g_brwsub = RakAgent.OP;
	var p_idx = navigator.userAgent.indexOf("Opera") + 6;
	var p_idx2 = navigator.userAgent.indexOf(' ', p_idx + 2);
	if (p_idx2 > -1) {
		RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
	}
} else {
	if (navigator.userAgent.indexOf('MSIE') > -1) {
		RakAgent.g_browser = RakAgent.IE;
		RakAgent.g_brwsub = RakAgent.IE;
		var p_idx = navigator.userAgent.indexOf("MSIE") + 4;
		var p_idx2 = navigator.userAgent.indexOf(';', p_idx);
		if (p_idx2 > -1) {
			RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
		}
	} else if (navigator.userAgent.indexOf('Trident') >= 0) {
		RakAgent.g_browser = RakAgent.IE;
		RakAgent.g_brwsub = RakAgent.IE;
		var p_idx = navigator.userAgent.indexOf("rv:") + 3;
		var p_idx2 = navigator.userAgent.indexOf(')', p_idx);
		if (p_idx2 > -1) {
			RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
		}
	} else if (navigator.userAgent.indexOf('Edge') >= 0) {
		RakAgent.g_browser = RakAgent.IE;
		RakAgent.g_brwsub = RakAgent.Edge;
		var p_idx = navigator.userAgent.indexOf("Edge/") + 5;
		var p_idx2 = navigator.userAgent.indexOf(".", p_idx);
		RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
		if (p_idx2 > 0) {
			var p_subversion = navigator.userAgent.substring(p_idx2 + 1);
			if (p_subversion) {
				p_subversion = ('00000000000000' + p_subversion).slice(-14);
				RakAgent.g_brwsver = RakAgent.g_brwsver + '.' + p_subversion;
			}
		}
	} else if (navigator.userAgent.indexOf('Mozilla') > -1) {
		RakAgent.g_browser = RakAgent.NN;
		if (navigator.userAgent.indexOf('Netscape6') > -1) {
			RakAgent.g_brwsub = RakAgent.NN;
			RakAgent.g_brwsver = 6;
		} else if (navigator.userAgent.indexOf('Netscape/') > -1) {
			RakAgent.g_brwsub = RakAgent.NN;
			var p_idx = navigator.userAgent.indexOf('Netscape/') + 9;
			var p_idx2 = p_idx;
			while (p_idx2 < navigator.userAgent.length
					&& '.0123456789'.indexOf(navigator.userAgent.charAt(p_idx2)) > -1) {
				p_idx2++
			}
			RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
		} else {
			if (navigator.userAgent.indexOf('Firefox') > -1) {
				RakAgent.g_brwsub = RakAgent.FF;
			} else if (navigator.userAgent.indexOf('Gecko') > -1) {
				RakAgent.g_brwsub = RakAgent.MZ;
			} else if (navigator.appName == 'Netscape') {
				RakAgent.g_brwsub = RakAgent.NN;
			} else {
				RakAgent.g_brwsub = RakAgent.UK;
			}
			var p_idx;
			if (navigator.userAgent.indexOf('Firefox') > -1) {
				p_idx = navigator.userAgent.indexOf('Firefox') + 8;
			} else {
				p_idx = navigator.userAgent.indexOf('Mozilla') + 8;
			}
			var p_idx2 = p_idx;
			while (p_idx2 < navigator.userAgent.length
					&& '.0123456789'.indexOf(navigator.userAgent.charAt(p_idx2)) > -1) {
				p_idx2++
			}
			RakAgent.g_brwsver = navigator.userAgent.substring(p_idx, p_idx2);
		}
	} else {
		RakAgent.g_browser = RakAgent.UK;
	}
	if (!RakAgent.g_brwsub && navigator.appName) {
		RakAgent.g_brwsub = navigator.appName;
	}
	if (!RakAgent.g_brwsver && navigator.appVersion) {
		RakAgent.g_brwsver = navigator.appVersion;
	}
	if (RakAgent.g_brwsver) {
		var p_num = new Number(RakAgent.g_brwsver);
		if (!isNaN(p_num)) {
			RakAgent.g_brwsver = p_num;
		} else {
			RakAgent.g_brwsver = 0;
		}
	} else {
		RakAgent.g_brwsver = 0;
	}
}
var RakUtil = {};
RakUtil.StringBuffer = function(string) {
	this.buffer = [];
	this.append = function(string) {
		this.buffer.push(string);
		return this;
	};
	this.toString = function() {
		return this.buffer.join('');
	};
	if (string) {
		this.append(string);
	}
};
RakUtil.escape = function(x_msg) {
	var p_div = document.createElement('div');
	p_div.appendChild(document.createTextNode(x_msg));
	return p_div.innerHTML;
};
RakUtil.isEmpty = function(x_obj) {
	if (x_obj == null) {
		return true;
	}
	switch (typeof(x_obj)) {
	case 'undefined':
		return true;
	case 'string':
		return x_obj.length == 0;
	case 'number':
		return isNaN(x_obj);
	case 'boolean':
		return false;
	case 'object':
		if (x_obj instanceof Array) {
			return x_obj.length == 0;
		} else {
			if (!isNaN(x_obj.length) && x_obj.length <= 0) {
				return true;
			} else {
				for (var i in x_obj) {
					return false;
				}
				return true;
			}
		}
	}
	return false;
};
RakUtil.toInt = function(x_obj, x_default) {
	if (typeof(x_obj) == 'number') {
		if (isNaN(x_obj)) {
			if (typeof(x_default) != 'undefined') {
				return x_default;
			} else {
				return x_obj;
			}
		} else {
			return parseInt(x_obj);
		}
	} else {
		var p_num;
		if (x_obj == null) {
			p_num = Number.NaN;
		} else if (typeof(x_obj) == 'string' && x_obj == '') {
			p_num = Number.NaN;
		} else {
			p_num = new Number(x_obj);
		}
		if (isNaN(p_num)) {
			if (typeof(x_default) != 'undefined') {
				return x_default;
			} else {
				return p_num;
			}
		} else {
			return parseInt(p_num);
		}
	}
};
RakUtil.toFloat = function(x_obj, x_default) {
	if (typeof(x_obj) == 'number') {
		if (isNaN(x_obj)) {
			if (typeof(x_default) != 'undefined') {
				return x_default;
			} else {
				return x_obj;
			}
		} else {
			return x_obj;
		}
	} else {
		var p_num;
		if (x_obj == null) {
			p_num = Number.NaN;
		} else if (typeof(x_obj) == 'string' && x_obj == '') {
			p_num = Number.NaN;
		} else {
			p_num = new Number(x_obj);
		}
		if (isNaN(p_num)) {
			if (typeof(x_default) != 'undefined') {
				return x_default;
			} else {
				return p_num;
			}
		} else {
			return p_num;
		}
	}
};
RakUtil.toBoolean = function(x_obj, x_default) {
	switch (typeof(x_obj)) {
	case 'boolean':
		return x_obj;
	case 'string':
		var p_str = x_obj.toLowerCase();
		if (p_str == 'true') {
			return true;
		} else if (p_str == 't') {
			return true;
		} else if (p_str == 'yes') {
			return true;
		} else if (p_str == 'on') {
			return true;
		} else if (p_str == 'y') {
			return true;
		} else {
			if (typeof(x_default) != 'undefined') {
				return x_default;
			} else {
				return false;
			}
		}
	default:
		if (typeof(x_default) != 'undefined') {
			return x_default;
		} else {
			return false;
		}
	}
};
RakUtil.clone = function(x_obj) {
	var p_obj = new Object();
	if (x_obj) {
		for (var i in x_obj) {
			p_obj[i] = x_obj[i];
		}
	}
	return p_obj;
};
RakUtil.trim = function(x_str) {
	if (typeof(x_str) == 'string') {
		return x_str.replace(/^[\s@]+|[\s@]+$/g, '');
	} else {
		return '';
	}
};
RakUtil.lenb = function(x_str) {
	var p_ret = 0;
	if (typeof(x_str) == 'string') {
		x_str = escape(x_str);
		for (var i = 0; i < x_str.length; i++, p_ret++) {
			if (x_str.charAt(i) == '%') {
				if (x_str.charAt(++i) == 'u') {
					i += 3;
					p_ret++;
				}
				i++;
			}
		}
	}
	return p_ret;
};
RakUtil.list2Array = function(x_str, x_delim, x_trim) {
	if (!x_str) {
		return null;
	}
	if (x_str.length == 0) {
		return new Array();
	}
	if (!x_delim) {
		x_delim = ',';
	}
	if (typeof(x_trim) != 'boolean') {
		x_trim = true;
	}
	var p_ary = x_str.split(x_delim);
	if (x_trim) {
		for (var i = 0; i < p_ary.length; i++) {
			p_ary[i] = RakUtil.trim(p_ary[i]);
		}
	}
	return p_ary;
};
RakUtil.getValue = function(x_field) {
	if (x_field.options) {
		return x_field.options[x_field.selectedIndex].value;
	}
	if (x_field.length) {
		var p_ret = null;
		for (var i = 0; i < x_field.length; i++) {
			if (x_field[i].checked) {
				if (p_ret != null) {
					p_ret += ',';
				} else {
					p_ret = '';
				}
				p_ret += x_field[i].value;
			}
		}
		return p_ret;
 	}
	if (x_field.type == 'checkbox') {
		if (x_field.checked) {
			return x_field.value;
		} else {
			return null;
		}
	}
	return x_field.value;
};
RakUtil.em2px = function() {
	if (typeof(this.g_em2px) == 'undefined') {
		var p_elem = document.createElement('div');
		p_elem.innerHTML = '<br>';
		p_elem.style.margin = 0;
		p_elem.style.padding = 0;
		p_elem.style.width = '1px';
		p_elem.style.height = '1em';
		p_elem.style.visibility = 'hidden';
		document.body.appendChild(p_elem);
		this.g_em2px = p_elem.clientHeight;
	}
	return this.g_em2px;
};
RakUtil.ex2px = function() {
	if (typeof(this.g_ex2px) == 'undefined') {
		var p_elem = document.createElement('div');
		p_elem.innerHTML = '<br>';
		p_elem.style.margin = 0;
		p_elem.style.padding = 0;
		p_elem.style.width = '1px';
		p_elem.style.height = '1ex';
		p_elem.style.visibility = 'hidden';
		document.body.appendChild(p_elem);
		this.g_ex2px = p_elem.clientHeight;
	}
	return this.g_ex2px;
};
var RakArrayUtil = {};
RakArrayUtil.toArray = function() {
	var p_array = new Array();
	var p_length = arguments.length;
	for (var i=0; i<p_length; i++) {
		p_array.push(arguments[i]);
	}
	return p_array;
};
RakArrayUtil.add = function(x_array, x_index, x_obj) {
	if (x_index < x_array.length) {
		var p_length = x_array.length + 1;
		for (var i = x_index + 1; i < p_length; i++) {
			x_array[i] = x_array[i - 1];
		}
	}
	x_array[x_index] = x_obj;
};
RakArrayUtil.remove = function(x_array, x_index) {
	var p_length = x_array.length;
	var p_ret = x_array[x_index];
	for (var i = x_index + 1; i < p_length; i++) {
		x_array[i-1] = x_array[i];
	}
	x_array.length --;
	return p_ret;
};
RakArrayUtil.list2Array = RakUtil.list2Array;
RakArrayUtil.contains = function(x_array, x_value) {
	if (!x_array || !x_array.length) {
		return false;
	}
	for (var i = 0; i < x_array.length; i++) {
		if (x_array[i] == x_value) {
			return true;
		}
	}
	return false;
};
var RakEventUtil = {};
RakEventUtil.getEvent = function(x_ev) {
	return x_ev ? x_ev : window.event;
};
RakEventUtil.getPageX = function(x_ev) {
	switch (RakAgent.g_browser) {
	case RakAgent.IE:
		if (document.documentElement && document.documentElement.scrollLeft) {
			return document.documentElement.scrollLeft + event.clientX;
		} else {
			return document.body.scrollLeft + event.clientX;
		}
	case RakAgent.NN:
		return window.scrollX + x_ev.clientX;
	default:
		return (document.documentElement ? window.pageXOffset : 0) + x_ev.clientX;
	}
};
RakEventUtil.getPageY = function(x_ev) {
	switch (RakAgent.g_browser) {
	case RakAgent.IE:
		if (document.documentElement && document.documentElement.scrollTop) {
			return document.documentElement.scrollTop + event.clientY;
		} else {
			return document.body.scrollTop + event.clientY;
		}
	case RakAgent.NN:
		return window.scrollY + x_ev.clientY;
	default:
		return (document.documentElement ? window.pageYOffset : 0) + x_ev.clientY;
	}
};
RakEventUtil.getPageX2 = function(x_ev) {
	if (RakAgent.g_browser == RakAgent.IE) {
		var p_pos = event.offsetX;
		var p_elem = event.srcElement;
		while (p_elem) {
			p_pos += p_elem.offsetLeft;
			p_elem = p_elem.offsetParent;
		}
		return p_pos;
	}
	return RakEventUtil.getPageX(x_ev);
};
RakEventUtil.getPageY2 = function(x_ev) {
	if (RakAgent.g_browser == RakAgent.IE) {
		var p_pos = event.offsetY;
		var p_elem = event.srcElement;
		while (p_elem) {
			p_pos += p_elem.offsetTop;
			p_elem = p_elem.offsetParent;
		}
		return p_pos;
	}
	return RakEventUtil.getPageY(x_ev);
};
RakEventUtil.getPosition = function(x_ev) {
	if (!RakEventUtil.getEvent(x_ev)) {
		return null;
	}
	return new RakPoint(this.getPageX(x_ev), this.getPageY(x_ev));
};
RakEventUtil.getClientX = function(x_ev) {
	if (RakAgent.g_browser == RakAgent.IE) {
		return event.clientX;
	}
	return x_ev.clientX;
};
RakEventUtil.getClientY = function(x_ev) {
	if (RakAgent.g_browser == RakAgent.IE) {
		return event.clientY;
	}
	return x_ev.clientY;
};
RakEventUtil.getSrcElement = function(x_ev) {
	x_ev = RakEventUtil.getEvent(x_ev);
	if (window.addEventListener) {
		return x_ev.target;
	} else {
		return x_ev.srcElement;
	}
};
RakEventUtil.BUTTON_NONE = 0;
RakEventUtil.BUTTON_LEFT = 1;
RakEventUtil.BUTTON_RIGHT = 2;
RakEventUtil.BUTTON_CENTER = 4;
RakEventUtil.getButton = function(x_ev) {
	var p_ret = RakEventUtil.BUTTON_NONE;
	if (RakAgent.g_browser == RakAgent.IE && RakAgent.g_brwsver < 11) {
		p_ret = event.button;
	} else if (RakAgent.g_browser == RakAgent.NN
				|| (RakAgent.g_browser == RakAgent.IE && RakAgent.g_brwsver >= 11)) {
		switch (x_ev.which) {
			case 1:
				p_ret = RakEventUtil.BUTTON_LEFT;
				break;
			case 2:
				p_ret = RakEventUtil.BUTTON_CENTER;
				break;
			case 3:
				p_ret = RakEventUtil.BUTTON_RIGHT;
				break;
			default:
				p_ret = RakEventUtil.BUTTON_NONE;
		}
	} else {
		p_ret = RakEventUtil.BUTTON_NONE;
	}
	return p_ret;
};
RakEventUtil.cancel = function(x_ev) {
	return false;
};
RakEventUtil.cancelBubble = function(x_ev) {
	if (window.addEventListener && RakAgent.g_browser != RakAgent.IE) {
		x_ev.stopPropagation();
	} else {
		window.event.cancelBubble = true;
	}
};
RakEventUtil.cancelBubble2 = function(x_ev) {
	if (window.addEventListener && RakAgent.g_browser != RakAgent.IE) {
		x_ev.stopPropagation();
	} else {
		window.event.cancelBubble = true;
		window.event.returnValue = false;
	}
	if (x_ev && typeof(x_ev.preventDefault) != 'undefined') {
		x_ev.preventDefault();
	}
};
var RakElementUtil = {};
RakElementUtil.getElement = function(x_id) {
	if (typeof x_id == 'string') {
		return document.getElementById(x_id);
	}
	return x_id;
};
RakElementUtil.getURLParam = function(x_url, x_name, x_delim) {
	if (typeof x_url == 'undefined') return null;
	if (typeof x_delim == 'undefined') x_delim = '&';
	var p_idx = x_url.indexOf('?');
	if (p_idx >= 0) x_url = x_url.substring(p_idx + 1);
	x_name += '=';
	p_idx = 0;
	while ((p_idx = x_url.indexOf(x_name, p_idx)) >= 0) {
		if (p_idx == 0 || x_url.charAt(p_idx-1) == x_delim) {
			var p_idx2 = x_url.indexOf(x_delim, p_idx + x_name.length);
			return (p_idx2<0 ? x_url.substring(p_idx + x_name.length)
							: x_url.substring(p_idx + x_name.length, p_idx2));
		}
		p_idx += x_name.length;
	}
	return null;
};
RakElementUtil.adjustSize = function(x_id) {
	var p_elem = RakElementUtil.getElement(x_id);
	var p_style = p_elem.style;
	switch(RakAgent.g_browser) {
	case RakAgent.NN:
		p_style.width = p_elem.offsetWidth + 'px';
		p_style.height = p_elem.offsetHeight + 'px';
		break;
	default:
		p_style.pixelWidth = p_elem.offsetWidth + 'px';
		p_style.pixelHeight = p_elem.offsetHeight + 'px';
		break;
	}
};
RakElementUtil.CONF_CoordConfinedScroll = false;
RakElementUtil.getX = function(x_id) {
	var p_confined;
	if (typeof(arguments[1]) == 'boolean') {
		p_confined = arguments[1];
	} else {
		p_confined = RakElementUtil.CONF_CoordConfinedScroll;
	}
	var p_elem = RakElementUtil.getElement(x_id);
	var p_ret = 0;
	if (p_confined) {
		while (p_elem) {
			if (p_elem.style.position == 'relative') {
				break;
			}
			p_ret += p_elem.offsetLeft;
			p_elem = p_elem.offsetParent;
		}
	} else {
		while (p_elem) {
			p_ret += p_elem.offsetLeft;
			p_elem = p_elem.offsetParent;
		}
	}
	return p_ret;
};
RakElementUtil.getY = function(x_id) {
	var p_confined;
	if (typeof(arguments[1]) == 'boolean') {
		p_confined = arguments[1];
	} else {
		p_confined = RakElementUtil.CONF_CoordConfinedScroll;
	}
	var p_elem = RakElementUtil.getElement(x_id);
	var p_ret = 0;
	if (p_confined) {
		while (p_elem) {
			if (p_elem.style.position == 'relative') {
				break;
			}
			p_ret += p_elem.offsetTop;
			p_elem = p_elem.offsetParent;
		}
	} else {
		while (p_elem) {
			p_ret += p_elem.offsetTop;
			p_elem = p_elem.offsetParent;
		}
	}
	return p_ret;
};
RakElementUtil.getWidth = function(x_id) {
	return RakElementUtil.getElement(x_id).offsetWidth;
};
RakElementUtil.getHeight = function(x_id) {
	return RakElementUtil.getElement(x_id).offsetHeight;
};
RakElementUtil.getStyleWidth = function(x_id) {
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem) {
		return p_elem.style.width;
	}
	return null;
};
RakElementUtil.getStyleHeight = function(x_id) {
		var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem) {
		return p_elem.style.height;
	}
	return null;
};
RakElementUtil.getPosition = function(x_id) {
	return new RakPoint(this.getX(x_id), this.getY(x_id));
};
RakElementUtil.getBoundRect = function(x_id) {
	var p_elem = RakElementUtil.getElement(x_id);
	if (!p_elem) {
		return null;
	}
	return new RakRect(this.getX(p_elem), this.getY(p_elem),
						this.getWidth(p_elem), this.getHeight(p_elem));
};
RakElementUtil.addEventListener = function(x_id, x_type, x_function, x_capture) {
	if (!x_function) {
		return;
	}
	if (typeof(x_capture) != 'boolean') {
		x_capture = false;
	}
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem.addEventListener) {
		p_elem.addEventListener(x_type, x_function, x_capture);
	} else if (p_elem.attachEvent) {
		SeiAddEventListener(p_elem, x_type, x_function);
	} else {
		p_elem['on' + x_type] = x_function;
	}
};
RakElementUtil.removeEventListener = function(x_id, x_type, x_function, x_capture) {
	if (typeof(x_capture) != 'boolean') {
		x_capture = false;
	}
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem.removeEventListener) {
		p_elem.removeEventListener(x_type, x_function, x_capture);
	} else if (p_elem.detachEvent) {
		SeiRemoveEventListener(p_elem, x_type, x_function);
	} else {
		p_elem['on' + x_type] = null;
	}
};
RakElementUtil.addStyleClass = function(x_id, x_styleClass) {
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem.className == '') {
		p_elem.className = x_styleClass;
	} else {
		var p_class = p_elem.className.split(' ');
		for (var i=0; i<p_class.length; i++) {
			if (p_class[i] == x_styleClass) {
				return;
			}
		}
		p_class.push(x_styleClass);
		p_elem.className = p_class.join(' ');
	}
};
RakElementUtil.removeStyleClass = function(x_id, x_styleClass) {
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem.className == '') {
		return;
	}
	var p_class = p_elem.className.split(' ');
	for (var i=0; i<p_class.length; i++) {
		if (p_class[i] == x_styleClass) {
			p_class[i] = p_class[p_class.length - 1];
			p_class.length --;
			i --;
		}
	}
	p_elem.className = p_class.join(' ');
};
RakElementUtil.deselectText = function(x_elem) {
	if(RakAgent.g_browser != RakAgent.IE) {
		RakElementUtil.addEventListener(x_elem, 'mousedown', RakWindowUtil.g_cancelFunc, false);
		RakElementUtil.addEventListener(x_elem, 'mousemove', RakWindowUtil.g_cancelFunc, false);
	} else {
		if (RakAgent.g_brwsver >= 9.0) {
			RakElementUtil.addEventListener(x_elem, 'selectstart', RakWindowUtil.g_cancelFunc, false);
		} else {
			RakElementUtil.addEventListener(x_elem, 'selectstart', RakWindowUtil.g_cancelFunc2);
		}		
	}
};
RakElementUtil.selectText = function(x_elem) {
	if(RakAgent.g_browser != RakAgent.IE) {
		RakElementUtil.removeEventListener(x_elem, 'mousedown', RakWindowUtil.g_cancelFunc, false);
		RakElementUtil.removeEventListener(x_elem, 'mousemove', RakWindowUtil.g_cancelFunc, false);
	} else {
		if (RakAgent.g_brwsver >= 9.0) {
			RakElementUtil.removeEventListener(x_elem, 'selectstart', RakWindowUtil.g_cancelFunc, false);
		} else {
			RakElementUtil.removeEventListener(x_elem, 'selectstart', RakWindowUtil.g_cancelFunc2);
		}		
	}
};
RakElementUtil.addRemoveStyleClass = function(x_id, x_styleClass) {
	var p_elem = RakElementUtil.getElement(x_id);
	var p_del = false;
	if (p_elem.className == '') {
		p_elem.className = x_styleClass;
	} else {
		var p_class = p_elem.className.split(' ');
		for (var i=0; i<p_class.length; i++) {
			if (p_class[i] == x_styleClass) {
				p_class[i] = p_class[p_class.length - 1];
				p_class.length --;
				i --;
				p_del = true;
			}
		}
		if(!p_del) {
			p_class.push(x_styleClass);
		}
		p_elem.className = p_class.join(' ');
	}
	return p_del;
};
RakElementUtil.checkStyleClass = function(x_id, x_styleClass) {
	var p_elem = RakElementUtil.getElement(x_id);
	if (p_elem.className == '') {
		return false;
	} else {
		var p_class = p_elem.className.split(' ');
		for (var i=0; i<p_class.length; i++) {
			if (p_class[i] == x_styleClass) {
				return true;
			}
		}
	}
	return false;
};
var RakWindowUtil = {};
RakWindowUtil.getInnerWidth = function() {
	if (RakAgent.g_browser == RakAgent.IE) {
		if (document.documentElement && document.documentElement.clientWidth) {
			return document.documentElement.clientWidth;
		} else {
			return document.body.clientWidth;
		}
	} else {
		return window.innerWidth;
	}
};
RakWindowUtil.getInnerHeight = function() {
	if (RakAgent.g_browser == RakAgent.IE) {
		if (document.documentElement && document.documentElement.clientHeight) {
			return document.documentElement.clientHeight;
		} else {
			return document.body.clientHeight;
		}
	} else {
		return window.innerHeight;
	}
};
RakWindowUtil.getScrollX = function() {
	switch (RakAgent.g_browser) {
	case RakAgent.IE:
		if (document.documentElement && document.documentElement.scrollLeft) {
			return document.documentElement.scrollLeft;
		} else {
			return document.body.scrollLeft;
		}
	case RakAgent.NN:
		return window.scrollX;
	default:
		return (document.documentElement ? window.pageXOffset : 0);
	}
};
RakWindowUtil.getScrollY = function() {
	switch (RakAgent.g_browser) {
	case RakAgent.IE:
		if (document.documentElement && document.documentElement.scrollTop) {
			return document.documentElement.scrollTop;
		} else {
			return document.body.scrollTop;
		}
	case RakAgent.NN:
		return window.scrollY;
	default:
		return (document.documentElement ? window.pageYOffset : 0);
	}
};
RakWindowUtil.g_waitCursor = 'wait';
RakWindowUtil.g_cancelEvents = [
	'keydown',
	'keypress',
	'contextmenu',
	'mousedown',
	'click',
	'dblclick'
];
RakWindowUtil.g_cancelFunc = function(x_ev) {
	if (x_ev.preventDefault) {
		x_ev.preventDefault();
	} else {
		x_ev.returnValue = false;
	}
	return false;
};
RakWindowUtil.g_cancelFunc2 = function(x_ev) {
	return false;
};
RakWindowUtil.wait = function(x_elem) {
	if (this.g_useLock && !this.g_lock) {
		this.lock();
		return;
	}
	if (x_elem) {
		x_elem = RakElementUtil.getElement(x_elem);
		if (!x_elem) {
			x_elem = document.body;
		}
	} else {
		x_elem = document.body;
	}
	if (!this.g_waitList) {
		this.g_waitList = new Array();
	}
	for (var i = 0; i < this.g_waitList.length; i++) {
		if (x_elem == this.g_waitList[i].g_elem || x_elem.id == this.g_waitList[i].g_elem.id) {
			return;
		}
	}
	var p_obj = new Object();
	p_obj.g_elem = x_elem;
	p_obj.g_cursor = x_elem.style.cursor;
	x_elem.style.cursor = this.g_waitCursor;
	this.g_waitList.push(p_obj);
	for (var i = 0; i < this.g_cancelEvents.length; i++) {
		RakElementUtil.addEventListener(x_elem, this.g_cancelEvents[i], this.g_cancelFunc, false);
	}
};
RakWindowUtil.notify = function(x_elem) {
	if (this.g_lock) {
		this.unlock();
	}
	if (x_elem) {
		x_elem = RakElementUtil.getElement(x_elem);
		if (!x_elem) {
			x_elem = document.body;
		}
	} else {
		x_elem = document.body;
	}
	if (!this.g_waitList) {
		return;
	}
	var p_obj;
	var p_ary = new Array();
	for (var i = 0; i < this.g_waitList.length; i++) {
		if (x_elem == this.g_waitList[i].g_elem || x_elem.id == this.g_waitList[i].g_elem.id) {
			p_obj = this.g_waitList[i];
		} else {
			p_ary.push(this.g_waitList[i]);
		}
	}
	if (!p_obj) {
		return;
	}
	if (p_obj.g_cursor) {
		x_elem.style.cursor = p_obj.g_cursor;
	} else {
		x_elem.style.cursor = '';
	}
	for (var i = 0; i < this.g_cancelEvents.length; i++) {
		RakElementUtil.removeEventListener(x_elem, this.g_cancelEvents[i], this.g_cancelFunc, false);
	}
	this.g_waitList = p_ary;
};
RakWindowUtil.notifyAll = function(x_elem) {
	if (this.g_lock) {
		this.unlock();
	}
	if (!this.g_waitList) {
		return;
	}
	for (var i = this.g_waitList.length - 1; i >= 0; i--) {
		this.notify(this.g_waitList[i].g_elem);
	}
};
RakWindowUtil.g_useLock;
RakWindowUtil.g_lock;
RakWindowUtil.g_lockZindex;
RakWindowUtil.g_disabeld;
RakWindowUtil.lock = function() {
	if (this.g_lock) {
		return;
	}
	var p_elem = document.createElement('div');
	p_elem.style.background = '#cccccc';
	p_elem.style.position = 'absolute';
	p_elem.style.width = '100%';
	p_elem.style.height = (screen.availHeight - 32) + 'px';
	p_elem.style.top = '0px';
	p_elem.style.left = '0px';
	try {
		if (typeof(RakWindowUtil.g_lockZindex) == 'number') {
			p_elem.style.zIndex = RakWindowUtil.g_lockZindex;
		} else {
			p_elem.style.zIndex = 1000;
		}
	} catch (e) {
	}
	if (SeiSetOpacity) {
		SeiSetOpacity(p_elem, 0.1);
	} else {
		if (RakAgent.g_browser == RakAgent.IE) {
			p_elem.style.filter = 'Alpha(opacity=10)';
		} else {
			p_elem.style.opacity = 0.1;
			p_elem.style.MozOpacity = 0.1;
		}
	}
	p_elem.style.position = 'fixed';
	p_elem.style.cursor = 'wait';
	document.body.appendChild(p_elem);
	this.g_lock = p_elem;
	this.g_disabeld = new Array();
	var p_form = document.forms[0];
	var p_elements;
	if (p_form && p_form.elements) {
		p_elements = p_form.elements;
	}
	for (var i = 0; i < p_elements.length; i++) {
		var p_elem = p_elements[i];
		if (!p_elem.disabled) {
		    p_elem.disabled = true;
		    this.g_disabeld.push(p_elem);
		}
	}
	var p_links = document.links;
	for (var i = 0; i < p_links.length; i++) {
		var p_link = p_links[i];
		if (!p_link.disabled) {
			p_link.disabled = true;
		    this.g_disabeld.push(p_link);
		}
	}
};
RakWindowUtil.unlock = function() {
	if (this.g_lock) {
		var p_elem = this.g_lock;
		document.body.removeChild(p_elem);
		this.g_lock = null;
	}
	if (this.g_disabeld) {
		var p_disabled = this.g_disabeld;
		for (var i = 0; i < p_disabled.length; i++) {
			var p_elem = p_disabled[i];
			if (p_elem.disabled) {
				p_elem.disabled = false;
			}
		}
		this.g_disabeld = null;
	}
};
var RakPoint = RakClass.define();
RakPoint.prototype.init = function(x_x, x_y) {
	this.g_x = x_x;
	this.g_y = x_y;
};
RakPoint.prototype.toString = function() {
	return '(' + this.g_x + ',' + this.g_y + ')';
};
var RakRect = RakClass.define();
RakRect.prototype.init = function(x_x, x_y, x_width, x_height) {
	this.g_x = (x_x ? x_x : 0);
	this.g_y = (x_y ? x_y : 0);
	this.g_width = (x_width ? x_width : 0);
	this.g_height = (x_height ? x_height : 0);
};
RakRect.prototype.hitTest = function(x_x, x_y) {
	if (x_x instanceof RakPoint) {
		return this.hitTest(x_x.g_x, x_x.g_y);
	}
	return this.g_x <= x_x && x_x <= this.g_x + this.g_width
		&& this.g_y <= x_y && x_y <= this.g_y + this.g_height;
};
RakRect.prototype.toString = function() {
	return 'Rect[' + this.g_x + ',' + this.g_y + ',' + this.g_width + ',' + this.g_height + ']';
};
var RakDebug = {};
RakDebug.setup = function(x_div) {
	this.g_msgDiv = RakElementUtil.getElement(x_div);
};
RakDebug.print = function(x_msg, x_append) {
	x_msg = '' + x_msg;
	if (!RakDebug.g_msgDiv) {
		alert(x_msg);
	} else {
		if (typeof(x_append) != 'boolean') {
			x_append = true;
		}
		x_msg = RakUtil.escape(x_msg);
		x_msg.replace(/\n/g, '<br>');
		if (x_append) {
			this.g_msgDiv.innerHTML += x_msg + '<br>';
		} else {
			this.g_msgDiv.innerHTML = x_msg + '<br>';
		}
	}
};
RakDebug.printStackTrace = function(x_append) {
	var p_func = function(x_func) {
		var p_str = x_func.toString();
		var p_idx = p_str.indexOf('function');
		if (p_idx > -1) {
			return p_str.substring(0, p_str.indexOf(')') + 1);
		} else {
			return 'unknown';
		}
	};
	var p_caller = arguments.callee.caller;
	var p_msg0 = p_func(p_caller) + ' :\n';
	var p_msg = '';
	while (p_caller) {
		p_caller = p_caller.caller;
		if (p_caller) {
			p_msg = 'at ' + p_func(p_caller) + '\n' + p_msg;
		} else {
			break;
		}
	}
	RakDebug.print(p_msg0 + p_msg, x_append);
};
RakDebug.printError = function(x_err, x_append) {
	if (x_err) {
		var p_msg = '';
		for (var i in x_err) {
			p_msg += i + ' : ' + x_err[i] + '\n';
		}
		RakDebug.print(p_msg, x_append);
	}
};
RakDebug.clear = function() {
	if (this.g_msgDiv) {
		this.g_msgDiv.innerHTML = '';
	}
};
if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(x_value, x_idx) {
		if (x_idx === undefined) {
			x_idx = 0;
		}
		if (x_idx < 0) {
			x_idx += this.length;
		}
		if (x_idx < 0) {
			x_idx = 0;
		}
		var p_idx = x_idx;
		while (p_idx < this.length) {
			if (this[p_idx] === x_value) {
				return p_idx;
			}
			p_idx++;
		}
		return -1;
	};
}
