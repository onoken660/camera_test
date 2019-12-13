function SeiFormName(x_form) {
  if (!x_form.name.type) return x_form.name;
  var p_attr = x_form.attributes;
  var p_attrlen = p_attr.length;
  for (var i=0; i < p_attrlen; i++) {
    if (p_attr[i].nodeName == 'name') return p_attr[i].nodeValue
  }
  return x_form.pg.value;
}
function SeiFocusField( x_element ) {
  if( x_element == null || x_element.type == 'hidden' || x_element.className == 'SeiNoEntry'
      || x_element.className == 'SeiArrayCheck' || x_element.className == 'PmsColorField' ) {
    return false;
  }
  if( x_element.tabIndex == -1 ) {
    return false;
  }
  if (typeof(x_element.tagName) == 'string' && x_element.tagName == 'DIV') {
    x_element.focus();
    return true;
  }
  if( x_element.className == 'SeiRadio2' ) {
    SeiFocusIfVisible( x_element );
    return true;
  }
  if( x_element.type == 'checkbox' || x_element.type == 'radio' ) {
    var p_element = x_element.form.elements[x_element.name];
    if (p_element) {
      x_element = p_element;
    }
  }
  if( x_element.options ) {
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element );
  } else if( x_element.length ) {
    var p_pos;
    for( p_pos=0; p_pos<x_element.length; p_pos++ ) {
      if( x_element[p_pos].checked ) {
        if( event ) event.cancelBubble = true;
        return SeiFocusIfVisible( x_element[p_pos] );
      }
    }
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element[0] );
  } else if( x_element.name.indexOf( 'chkall_' ) == 0 ) {
    return false;
  } else {
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element );
  }
}
function SeiFocusField2(x_element, x_current) {
  if (!SeiFocusFieldSub2(x_element)) {
    if (!x_element) {
      if (x_current) return SeiFocusNext(x_current, false);
      return false;
    }
    var p_elem = x_element.form.elements, p_length = p_elem.length;
    for (var i=0; i<p_length; i++) {
      if (p_elem[i].type == 'hidden' || p_elem[i].type == 'submit' || p_elem[i].type == 'reset') continue;
      if (p_elem[i].readOnly || p_elem[i].className == 'SeiNoEntry') continue;
      if (SeiFocusFieldSub2(p_elem[i])) return true
    }
    return false;
  }
  return true;
}
function SeiFocusFieldSub2(x_element) {
  if( x_element == null || x_element.type == 'hidden' ) {
    return false;
  }
  if( x_element.className == 'SeiRadio2' ) {
    SeiFocusIfVisible( x_element );
    return true;
  }
  if( x_element.type == 'checkbox' || x_element.type == 'radio' ) {
    x_element = x_element.form.elements[x_element.name];
  }
  if( x_element.options ) {
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element );
  } else if( x_element.length ) {
    var p_pos;
    for( p_pos=0; p_pos<x_element.length; p_pos++ ) {
      if( x_element[p_pos].checked ) {
        if( event ) event.cancelBubble = true;
        return SeiFocusIfVisible( x_element[p_pos] );
      }
    }
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element[0] );
  } else if( x_element.name.indexOf( 'chkall_' ) == 0 ) {
    return false;
  } else {
    if( event ) event.cancelBubble = true;
    return SeiFocusIfVisible( x_element );
  }
}
function SeiFocusIfVisible(x_element, x_ajustScroll) {
  if (x_element && x_element.name && x_element.parentNode && x_element.parentNode.className == 'SeiTimeSelItem') {
    var p_idx = x_element.name.indexOf('pms_mi_');
    if (p_idx >= 0) {
      var p_hh = document.all(x_element.name.substring(0, p_idx) + 'pms_hh_' + x_element.name.substring(p_idx+7));
      x_element = p_hh;
    }
  }
  var p_element = x_element;
  while( p_element ) {
    if (!p_element.style || p_element.style.visibility == 'hidden' || p_element.style.display == 'none' || p_element.disabled || p_element.type == 'hidden') {
      return false;
    }
    p_element = p_element.parentElement;
  }
if (typeof document.activeElement != 'unknown' && document.activeElement && document.activeElement.tagName == 'SELECT') document.activeElement.blur();
  x_element.focus();
  if (typeof(x_ajustScroll) != 'undefined' && x_ajustScroll) {
    SeiAdjustErrorDispScroll(x_element, 50);
  }
  return true;
}
function SeiFocusNext(x_element, x_formnext) {
  if (!x_element || !x_element.form) return false;
  if (typeof(document.activeElement) != 'unknown' && document.activeElement) {
    if (document.selection) {
      var p_active = document.activeElement;
      if (p_active && p_active.type && (p_active.type == 'text' || p_active.type == 'textarea' || p_active.type == 'file')) {
        var p_selection = document.selection.createRange();
        p_selection.setEndPoint('EndToStart', p_selection);
        p_selection.select();
      }
    } else if (window.getSelection()) {
      if (x_element && typeof(x_element.selectionEnd) != 'undefined' && typeof(x_element.selectionEnd) != 'unknown') {
        x_element.selectionEnd = x_element.selectionStart;
      }
    }
  }
  var i, j, p_func;
  var p_elements = x_element.form.elements;
  var p_length = p_elements.length;
  if (x_element.tabIndex && x_element.tabIndex > 0) {
    var p_nextTabIndex = -1, p_nextTabElem = null;
    for (i=0; i<p_length; i++) {
      if (p_elements[i] != x_element) continue;
      for (j=i+1; j<p_length; j++) {
        if (p_elements[j].name != x_element.name && p_elements[j].tabIndex == x_element.tabIndex) {
          p_nextTabElem = p_elements[j];
          break;
        }
      }
      if (p_nextTabElem) break;
      for (j=0; j<p_length; j++) {
        if (j == i || !p_elements[j].tabIndex || p_elements[j].tabIndex <= x_element.tabIndex) continue;
        if (p_nextTabIndex < 0 || p_elements[j].tabIndex < p_nextTabIndex) {
          p_nextTabElem = p_elements[j]; p_nextTabIndex = p_elements[j].tabIndex;
        }
      }
      if (p_nextTabElem) break;
      for (j=i+1; j<p_length; j++) {
        if (p_elements[j].tabIndex > 0 || p_elements[j].type == 'hidden') continue;
        if (SeiFocusField(p_elements[j])) return true;
      }
      break;
    }
    if (p_nextTabElem && SeiFocusField(p_nextTabElem)) return true;
  }
  p_func = 'sei' + SeiFormName(x_element.form) + 'FocusNext';
  x_formnext = (typeof x_formnext == 'undefined' || x_formnext);
  if (x_formnext && eval('typeof(' + p_func + ')') == 'function') {
    var p_fieldname = x_element.name;
    if( x_element.type == 'radio' || x_element.type == 'checkbox' ) {
      if( x_element.form.elements[x_element.name].length > 0 ) {
        p_fieldname += '[0]';
      }
    }
    if( eval( p_func + '(\'' + p_fieldname + '\')' ) ) {
      return true;
    }
  }
  for( i=0; i<p_length; i++ ) {
    if( p_elements[i] != x_element ) {
      continue;
    }
    for( j=i+1; j<p_elements.length; j++ ) {
      if (p_elements[j].name == x_element.name) {
        continue;
      }
      var p_parent = p_elements[j].parentNode;
      if (p_parent && p_parent.className == 'SeiTimeSelItem' && x_element.name) {
        var p_idx = p_elements[j].name.indexOf('pms_mi_');
        if (p_idx >= 0) {
          continue;
        }
      }
      if (!SeiFocusField(p_elements[j])) {
        continue;
      }
    if (!x_formnext) return p_elements[j].name != x_element.name;
      return false;
    }
    for( j=0; j<i; j++ ) {
      if( p_elements[j].name == x_element.name || !SeiFocusField( p_elements[j] ) ) {
        continue;
      }
    if (!x_formnext) return p_elements[j].name != x_element.name;
      return false;
    }
  }
  return true;
}
function SeiFocusNextLineTop(x_field, x_arrayno, x_prenm, x_vertical) {
  if (!x_field || !x_field.form) return false;
  if (typeof(document.activeElement) != 'unknown' && document.activeElement) {
    if (document.selection) {
      var p_active = document.activeElement;
      if (p_active && p_active.type && (p_active.type == 'text' || p_active.type == 'textarea' || p_active.type == 'file')) {
        var p_selection = document.selection.createRange();
        p_selection.setEndPoint('EndToStart', p_selection);
        p_selection.select();
      }
    } else if (window.getSelection()) {
      if (x_field && typeof(x_field.selectionEnd) != 'undefined' && typeof(x_field.selectionEnd) != 'unknown') {
       x_field.selectionEnd = x_field.selectionStart;
      }
    }
  }
  var p_elements = x_field.form.elements, p_len = x_field.form.elements.length, p_pos = -1;
  if (x_vertical) {
    var p_suffix = '_' + (x_arrayno+1);
    for (var i=0; i<p_len; i++) {
      if (SeiStringStartsWith(p_elements[i].name, x_prenm) && SeiStringEndsWith(p_elements[i].name, p_suffix)) {
        if (SeiFocusField(p_elements[i])) return true;
      }
    }
  }
  for (var i=0; i<p_len; i++) {
    if (p_elements[i] == x_field) { p_pos = i; break; }
  }
  var p_suffix = '_' + x_arrayno;
  for (var i=p_pos+1; i<p_len; i++) {
    if (!SeiStringEndsWith(p_elements[i].name, p_suffix)) {
      if (SeiFocusField(p_elements[i])) return true;
    }
  }
  return false;
}
function SeiFocusPrevLineTop(x_field, x_arrayno, x_prenm, x_vertical) {
  if (!x_field || !x_field.form) return false;
  if (typeof(document.activeElement) != 'unknown' && document.activeElement) {
    if (document.selection) {
      var p_active = document.activeElement;
      if (p_active && p_active.type && (p_active.type == 'text' || p_active.type == 'textarea' || p_active.type == 'file')) {
        var p_selection = document.selection.createRange();
        p_selection.setEndPoint('EndToStart', p_selection);
        p_selection.select();
      }
    } else if (window.getSelection()) {
      if (x_field && typeof(x_field.selectionEnd) != 'undefined' && typeof(x_field.selectionEnd) != 'unknown') {
        x_field.selectionEnd = x_field.selectionStart;
      }
    }
  }
  var p_elements = x_field.form.elements, p_len = x_field.form.elements.length, p_pos = -1;
  if (x_arrayno > 0 && x_vertical) {
    var p_suffix = '_' + (x_arrayno-1);
    for (var i=0; i<p_len; i++) {
      if (SeiStringStartsWith(p_elements[i].name, x_prenm) && SeiStringEndsWith(p_elements[i].name, p_suffix)) {
        if (SeiFocusField(p_elements[i])) return true;
      }
    }
    return false;
  }
  for (var i=0; i<p_len; i++) {
    if (p_elements[i] == x_field) { p_pos = i; break; }
  }
  var p_suffix = '_' + x_arrayno;
  for (var i=p_pos-1; i>=0; i--) {
    if (!SeiStringEndsWith(p_elements[i].name, p_suffix)) { p_pos = i; break; }
  }
  if (x_arrayno == 0) {
    for (var i=p_pos-1; i>=0; i--) {
      if (SeiFocusField(p_elements[i])) return true;
    }
  } else {
    p_suffix = '_' + (x_arrayno-1);
    for (var i=p_pos; i>=0; i--) {
      if (i==0 || !SeiStringEndsWith(p_elements[i-1].name, p_suffix) || p_elements[i-1].className == 'SeiArrayCheck') {
        if (SeiFocusField(p_elements[i])) return true;
      }
    }
  }
  return false;
}
function SeiDisableField(x_element) {
  if (x_element) {
    x_element.onkeydown = function() {return false;}
    x_element.onblur = function() {return false;}
    x_element.onchange = function() {return false;}

    var p_img = document.getElementById(x_element.name + '-refbtn');
    if (p_img != null) p_img.parentNode.onclick = function() {return false;}
    p_img = document.getElementById(x_element.name + '-clearbtn');
    if (p_img != null) p_img.parentNode.onclick = function() {return false;}

  }
}

function SeiStringStartsWith(x_str, x_prefix) {
  if (x_str.length < x_prefix.length) return false;
  for (var i=0; i<x_prefix.length; i++) {
    if (x_str.charAt(i) != x_prefix.charAt(i)) return false;
  }
  return true;
}
function SeiStringEndsWith(x_str, x_suffix) {
  if (x_str.length < x_suffix.length) return false;
  var p_pos = x_str.length - x_suffix.length;
  for (var i=0; i<x_suffix.length; i++) {
    if (x_str.charAt(p_pos+i) != x_suffix.charAt(i)) return false;
  }
  return true;
}
function SeiRemoveDelim( x_str, x_delim ) {
  while( x_str.indexOf( x_delim ) >= 0 ) {
    x_str = x_str.replace( x_delim, '' );
  }
  return x_str;
}
function SeiFormatDelim( x_value, x_format, x_delim ) {
  if (!x_value) {
    return x_value;
  }
  var p_orgvalue = SeiRemoveDelim(x_value, x_delim);
  var i, j, p_value = '';
  for (i=0,j=0; i<x_format.length; i++) {
    if (j >= p_orgvalue.length) break;
    if (i != 0) p_value += x_delim;
    p_value += p_orgvalue.substring(j, j + x_format[i]);
    j += x_format[i];
  }
  return p_value + p_orgvalue.substring( j );
}
function SeiEscape(x_str) {
  if (!x_str) {
    return x_str;
  }
  var p_len = x_str.length, p_pos = 0, p_ret = null, p_ch = 0;
  for (var i=0; i<x_str.length; i++) {
    if (0x80 <= x_str.charCodeAt(i) && x_str.charCodeAt(i) < 0x100) {
      p_ch = '%u00' + x_str.charCodeAt(i).toString(16);
    } else switch (x_str.charAt(i)) {
      case '+': p_ch = '%2B'; break;
      case '?': p_ch = '%3F'; break;
    }
    if (p_ch == 0) continue;
    if (p_ret == null) {
      p_ret = escape(x_str.substring(0, i)) + p_ch;
    } else {
      p_ret = p_ret + escape(x_str.substring(p_pos, i)) + p_ch;
    }
    p_pos = i + 1;
    p_ch = 0;
  }
  if (p_ret != null) {
    p_ret = p_ret + escape(x_str.substring(p_pos));
  }
  return p_ret || escape(x_str);
}
function SeiGetValue( x_field ) {
  if (x_field == null) {
    return;
  }
  if (x_field.options) {
    if (x_field.selectedIndex < 0) return '';
    if (x_field.multiple) {
      var i, p_ret = '';
      for (i=0; i<x_field.options.length; i++) {
        if (x_field.options[i].selected) {
          if (p_ret != '') p_ret += ',';
          p_ret += x_field.options[i].value;
        }
      }
      return p_ret;
    } else {
      return x_field.options[x_field.selectedIndex].value;
    }
  }
  if (x_field.length) {
    var i, p_ret = '';
    for (i=0; i<x_field.length; i++) {
      if (x_field[i].checked) {
        if (p_ret != '') p_ret += ',';
        p_ret += x_field[i].value;
      }
    }
    return p_ret;
  }
  if (typeof x_field.type == 'string' && (x_field.type.toLowerCase() == 'checkbox' || x_field.type.toLowerCase() == 'radio')) {
    return x_field.checked ? x_field.value : '';
  }
  if (x_field.className == 'RakHtmlEditor') {
    var p_elem = x_field.ownerDocument.getElementById(x_field.name + '_edit_edit');
    if (p_elem && p_elem.tagName == 'DIV') {
      return p_elem.innerHTML;
    }
  }
  return x_field.value;
}
function SeiSetValueCB(x_field, x_value) {
  if (x_field == null) {
    return;
  }
  if (x_field.type == 'hidden') {
    x_field.value = x_value;
    return;
  }
  var p_values = x_value.split(',');
  if (x_field.length == 1) {
    x_field.checked = false;
    for (var j=0; j<p_values.length; j++) {
      if (x_field.value == p_values[j]) { x_field.checked = true; break; }
    }
    return;
  }
  if (x_field.length) {
    for (var i=0; i<x_field.length; i++) {
      x_field[i].checked = false;
      for (var j=0; j<p_values.length; j++) {
        if (x_field[i].value == p_values[j]) { x_field[i].checked = true; break; }
      }
    }
    return;
  }
  if ((x_field.type == 'checkbox' || x_field.type == 'radio') && x_field.value == x_value) {
    x_field.checked = true;
  } else {
    x_field.checked = false;
  }
}
function SeiSetValueSEL(x_field, x_value) {
  if (x_field == null) {
    return;
  }
  if (x_field.type == 'hidden') {
    x_field.value = x_value;
    return;
  }
  if (!x_field.options) {
    return SeiSetValueCB(x_field, x_value);
  }
  var p_values = x_value.split(',');
  if (x_field.multiple) {
    for (var i=0; i<x_field.options.length; i++) {
      x_field.options[i].selected = false;
      for (var j=0; j<p_values.length; j++) {
        if (x_field.options[i].value == p_values[j]) { x_field.options[i].selected = true; break; }
      }
    }
  } else {
    var p_selidx = -1;
    for (var i=0; i<x_field.options.length; i++) {
      for (var j=0; j<p_values.length; j++) {
        if (x_field.options[i].value == p_values[j]) { p_selidx = i; break; }
      }
    }
    x_field.selectedIndex = p_selidx;
  }
}
function SeiSetValueTA(x_field, x_value, x_prenm) {
  if (x_field == null) {
    return;
  }
  if (x_field.type != 'hidden') {
    return;
  }
  if (x_field.className != 'SeiTimeSel') {
    x_field.value = x_value;
    return;
  }
  var p_idx = -1;
  if (x_prenm && x_field.name) {
    p_idx = x_field.name.indexOf(x_prenm)
  }
  var p_document = x_field.ownerDocument;
  if (!p_document) {
    p_document = document;
  }
  var p_hh;
  var p_mi;
  if (p_idx >= 0) {
    var p_first = x_field.name.substring(0, p_idx + x_prenm.length);
    var p_last = x_field.name.substring(p_idx + x_prenm.length);
    p_hh = p_document.getElementsByName(p_first + 'pms_hh_' + p_last);
    p_mi = p_document.getElementsByName(p_first + 'pms_mi_' + p_last);
  } else {
    p_hh = p_document.getElementsByName('pms_hh_' + x_field.name);
    p_mi = p_document.getElementsByName('pms_mi_' + x_field.name);
  }
  if (p_hh && p_hh[0] && p_mi && p_mi[0]) {
    var p_val = null;
    if (!isNaN(SeiParseInt(x_value))) {
      var p_hhmaxlen = p_hh[0].options[p_hh[0].options.length-1].value.length;
      var p_mimaxlen = p_mi[0].options[p_mi[0].options.length-1].value.length;
      var p_hhval = SeiPadding(SeiParseInt(x_value / 3600), p_hhmaxlen, 0);
      var p_mival = SeiPadding(SeiParseInt(x_value % 3600 / 60), p_mimaxlen, 0);
      p_val = new Array(p_hhval, p_mival);
    } else {
      p_val = x_value.split(":");
    }
    if (p_val && p_val.length >= 2) {
      SeiSetValueSEL(p_hh[0], p_val[0]);
      SeiSetValueSEL(p_mi[0], p_val[1]);
    } else {
      p_hh[0].selectedIndex = 0;
      p_mi[0].selectedIndex = 0;
    }
    if (!isNaN(SeiParseInt(p_hh[0].options[p_hh[0].selectedIndex].value)) && !isNaN(SeiParseInt(p_mi[0].options[p_mi[0].selectedIndex].value))) {
      x_field.value = p_hh[0].options[p_hh[0].selectedIndex].value + ':' + p_mi[0].options[p_mi[0].selectedIndex].value;
    } else {
      x_field.value = '';
    }
  }
}
function SeiSetValueRT(x_field, x_value, x_prenm) {
  if (x_field == null) {
    return;
  }
  var p_elem = x_field.ownerDocument.getElementById(x_field.name + '_edit_edit');
  if (p_elem && p_elem.tagName == 'DIV') {
    p_elem.innerHTML = x_value;
  }
}
function SeiSetValue(x_field, x_value, x_prenm) {
  if (!x_field) return false;
  if (x_field.options || x_field.tagName && x_field.tagName.toUpperCase() == 'SELECT') {
    return SeiSetValueSEL(x_field, x_value);
  }
  if (x_field.length && x_field.length >= 2) {
    if (x_field[0].type == 'radio' || x_field[0].type == 'checkbox') {
      return SeiSetValueCB(x_field, x_value);
    }
  }
  if (x_field.type == 'radio' || x_field.type == 'checkbox') {
    return SeiSetValueCB(x_field, x_value);
  }
  if (x_field.className == 'SeiTimeSel') {
    return SeiSetValueTA(x_field, x_value, x_prenm)
  }
  if (x_field.className == 'RakHtmlEditor') {
    return SeiSetValueRT(x_field, x_value, x_prenm)
  }
  x_field.value = x_value;
  return true;
}
function SeiClearField( x_field ) {
  if( x_field == null ) {
    return false;
  }
  if( x_field.options ) {
    if (x_field.multiple) {
      var i;
      for( i=0; i<x_field.options.length; i++ ) {
        x_field.options[i].selected = false;
      }
    } else {
      x_field.selectedIndex = 0;
    }
    return true;
  }
  if( x_field.length ) {
    var i;
    for( i=0; i<x_field.length; i++ ) {
      x_field[i].checked = false;
    }
    return true;
  }
  if( x_field.type == 'checkbox' || x_field.type == 'radio' ) {
    x_field.checked = false;
    return true;
  }
  x_field.value = '';
  var p_placeholder = document.getElementById(x_field.name + '_placeholder');
  if (p_placeholder) {
    p_placeholder.style.display = '';
  }
}
function SeiClearField2(x_form, x_field, x_pre) {
  var p_arycount = 0;
  if (x_form[x_pre + 'arraycount']) {
    p_arycount = parseInt(x_form[x_pre + 'arraycount'].value);
  }
  for (var i=0; i < p_arycount; i++ ) {
    if (x_form[x_pre + x_field + '_' + i]) {
      SeiClearField(x_form[x_pre + x_field + '_' + i]);
    }
  }
}
function SeiExistValue(x_form, x_pre, x_field, x_isFormClear, x_isArray, x_arrayno) {;
  var p_isChange = new Array();
  if (x_isArray) {
    var p_pre = '';
    if (x_pre) {
      p_pre = x_pre;
    }
    if (x_isFormClear) {
      var p_arycount = 0;
      if (document[x_form][p_pre + 'arraycount']) {
        p_arycount = parseInt(document[x_form][p_pre + 'arraycount'].value);
      }
      for (var i = 0; i < p_arycount; i ++) {
        var p_element = document[x_form].elements[p_pre + x_field + '_' + i];
        if (SeiGetValue(p_element)) {
          p_isChange.push(p_element);
        }
      }
    } else {
      var p_element = document[x_form].elements[p_pre + x_field + '_' + x_arrayno];
      if (SeiGetValue(p_element)) {
        p_isChange.push(p_element);
      }
    }
  } else {
    var p_element = document[x_form].elements[x_field];
    if (SeiGetValue(p_element)) {
      p_isChange.push(p_element);
    }
  }
  return p_isChange;
}
function SeiCallOnChangeForClear(x_isChange) {
   if (SeiIsEmpty(x_isChange)) {
      return;
   }
   for (var i = 0; i < x_isChange.length; i ++) {
      if (!x_isChange[i]) {
         continue;
      }
      x_isChange[i].g_calledFromClear = true;
      if (!x_isChange[i].length) {
         if (x_isChange[i].type == 'radio' || x_isChange[i].type == 'checkbox') {
            if (typeof(x_isChange[i].onclick) == 'function') {
               x_isChange[i].onclick();
            }
         } else {
            if (typeof(x_isChange[i].onchange) == 'function') {
               x_isChange[i].onchange();
            }
         }
      } else if (x_isChange[i].length >= 1) {
         if (x_isChange[i][0].type == 'radio' || x_isChange[i][0].type == 'checkbox') {
            if (typeof(x_isChange[i][0].onclick) == 'function') {
               x_isChange[i][0].g_calledFromClear = true;
               x_isChange[i][0].onclick();
            }
         } else if (x_isChange[i].multiple) {
            if (typeof(x_isChange[i].onclick) == 'function') {
               x_isChange[i].onclick();
            }
         } else {
            if (typeof(x_isChange[i].onchange) == 'function') {
              x_isChange[i].onchange();
            }
         }
      }
      x_isChange[i].g_calledFromClear = false;
      if (x_isChange[i].length) {
         x_isChange[i][0].g_calledFromClear = false;
      }
   }
}
function SeiSaveStatusForClear(x_elements) {
   if (SeiIsEmpty(x_elements)) {
      return;
   }
   for (var i = 0; i < x_elements.length; i ++) {
      if (!x_elements[i]) {
         continue;
      }
      if (!x_elements[i].length) {
         if (x_elements[i].type == 'radio' && x_elements[i].className == 'SeiNoEntry') {
            SeiSaveRadioStatus(x_elements[i]);
         }
      } else if (x_elements[i].length >= 1) {
         if (x_elements[i][0].type == 'radio' && x_elements[i][0].className == 'SeiNoEntry') {
            SeiSaveRadioStatus(x_elements[i][0]);
         } else if (x_elements[i].tagName == 'SELECT' && x_elements[i].className == 'SeiNoEntry') {
            if (!x_elements[i].multiple) {
               SeiSaveSelectStatus(x_elements[i]);
            } else {
               SeiSaveSelectMltStatus(x_elements[i]);
            }
         }
      }
   }
}
function SeiTrim( x_value ) {
  if( !x_value || !x_value.length || x_value.length == 0 ) {
    return x_value;
  }
  var p_start = 0, p_end = x_value.length;
  while( p_start < p_end ) {
    if( x_value.charAt(p_start) != ' ' && x_value.charAt(p_start) != '　' ) {
      break;
    }
    p_start ++;
  }
  while( p_end > 0 ) {
    if( x_value.charAt(p_end-1) != ' ' && x_value.charAt(p_end-1) != '　' ) {
      break;
    }
    p_end --;
  }
  if( p_start >= p_end ) {
    return x_value;
  }
  return x_value.substring( p_start, p_end );
}
function SeiRemoveComma( x_value ) {
  if( !x_value || x_value == '' ) {
    return x_value;
  }
  var i, p_value = '' + x_value, p_value2 = '', p_dec_c = 0;
  for( i=0; i<p_value.length; i++ ) {
    var p_ch = p_value.charAt( i );
    if( p_ch == '+' || p_ch == '-' ) {
        if( i != 0 ) return x_value;
        continue;
    }
    if( p_ch != ' ' && p_ch != '　' && (p_ch < '0' || p_ch > '9') && (p_ch < '０' || p_ch > '９') && p_ch != ',' ) {
      if( p_ch == '.' && p_dec_c ++ == 0 ) {
        continue;
      }
      return x_value;
    }
  }
  var p_idx = -1, p_lastidx = -1;
  while( (p_idx = p_value.indexOf( ',', p_idx+1 )) >= 0 ) {
    p_value2 += p_value.substring( p_lastidx + 1, p_idx );
    p_lastidx = p_idx;
  }
  if( p_lastidx >= 0 ) {
     p_value = p_value2 + p_value.substring( p_lastidx + 1 );
  }
  return p_value;
}
function SeiMod( x_value1, x_value2 ) {
  if (!x_value1 || !x_value2) {
    return '';
  }
  return x_value1 % x_value2;
}
function SeiEditComma( x_value ) {
  if (typeof(x_value) == 'number') x_value = x_value.toString();
  if( !x_value ) return '';
  var i, p_value = SeiTrim(''+x_value), p_value2 = '', p_dec_c = 0;
  p_value = p_value.replace(/　/g, '');
  for( i=0; i<p_value.length; i++ ) {
    var p_ch = p_value.charAt( i );
    if( p_ch == '+' || p_ch == '-' ) {
        if( i != 0 ) return x_value;
        continue;
    }
    if( p_ch != ' ' && p_ch != '　' && (p_ch < '0' || p_ch > '9') && (p_ch < '０' || p_ch > '９') && p_ch != ',' ) {
      if( p_ch == '.' && p_dec_c ++ == 0 ) {
        continue;
      }
      return x_value;
    }
  }
  p_value = SeiTrimZero( p_value );
  var p_idx = -1, p_lastidx = -1;
  while( (p_idx = p_value.indexOf( ',', p_idx+1 )) >= 0 ) {
    p_value2 += p_value.substring( p_lastidx + 1, p_idx );
    p_lastidx = p_idx;
  }
  if( p_lastidx >= 0 ) {
     p_value = p_value2 + p_value.substring( p_lastidx + 1 );
  }
  var p_sign = '';
  if( (p_idx = p_value.indexOf( '-' )) >= 0 ) {
    p_sign += p_value.substring( 0, p_idx + 1 );
    p_value = SeiTrim( p_value.substring( p_idx + 1 ) );
  }
  if( (p_idx = p_value.indexOf( '+' )) >= 0 ) {
    p_sign += p_value.substring( 0, p_idx + 1 );
    p_value = SeiTrim( p_value.substring( p_idx + 1 ) );
  }
  for( i=0; i<p_value.length; i++ ) {
    if( p_value.charAt( i ) != '0' ) {
      if( i == 0 || i == 1 && p_value.charAt( i ) == '.' ) {
        break;
      }
      p_sign += p_value.substring( 0, i );
      p_value = p_value.substring( i );
      break;
    }
  }
  p_idx = p_value.indexOf( '.' );
  if( p_idx < 0 ) p_idx = p_value.length;
  p_value2 = p_value.substring( 0, p_idx % 3 );
  for( i=p_idx % 3; i<p_idx; i+=3 ) {
    if( i != 0 ) p_value2 += ',';
    p_value2 += p_value.substring( i, i+3 );
  }
  return p_sign + p_value2 + p_value.substring( p_idx );
}
function SeiTrimZero( x_value ) {
  x_value = SeiTrim( x_value );
  if( !x_value || !x_value.length || x_value.length == 0 ) {
    return x_value;
  }
  var p_pos = 0, p_value2 = null;
  while( true ) {
    var p_pos2 = x_value.indexOf( ' ', p_pos );
    var p_pos3 = x_value.indexOf( '　', p_pos );
    if( p_pos3 >= 0 && p_pos3 < p_pos2 ) p_pos2 = p_pos3;
    if( p_pos2 < 0 ) {
      if( p_value2 != null ) {
        x_value = p_value2 + x_value.substring( p_pos );
      }
      break;
    }
    if( p_value2 == null ) p_value2 = '';
    p_value2 += x_value.substring( p_pos, p_pos2 );
    p_pos = p_pos2 + 1;
  }
  var p_sign = 0;
  if( x_value.charAt( 0 ) == '-' || x_value.charAt( 0 ) == '+' ) {
    p_sign = 1;
  }
  var p_start = p_sign;
  while( p_start < x_value.length ) {
    var p_ch = x_value.charAt( p_start );
    if( p_ch != '0' && p_ch != '０' ) {
      break;
    }
    p_start++;
  }
  if( p_start >= x_value.length ) {
    return x_value.charAt( x_value.length - 1 );
  }
  var p_padding = '';
  if( x_value.charAt( x_value.length - 1 ) == '.' ) {
    if( x_value.length > p_sign + 1 ) {
      x_value = x_value.substring( 0, x_value.length - 1 );
    }
    if( p_start > p_sign && p_start == x_value.length ) {
      p_start --;
    }
    if( p_start + p_sign == x_value.length && (x_value.charAt( p_start ) == '0') ) {
      p_sign = 0;
    }
  } else if( x_value.charAt( p_start ) == '.' ) {
    if( p_start == p_sign ) {
      p_padding = '0';
    } else if( p_start > p_sign ) {
      p_start --;
    }
  }
  return x_value.substring( 0, p_sign ) + p_padding + x_value.substring( p_start, x_value.length );
}
function SeiParseInt(x_value) {
  if (typeof(x_value) == 'number') return parseInt(x_value.toString());
  x_value = SeiRemoveComma(SeiTrim(x_value));
  if (x_value == '' || x_value == null) return NaN;
  if (x_value.indexOf('.') >= 0) return NaN;
  if (isNaN(Number(x_value))) return NaN;
  return parseInt(x_value, 10);
}
function SeiParseNum(x_value, x_notNanReturn) {
  if (typeof x_value == 'number') return x_value;
  x_value = SeiTrim(x_value);
  if (x_value == '' || x_value == null) {
    if (x_notNanReturn) {
      return '';
    } else {
      return NaN;
    }
  }
  x_value = SeiRemoveComma(x_value);
  x_value = x_value.replace('.', '.');
  if (x_notNanReturn) {
    if (isNaN(Number(x_value))) return x_value;
  }
  return Number(x_value);
}
function SeiRound( x_value, x_scale ) {
  if( x_scale < 0 ) {
    return x_value;
  }
  var p_value = new Number( SeiRemoveComma( x_value ) );
  if( !p_value || p_value == NaN ) {
    return x_value;
  }
  return p_value.toFixed( x_scale );
}
function SeiCalcSum( x_form, x_prenm, x_field, x_sum ) {
  var i, p_len  = new Number(x_form.elements[x_prenm+'arraycount'].value);
  var p_sum = 0, p_count = 0, p_min = null, p_max = null;
  for( i=0; i<p_len; i++ ) {
    var p_num = x_form.elements[x_prenm+x_field+'_'+i].value;
    if( p_num.length == 0 ) continue;
    p_num = new Number(SeiRemoveComma(p_num));
    if( !isNaN(p_num) ) {
      p_sum += p_num;
      p_count ++;
      if( p_min == null || p_num < p_min ) p_min = p_num;
      if( p_max == null || p_num > p_max ) p_max = p_num;
    }
  }
  switch( x_sum ) {
  case 'SUM': return p_sum;
  case 'MIN': return p_min;
  case 'MAX': return p_max;
  case 'AVG': return (p_count==0 ? '' : p_sum/p_count);
  case 'COUNT': return p_count;
  }
  return null;
}
function SeiIndexOf( x_elements, x_check ) {
  if( x_elements.length ) {
    var i;
    for( i=0; i<x_elements.length; i++ ) {
      if( x_elements[i] == x_check ) {
        return i;
      }
    }
  }
  return -1;
}
function SeiPadding(x_value, x_len, x_pad) {
  if (x_value == null) x_value = '';
  if (typeof x_value != 'string') x_value = '' + x_value;
  if (typeof x_pad == 'undefined') x_pad = ' ';
  for (var i=x_value.length; i<x_len; i++) x_value = x_pad + x_value;
  return x_value;
}
var g_seiZen = '０１２３４５６７８９ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ＿　―－～';
var g_seiHan = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_ --~';
function SeiZenToHan(x_value) {
  if (x_value == null) return x_value;
  var p_ret = null;
  for (var i=0; i<x_value.length; i++) {
    var p_ch = x_value.charAt(i);
    var p_idx = g_seiZen.indexOf(p_ch);
    if (p_idx >= 0) {
      if (p_ret == null) p_ret = x_value.substring(0, i);
      p_ret += g_seiHan.charAt(p_idx);
    } else {
      if (p_ret != null) p_ret += p_ch;
    }
  }
  return p_ret || x_value;
}
var g_seiWarekiEra = {
  'MEIJI' : new Array(1868,'明治','明治','MEIJI','明','M','m','㍾'),
  'TAISHO' : new Array(1912,'大正','大正','TAISHO','TAISYO','TAISHOU','TAISYOU','大','T','t','㍽'),
  'SHOWA' : new Array(1926,'昭和','昭和','SHOWA','SHOUWA','SYOWA','SYOUWA','昭','S','s','㍼'),
  'HEISEI' : new Array(1989,'平成','平成','HEISEI','平','H','h','㍻'),
  'REIWA' : new Array(2019,'令和','令和','REIWA','令','R','r')};

function SeiParseDateDayOfWeek(x_value) {
  var p_dow = ['日','日曜日','月','月曜日','火','火曜日','水','水曜日','木','木曜日','金','金曜日','土','土曜日'];
  for (var i=0; i<p_dow.length; i++) {
    if (p_dow[i] == x_value) return i / 2;
  }
  return -1;
}
function SeiParseDate( x_value ){
  var p_today = SeiToday();
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  var p_dom = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  var p_y = NaN, p_m = NaN, p_d = NaN;
  if ((p_val.length == 1 || p_val.length == 2) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear(); p_m = p_today.getMonth() + 1;
    p_d = parseInt(p_val, 10);
  }
  if ((p_val.length == 3 || p_val.length == 4) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear();
    p_m = p_val.substring(0, p_val.length - 2); p_d = p_val.substring(p_val.length - 2);
    if (p_d.charAt(0) == '0') p_d = p_d.substring(1);
    if (p_m.charAt(0) == '0') p_m = p_m.substring(1);
    p_d = SeiParseInt(p_d); p_m = SeiParseInt(p_m);
  }
  if (p_val.length == 6 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
    p_d = Number(p_val.substring(4, 6));
  } else if (p_val.length == 7 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 3));
    p_m = Number(p_val.substring(3, 5));
    p_d = Number(p_val.substring(5, 7));
  } else if (p_val.length == 8 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 4));
    p_m = Number(p_val.substring(4, 6));
    p_d = Number(p_val.substring(6, 8));
  }
  if (!isNaN(p_y) && !isNaN(p_m) && !isNaN(p_d)) {
    if (p_y < 0) return null;
    if (p_y < 100) {
      if (p_y < 80) p_y += 2000; else p_y += 1900;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    if ((p_y % 4) == 0 && ((p_y % 100) != 0 || (p_y % 400) == 0)) {
      p_dom[1] ++;
    }
    if (p_d <= 0 || p_d > p_dom[p_m-1]) return null;
    return new Date(p_y, p_m-1, p_d).getTime() + 1000;
  }
  var p_date = p_val, p_time = '';
  if (p_val.lastIndexOf(' ') > 0 ) {
    var p_idx = p_val.lastIndexOf(' ');
    p_date = p_val.substring(0, p_idx);
    p_time = p_val.substring(p_idx + 1);
  } else if (p_val.length >= 10 && p_val.lastIndexOf('-') == p_val.length - 9) {
    var p_idx = p_val.lastIndexOf('-');
    p_date = p_val.substring(0, p_idx);
    p_time = p_val.substring(p_idx + 1);
  }
  if (p_date == '') return null;
  var p_sldix = p_date.indexOf('/');
  var p_midix = p_date.indexOf('-');
  var p_dodix = p_date.indexOf('.');
  var p_delim = '/', p_count = 0;
  if (p_sldix < 0 && p_dodix < 0 || p_midix > 0 && p_midix < p_sldix) p_delim = '-';
  else if( p_sldix < 0 && p_dodix > 0 ) p_delim = '.';
  p_y = p_m = p_d = NaN;
  var p_pos = 0, p_pos2 = 0;
  while ((p_pos2 = p_date.indexOf( p_delim, p_pos )) >= 0) {
    if (p_count == 0) p_y = Number(p_val.substring(p_pos, p_pos2));
    if (p_count == 1) p_m = Number(p_val.substring(p_pos, p_pos2));
    p_pos = p_pos2 + p_delim.length;
    if (++ p_count >= 3) return null;
  }
  if (p_count == 1) {
    p_d = Number(p_val.substring(p_pos));
 p_m = p_y;
    p_y = 2019;
  } else if (p_count == 2) {
    p_d = Number(p_val.substring(p_pos));
  } else if (p_count == 0) {
    return null;
  }
  if (!isNaN(p_y) && !isNaN(p_m) && !isNaN(p_d)) {
    if (p_y < 100) {
      if (p_y < 80) p_y += 2000; else p_y += 1900;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    if ((p_y % 4) == 0 && ((p_y % 100) != 0 || (p_y % 400) == 0)) p_dom[1] ++;
    if (p_d <= 0 || p_d > p_dom[p_m-1]) return null;
    return new Date(p_y, p_m-1, p_d).getTime() + 1000;
  }
  return null;
}

function SeiParseDateWarekiDayOfWeek(x_value) {
  var p_dow = ['日','日曜日','月','月曜日','火','火曜日','水','水曜日','木','木曜日','金','金曜日','土','土曜日'];
  for (var i=0; i<p_dow.length; i++) {
    if (p_dow[i] == x_value) return i / 2;
  }
  return -1;
}
function SeiParseDateWareki(x_value){
  var p_today = SeiToday();
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  var p_dom = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
  for (var i in g_seiWarekiEra) {
    var p_era = g_seiWarekiEra[i];
    for (var j=1; j<p_era.length; j++) {
      if (p_val.indexOf(p_era[j])!=0 || isNaN(SeiParseInt(p_val.substring(p_era[j].length)))) continue;
      var p_val2 = p_val;
      p_val = p_val.substring(p_era[j].length)
      if (p_val.length == 6) {
        var p_y, p_m, p_d;
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
    p_d = Number(p_val.substring(4, 6));
        if (p_y > 0 && 0 < p_m && p_m <= 12 && p_d > 0) {
          p_y += p_era[0] - 1;
          if ((p_y % 4) == 0 && ((p_y % 100) != 0 || (p_y % 400) == 0)) p_dom[1] ++;
          if (p_d <= p_dom[p_m-1]) return new Date(p_y, p_m-1, p_d).getTime() + 1000;
        }
      }
      p_val = p_val2;
    }
  }
  var p_y = NaN, p_m = NaN, p_d = NaN;
  if ((p_val.length == 1 || p_val.length == 2) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear(); p_m = p_today.getMonth() + 1;
    p_d = parseInt(p_val, 10);
  }
  if ((p_val.length == 3 || p_val.length == 4) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear();
    p_m = p_val.substring(0, p_val.length - 2); p_d = p_val.substring(p_val.length - 2);
    if (p_d.charAt(0) == '0') p_d = p_d.substring(1);
    if (p_m.charAt(0) == '0') p_m = p_m.substring(1);
    p_d = SeiParseInt(p_d); p_m = SeiParseInt(p_m);
  }
  if (p_val.length == 6 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
    p_d = Number(p_val.substring(4, 6));
  } else if (p_val.length == 7 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 3));
    p_m = Number(p_val.substring(3, 5));
    p_d = Number(p_val.substring(5, 7));
  } else if (p_val.length == 8 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 4));
    p_m = Number(p_val.substring(4, 6));
    p_d = Number(p_val.substring(6, 8));
  }
  if (!isNaN(p_y) && !isNaN(p_m) && !isNaN(p_d)) {
    if (p_y < 0) return null;
    if (p_y < 100) {
      p_y += 2019 - 1;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    if ((p_y % 4) == 0 && ((p_y % 100) != 0 || (p_y % 400) == 0)) {
      p_dom[1] ++;
    }
    if (p_d <= 0 || p_d > p_dom[p_m-1]) return null;
    return new Date(p_y, p_m-1, p_d).getTime() + 1000;
  }
  var p_date = p_val, p_time = '';
  if (p_val.lastIndexOf(' ') > 0 ) {
    var p_idx = p_val.lastIndexOf(' ');
    p_date = p_val.substring(0, p_idx);
    p_time = p_val.substring(p_idx + 1);
  } else if (p_val.length >= 10 && p_val.lastIndexOf('-') == p_val.length - 9) {
    var p_idx = p_val.lastIndexOf('-');
    p_date = p_val.substring(0, p_idx);
    p_time = p_val.substring(p_idx + 1);
  }
  if (p_date == '') return null;
  var p_sldix = p_date.indexOf('/');
  var p_midix = p_date.indexOf('-');
  var p_dodix = p_date.indexOf('.');
  var p_delim = '/', p_count = 0;
  if (p_sldix < 0 && p_dodix < 0 || p_midix > 0 && p_midix < p_sldix) p_delim = '-';
  else if( p_sldix < 0 && p_dodix > 0 ) p_delim = '.';
  p_y = p_m = p_d = NaN;
  var p_yidx = p_date.indexOf('年');
  if (p_yidx > 0) {
    var p_midx = p_date.indexOf('月', p_yidx+1);
    if (p_midx > 0) {
      var p_didx = p_date.indexOf('日', p_midx+1);
      if (p_didx > 0) {
        p_y = SeiTrim(p_date.substring(0, p_yidx));
        p_m = SeiTrim(p_date.substring(p_yidx+1, p_midx))
        p_d = SeiTrim(p_date.substring(p_midx+1, p_didx));
        p_count = 3;
      }
    }
  }
  if (p_y == null || isNaN(p_y)) {
  var p_pos = 0, p_pos2 = 0;
  while ((p_pos2 = p_date.indexOf( p_delim, p_pos )) >= 0) {
    if (p_count == 0) p_y = p_val.substring(p_pos, p_pos2);
    if (p_count == 1) p_m = Number(p_val.substring(p_pos, p_pos2));
    p_pos = p_pos2 + p_delim.length;
    if (++ p_count >= 3) return null;
  }
  if (p_count == 1) {
    p_d = Number(p_val.substring(p_pos));
 p_m = p_y;
    p_y = 2019;
  } else if (p_count == 2) {
    p_d = Number(p_val.substring(p_pos));
  } else if (p_count == 0) {
    return null;
  }
  }
  if (isNaN(Number(p_y)) && p_y.length) {
    for (var i in g_seiWarekiEra) {
      var p_era = g_seiWarekiEra[i];
      for (var j=1; j<p_era.length; j++) {
        if (p_y.length < p_era[j].length || p_y.substring(0, p_era[j].length) != p_era[j]) continue;
        var p_yn = Number(p_y.substring(p_era[j].length));
        if (isNaN(p_yn)) continue;
        p_y = p_yn + p_era[0] - 1;
        break;
      }
      if (!isNaN(p_y)) break;
    }
  } else {
    p_y = Number(p_y);
  }
  if (!isNaN(p_y) && !isNaN(p_m) && !isNaN(p_d)) {
    if (p_y < 100) {
      p_y += 2019 - 1;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    if ((p_y % 4) == 0 && ((p_y % 100) != 0 || (p_y % 400) == 0)) p_dom[1] ++;
    if (p_d <= 0 || p_d > p_dom[p_m-1]) return null;
    return new Date(p_y, p_m-1, p_d).getTime() + 1000;
  }
  return null;
}

function SeiParseDateYM(x_value){
  var p_today = SeiToday();
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  var p_y = NaN, p_m = NaN;
  if ((p_val.length == 1 || p_val.length == 2) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear(); p_m = parseInt(p_val, 10);
  }
  if (p_val.length == 4 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
    if (p_y < 80) p_y += 2000; else p_y += 1900;
  }
  if (p_val.length == 5 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 3));
    p_m = Number(p_val.substring(3, 5));
  }
  if (p_val.length == 6 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 4));
    p_m = Number(p_val.substring(4, 6));
  }
  if (!isNaN(p_y) && !isNaN(p_m)) {
    if (p_y < 0) return null;
    if (p_m <= 0 || 12 < p_m) return null;
    return new Date(p_y, p_m-1, 1).getTime() + 1000;
  }
  var p_date = p_val;
  if (p_val.lastIndexOf(' ') > 0 ) return null;
  if (p_date == '') return null;
  var p_sldix = p_date.indexOf('/');
  var p_midix = p_date.indexOf('-');
  var p_dodix = p_date.indexOf('.');
  var p_delim = '/', p_count = 0;
  if (p_sldix < 0 && p_dodix < 0 || p_midix > 0 && p_midix < p_sldix) p_delim = '-';
  else if( p_sldix < 0 && p_dodix > 0 ) p_delim = '.';
  p_y = p_m = p_d = NaN;
  var p_pos = p_date.indexOf(p_delim);
  if (p_pos < 0) {
    p_m = p_date;
    p_y = p_today.getFullYear();
  } else if (p_pos >= 0 && p_date.indexOf(p_delim, p_pos+1) < 0) {
  p_y = p_date.substring(0, p_pos);
  p_m = p_date.substring(p_pos + 1);
  }
  p_y = Number(p_y);
  if (!isNaN(p_y) && !isNaN(p_m)) {
    if (p_y < 100) {
      if (p_y < 80) p_y += 2000; else p_y += 1900;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    return new Date(p_y, p_m-1, 1).getTime() + 1000;
  }
  return null;
}

function SeiParseDateYMWareki(x_value){
  var p_today = SeiToday();
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  for (var i in g_seiWarekiEra) {
    var p_era = g_seiWarekiEra[i];
    for (var j=1; j<p_era.length; j++) {
      if (p_val.indexOf(p_era[j])!=0 || isNaN(SeiParseInt(p_val.substring(p_era[j].length)))) continue;
      var p_val2 = p_val;
      p_val = p_val.substring(p_era[j].length)
      if (p_val.length == 4) {
        var p_y, p_m, p_d;
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
        if (p_y > 0 && 0 < p_m && p_m <= 12) {
          p_y += p_era[0] - 1;
          return new Date(p_y, p_m-1, 1).getTime() + 1000;
        }
      }
      p_val = p_val2;
    }
  }
  var p_y = NaN, p_m = NaN;
  if ((p_val.length == 1 || p_val.length == 2) && !isNaN(SeiParseInt(p_val))) {
    p_y = p_today.getFullYear(); p_m = parseInt(p_val, 10);
  }
  if (p_val.length == 4 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 2));
    p_m = Number(p_val.substring(2, 4));
      p_y += 2019 - 1;
  }
  if (p_val.length == 5 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 3));
    p_m = Number(p_val.substring(3, 5));
  }
  if (p_val.length == 6 && !isNaN(SeiParseInt(p_val))) {
    p_y = Number(p_val.substring(0, 4));
    p_m = Number(p_val.substring(4, 6));
  }
  if (!isNaN(p_y) && !isNaN(p_m)) {
    if (p_y < 0) return null;
    if (p_m <= 0 || 12 < p_m) return null;
    return new Date(p_y, p_m-1, 1).getTime() + 1000;
  }
  var p_date = p_val;
  if (p_val.lastIndexOf(' ') > 0 ) return null;
  if (p_date == '') return null;
  var p_sldix = p_date.indexOf('/');
  var p_midix = p_date.indexOf('-');
  var p_dodix = p_date.indexOf('.');
  var p_delim = '/', p_count = 0;
  if (p_sldix < 0 && p_dodix < 0 || p_midix > 0 && p_midix < p_sldix) p_delim = '-';
  else if( p_sldix < 0 && p_dodix > 0 ) p_delim = '.';
  p_y = p_m = p_d = NaN;
  var p_yidx = p_date.indexOf('年');
  if (p_yidx > 0) {
    var p_midx = p_date.indexOf('月', p_yidx+1);
    if (p_midx > 0) {
      p_y = SeiTrim(p_date.substring(0, p_yidx));
      p_m = SeiTrim(p_date.substring(p_yidx+1, p_midx))
      p_count = 2;
    }
  }
  if (p_y == null || isNaN(p_y)) {
  var p_pos = p_date.indexOf(p_delim);
  if (p_pos < 0) {
    p_m = p_date;
    p_y = p_today.getFullYear();
  } else if (p_pos >= 0 && p_date.indexOf(p_delim, p_pos+1) < 0) {
  p_y = p_date.substring(0, p_pos);
  p_m = p_date.substring(p_pos + 1);
  }
  }
  if (isNaN(Number(p_y)) && p_y.length) {
    for (var i in g_seiWarekiEra) {
      var p_era = g_seiWarekiEra[i];
      for (var j=1; j<p_era.length; j++) {
        if (p_y.length < p_era[j].length || p_y.substring(0, p_era[j].length) != p_era[j]) continue;
        var p_yn = Number(p_y.substring(p_era[j].length));
        if (isNaN(p_yn)) continue;
        p_y = p_yn + p_era[0] - 1;
        break;
      }
      if (!isNaN(p_y)) break;
    }
  } else {
    p_y = Number(p_y);
  }
  p_y = Number(p_y);
  if (!isNaN(p_y) && !isNaN(p_m)) {
    if (p_y < 100) {
      p_y += 2019 - 1;
    }
    if (p_m <= 0 || 12 < p_m) return null;
    return new Date(p_y, p_m-1, 1).getTime() + 1000;
  }
  return null;
}

function SeiEditDate( x_date ) {
  if( x_date == null || x_date == 0 ) {
    return x_date;
  }
  var p_date = new Date( x_date );
  return p_date.getFullYear() + '-' + (p_date.getMonth()<9 ? '0' : '') + (p_date.getMonth()+1) + '-' + (p_date.getDate()<10 ? '0' : '') + p_date.getDate();
}
function SeiEditDateWareki(x_date) {
  if( x_date == null || x_date == 0 ) {
    return x_date;
  }
  var p_date = new Date( x_date );
  var p_year = p_date.getFullYear();
  if (-3197178000000<=p_date.getTime() && p_date.getTime()<-1812186000001) p_year = '明治' + (p_year - 1868 + 1);
  if (-1812186000000<=p_date.getTime() && p_date.getTime()<-1357635600001) p_year = '大正' + (p_year - 1912 + 1);
  if (-1357635600000<=p_date.getTime() && p_date.getTime()<600188399999) p_year = '昭和' + (p_year - 1926 + 1);
  if (600188400000<=p_date.getTime() && p_date.getTime()<1556636399999) p_year = '平成' + (p_year - 1989 + 1);
  if (p_date.getTime()>=1556636400000) p_year = '令和' + (p_year - 2019 + 1);
  return p_year + '年' + (p_date.getMonth()<9 ? '0' : '') + (p_date.getMonth()+1) + '月' + (p_date.getDate()<10 ? '0' : '') + p_date.getDate() + '日';
}
function SeiEditDateYM(x_date) {
  if( x_date == null || x_date == 0 ) {
    return x_date;
  }
  var p_date = new Date( x_date );
  return p_date.getFullYear() + '-' + (p_date.getMonth()<9 ? '0' : '') + (p_date.getMonth()+1);
}
function SeiEditDateYMWareki(x_date) {
  if( x_date == null || x_date == 0 ) {
    return x_date;
  }
  var p_date = new Date( x_date );
  var p_year = p_date.getFullYear();
  if (-3197178000000<=p_date.getTime() && p_date.getTime()<-1812186000001) p_year = '明治' + (p_year - 1868 + 1);
  if (-1812186000000<=p_date.getTime() && p_date.getTime()<-1357635600001) p_year = '大正' + (p_year - 1912 + 1);
  if (-1357635600000<=p_date.getTime() && p_date.getTime()<600188399999) p_year = '昭和' + (p_year - 1926 + 1);
  if (600188400000<=p_date.getTime() && p_date.getTime()<1556636399999) p_year = '平成' + (p_year - 1989 + 1);
  if (p_date.getTime()>=1556636400000) p_year = '令和' + (p_year - 2019 + 1);
  return p_year + '年' + (p_date.getMonth()<9 ? '0' : '') + (p_date.getMonth()+1) + '月';
}
function SeiParseTime(x_value){
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  var p_h = NaN, p_m = NaN, p_s = NaN;
  if (!isNaN(SeiParseInt(p_val))) {
    if (p_val.length > 6) return null;
    if ((p_val.length == 1 || p_val.length == 2)) {
      p_h = Number(p_val); p_m = 0;
      p_s = 0;
    } else if (p_val.length == 3) {
      p_h = Number(p_val.substring(0, 1));
      p_m = Number(p_val.substring(1, 3)); p_s = 0;
    } else if (p_val.length == 4) {
      p_h = Number(p_val.substring(0, 2));
      p_m = Number(p_val.substring(2, 4)); p_s = 0;
    } else if (p_val.length == 5) {
      p_h = Number(p_val.substring(0, 2));
      p_m = Number(p_val.substring(2, 4)); p_s = Number(p_val.substring(4, 5));
    } else if (p_val.length == 6) {
      p_h = Number(p_val.substring(0, 2));
      p_m = Number(p_val.substring(2, 4)); p_s = Number(p_val.substring(4, 6));
    }
  } else {
    var p_time = p_val;
    var p_count = 0;
    var p_pos = 0, p_pos2 = 0;
    while ((p_pos2 = p_time.indexOf(':', p_pos)) >= 0 || (p_pos2 = p_time.indexOf('：', p_pos)) >= 0) {
      if (p_count == 0) p_h = SeiParseInt(p_val.substring(p_pos, p_pos2));
      if (p_count == 1) p_m = SeiParseInt(p_val.substring(p_pos, p_pos2));
      if (p_count == 2) p_s = SeiParseInt(p_val.substring(p_pos, p_pos2));
      p_pos = p_pos2 + 1;
      if (++ p_count >= 3) return null;
    }
    if (p_count == p_time.length) {
      return null;
    }
    if (p_count == 1) {
      p_m = SeiParseInt(p_val.substring(p_pos));
      p_s = 0;
    } else if (p_count == 2) {
      p_s = SeiParseInt(p_val.substring(p_pos));
    } else if (p_count == 0) {
      return null;
    }
  }
  if (!isNaN(p_h) && !isNaN(p_m) && !isNaN(p_s)) {
    if (p_h < 0 || 24 < p_h) return null;
    if (p_m < 0 || 59 < p_m) return null;
    if (p_s < 0 || 59 < p_s) return null;
    var p_time = new Date(0);
    p_time.setHours(p_h);p_time.setMinutes(p_m);p_time.setSeconds(p_s);
    return p_time;
  }
  return null;
}

function SeiParseTimeHM(x_value){
  var p_val = SeiTrim(SeiZenToHan(x_value));
  if (p_val == '') return null;
  var p_h = NaN, p_m = NaN;
  if (!isNaN(SeiParseInt(p_val))) {
    if (p_val.length > 4) return null;
    if ((p_val.length == 1 || p_val.length == 2)) {
      p_h = Number(p_val); p_m = 0;
    } else if (p_val.length == 3) {
      p_h = Number(p_val.substring(0, 1));
      p_m = Number(p_val.substring(1, 3));
    } else if (p_val.length == 4) {
      p_h = Number(p_val.substring(0, 2));
      p_m = Number(p_val.substring(2, 4));
    }
  } else {
    var p_time = p_val;
    var p_count = 0;
    var p_pos = 0, p_pos2 = 0;
    while ((p_pos2 = p_time.indexOf(':', p_pos )) >= 0 || (p_pos2 = p_time.indexOf('：', p_pos)) >= 0) {
      if (p_count == 0) p_h = SeiParseInt(p_val.substring(p_pos, p_pos2));
      if (p_count == 1) p_m = SeiParseInt(p_val.substring(p_pos, p_pos2));
      p_pos = p_pos2 + 1;
      if (++ p_count >= 2) return null;
    }
    if (p_count == p_time.length) {
      return null;
    }
    if (p_count == 1) {
      p_m = SeiParseInt(p_val.substring(p_pos));
    } else if (p_count == 0) {
      return null;
    }
  }
  if (!isNaN(p_h) && !isNaN(p_m)) {
    if (p_h < 0 || 24 < p_h) return null;
    if (p_m < 0 || 59 < p_m) return null;
    var p_time = new Date(0);
    p_time.setHours(p_h);p_time.setMinutes(p_m);
    return p_time;
  }
}

function SeiEditTime(x_time) {
  if (x_time == null || x_time == 0) {
    return x_time;
  }
  var p_time = new Date(x_time);
  return (p_time.getHours() < 10 ? '0' : '') + (p_time.getHours()) + ':' + (p_time.getMinutes() < 10 ? '0' : '') + (p_time.getMinutes()) + ':' + (p_time.getSeconds() < 10 ? '0' : '') + (p_time.getSeconds());
}
function SeiEditTimeHM(x_time) {
  if (x_time == null || x_time == 0) {
    return x_time;
  }
  var p_time = new Date(x_time);
  return (p_time.getHours() < 10 ? '0' : '') + (p_time.getHours()) + ':' + (p_time.getMinutes() < 10 ? '0' : '') + (p_time.getMinutes());
}
function SeiEditDate2(x_value, x_type) {
  if (x_value == null) {
    return x_value;
  }
  var p_value = SeiTrim(x_value), p_sub = ''
  if (x_type == 'd' || x_type == 'z' || x_type == 'S' || x_type== 'M') {
    var p_idx = p_value.indexOf(' ');
    if (p_idx > 0 ) {
      p_sub = p_value.substring(p_idx);
      p_value = p_value.substring(0, p_idx);
    }
  }
  if (x_type == 'M') {
    var p_date = SeiParseDateYM(p_value);
    if (p_date == null) {
      return x_value;
    }
    return SeiEditDateYM(p_date);
  } else {
    var p_date = SeiParseDate(p_value);
    if (p_date == null) {
      return x_value;
    }
    return SeiEditDate(p_date) + p_sub;
  }
}
function SeiSaveRadioStatus(x_radio) {
  var p_radio = x_radio.form.elements[x_radio.name];
  if (p_radio.length) {
    x_radio.g_pms_radio_status = new Array();
    for (var i=0; i<p_radio.length; i++) {
      x_radio.g_pms_radio_status[i] = p_radio[i].checked;
    }
  } else {
    x_radio.g_pms_radio_status = p_radio.checked;
  }
}
function SeiRestoreRadioStatus(x_radio) {
  if (typeof x_radio.g_pms_radio_status == 'undefined') return
  var p_radio = x_radio.form.elements[x_radio.name];
  if (p_radio.length) {
    for (var i=0; i<p_radio.length; i++) {
      p_radio[i].checked = x_radio.g_pms_radio_status[i];
    }
  } else {
    p_radio.checked = x_radio.g_pms_radio_status;
  }
}
function SeiSaveSelectStatus(x_sel) {
  if (!x_sel.multiple) {
     x_sel.g_pms_selected_index = x_sel.selectedIndex;
  }
}
function SeiRestoreSelectStatus(x_sel) {
  if (!x_sel.multiple) {
     if (typeof x_sel.g_pms_selected_index == 'undefined') return;
     x_sel.selectedIndex = x_sel.g_pms_selected_index;
  }
}
function SeiSaveSelectMltStatus(x_selectmlt) {
  if (x_selectmlt.multiple) {
     var p_selectmlt = x_selectmlt.form.elements[x_selectmlt.name];
     if (x_selectmlt.length) {
       x_selectmlt.g_pms_selectmlt_status = new Array();
       for (var i=0; i<p_selectmlt.length; i++) {
         x_selectmlt.g_pms_selectmlt_status[i] = p_selectmlt[i].selected;
       }
     } else {
       x_selectmlt.g_pms_selectmlt_status = p_selectmlt.selected;
     }
  }
}
function SeiRestoreSelectMltStatus(x_selectmlt) {
  if (x_selectmlt.multiple) {
    if (typeof x_selectmlt.g_pms_selectmlt_status == 'undefined') return;
    var p_selectmlt = x_selectmlt.form.elements[x_selectmlt.name];
    if (p_selectmlt.length) {
      for (var i=0; i<p_selectmlt.length; i++) {
        p_selectmlt[i].selected = x_selectmlt.g_pms_selectmlt_status[i];
      }
    } else {
      p_selectmlt.selected = x_selectmlt.g_pms_selectmlt_status;
    }
  }
}
function SeiCheckFileName(x_form) {
  if (!x_form) return null;
  var p_elem = x_form.elements, p_len = p_elem.length, p_ret = [];
  for (var i=0; i<p_len; i++) {
    if (p_elem[i].type != 'file' || p_elem[i].value.length <= 0) continue;
    var p_file = p_elem[i].value;
    if (p_file.length >= 2 && p_file.charAt(1) == ':' && ('a'<=p_file.charAt(0)&&p_file.charAt(0)<='z' || 'A'<=p_file.charAt(0)&&p_file.charAt(0)<='Z')) continue;
    if (p_file.charAt(0) == '\\') continue;
    p_ret.push(p_elem[i]);
  }
  if (p_ret.length > 0) return p_ret;
  return null;
}
function SeiCheckFileName2(x_form) {
  var p_ifile = SeiCheckFileName(x_form);
  if (p_ifile == null || p_ifile.length == 0) return true;
  alert('不明なファイル名: ' + p_ifile[0].value);
  return false;
}
function SeiCheckFileName3(x_form) {
  var p_ifile = SeiCheckFileName(x_form);
  if (p_ifile == null) return true;
  for (var i=0; i<p_ifile.length; i++) {
    p_ifile[i].disabled = true;
  }
  return true;
}
function SeiDummy() {
  if( parent && parent.fr_dmy ) {
    return parent.fr_dmy;
  }
  if( parent.parent && parent.parent.fr_dmy ) {
    return parent.parent.fr_dmy;
  }
  var p_win = window;
  while( p_win ) {
    if( p_win.top ) {
      p_win = p_win.top;
    }
    if( p_win.fr_dmy ) {
      return p_win.fr_dmy;
    }
    p_win = p_win.opener;
  }
  return null;
}
function SeiJump2( x_target, x_url ) {
  var p_fragm = '', p_idx = x_url.indexOf( '#' );
  if( p_idx > 0 ) {
    p_fragm = x_url.substring( p_idx, x_url.length );
    x_url = x_url.substring( 0, p_idx );
  }
  if( x_url.indexOf( '?' ) < 0 ) {
    x_url += '?';
  } else {
    x_url += '&';
  }
  x_url += 'sei_page_x=' + SeiGetScrollPos().left + '&sei_page_y=' + SeiGetScrollPos().top;
  if (typeof(g_seiMenuFrameCols) == 'undefined') {
    g_seiMenuFrameCols = null;
  }
  if(g_seiMenuFrameCols) {
    x_url += '&sei_menuframe_cols=' + g_seiMenuFrameCols;
  }
  if (typeof(g_seiMenuFrameColsOrg) == 'undefined') {
    g_seiMenuFrameColsOrg = null;
  }
  if(g_seiMenuFrameColsOrg) {
    x_url += '&sei_menuframe_colsorg=' + g_seiMenuFrameColsOrg;
  }
  x_target.location = x_url + p_fragm;
}
function SeiInvalidateScreen(x_cursor, x_msg) {
  if (typeof x_cursor == 'undefined') x_cursor = 'wait';
  if (typeof x_msg == 'undefined') x_msg = 'しばらくお待ち下さい。';
  document.body.style.cursor = x_cursor;
  document.body.title = x_msg;
  function _invalidate(x_input, x_len, x_pos) {
    if (x_pos >= x_len) return;
    var p_end = Math.min(x_len, x_pos + 10);
    if (p_end <= x_pos) p_end = x_pos + 1;
    for (var i=x_pos; i<p_end; i++) {
      x_input[i].disabled = true;
    }
    if (p_end < x_len) setTimeout(function(){ _invalidate(x_input, x_len, p_end); }, 0);
  }
  setTimeout(function(){
    var p_links = document.links, p_lnlen = p_links.length;
    for (var i=0; i<p_lnlen; i++) {
      var p_link = p_links[i];
      p_link.disabled = true;
      p_link.href = '#';
      p_link.onclick = 'return false';
      var p_parent = p_link.parentNode;
      if (typeof p_parent == 'object') {
        p_parent.onclick = 'return false';
        if (typeof p_parent.style != 'undefined') p_parent.style.cursor = x_cursor;
      }
    }
    var p_images = document.images, p_imglen = p_images.length;
    for (var i=0; i<p_imglen; i++) {
      var p_img = p_images[i];
      if (typeof p_img.parentNode == 'object') {
        p_img.parentNode.onclick = 'return false';
      }
    }
    for (var i=0; i<document.forms.length; i++) {
      var p_elems = document.forms[i].elements, p_elen = p_elems.length, p_elems2 = [];
      for (var j=0; j<p_elen; j++) { if (p_elems[j].type != 'hidden') p_elems2.push(p_elems[j]); }
      _invalidate(p_elems2, p_elems2.length, 0);
    }
  }, 10);
}
function SeiInvalidateScreenDiv(x_time) {
    setTimeout(function(){
      var p_div = document.createElement('DIV');
      p_div.id = 'sei_invalidate_div';
      p_div.style.position = 'absolute';
      p_div.style.top = '0px';
      p_div.style.left = '0px';
      p_div.style.background = '#888888';
      p_div.style.zIndex = '1000';
      p_div.className = 'SeiInvalidateScreen';
      SeiSetOpacity(p_div, 0.5);
      var p_resize = function(x_ev) {
        p_div.style.width = Math.max(document.body.clientWidth,
                  document.body.offsetLeft*2 + document.body.offsetWidth) + 'px';
        p_div.style.height = Math.max(document.body.clientHeight,
                  document.body.offsetTop*2 + document.body.offsetHeight) + 'px';
      };
      p_resize();
      window.onresize = p_resize;
      document.body.appendChild(p_div);
    }, x_time);
}
function SeiAddEventListener(x_elem, x_type, x_func, x_param, x_phase) {
  if (!x_elem) return false;
  var p_phase = false;
  if (typeof(x_phase) != 'undefined') {
    p_phase = x_phase;
  }
  var p_func = x_func;
  if (typeof(x_param) != 'undefined') p_func = function(){ var p_arg=new Array();for(var i=0;i<arguments.length;i++)p_arg.push(arguments[i]);p_arg.push(x_param);x_func.apply(this, p_arg); };
  if (x_elem.attachEvent) {
    if (!x_elem.g_seiEventListeners) {
      x_elem.g_seiEventListeners = [];
    }
    if (!x_elem.g_seiEventListeners[x_type]) {
      x_elem.g_seiEventListeners[x_type] = new Array();
      x_elem.attachEvent('on' + x_type, function() {
        for(var i = 0; x_elem.g_seiEventListeners[x_type] && i < x_elem.g_seiEventListeners[x_type].length; i++){
          x_elem.g_seiEventListeners[x_type][i](window.event);
        }
      });
    }
    x_elem.g_seiEventListeners[x_type].push(p_func);
  } else {
    x_elem.addEventListener(x_type, p_func, p_phase);
  }
}
function SeiRemoveEventListener(x_elem, x_type, x_func, x_phase) {
  if (!x_elem) return false;
  var p_phase = false;
  if (typeof(x_phase) != 'undefined') {
    p_phase = x_phase;
  }
  if (x_elem.detachEvent) {
    if (!x_elem.g_seiEventListeners || !x_elem.g_seiEventListeners[x_type]) {
      x_elem.detachEvent('on' + x_type, x_func);
      return false;
    }
    for(var i = 0; i < x_elem.g_seiEventListeners[x_type].length; i++){
      if (x_elem.g_seiEventListeners[x_type][i] == x_func) {
        x_elem.g_seiEventListeners[x_type].splice(i, 1)
        break;
      }
    }
    if (x_elem.g_seiEventListeners[x_type].length <= 0) {
      delete x_elem.g_seiEventListeners[x_type];
    }
  } else {
    x_elem.removeEventListener(x_type, x_func, p_phase);
  }
}
var g_seiWinCallbacks;
function SeiAddOnchangeJS(x_field, x_func, x_param) {
  SeiAddWinCallback(x_field, x_func, x_param);
}
function SeiAddWinCallback(x_field, x_func, x_param) {
  if (!x_field) return false;
  var p_func = x_func;
  if (typeof(x_param) != 'undefined') {
      p_func = function(){ 
          if (typeof(arguments[0]) != 'undefined') {
                x_func.apply(this, arguments);
          } else {
                var p_arg = new Array();
                p_arg.push(x_param);
                x_func.apply(this, p_arg);
          }
      };
  }
  if(!g_seiWinCallbacks) g_seiWinCallbacks = new Array();
  if(!g_seiWinCallbacks[x_field])  g_seiWinCallbacks[x_field] = [];
  g_seiWinCallbacks[x_field].push(p_func);
}
function SeiExecOnchangeJS(x_fr_main, x_fields, x_arrayno) {
  SeiExecWinCallback(x_fr_main, x_fields, x_arrayno);
}
function SeiExecWinCallback(x_fr_main, x_fields, x_arrayno) {
    if (!g_seiWinCallbacks) return;
    for (var i=0; i<x_fields.length; i++) {
        var p_func = g_seiWinCallbacks[x_fields[i]];
        if (p_func) {
            for (var j=0; j<p_func.length; j++) {
                if (p_func[j]) p_func[j](x_arrayno);
            }
        }
    }
    var p_func = g_seiWinCallbacks['*'];
    if (p_func) {
        for (var j=0; j<p_func.length; j++) {
            if (p_func[j]) p_func[j](x_arrayno);
        }
    }
}
function SeiRemoveFromArray(x_array, x_value) {
  if (typeof(x_array) == 'undefined' || !x_array) return x_array;
  for (var i=0; i<x_array.length; i++) {
    if (x_array[i] != x_value) continue;
    var p_array = [];
    for (var j=0; j<i; j++) p_array.push(x_array[j]);
    for (var j=i+1; j<x_array.length; j++) p_array.push(x_array[j]);
    x_array = p_array;
  }
  return x_array;
}
var g_seiEditHighlightOnClick = true;
function SeiEditHighlight(x_form, x_field, x_setOnly) {
  if (!x_field) return;
  var p_field = null;
  if (x_field.length && !x_field.options) {
    p_field = x_field[0];
  } else {
    p_field = x_field;
  }
  var p_highlight = x_form.pms_edit_highlight;
  if (p_highlight) {
    if (p_highlight.value == '') {
      p_highlight.value = p_field.name;
    } else if (p_highlight.value.indexOf(p_field.name) < 0) {
      p_highlight.value += ',' + p_field.name;
    } else {
      var p_fields = p_highlight.value.split(',');
      for (var i in p_fields) {
        if (this[i] == p_field.name) {
          return;
        }
      }
      p_fields.push(p_field.name);
      p_highlight.value = p_fields.join(',');
    }
  }
  if (x_setOnly) {
    return;
  }
  if (g_seiEditHighlightOnClick && p_field.type != 'hidden') {
    var p_parent = p_field.parentNode;
    var p_count = 0;
    while(p_parent && p_count < 10) {
      if (p_parent.tagName == 'TD') {
        p_parent.className = 'SeiEditHighlightTD';
        break;
      }
      p_parent = p_parent.parentNode;
      p_count++;
    }
  }
}
function SeiCancelKeyEvent(x_ev) {
  event.returnValue = false;
  event.cancelBubble = true;
  event.keyCode = 0;
}
var g_seiCashFields;
var g_seiFieldsArray;
function SeiGetFieldsArray(x_formnm, x_prenm, x_array) {
  var p_form = document.forms[x_formnm];
  if (!p_form) {
    return null;
  }
  if (!g_seiFieldsArray) {
    g_seiFieldsArray = {};
  }
  var p_arraycnt = -1;
  if (x_array) {
    p_arraycnt = parseInt(p_form.elements[(x_prenm ? x_prenm : '') + 'arraycount'].value);
  }
  var p_arguments = new Array();
  for (var i=0 ; i < p_arguments.length; i++) {
    p_arguments.push();
  }
  if (arguments.length > 3 && typeof arguments[3] == 'object') {
    var p_obj = arguments[3];
    for (var i = 0; i < p_obj.length; i++) {
      p_arguments[3+i] = p_obj[i];
    }
  }
  for (var i = 3; i < p_arguments.length; i++) {
    var p_name = p_arguments[i];
    if (g_seiFieldsArray[p_name]) {
      continue;
    }
    if (x_array) {
      var p_array = new Array();
      for (var j = 0; j < p_arraycnt; j++) {
        p_array.push(p_form.elements[p_name + '_' + j]);
      }
      g_seiFieldsArray[p_name] = p_array;
    } else {
      g_seiFieldsArray[p_name] = p_form.elements[p_name];
    }
  }
  return g_seiFieldsArray;
}
function SeiSetTimeout(x_func, x_arguments, x_timeout) {
  return window.setTimeout(
    function() {
       x_func.apply(this, x_arguments); 
    }
  , x_timeout);
}
function SeiIsEmpty(x_obj) {
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
    if (!isNaN(x_obj.length) && x_obj.length <= 0) {
      return true;
    } else {
      for (var i in x_obj) {
        return false;
      }
      return true;
    }
  }
  return false;
}
var g_seiSubmitFunc = new Array();
function SeiSubmitForm(x_form) {
  if (g_seiSubmitFunc) {
    var p_seiSubmitFunc = g_seiSubmitFunc[x_form.name];
    if (p_seiSubmitFunc) {
      for (var i=0; i<p_seiSubmitFunc.length; i++) {
        p_seiSubmitFunc[i].apply(this, arguments);
      }
    }
  }
  x_form.submit();
}
function SeiPreviousElementSibling(x_node) {
  if (x_node.previousElementSibling) {
    return x_node.previousElementSibling;
  } else {
    return x_node.previousSibling;
  }
}
var g_seiAdjustFuncList = new Array();
function SeiCallAdjustFuncList() {
  for (var i = 0; i < g_seiAdjustFuncList.length; i++) {
    if (typeof(g_seiAdjustFuncList[i]) == 'function') {
      g_seiAdjustFuncList[i]();
    }
  }
}
var g_seiFixheaderFuncList = new Array();
function SeiCallFixHeaderFuncList() {
  for (var i = 0; i < g_seiFixheaderFuncList.length; i++) {
    if (typeof(g_seiFixheaderFuncList[i]) == 'function') {
      g_seiFixheaderFuncList[i]();
    }
  }
}
var g_seiSmartphone = false;
var g_seiSmartphone2 = false;
var g_seiTouchevent = false;
var g_seiSwipeevent = false;
function SeiAdjustErrorDispScroll(x_element, x_scrollSize) {
  var p_scrollPos = SeiGetScrollPos();
  var p_windowSize = SeiGetWindowSize();
  var p_elementPos = SeiGetPosition(x_element, false);
  var p_elementBottom = p_elementPos.y + x_element.offsetHeight;
  var p_dataDivElem = null;
  var p_dataDivElemPrefix = '';
  var p_parent = x_element;
  for (var i = 0; i < 10; i++) {
    p_parent = p_parent.parentNode;
    if (!p_parent) {
      break;
    }
    if (p_parent.id && (SeiStringEndsWith(p_parent.id, 'div_data') || SeiStringEndsWith(p_parent.id, 'div_datah')
        || SeiStringEndsWith(p_parent.id, 'div_rowdata') || SeiStringEndsWith(p_parent.id, 'div_rowhdr'))) {
      p_dataDivElem = p_parent;
      var p_idx = p_parent.id.indexOf('div_');
      if (p_idx > 0) {
        p_dataDivElemPrefix = p_parent.id.substring(0, p_idx);
      }
      break;
    }
  }
  if (p_dataDivElem) {
    var p_dataDivPos = SeiGetPosition(p_dataDivElem, false);
    var p_limitPos = p_dataDivPos.y + p_dataDivElem.offsetHeight - p_scrollPos.top;
    var p_totDiv = document.all(p_dataDivElemPrefix + 'div_tot_data');
    if (!p_totDiv) {
      p_totDiv = document.all(p_dataDivElemPrefix + 'div_pagetot_data');
    }
    if (!p_totDiv) {
      p_limitPos = p_limitPos - 15;
    }
    var p_adjustHeight = x_scrollSize - (p_limitPos - (p_elementBottom - p_dataDivElem.scrollTop - p_scrollPos.top)); 
    if (p_adjustHeight > 0) {
      p_dataDivElem.scrollTop = p_dataDivElem.scrollTop + p_adjustHeight;
    }
    p_limitPos = p_windowSize.height;
    p_adjustHeight = x_scrollSize - (p_limitPos - (p_elementBottom - p_dataDivElem.scrollTop - p_scrollPos.top)); 
    if (p_adjustHeight > 0) {
      scrollTo(p_scrollPos.left, p_scrollPos.top + p_adjustHeight);
    }
  } else {
    var p_limitPos = p_windowSize.height;
    var p_adjustHeight = x_scrollSize - (p_limitPos - (p_elementBottom - p_scrollPos.top)); 
    if (p_adjustHeight > 0) {
      scrollTo(p_scrollPos.left, p_scrollPos.top + p_adjustHeight);
    }
  }
}
function SeiSetTitleShowHide(x_prefix, x_key, x_flag) {
  var p_name = 'sei_titleshowhide';
  if (x_prefix) {
    p_name = x_prefix + '_' + p_name
  }
  for (var i = 0; i < document.forms.length; i++) {
    var p_elems = document.forms[i].elements;
    var p_set = false;
    for (var j = 0; j < p_elems.length; j++) {
      if (p_elems[j].type == 'hidden' && p_elems[j].name == p_name) {
        var p_value = p_elems[j].value;
        var p_array = p_value.split(',');
        var p_upd = false;
        for (var k = 0; k < p_array.length; k++) {
          if (p_array[k].indexOf(x_key + '=') == 0) {
            p_array[k] = x_key + '=' + x_flag;
            p_upd = true;
            break;
          }
        }
        if (!p_upd) {
          p_array[p_array.length] = x_key + '=' + x_flag;
        }
        p_elems[j].value = p_array.join(',');
        p_set = true;
        break;
      }
    }
    if (!p_set) {
      var p_hideElem = document.createElement('input');
      p_hideElem.type = 'hidden';
      p_hideElem.name = p_name;
      p_hideElem.value = x_key + '=' + x_flag;
      document.forms[i].appendChild(p_hideElem);
    }
  }
}
function SeiGetElement(x_elem) {
  if (typeof x_elem == 'string') {
    return document.all(x_elem);
  }
  return x_elem;
}
function SeiGetWindowSize() {
  if (document.documentElement && document.documentElement.clientWidth != 0) {
    return { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight };
  } else {
    return { width: document.body.clientWidth, height: document.body.clientHeight };
  }
}
function SeiGetScrollPos() {
  return document.compatMode == 'CSS1Compat' ? { left : (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : 0), top : (document.documentElement.scrollTop ? document.documentElement.scrollTop : 0) }
    : { left : (document.body.scrollLeft ? document.body.scrollLeft : 0), top : (document.body.scrollTop ? document.body.scrollTop : 0) };
}
function SeiGetPosition(x_element, x_scroll) {
  var p_x = 0, p_y = 0;
  if (x_scroll && x_element.style.position == 'absolute') {
    p_x += SeiGetScrollPos().left; p_y += SeiGetScrollPos().top;
  }
  while (x_element) {
    p_x += x_element.offsetLeft; p_y += x_element.offsetTop;
    if (x_scroll) {
      if (x_element.scrollLeft) p_x -= x_element.scrollLeft;
      if (x_element.scrollTop) p_y -= x_element.scrollTop;
    }
    x_element = x_element.offsetParent;
  }
  var p_ret = { x : p_x, y : p_y };
  return p_ret;
}
function SeiCheckOverlap(x_elem1, x_elem2) {
  var p_pos1 = SeiGetPosition(x_elem1, true);
  var p_pos2 = SeiGetPosition(x_elem2, true);
  return p_pos1.x <= p_pos2.x + x_elem2.offsetWidth && p_pos1.y <= p_pos2.y + x_elem2.offsetHeight && p_pos1.x + x_elem1.offsetWidth >= p_pos2.x && p_pos1.y + x_elem1.offsetHeight >= p_pos2.y;
}
function SeiHideSelectOverDiv(x_divElem, x_form) {
  var p_length = x_form.elements.length, i, p_ret = [];
  for (i=0; i<p_length; i++) {
    var p_elem = x_form.elements[i];
    if (p_elem.tagName != 'SELECT' || !SeiCheckOverlap(x_divElem, p_elem)) continue;
    if (p_elem.style.visibility == 'hidden') continue;
    if (p_elem == document.activeElement) p_elem.blur();
    p_elem.style.visibility = 'hidden';
    p_ret.push(p_elem);
  }
  return p_ret;
}
function SeiDispSelectOverDiv(x_divElem, x_form, x_all) {
  var p_length = x_form.elements.length, i;
  if (arguments.length >= 3 && x_all) {
    for (i=0; i<p_length; i++) {
      var p_elem = x_form.elements[i];
      if (p_elem.tagName != 'SELECT' || p_elem.style.visibility != 'hidden') continue;
      p_elem.style.visibility = '';
    }
  }
  for (i=0; i<p_length; i++) {
    var p_elem = x_form.elements[i];
    if (p_elem.tagName != 'SELECT' || p_elem.style.visibility != 'hidden' || !SeiCheckOverlap(x_divElem, p_elem)) continue;
    p_elem.style.visibility = '';
  }
}
function SeiSetOpacity(x_elem, x_opac) {
  if (x_opac == 1) {
    x_elem.style.opacity = ''; x_elem.style.MozOpacity = '';
  } else {
    x_elem.style.opacity = x_opac; x_elem.style.MozOpacity = x_opac;
  }
}
var g_seiScrollErrPopup = null;
var g_seiScrollErrPopup2 = null;
var g_seiScrollErrPopup3 = null;
function SeiAdjustScrollErrPopup(x_scrollDiv) {
  if (!g_seiScrollErrPopup) return
  g_seiScrollErrPopup2 = x_scrollDiv;
  var p_adjust = false, p_parent = g_seiScrollErrPopup.parentNode;
  while (p_parent) {
    if (p_parent == x_scrollDiv) {
      p_adjust = true; break;
    }
    p_parent = p_parent.parentNode;
  }
  if (!p_adjust) return;
  setTimeout(function(){SeiAdjustScrollErrPopup2(x_scrollDiv);},0);
}
function SeiAdjustScrollErrPopup2(x_scrollDiv) {
  if (!g_seiScrollErrPopup) return
  if (!x_scrollDiv) return
  var p_pos0 = SeiGetPosition(g_seiScrollErrPopup), p_pos1 = SeiGetPosition(x_scrollDiv);
  var p_w0 = g_seiScrollErrPopup.offsetWidth; var p_h0 = g_seiScrollErrPopup.offsetHeight;
  var p_s0 = SeiGetScrollPos();
  var p_pos3 = SeiGetPosition(g_seiScrollErrPopup3);
  var p_left = p_pos3.x - p_s0.left; var p_top = p_pos3.y - p_s0.top;
  if (x_scrollDiv) {
    p_left = p_left - x_scrollDiv.scrollLeft;
    p_top = p_top - x_scrollDiv.scrollTop + g_seiScrollErrPopup3.offsetHeight;
  }
  g_seiScrollErrPopup.style.left = p_left + 'px';
  g_seiScrollErrPopup.style.top = p_top + 'px';
  g_seiScrollErrPopup.style.display = 'none';
  if (p_left + p_s0.left + p_w0 < p_pos1.x || p_left + p_s0.left > p_pos1.x + x_scrollDiv.offsetWidth
      || p_top + p_s0.top + p_h0 < p_pos1.y || p_top + p_s0.top > p_pos1.y + x_scrollDiv.offsetHeight) {
    SeiSetOpacity(g_seiScrollErrPopup, 0);
    return;
  }
  g_seiScrollErrPopup.style.display = '';
  SeiSetOpacity(g_seiScrollErrPopup, 1);
}
SeiAddEventListener(window, 'scroll', function() {SeiEnableScrollErrPopup(g_seiScrollErrPopup, true, g_seiScrollErrPopup3);});
function SeiEnableScrollErrPopup(x_errpopup, x_enable, x_input) {
  if (x_enable) {
    if (!x_errpopup) return;
    g_seiScrollErrPopup = x_errpopup;
    g_seiScrollErrPopup3 = x_input;
    var p_parent = x_errpopup.parentNode, p_scrollDiv = null;
    while (p_parent) {
      if (!p_parent.style) break;
      if (p_parent.style.overflow == 'scroll' || p_parent.style.overflow == 'hidden' || p_parent.style.overflowX == 'scroll' || p_parent.style.overflowY == 'scroll' || p_parent.className == 'SeiScrollDiv') {
        p_scrollDiv = p_parent; break;
      }
      p_parent = p_parent.parentNode;
    }
    var p_disp = x_errpopup.style.display;
    x_errpopup.style.display = '';
    x_errpopup.style.width = '';
    x_errpopup.style.whiteSpace = 'nowrap';
    x_errpopup.style.width = (x_errpopup.offsetWidth + 5) + 'px';
    x_errpopup.style.whiteSpace = '';
    var p_pos0 = SeiGetPosition(x_errpopup), p_ws = SeiGetWindowSize(), p_sc = SeiGetScrollPos();
    var p_width = p_ws.width - p_pos0.x + p_sc.left;
    if (p_pos0.x - p_sc.left + x_errpopup.offsetWidth >= p_ws.width && p_width >= 0) {
      x_errpopup.style.width = p_width + 'px';
    }
    x_errpopup.style.display = p_disp;
    if (p_scrollDiv) {
      setTimeout(function(){SeiAdjustScrollErrPopup2(p_scrollDiv);},0);
    } else {
      x_errpopup.style.display = '';
    }
    if (g_seiScrollErrPopup2) SeiAdjustScrollErrPopup(g_seiScrollErrPopup2);
  } else {
    g_seiScrollErrPopup = null;
    g_seiScrollErrPopup3 = null;
    x_errpopup.style.display = 'none';
  }
}
function SeiCheckClassName(x_elem, x_class) {
  var p_elem = SeiGetElement(x_elem);
  if (!p_elem || !p_elem.className) return false
  var p_classes = p_elem.className.split(/\s+/);
  for (var i=0; i<p_classes.length; i++) {
    if (p_classes[i] == x_class) return true;
  }
  return false;
}
