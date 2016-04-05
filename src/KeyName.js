module.exports = function(code){
	var key_names = {
		8: 'BACKSPACE',
		9: 'TAB',
		13: 'ENTER',
		16: 'SHIFT',
		17: 'CTRL',
		18: 'ALT',
		19: 'PAUSE',
		20: 'CAPS_LOCK',
		27: 'ESCAPE',
		32: 'SPACE',
		33: 'PAGE_UP',
		34: 'PAGE_DOWN',
		35: 'END',
		36: 'HOME',
		37: 'LEFT',
		38: 'UP',
		39: 'RIGHT',
		40: 'DOWN',
		45: 'INSERT',
		46: 'DELETE',
		144: 'NUM_LOCK',
		145: 'SCROLL_LOCK',
		222: "'"
	};
		//字母和数字键的键码值
	var num1_name = {
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9'
	};
	var letter_name = {
		65: 'A',
		66: 'B',
		67: 'C',
		68: 'D',
		69: 'E',
		70: 'F',
		71: 'G',
		72: 'H',
		73: 'I',
		74: 'J',
		75: 'K',
		76: 'L',
		77: 'M',
		78: 'N',
		79: 'O',
		80: 'P',
		81: 'Q',
		82: 'R',
		83: 'S',
		84: 'T',
		85: 'U',
		86: 'V',
		87: 'W',
		88: 'X',
		89: 'Y',
		90: 'Z'
	};
	// 数字键盘上的键的键码值
	var num_name = {
		96: 'NUM0',
		97: 'NUM1',
		98: 'NUM2',
		99: 'NUM3',
		100: 'NUM4',
		101: 'NUM5',
		102: 'NUM6',
		103: 'NUM7',
		104: 'NUM8',
		105: 'NUM9',
		106: 'NUM*',
		107: 'NUM+',
		108: 'NUMENTER',
		109: 'NUM-',
		110: 'NUM.',
		111: 'NUM/'
	};
	//功能键键码值
	var fn_name = {
		112: 'F1',
		113: 'F2',
		114: 'F3',
		115: 'F4',
		116: 'F5',
		117: 'F6',
		118: 'F7',
		119: 'F8',
		120: 'F9',
		121: 'F10',
		122: 'F11',
		123: 'F12'
	};
	//控制键键码值
	var cont_name = {
		8: 'BACKSPACE',
		9: 'TAB',
		12: 'CLEAR',
		13: 'ENTER',
		16: 'SHIFT',
		17: 'CTRL',
		18: 'ALT',
		20: 'CAPE_LOCK',
		27: 'ESC',
		32: 'SPACEBAR',
		33: 'PAGE_UP',
		34: 'PAGE_DOWN',
		35: 'END',
		36: 'HOME',
		37: 'LEFT',
		38: 'UP',
		39: 'RIGHT',
		40: 'DOWN',
		45: 'INSERT',
		46: 'DELETE',
		144: 'NUM_LOCK',
		186: ';',
		187: '=',
		188: ',',
		189: '-',
		190: '.',
		191: '/',
		192: '`',
		219: '[',
		220: "\\",
		221: ']',
		222: "'"
	};
	if (code > 47 && code < 58) {
		return num1_name[code];
	} else if (code > 64 && code < 91) {
		return letter_name[code];
	} else if (code > 95 && code < 112) {
		return num_name[code];
	} else if (code > 111 && code < 124) {
		return fn_name[code];
	} else {
		return cont_name[code]
	};
};