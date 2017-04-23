// JavaScript Document

function doMove(obj, attr, dir, target, time, endFn) {
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var speed = parseInt(getStyle(obj, attr));
		if (speed > target && dir > 0 || speed < target && dir < 0) speed = target;
		obj.style[attr] = speed + dir + 'px';
		if (speed == target) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	}, time);
} //对象行动函数

function getStyle(obj, arr) {
	return obj.currentStyle ? obj.currentStyle[arr] : getComputedStyle(obj)[arr];
} //获取style样式函数

function shack(obj, attr, hz, shackT, endFn) {
	var arr = [];
	obj.pos = parseInt(getStyle(obj, attr));
	var num = 0;
	for (var i = hz; i > 0; i -= 2) {
		arr.push(i, -i);
	}
	arr.push(0);
	clearInterval(obj.shack);
	obj.shack = setInterval(function() {
		obj.style[attr] = obj.pos + arr[num] + 'px';
		num++;
		if (num === arr.length) clearInterval(obj.shack);
		endFn && endFn();
	}, shackT);
} //抖动函数

function addZero(n) {
	return n < 10 ? '0' + n : '' + n;
} //在数字前加个0;

function SDjshi(obj, s) {
	var time = null;
	time = setInterval(function() {
		var str = '';
		s -= 1
		if (s >= 0) {
			wriHtml();
		} else clearInterval(time);
	}, 1000);
	wriHtml();

	function wriHtml() {
		str = Math.floor(s / 864000) + '天' + Math.floor(s % 86400 / 3600) + '时' + Math.floor(s % 86400 % 3600 / 60) + '分' + s % 60 + '秒';
		obj.innerHTML = str;
	}
} //短时间倒计时

function LDjshi(obj, y, mon, d, h, m) {
	var iNew = new Date();
	var time = null;
	time = setInterval(function() {
		var iNow = new Date(y, mon, d, h, m);
		var str = '';

		t = Math.floor((iNew - iNow) / 1000);
		if (t >= 0) {
			wriHtml();
		} else clearInterval(time);
	}, 1000);
	wriHtml();

	function wriHtml() {
		str = Math.floor(t / 864000) + '天' + Math.floor(t % 86400 / 3600) + '时' + Math.floor(t % 86400 % 3600 / 60) + '分' + t % 60 + '秒';
		obj.innerHTML = str;
	}
} //年月日显示函数

function opChange(obj, opV, opTarget, opT, endFn) {
	var oOpacity = null;
	opV = parseFloat(obj.style.opacity) < opTarget / 100 ? opV : -opV;
	clearInterval(oOpacity);
	oOpacity = setInterval(function() {
		var opNow = parseFloat(obj.style.opacity);
		if (opNow < opTarget / 100 && opV < 0 || opNow > opTarget / 100 && opV > 0) opNow = opTarget / 100;
		obj.style.opacity = opNow + opV / 100;
		if (opNow == opTarget / 100) {
			clearInterval(oOpacity);
			endFn && endFn();
		}
	}, opT);
} //透明度变化函数

function getElementsByClassName(parent, tagName, className) {
	var aA = parent.getElementsByTagName(tagName);
	var arr = [];
	for (var i = 0; i < aA.length; i++) {
		var aClassName = aA[i].className.split(' ');
		for (var j = 0; j < aA.length; j++) {
			if (aClassName[j] == className) {
				arr.push(aA[i]);
				break;
			}
		}
	}
	return arr;
} //获取class的函数；

function addClass(obj, className) {
	//检测是否有ClassName
	if (obj.className == '') {
		obj.className = className;
	} //如果没有ClassName
	else {
		var aClassName = obj.className.split(' ');
		var _index = arrIndexOf(aClassName, className);
		if (_index == -1) {
			obj.className += ' ' + className;
		} //如果有ClassName且该ClassName不存在
	} //如果有ClassName
} //动态添加ClassName

function removeClass(obj, className) {
	//检测是否有ClassName
	if (obj.className != '') {
		var aClassName = obj.className.split(' ');
		var _index = arrIndexOf(aClassName, className);
		if (_index != -1) {
			aClassName.splice(_index, 1);
			obj.className = aClassName.join(' ');
		}
	}
} //清除className 函数	

function arrIndexOf(arr, v) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == v) return i;
	}
	return -1;
} //存在性判断函数;

function Draft(obj) {
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop; //鼠标位置-对象离窗口距离=鼠标到对象边框距离
		if (obj.setCapture) {
			obj.setCapture();
		} //setCapture:鼠标捕获，不管鼠标事件在哪里发生，仅作用于当前对象；
		document.onmousemove = function(ev) {
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY; //鼠标位置-鼠标到对象边框距离=对象位置
			if (L < 0) {
				L = 0;
			} else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
				L = document.documentElement.clientWidth - obj.offsetWidth
			} //拖拽限制（宽度）
			if (T < 0) {
				T = 0;
			} else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
				T = document.documentElement.clientHeight - obj.offsetHeight
			} //拖拽限制（高度）
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}
		document.onmouseup = function() {
				obj.onmouseup = document.onmousemove = null;
				if (obj.releaseCapture) obj.releaseCapture();
			} //releaseCapture:释放鼠标捕获事件。
		return false;
	}
} //鼠标拖拽事件

function CheckBump(obj, beobj, CFn, UCFn) {
	/*
	参数：定义
	obj:活动对象
	beobj：检测对象
	CFn:碰撞时发生的事件
	UCFn：结束或未碰撞时发生的事件
	*/
	obj.onmousedown = function(ev) {
		var ev = ev || event;
		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop; //鼠标位置-对象离窗口距离=鼠标到对象边框距离
		if (obj.setCapture) {
			obj.setCapture();
		} //setCapture:鼠标捕获，不管鼠标事件在哪里发生，仅作用于当前对象；
		document.onmousemove = function(ev) {
			var ev = ev || event;
			var L = ev.clientX - disX;
			var T = ev.clientY - disY; //鼠标位置-鼠标到对象边框距离=对象位置
			var R = L + obj.offsetWidth;
			var B = T + obj.offsetHeight;
			if (L < 0) {
				L = 0;
			} else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
				L = document.documentElement.clientWidth - obj.offsetWidth
			} //拖拽限制（宽度）
			if (T < 0) {
				T = 0;
			} else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
				T = document.documentElement.clientHeight - obj.offsetHeight
			} //拖拽限制（高度）

			var DL = beobj.offsetLeft;
			var DT = beobj.offsetTop;
			var DR = DL + beobj.offsetWidth;
			var DB = DT + beobj.offsetHeight; //定义被检测物体各边框的位置

			if (R >= DL && B >= DT && T <= DB && L <= DR) CFn && CFn();
			else UCFn && UCFn();

			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
		}
		document.onmouseup = function() {
				obj.onmouseup = document.onmousemove = null;
				if (obj.releaseCapture) obj.releaseCapture();
			} //releaseCapture:释放鼠标捕获事件。
		return false;
	}
} //碰撞检测

function PreMove(obj, json, endFn) {
	/*
	obj：对象
	json：{对象属性：目标位置}
	endFn：结束函数
	*/
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		for (var attr in json) {
			var bStop = true;
			var iCur = 0;

			if (attr == 'opacity') {
				iCur = parseInt(parseFloat(getStyle(obj, attr)) * 100);
			} else {
				iCur = parseInt(getStyle(obj, attr));
			} //获取当前对象状态

			var iSpeed = (json[attr] - iCur) / 8;
			/*这里json只能用json[xxx]而不能用json.xxx;因为json.xxx是json带的属性而不是传入的参数*/
			iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed); //定位，设置对象状态改变速度

			if (iCur != json[attr]) bStop = false; //检测所有状态是否完成改变

			if (attr == 'opacity') {
				obj.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
				obj.style.opacity = (iCur + iSpeed) / 100;
			} else {
				obj.style[attr] = iCur + iSpeed + 'px';
			} //改变状态
		}
		if (bStop) {
			clearInterval(obj.timer);
			if (endFn) endFn();
		} //所有状态已改变，可以停止定时器并执行完成函数
	}, 30)
} //完美运动框架

/*
封装日历函数 calendar(faId,width,height,year,month)
* faId:将要写入的父级元素
* width:日历中每个方块间隔的宽度
* height：日历中每个方块间隔的高度
* year:给定日历的年份（1583年之前的不可取）
* month:给定日历的月份 
* */
function calendar(faId, width, height, year, month) {
	//获取li
	var aLi = faId.getElementsByTagName('li');
	//检测year和month是否有值
	if (year = '' || month = '') {
		return false;
	}
	//月份天数
	function getMonthDay(iyear, imonth) {
		var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
		if (((iyear % 4 == 0) && (iyear % 100 != 0)) || (iyear % 400 == 0)) days[1] = 29;
		return days[imonth - 1];
	}
	//蔡勒公式
	function caile(iYear, iMonth, iDate) {
		var m = iMonth;
		var d = iDate;
		if (m == 1) {
			m = 13;
			iYear--;
		} else if (m == 2) {
			m = 14;
			iYear--;
		}
		var y = parseInt(iYear % 100);
		var c = (iYear - y) / 100;
		var w = y + parseInt(y / 4) + parseInt(c / 4) - 2 * c + parseInt(26 * (m + 1) / 10) + d - 1;
		if (w < 0) w = -w;
		var sum = parseInt(w % 7);
		return sum;
	}
	var monDays = getMonthDay(year, month);

	for (var i = 0; i < monDays; i++) {
		faId.innerHTML += "<li>" + (i + 1) + "</li>";
		aLi[i].w = caile(year, month, i + 1);
		aLi[i].style.left = aLi[i].w * (aLi[i].offsetWidth + width) + 'px';
		var j = i - aLi[i].w;
		if (j >= -5 && j <= 1) aLi[i].t = 0;
		else if (j >= 2 && j <= 8) aLi[i].t = 1;
		else if (j >= 9 && j <= 15) aLi[i].t = 2;
		else if (j >= 16 && j <= 22) aLi[i].t = 3;
		else if (j >= 23 && j <= 29) aLi[i].t = 4;
		else if (j >= 30) aLi[i].t = 5;
		aLi[i].style.top = aLi[i].t * (aLi[i].offsetHeight + height) + 'px';

	}

}