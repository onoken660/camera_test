var RakDrawImageTool = RakClass.define();
RakDrawImageTool.prototype.init = function(x_draw) {
    this.className = 'RakDrawImageTool';
    this.flag = false;
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws = x_draw.g_brws;
}
RakDrawImageTool.prototype.getPosition = function(x_event) {
    var p_point = (x_event.changedTouches ? x_event.changedTouches[0] : x_event);
    var p_pos;
    if (x_event.changedTouches) {
      p_pos = x_event.changedTouches[0];
    } else {
      var p_poswk = RakEventUtil.getPosition(x_event);
      p_pos = {pageX: p_poswk.g_x, pageY: p_poswk.g_y};
    }
    var p_y = p_pos.pageY;
    var p_x = p_pos.pageX;
    if (this.g_brws == 'Android') {
      var p_pos2 = RakElementUtil.getPosition(p_point.target.id);
      if (p_pos2) {
        p_x -= p_pos2.g_x;
        p_y -= p_pos2.g_y;
      }
    } else {
      var p_scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
      var p_scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      p_y -= p_scrollTop;
      p_x -= p_scrollLeft;
      var p_pos2 = p_point.target.getBoundingClientRect();
      if (p_pos2) {
        p_x -= p_pos2.left;
        p_y -= p_pos2.top;
      }
    }
    return {x: p_x, y: p_y};
}
RakDrawImageTool.prototype.distance = function(x_p1, x_p2) {
    return Math.sqrt(Math.pow(x_p1.x - x_p2.x, 2) + Math.pow(x_p1.y - x_p2.y, 2));
}
RakDrawImageTool.prototype.notTap = function(x_fun){
    return function(){ 
      this.g_fun = x_fun;
      this.g_flag=true; 
    };
}
RakDrawImageTool.prototype.endTap = function(x_fun){
    return function(e) {
      if (this.g_flag) {
        this.g_flag = false;
        return;
      }
      x_fun(e);
      this.g_flag = false;
    };
}
RakDrawImageTool.prototype.addTapListener = function(x_element, x_fun) {
    x_element.addEventListener('touchmove', this.notTap(x_fun), false);
    x_element.addEventListener('touchend', this.endTap(x_fun), false);
}
RakDrawImageTool.prototype.removeTapListener = function(x_element, x_fun) {
    x_element.removeEventListener('touchmove', this.notTap(x_fun), false);
    x_element.removeEventListener('touchend', this.endTap(x_fun), false);
}
RakDrawImageTool.prototype.clickByQuery = function(x_query) {
    var p_evt = document.createEvent('MouseEvents');
    p_evt.initEvent('click', false, true);
    var p_clicked = document.querySelector(x_query);
    p_clicked.dispatchEvent(p_evt);
    p_evt.initEvent('touchend', false, true);
    p_clicked.dispatchEvent(p_evt);
}
var RakDrawImageMode = RakClass.define();
RakDrawImageMode.prototype.init = function(x_draw) {
    this.className       = 'RakDrawImageMode';
    this.g_toolId    = null;
    this.g_listeners = null;
    this.g_draw      = x_draw;
    this.g_canvas    = x_draw.g_canvas;
    this.g_tools     = x_draw.g_tools;
    this.g_orgimg    = x_draw.g_orgimg;
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws      = x_draw.g_brws;
}
RakDrawImageMode.prototype.addMode = function(x_listeners) {
    for (var p_evt in x_listeners) {
      if (x_listeners.hasOwnProperty(p_evt)) {
        this.g_canvas.addEventListener(p_evt, x_listeners[p_evt], false);
      }
    }
}
RakDrawImageMode.prototype.removeMode = function(x_listeners) {
    for (var p_evt in x_listeners) {
      if (x_listeners.hasOwnProperty(p_evt)) {
        this.g_canvas.removeEventListener(p_evt, x_listeners[p_evt], false);
      }
    }
}
RakDrawImageMode.prototype.changeButtonColor = function(x_id) {
    var p_target = document.querySelector('#' + x_id).parentNode;
    if (p_target.className === 'selected') {
      return;
    }
    for (var i=0; i < this.g_tools.length; i++) {
      this.g_tools[i].parentNode.className = 'deselected';
    }
    p_target.className = 'selected';
}
RakDrawImageMode.prototype.changeMode = function(x_id, x_listeners) {
    if (this.g_canvas.offsetWidth < this.g_orgimg.offsetWidth || this.g_canvas.offsetHeight < this.g_orgimg.offsetHeight) {
        this.g_canvas.width  = this.g_orgimg.offsetWidth;
        this.g_canvas.height = this.g_orgimg.offsetHeight;
    }
    this.changeButtonColor(x_id);
    this.removeMode(this.g_listeners);
    this.addMode(x_listeners);
    this.g_toolId = x_id;
    this.g_listeners = x_listeners;
}
RakDrawImageMode.prototype.execMode = function(x_id, x_draw) {
    this.changeButtonColor(x_id);
    this.removeMode(this.g_listeners);
    x_draw.g_modes[x_id](x_draw);
}
RakDrawImageMode.prototype.restoreMode = function(x_mode) {
    x_mode.changeMode(x_mode.g_toolId, x_mode.g_listeners);
    return x_mode.g_toolId;
}
var RakDrawImageSurface = RakClass.define();
RakDrawImageSurface.prototype.init = function(x_draw) {
    this.className = 'RakDrawImageSurface';
    this.g_mode = x_draw.g_mode;
    this.g_savedImg = null;
    this.g_draw     = x_draw;
    this.g_canvas   = x_draw.g_canvas;
    this.g_ctx      = x_draw.g_ctx;
    this.g_isChanged = false;
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws     = x_draw.g_brws;
}
RakDrawImageSurface.prototype.changed = function() {
    this.g_isChanged = true; 
    if (typeof(this.g_draw.g_changeFunc) == 'function') {
        this.g_draw.g_changeFunc();
    } 
}
RakDrawImageSurface.prototype.rawRestore = function(x_surface, x_ctx) {
    if (!x_surface.g_savedImg) {
      return;
    }
    x_ctx.drawImage(this.g_savedImg, 0, 0);
}
RakDrawImageSurface.prototype.restore = function(x_surface, x_canvas, x_ctx) {
    return function() {
      x_ctx.clearRect(0, 0, x_canvas.offsetWidth, x_canvas.offsetHeight);
      x_surface.rawRestore(x_surface, x_ctx);
      x_surface.g_mode.restoreMode(x_surface.g_mode);
    };
}
RakDrawImageSurface.prototype.save = function(x_draw) {
    var p_canvas = x_draw.g_canvas;
    var p_ctx = p_canvas.getContext('2d');
    var p_data = p_canvas.toDataURL('image/png');
    if (!x_draw.g_surface.g_savedImg) {
        x_draw.g_surface.g_savedImg = new Image();
    }
    x_draw.g_surface.g_savedImg.src = p_data;
    x_draw.g_surface.g_isChanged = true;
    x_draw.g_util.clickByQuery('#' + x_draw.g_field + '_pen_tool' + x_draw.getIdxText());
    setTimeout(function(){x_draw.setToolImages(null, x_draw)}, 100);
}
RakDrawImageSurface.prototype.save2 = function(x_draw) {
    if (!x_draw.g_surface.g_savedImg2) {
      x_draw.g_surface.g_savedImg2 = x_draw.g_orgimg.cloneNode(true);
    }
    var p_canvas = x_draw.g_canvas;
    var p_ctx = p_canvas.getContext('2d');
    var p_data = p_canvas.toDataURL('image/png');
    x_draw.g_surface.g_savedImg2.src = p_data;
}
RakDrawImageSurface.prototype.save3 = function(x_draw) {
    var p_ext = x_draw.g_ext;
    var p_canvas = x_draw.g_canvas;
    var p_ctx = p_canvas.getContext('2d');
    p_ctx.drawImage(x_draw.g_orgimg,0,0);
    p_ctx.drawImage(x_draw.g_surface.g_savedImg2,0,0);
    if (p_ext == 'jpg') p_ext = 'jpeg';
    p_data = p_canvas.toDataURL('image/' + p_ext);
    x_draw.g_base64.value = p_data;
    x_draw.g_surface.g_savedImg = null;
    x_draw.g_surface.g_savedImg2 = null;
}
RakDrawImageSurface.prototype.clear = function(x_draw) {
    var p_canvas = x_draw.g_canvas;
    var p_ctx = p_canvas.getContext('2d');
    p_ctx.clearRect(0, 0, p_canvas.offsetWidth, p_canvas.offsetHeight);
    x_draw.g_surface.g_isChanged = false;
    x_draw.g_surface.g_savedImg = null;
    x_draw.g_surface.save2(x_draw);
    x_draw.g_util.clickByQuery('#' + x_draw.g_field + '_pen_tool' + x_draw.getIdxText());
    setTimeout(function(){x_draw.setToolImages(null, x_draw)}, 100);
}
RakDrawImageSurface.prototype.reset = function(x_draw) {
    var p_canvas = x_draw.g_canvas;
    var p_ctx = p_canvas.getContext('2d');
    p_ctx.clearRect(0, 0, p_canvas.offsetWidth, p_canvas.offsetHeight);
    x_draw.g_mode.restoreMode(x_draw.g_mode);
    if (x_draw.g_surface.g_isChanged) { 
      x_draw.g_surface.rawRestore(x_draw.g_surface, p_ctx); 
    } else {
      x_draw.g_surface.g_savedImg = null;
    }
    x_draw.g_surface.save2(x_draw);
    x_draw.g_util.clickByQuery('#' + x_draw.g_field + '_pen_tool' + x_draw.getIdxText());
    setTimeout(function(){x_draw.setToolImages(null, x_draw)}, 100);
}
var RakDrawImagePen = RakClass.define();
RakDrawImagePen.prototype.init = function(x_draw) {
    this.className = 'RakDrawImagePen';
    this.g_draw     = x_draw;
    this.g_canvas   = x_draw.g_canvas;
    this.g_ctx      = null;
    this.g_surface  = x_draw.g_surface;
    this.g_util     = x_draw.g_util;
    this.g_colorbtn = x_draw.g_colorbtn;
    this.g_radius   = 4;              
    this.g_oldPos;                    
    this.g_color    = 'rgb(0,0,0)';   
    this.g_orgimg   = x_draw.g_orgimg;
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws     = x_draw.g_brws;
}
RakDrawImagePen.prototype.drawStart = function(x_event) {
    if (x_event.touches && x_event.touches.length > 1) {
        return;
    }
    if (this.g_canvas.offsetWidth < this.g_orgimg.offsetWidth || this.g_canvas.offsetHeight < this.g_orgimg.offsetHeight) {
        this.g_canvas.width  = this.g_orgimg.offsetWidth;
        this.g_canvas.height = this.g_orgimg.offsetHeight;
    }
    this.g_surface.changed();
    var p_pos = this.g_util.getPosition(x_event);
    this.g_ctx = this.g_canvas.getContext('2d');
    this.g_ctx.strokeStyle = this.g_color;
    this.g_ctx.fillStyle = this.g_color;
    this.g_ctx.lineWidth = this.g_radius * 2;
    this.g_ctx.lineCap = 'round';
    this.g_ctx.lineJoin = 'round';
    this.drawPoint(p_pos);
    this.g_oldPos = p_pos;
}
RakDrawImagePen.prototype.drawFinish = function(x_event) {
    this.g_surface.save2(this.g_draw);
    this.g_ctx = null; 
}
RakDrawImagePen.prototype.draw = function(x_event) {
    if (x_event.touches && x_event.touches.length > 1) {
        return;
    }
    if (this.g_smartphone2) {
      x_event.preventDefault();
    }
    if (!this.g_ctx) {
      return;
    }
    var p_pos = this.g_util.getPosition(x_event);
    if (this.g_util.distance(this.g_oldPos, p_pos) < this.g_radius) {
      return;
    }
    this.drawLine(p_pos);
    this.g_oldPos = p_pos;
}
RakDrawImagePen.prototype.drawLine = function(x_pos) {
    this.g_ctx.beginPath();
    this.g_ctx.moveTo(this.g_oldPos.x, this.g_oldPos.y);
    this.g_ctx.lineTo(x_pos.x, x_pos.y);
    this.g_ctx.stroke();
}
RakDrawImagePen.prototype.drawPoint = function(x_pos) {
    this.g_ctx.beginPath();
    this.g_ctx.arc(x_pos.x, x_pos.y, this.g_radius, 0, Math.PI*2, false);
    this.g_ctx.fill();
}
RakDrawImagePen.prototype.changeColor = function(x_color) {
    this.g_color = x_color;
    var p_colorButton = this.g_colorbtn;
    p_colorButton.style.borderStyle = "solid";
    p_colorButton.style.borderColor = x_color;
    p_colorButton.style.color = (x_color=='black' ? 'white' : 'black');
}
RakDrawImagePen.prototype.eventListeners = function(x_this) {
	if (x_this.g_smartphone2) {
	    return {
	      'touchstart': function (event){x_this.drawStart(event)},
	      'touchmove' : function (event){x_this.draw(event)},
	      'touchend'  : function (event){x_this.drawFinish(event)}
	    };
	} else {
	    return {
	      'mousedown' : function (event){x_this.drawStart(event)},
	      'mouseup'   : function (event){x_this.drawFinish(event)},
	      'mousemove' : function (event){x_this.draw(event)},
	      'touchstart': function (event){x_this.drawStart(event)},
	      'touchmove' : function (event){x_this.draw(event)},
	      'touchend'  : function (event){x_this.drawFinish(event)}
	    };
	}
}
var RakDrawImageText = RakClass.define();
RakDrawImageText.prototype.init = function(x_draw) {
    this.className = 'RakDrawImageText';
    this.g_draw     = x_draw;
    this.g_surface  = x_draw.g_surface;
    this.g_form     = x_draw.g_form;      
    this.g_input    = x_draw.g_input;     
    this.g_canvas   = x_draw.g_canvas;    
    this.g_pos      = x_draw.g_pos;       
    this.g_fontSize = x_draw.g_fontSize;  
    this.g_color    = x_draw.g_color;     
    this.g_tools    = x_draw.g_tools;
    this.g_util     = x_draw.g_util;
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws     = x_draw.g_brws;
    var p_this = this;
    this.g_input.addEventListener('keypress', function(event){p_this.press(event)}, false);
    var p_tools = this.g_tools;
    for (var i=0; i < p_tools.length; i++) {
      if (p_tools[i].id && p_tools[i].id.indexOf('text_tool')>=0) {
        continue;
      }
      p_tools[i].removeEventListener('click', function(event){p_this.otherToolClick(event,x_draw)}, false);
      this.g_util.removeTapListener(p_tools[i], function(event){p_this.otherToolClick(event,x_draw)});
      p_tools[i].addEventListener('click', function(event){p_this.otherToolClick(event,x_draw)}, false);
      this.g_util.addTapListener(p_tools[i], function(event){p_this.otherToolClick(event,x_draw)});
    }
}
RakDrawImageText.prototype.moveForm = function() {
    this.g_form.style.left = (this.g_canvas.offsetLeft + this.g_pos.x) + 'px';
    this.g_form.style.top  = (this.g_canvas.offsetTop  + this.g_pos.y - this.g_form.offsetHeight) + 'px';
}
RakDrawImageText.prototype.press = function(x_event) {
    this.g_surface.changed();
    if (x_event.keyCode !== 13) {
      return;
    }
    x_event.preventDefault();
    this.save(x_event);
}
RakDrawImageText.prototype.down = function(x_event) {
    this.g_surface.changed();
    if (x_event.keyCode !== 13) {
      return;
    }
    x_event.preventDefault();
    this.save(x_event);
}
RakDrawImageText.prototype.otherToolClick = function(x_event, x_draw) {
    this.g_input.blur();
    x_draw.g_form.style.visibility = 'hidden';
    var p_tools = x_draw.g_tools;
    for (var i=0; i < p_tools.length; i++) {
      p_tools[i].removeEventListener('click', arguments.callee, false);
      x_draw.g_util.removeTapListener(p_tools[i], arguments.callee);
    }
}
RakDrawImageText.prototype.click = function(x_event) {
    if (this.g_form.style.visibility == 'visible' && this.g_input.value != '') {
      x_event.preventDefault();
      this.save(x_event);
    }
    this.g_canvas = (x_event.changedTouches ? x_event.changedTouches[0].target : x_event.target);
    this.g_pos = this.g_util.getPosition(x_event);
    var p_shorter = (this.g_canvas.offsetWidth < this.g_canvas.offsetHeight ? this.g_canvas.offsetWidth : this.g_canvas.offsetHeight);
    this.g_fontSize = 30 + 'px';
    this.g_input.value = '';
    this.g_input.style.fontSize = 20 + 'px';
    this.g_input.style.width = (this.g_canvas.offsetWidth - this.g_pos.x) + 'px';
    this.moveForm();
    this.g_form.style.visibility = 'visible';
    var p_this = this;
    this.g_input.focus();
}
RakDrawImageText.prototype.save = function(x_event) {
      var p_canvas      = this.g_canvas;
      var p_ctx         = p_canvas.getContext('2d');
      p_ctx.font        = this.g_fontSize + " 'Times New Roman'";
      p_ctx.strokeStyle = this.g_color;
      p_ctx.fillStyle   = this.g_color;
      p_ctx.fillText(this.g_input.value, this.g_pos.x, this.g_pos.y);
      this.g_input.blur()
      this.g_form.style.visibility = 'hidden';
      this.g_input.removeEventListener('down', arguments.callee, false);
      this.g_surface.save2(this.g_draw);
}
RakDrawImageText.prototype.changeColor = function(x_color) {
    this.g_color = x_color;
}
RakDrawImageText.prototype.eventListeners = function(x_this) {
    return {
      'click': function(event){x_this.click(event)},
      'touchend': function(event){x_this.click(event)}
    };
}
var RakDrawImageEraser = RakClass.define();
RakDrawImageEraser.prototype.init = function(x_draw) {
    this.className = 'RakDrawImageEraser';
    this.g_draw     = x_draw;
    this.g_surface  = x_draw.g_surface;
    this.g_form     = x_draw.g_form;      
    this.g_input    = x_draw.g_input;     
    this.g_canvas   = x_draw.g_canvas;    
    this.g_pos      = x_draw.g_pos;       
    this.g_fontSize = x_draw.g_fontSize;  
    this.g_color    = x_draw.g_color;     
    this.g_tools    = x_draw.g_tools;
    this.g_util     = x_draw.g_util;
    this.g_radius   = 4;                  
    this.g_oldPos;                        
    this.g_ctx      = null;               
    this.g_orgimg   = x_draw.g_orgimg
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws = x_draw.g_brws;
}
RakDrawImageEraser.prototype.eraseStart = function(x_event) {
    if (x_event.touches && x_event.touches.length > 1) {
        return;
    }
    if (this.g_canvas.offsetWidth < this.g_orgimg.offsetWidth || this.g_canvas.offsetHeight < this.g_orgimg.offsetHeight) {
        this.g_canvas.width  = this.g_orgimg.offsetWidth;
        this.g_canvas.height = this.g_orgimg.offsetHeight;
    }
    this.g_surface.changed();
    var pos = this.g_util.getPosition(x_event);
    this.g_ctx = x_event.target.getContext('2d');
    this.erasePoint(pos);
    this.g_oldPos = pos;
}
RakDrawImageEraser.prototype.eraseFinish = function() {
    this.g_surface.save2(this.g_draw);
    this.g_ctx = null;
}
RakDrawImageEraser.prototype.erase = function(x_event) {
    if (x_event.touches && x_event.touches.length > 1) {
        return;
    }
    if (this.g_smartphone2) {
      x_event.preventDefault();
    }
    if (!this.g_ctx) {
      return;
    }
    var pos = this.g_util.getPosition(x_event);
    this.eraseLine(pos);
    this.g_oldPos = pos;
}
RakDrawImageEraser.prototype.eraseLine = function(x_pos) {
    for (var i=1; i<=7; i++) {
      this.erasePoint({
        x: (x_pos.x-this.g_oldPos.x)*i/8 + this.g_oldPos.x,
        y: (x_pos.y-this.g_oldPos.y)*i/8 + this.g_oldPos.y});
    }
    this.erasePoint(x_pos);
}
RakDrawImageEraser.prototype.erasePoint = function(x_pos) {
    this.g_ctx.clearRect(x_pos.x-this.g_radius, x_pos.y-this.g_radius/2, this.g_radius*2, this.g_radius);
    this.g_ctx.clearRect(x_pos.x-this.g_radius/2, x_pos.y-this.g_radius, this.g_radius, this.g_radius*2);
    this.g_ctx.clearRect(x_pos.x-this.g_radius+1, x_pos.y-this.g_radius+1, this.g_radius*2-2, this.g_radius*2-2);
}
RakDrawImageEraser.prototype.eventListeners = function(x_this) {
	if (x_this.g_smartphone2) {
		return {
			'touchstart': function(event){x_this.eraseStart(event)},
			'touchmove' : function(event){x_this.erase(event)},
			'touchend'  : function(event){x_this.eraseFinish(event)}
		};
	} else {
		return {
			'mousedown' : function(event){x_this.eraseStart(event)},
			'mouseup'   : function(event){x_this.eraseFinish(event)},
			'mousemove' : function(event){x_this.erase(event)},
			'touchstart': function(event){x_this.eraseStart(event)},
			'touchmove' : function(event){x_this.erase(event)},
			'touchend'  : function(event){x_this.eraseFinish(event)}
		};
	}
}
var RakDrawImageColor = RakClass.define();
RakDrawImageColor.prototype.init = function(x_draw) {
    this.className = 'RakDrawImageColor';
    this.g_draw     = x_draw;
    this.g_surface  = x_draw.g_surface;
    this.g_form     = x_draw.g_form;      
    this.g_input    = x_draw.g_input;     
    this.g_canvas   = x_draw.g_canvas;    
    this.g_pos      = x_draw.g_pos;       
    this.g_fontSize = x_draw.g_fontSize;  
    this.g_color    = x_draw.g_color;     
    this.g_colors   = x_draw.g_colors;   
    this.g_tools    = x_draw.g_tools;
    this.g_util     = x_draw.g_util;
    this.g_radius   = 4;                  
    this.g_oldPos;                        
    this.g_ctx;                           
    this.g_colorwin      = null;          
    this.g_closeByColorButton = false;    
    this.g_smartphone = x_draw.g_smartphone;
    this.g_smartphone2 = x_draw.g_smartphone2;
    this.g_brws = x_draw.g_brws;
}
RakDrawImageColor.prototype.changeColor = function(x_color) {
    this.g_draw.g_pen_tool.changeColor(x_color);
    this.g_draw.g_text_tool.changeColor(x_color);
}
RakDrawImageColor.prototype.selectColor = function(x_event, x_draw) {
    x_event.preventDefault();
    var p_selectcolor = '';
    if (x_event.target && x_event.target.style && x_event.target.style.backgroundColor) {
        p_selectcolor = x_event.target.style.backgroundColor;
    } else {
        return;
    }
    x_draw.g_color_tool.changeColor(p_selectcolor);
    x_draw.g_colorwin.style.visibility = 'hidden';
    var p_draw = x_draw;
    if (this.g_brws == 'Android') {
        setTimeout(function(){
            p_draw.g_mode.restoreMode(p_draw.g_mode);
        }, 500);
    } else {
        p_draw.g_mode.restoreMode(p_draw.g_mode);
    }
    return false;
}
RakDrawImageColor.prototype.closeWindow = function(x_event, x_draw) {
    if (x_draw.g_colorwin.style.visibility == 'hidden' ||
        x_event && (x_event.target.id && x_event.target.id.indexOf('color_tool') >= 0 || x_event.target.parentNode.id == x_draw.g_colorwin.id)) {
        return;
    }
    x_draw.g_colorwin.style.visibility = 'hidden';
    x_draw.setToolImages(null, x_draw);
    var p_draw = x_draw;
    if (this.g_brws == 'Android') {
        setTimeout(function(){
            p_draw.g_mode.restoreMode(p_draw.g_mode);
        }, 500);
    } else {
       p_draw.g_mode.restoreMode(p_draw.g_mode);
    }
}
RakDrawImageColor.prototype.openWindow = function(x_draw) {
    if (!x_draw.g_color_tool.g_colorwin) {
      document.addEventListener('click', function(event){x_draw.g_color_tool.closeWindow(event, x_draw)}, true);
      document.addEventListener('touchend', function(event){x_draw.g_color_tool.closeWindow(event, x_draw)}, true);
      var p_colors = x_draw.g_colors;
      for (var i=0; i<p_colors.length; i++) {
        p_colors[i].onclick = function(event){x_draw.g_color_tool.selectColor(event, x_draw)};
        x_draw.g_util.addTapListener(p_colors[i], function(event){x_draw.g_color_tool.selectColor(event, x_draw)});
      }
    }
    x_draw.g_color_tool.g_colorwin =  x_draw.g_color_tool.g_colorwin ||  x_draw.g_colorwin;
    x_draw.g_color_tool.g_colorwin.style.visibility = 'visible';
    return false;
}
var RakDrawImage = RakClass.define();
RakDrawImage.prototype.init = function(x_field, x_ext, x_no, x_smartphone, x_brws, x_func, x_smartphone2) {
    var p_this      = this;
    p_this.className    = 'RakDrawImage';
    p_this.g_no     = x_no;
    p_this.g_ext    = x_ext;
    var p_idx       = this.getIdxText();
    var p_toolbar   = document.getElementById(x_field + '_toolbar'    + p_idx);
    var p_drawarea  = document.getElementById(x_field + '_draw'       + p_idx);
    var p_canvas    = document.getElementById(x_field + '_canvas'     + p_idx);
    var p_base64    = document.getElementById(x_field + '_base64'     + p_idx);
    var p_colortool = document.getElementById(x_field + '_color_tool' + p_idx);
    var p_colorwin  = document.getElementById(x_field + '_divFC'      + p_idx);
    var p_radiuswin = document.getElementById(x_field + '_divFR'      + p_idx);
    var p_inputdiv  = document.getElementById(x_field + '_inputdiv'   + p_idx);
    var p_input     = document.getElementById(x_field + '_input'      + p_idx);
    var p_span      = document.getElementById(x_field + '_image'      + p_idx);
    var p_table     = document.getElementById(x_field + '_table'      + p_idx);
    if (!p_toolbar || !p_drawarea || !p_canvas || !p_base64 || !p_span) {
        if (p_table) {
            p_table.parentNode.removeChild(p_table);
        }
        return;
    }
    var p_imgs =  p_span.getElementsByTagName('img');
    if (p_imgs.length == 0) {
        if (p_table) {
            p_table.parentNode.removeChild(p_table);
        }
        return;
    }
    var p_img =  p_imgs[0];
    var p_draw_w = p_drawarea.offsetWidth;
    var p_draw_h = p_drawarea.offsetHeight;
    p_toolbar.style.visibility = 'visible';
    p_img.style.zIndex = 0;
    p_drawarea.appendChild(p_img);
    p_canvas.style.zIndex = 20;
    p_canvas.style.position = 'absolute';
    p_canvas.style.left = p_img.style.left;
    p_canvas.style.top = p_img.style.top;
    p_inputdiv.style.visibility = 'hidden';
    p_inputdiv.style.zIndex = 30;
    p_colorwin.style.visibility = 'hidden';
    p_colorwin.style.zIndex = 30;
    var p_ctx = p_canvas.getContext('2d');
    var p_tools = new Array();
    if (p_toolbar.childNodes) {
        for (var i=0; i < p_toolbar.childNodes.length; i++) {
            if (p_toolbar.childNodes[i].className && p_toolbar.childNodes[i].className == 'RakDrawImageTool') {
                p_tools.push(p_toolbar.childNodes[i]);
            }
        }
    }
    var p_coleors = new Array();
    var p_colortable = p_colorwin.getElementsByTagName('tbody')[0];
    for (var i=0; i < p_colortable.rows.length; i++) {
        for (var j=0; j < p_colortable.rows[i].cells.length; j++) {
            p_coleors.push(p_colortable.rows[i].cells[j]);
        }
    }
    if (p_radiuswin) {
        for (var i=4; i<10; i++) {
            var p_rdcanvas = document.createElement('canvas');
            p_rdcanvas.width  = 15;
            p_rdcanvas.height = 15;
            var p_rdctx = p_rdcanvas.getContext('2d');
            p_rdctx.beginPath();
            p_rdctx.arc(7, 7, i, 0, Math.PI*2, true);
            p_rdctx.fill()
            p_radiuswin.appendChild(p_rdcanvas);
        }
    }
    p_this.g_field       = x_field;
    p_this.g_canvas      = p_canvas;
    p_this.g_tools       = p_tools; 
    p_this.g_ctx         = p_ctx;
    p_this.g_colorbtn    = p_colortool;
    p_this.g_form        = p_inputdiv;
    p_this.g_input       = p_input; 
    p_this.g_base64      = p_base64;
    p_this.g_fontSize    = null;
    p_this.g_color       = null;
    p_this.g_pos         = null;
    p_this.g_pos         = null;
    p_this.g_colorwin    = p_colorwin;
    p_this.g_colors      = p_coleors;
    p_this.g_radiuswin   = p_radiuswin
    p_this.g_orgimg      = p_img;
    p_this.g_smartphone  = x_smartphone;
    p_this.g_smartphone2  = x_smartphone2;
    p_this.g_brws        = x_brws;
    p_this.g_util        = new RakDrawImageTool(p_this);
    p_this.g_mode        = new RakDrawImageMode(p_this);
    p_this.g_surface     = new RakDrawImageSurface(p_this);
    p_this.g_pen_tool    = new RakDrawImagePen(p_this);
    p_this.g_text_tool   = new RakDrawImageText(p_this);
    p_this.g_eraser_tool = new RakDrawImageEraser(p_this);
    p_this.g_color_tool  = new RakDrawImageColor(p_this);
    p_this.g_surface.g_dImg  = new Image();
    p_this.g_surface.g_savedImg2 = p_img.cloneNode(true);
    p_this.g_changeFunc= x_func;
    this.g_modes = {};
    this.g_modes[x_field + '_pen_tool'    + p_idx] = p_this.g_pen_tool.eventListeners(p_this.g_pen_tool);
    this.g_modes[x_field + '_text_tool'   + p_idx] = p_this.g_text_tool.eventListeners(p_this.g_text_tool);
    this.g_modes[x_field + '_eraser_tool' + p_idx] = p_this.g_eraser_tool.eventListeners(p_this.g_eraser_tool);
    this.g_modes[x_field + '_color_tool'  + p_idx] = p_this.g_color_tool.openWindow;
    this.g_modes[x_field + '_save_tool'   + p_idx] = p_this.g_surface.save;
    this.g_modes[x_field + '_clear_tool'  + p_idx] = p_this.g_surface.clear;
    this.g_modes[x_field + '_reset_tool'  + p_idx] = p_this.g_surface.reset;
    for(var i=0; i < p_this.g_tools.length; i++) {
      p_this.g_tools[i].addEventListener('click', function(event){p_this.setEachTool(event, p_this)}, false);
      p_this.g_util.addTapListener(p_this.g_tools[i], function(event){p_this.setEachTool(event, p_this)});
      p_this.g_tools[i].addEventListener('mouseover', function(event){p_this.mouseoverToolImage(event, p_this)}, false);
      p_this.g_tools[i].addEventListener('mouseout', function(event){p_this.mouseoutToolImage(event, p_this)}, false);
    }
    SeiAddEventListener(window, 'load', function(){p_this.g_util.clickByQuery('#' + p_this.g_field + '_pen_tool' + p_idx);});
    this.g_color_tool.changeColor('black');
    var p_onsubmit = function(){p_this.g_surface.save3(p_this);};
    for(var i=0; i < document.forms.length; i++){
        SeiAddEventListener(document.forms[i], 'submit', p_onsubmit);
    }
    setTimeout(function(){
        p_canvas.width = p_img.offsetWidth;
        p_canvas.height = p_img.offsetHeight;
    },100);
}
RakDrawImage.prototype.setEachTool = function(x_event, x_draw) {
    x_event.preventDefault();
    var p_id = x_event.target.id;
    var p_idx  = this.getIdxText();
    switch(p_id) {
      case x_draw.g_field + '_pen_tool'    + p_idx:
      case x_draw.g_field + '_text_tool'   + p_idx:
      case x_draw.g_field + '_eraser_tool' + p_idx:
        x_draw.g_mode.changeMode(p_id, x_draw.g_modes[p_id]);
        break;
      case x_draw.g_field + '_color_tool'  + p_idx:
      case x_draw.g_field + '_save_tool'   + p_idx:
      case x_draw.g_field + '_clear_tool'  + p_idx:
      case x_draw.g_field + '_reset_tool'  + p_idx:
        x_draw.g_mode.execMode(p_id, x_draw);
        break;
    }
    this.setToolImages(p_id, x_draw);
}
RakDrawImage.prototype.setToolImages = function(x_id, x_draw) {
    this.resetToolImages(x_draw);
    if (x_id) {
        this.setActiveToolImage(document.getElementById(x_id));
    }
    if (this.g_mode.g_toolId) {
        this.setActiveToolImage(document.getElementById(this.g_mode.g_toolId));
    }
}
RakDrawImage.prototype.resetToolImages = function(x_draw) {
    for (var i=0; i < x_draw.g_tools.length; i++) {
        this.setToolImage(x_draw.g_tools[i]);
    }
}
RakDrawImage.prototype.mouseoverToolImage = function(x_event, x_draw) {
    var p_img = x_event.target;
    this.setActiveToolImage(p_img);
}
RakDrawImage.prototype.mouseoutToolImage = function(x_event, x_draw) {
    var p_img = x_event.target;
    var p_id = x_event.target.id;
    var p_idx = this.getIdxText();
    if (!p_img || !x_draw || this.g_mode.g_toolId == p_id) {
        return;
    }
    if (x_draw.g_field + '_color_tool'  + x_draw.getIdxText() == p_img.id && x_draw.g_colorwin.style.visibility != 'hidden') {
        return;
    }
    this.setToolImage(p_img);
}
RakDrawImage.prototype.setActiveToolImage = function(x_img) {
    var p_img = x_img;
    var p_path = p_img.src;
    if (p_img && p_path.indexOf("_md") < 0) {
        p_img.src = p_path.substring(0, p_path.lastIndexOf(".", p_path.length)) + "_md" + p_path.substring(p_path.lastIndexOf(".", p_path.length) , p_path.length);
    }
}
RakDrawImage.prototype.setToolImage = function(x_img) {
    var p_img = x_img;
    var p_path = p_img.src;
    if (p_img && p_path.indexOf("_md") >= 0) {
        p_img.src = p_path.substring(0, p_path.lastIndexOf("_md", p_path.length)) + p_path.substring(p_path.lastIndexOf(".", p_path.length) , p_path.length);
    }
}
RakDrawImage.prototype.getIdxText = function() {
    var p_idx = '';
    if (this.g_no >= 0) {
        p_idx = '_' + this.g_no;
    }
    return p_idx;
}
