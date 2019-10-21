/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app.css":
/*!*****************!*\
  !*** ./app.css ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./app.css?");

/***/ }),

/***/ "./src/PlayList.js":
/*!*************************!*\
  !*** ./src/PlayList.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return PlayList; });\nclass PlayList {\r\n    constructor(el, app){\r\n        this.app = app;\r\n        this.listDom = document.querySelector(el);\r\n        this.itemList = this.listDom.querySelector(\".item-list\");\r\n        this.addBtn = this.listDom.querySelector(\"#openDialog\");\r\n        this.fileInput = this.listDom.querySelector(\"#audioFile\");\r\n\r\n        this.itemList.innerHTML = \"\";\r\n        this.fileList = []; //플레이리스트 상에 있는 음악파일들을 저장\r\n        this.playIdx = null; //현재 재생중인 음악의 인덱스를 저장\r\n\r\n        this.currentMusic = null;\r\n\r\n        //우클릭 메뉴\r\n        this.contextMenu = document.querySelector(\"#context\");\r\n        this.contextTargetItem = null;\r\n\r\n        this.addListener();\r\n    }\r\n\r\n    addListener(){\r\n        this.addBtn.addEventListener(\"click\", e => this.fileInput.click());\r\n        this.fileInput.addEventListener(\"change\", this.inputChange.bind(this));\r\n\r\n        this.listDom.addEventListener(\"dragover\", this.fileDragOver.bind(this));\r\n        this.listDom.addEventListener(\"drop\", this.fileDrop.bind(this));\r\n\r\n        this.contextMenu.querySelector(\"#del\").addEventListener(\"click\", (e)=>{\r\n            console.log(this.contextTargetItem);\r\n            e.stopPropagation();\r\n        });\r\n\r\n        document.querySelector(\"body\").addEventListener(\"click\", (e)=> {\r\n            this.contextMenu.style.visibility = \"hidden\";\r\n            this.contextTargetItem = null;\r\n        });\r\n        this.itemList.addEventListener(\"dragover\", this.fileDrop.bind(this));\r\n        this.itemList.addEventListener(\"drop\", this.itemDrop.bind(this));\r\n    }\r\n\r\n    itemDrop(e){\r\n        let data = e.dataTransfer.getData(\"idx\");\r\n        if(data != \"\"){\r\n            e.stopPropagation();\r\n            e.preventDefault();\r\n            console.log(\"아이템 드랍\");\r\n            let y = e.clientY; //마우스가 드랍된 y의 좌표를 구한다.\r\n            \r\n            let target = -1;\r\n        \r\n            for(let i = 0; i < this.fileList.length; i++){\r\n                console.log(y, this.fileList[i].dom.getBoundingClientRect().top);\r\n                if(this.fileList[i].dom.getBoundingClientRect().top > y){\r\n                    target = i;\r\n                    break;\r\n                }\r\n            }\r\n            console.log(target);\r\n            //find는 해당 조건을 만족하는 것이 나오면 true를 반환하는 거\r\n            let moveItem = this.fileList.find(x => x.idx == data * 1);\r\n            if(target >= 0){\r\n                this.itemList.insertBefore(moveItem.dom, this.fileList[target].dom);\r\n            }else {\r\n                this.itemList.appendChild(moveItem.dom);\r\n            }\r\n\r\n            this.fileList.sort( (a, b) => {\r\n                return a.dom.getBoundingClientRect().top\r\n                     - b.dom.getBoundingClientRect().top\r\n            });\r\n\r\n        }else {\r\n            console.log(\"파일 드랍 밑으로 이벤트 전파\");\r\n        }\r\n    }\r\n\r\n    fileDragOver(e){\r\n        e.preventDefault();\r\n        e.stopPropagation();\r\n    }\r\n    fileDrop(e){\r\n        e.preventDefault();\r\n        e.stopPropagation();\r\n        let files = Array.from(e.dataTransfer.files);\r\n        this.addList(files);\r\n    }\r\n\r\n    inputChange(e){\r\n        let files = Array.from(e.target.files);\r\n        this.addList(files);\r\n    }\r\n\r\n    addList(files) {\r\n        files.forEach(file => {\r\n            console.log(file);\r\n            if(file.type.substring(0, 5) !== \"audio\") {\r\n                return;\r\n            }\r\n            let obj = {idx: this.fileList.length, file: file, dom: null};\r\n            this.fileList.push(obj);\r\n            let item = document.createElement(\"li\");\r\n            item.classList.add(\"item\");\r\n            obj.dom = item;\r\n            item.addEventListener(\"dblclick\", (e) => {\r\n                let data = this.fileList.find(x => x.idx == obj.idx);\r\n                this.playItem(data);\r\n            });\r\n            \r\n            item.setAttribute(\"draggable\", true);\r\n            //item.removeAttribute(\"draggable\");\r\n            item.addEventListener(\"dragstart\", (e)=>{\r\n                e.dataTransfer.setData(\"idx\", obj.idx);\r\n                e.dataTransfer.setDragImage(e.target, 0, 0);\r\n            });\r\n\r\n            //음악에 우클릭시 행동\r\n            item.addEventListener(\"contextmenu\", (e)=>{\r\n                e.preventDefault();\r\n                e.stopPropagation();\r\n                this.contextTargetItem = obj; // 우클릭된 아이템이 들어간다.\r\n                this.contextMenu.style.top = e.pageY + \"px\";\r\n                this.contextMenu.style.left = e.pageX + \"px\";\r\n                this.contextMenu.style.visibility = \"visible\";\r\n            });\r\n\r\n            item.innerHTML = file.name;\r\n            this.itemList.appendChild(item);\r\n        });\r\n    }\r\n\r\n    playItem(data){\r\n        this.fileList.forEach(file => {\r\n            file.dom.classList.remove(\"active\");\r\n        });\r\n\r\n        this.currentMusic = data.idx;  //현재 재생중인 음악의 idx를 저장\r\n\r\n        data.dom.classList.add(\"active\");\r\n        this.app.player.loadMusic(data.file);\r\n    }\r\n\r\n    getNextMusic(loop){\r\n        let now = this.fileList.findIndex(x => x.idx == this.currentMusic);\r\n        if(now < this.fileList.length - 1){\r\n            this.playItem(this.fileList[now + 1]);\r\n        }else if(loop){\r\n            this.playItem(this.fileList[0]);\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/PlayList.js?");

/***/ }),

/***/ "./src/Player.js":
/*!***********************!*\
  !*** ./src/Player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Player; });\nconst MODE = {\r\n    \"NO\":0,\r\n    \"ONE\":1,\r\n    \"LIST\":2\r\n};\r\n\r\nclass Player {\r\n    constructor(el, app){\r\n        this.app = app;\r\n        this.playerDom = document.querySelector(el);\r\n        this.audio = this.playerDom.querySelector(\"audio\");\r\n        this.playBtn = this.playerDom.querySelector(\".play\");\r\n        this.stopBtn = this.playerDom.querySelector(\".stop\");\r\n\r\n        this.progressBar = this.playerDom.querySelector(\".bar\");\r\n\r\n        this.currentSpan = this.playerDom.querySelector(\".current-time\");\r\n        this.totalSpan = this.playerDom.querySelector(\".total-time\");\r\n\r\n        this.progress = this.playerDom.querySelector(\".progress\");\r\n        this.fileName = this.playerDom.querySelector(\".file-name\");\r\n\r\n        this.playable = false; //현재 플레이가 가능한가?\r\n\r\n        this.repeatMode = MODE.NO; //최초에는 반복 없음으로\r\n        this.modeBtnList = document.querySelectorAll(\".repeat-btn\");\r\n\r\n        this.canvas = this.playerDom.querySelector(\".visualizer > canvas\");\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        const visual = this.playerDom.querySelector(\".visualizer\");\r\n        this.canvas.width = visual.clientWidth;\r\n        this.canvas.height = visual.clientHeight;\r\n\r\n        this.aCtx = null;\r\n        this.analyser = null;\r\n        this.dataArray = null;\r\n        this.barHeight = 0;\r\n        this.x = 0;\r\n        this.barWidth = null; //캔버스에 그려줄 바의 너비\r\n\r\n        this.addListener();\r\n        requestAnimationFrame(this.frame.bind(this));\r\n    }\r\n\r\n    initVisual(){\r\n        this.aCtx = new AudioContext();\r\n        //현재 오디오 태그로부터 미디어 소스를 가져온다.\r\n        let audioSrc = this.aCtx.createMediaElementSource(this.audio);\r\n        //분석기를 생성한다.\r\n        this.analyser = this.aCtx.createAnalyser();\r\n        //뽑아온 미디어 소스를 오디오 컨텍스트와 분석기에 연결한다.\r\n        audioSrc.connect(this.aCtx.destination);\r\n        audioSrc.connect(this.analyser);\r\n\r\n        this.analyser.fftSize = 512; //512개 레벨로 사운드 바가 만들어짐.\r\n\r\n        //여기서부터 밥먹고 설명해야 해!\r\n        const W = this.canvas.width;\r\n        \r\n        const bufferLength = this.analyser.frequencyBinCount; // 256가나옴.\r\n        this.barWidth = ( W / (bufferLength + 1));\r\n        console.log(W, this.barWidth);\r\n        this.dataArray = new Uint8Array(bufferLength);\r\n    }\r\n\r\n    addListener(){\r\n        this.playBtn.addEventListener(\"click\",  this.play.bind(this));\r\n        this.stopBtn.addEventListener(\"click\",  this.stop.bind(this));\r\n        this.progress.addEventListener(\"click\", this.changeSeeking.bind(this));\r\n        this.audio.addEventListener(\"ended\", this.musicEnd.bind(this));\r\n\r\n        this.modeBtnList.forEach(btn => {\r\n            btn.addEventListener(\"click\", (e)=>{\r\n                this.repeatMode = e.target.value * 1;\r\n            });\r\n        });\r\n    }\r\n\r\n    musicEnd(){\r\n        //음악이 끝났을 때 해야할 일 \r\n        //모드에 따라서 다음곡을 재생할지 이곡을 반복할지를 결정해야 한다.\r\n        if(this.repeatMode == MODE.ONE){ //한곡반복 모드\r\n            this.audio.play();\r\n        }else if(this.repeatMode == MODE.LIST) {\r\n            this.app.playList.getNextMusic(true); //루프를 적용해서 다음음악\r\n        }else if(this.repeatMode == MODE.NO){\r\n            this.app.playList.getNextMusic(false); //루프 미적용\r\n        }\r\n    }\r\n\r\n    changeSeeking(e){\r\n        if(!this.playable) return;  //재생불가능할 경우 실행하지 않는다.\r\n        let target = e.offsetX / this.progress.clientWidth * this.audio.duration;\r\n        this.audio.currentTime = target;\r\n    }\r\n\r\n    play(){\r\n        if(!this.playable) return;\r\n        this.audio.play();\r\n    }\r\n\r\n    stop(){\r\n        if(!this.playable) return;\r\n        this.audio.pause();\r\n    }\r\n\r\n    frame(timestamp){\r\n        requestAnimationFrame(this.frame.bind(this));\r\n        if(!this.playable) return;\r\n        this.analyser.getByteFrequencyData(this.dataArray);\r\n\r\n        this.render();\r\n    }\r\n\r\n    render(){\r\n        if(!this.playable) return;\r\n        let current = this.audio.currentTime;\r\n        let duration = this.audio.duration;\r\n        this.progressBar.style.width = `${current / duration * 100}%`;\r\n\r\n        this.currentSpan.innerHTML = current.timeFormat();\r\n        this.totalSpan.innerHTML = duration.timeFormat();\r\n\r\n        const ctx = this.ctx;\r\n        const W = this.canvas.width;\r\n        const H = this.canvas.height;\r\n\r\n        ctx.fillStyle = \"rgba(0,0,0,0.2)\";\r\n        ctx.fillRect(0, 0, W, H); //매 프레임마다 캔버스를 검게 칠해준다. \r\n        this.dataArray.forEach( (x, idx) => {\r\n            ctx.fillStyle = this.getColor(x);\r\n            ctx.fillRect(idx * (this.barWidth + 1), (H - x), this.barWidth, x);\r\n        });\r\n    }\r\n\r\n    getColor(value){\r\n        let p = value / 255;  // 0 ~ 1\r\n        if(p > 0.8){\r\n            return \"#e3f2fd\";\r\n        } else if ( p > 0.6 ){\r\n            return \"#90caf9\";\r\n        } else if ( p > 0.4) {\r\n            return \"#29b6f6\";\r\n        } else if (p > 0.2){\r\n            return \"#0288d1\";\r\n        }else {\r\n            return \"#01579b\";\r\n        }\r\n    }\r\n\r\n    loadMusic(musicFile) {\r\n        if(this.aCtx == null){\r\n            this.initVisual();\r\n        }\r\n        let fileURL = URL.createObjectURL(musicFile);\r\n        this.audio.pause();\r\n        this.audio.src = fileURL;\r\n        \r\n        this.audio.addEventListener(\"loadeddata\", ()=>{\r\n            this.fileName.innerHTML = musicFile.name;\r\n            this.playable = true;\r\n            this.audio.play();\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack:///./src/Player.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Player.js */ \"./src/Player.js\");\n/* harmony import */ var _PlayList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlayList.js */ \"./src/PlayList.js\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! electron */ \"electron\");\n/* harmony import */ var electron__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(electron__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app.css */ \"./app.css\");\n/* harmony import */ var _app_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_app_css__WEBPACK_IMPORTED_MODULE_3__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nNumber.prototype.timeFormat = function(){\r\n    let h = \"0\" + Math.floor(this / 3600);\r\n    h = h.substring(h.length - 2, h.length);\r\n    let m = \"0\" + Math.floor(this % 3600 / 60);\r\n    m = m.substring(m.length - 2, m.length);\r\n    let s = \"0\" + Math.floor(this % 60);\r\n    s = s.substring(s.length - 2, s.length);\r\n    return `${h} : ${m} : ${s}`;\r\n}\r\n\r\nclass App{\r\n    constructor(playerEL, listEL){\r\n        this.player = new _Player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerEL, this);\r\n        this.playList = new _PlayList_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"](listEL, this);\r\n    }\r\n}\r\n\r\nwindow.addEventListener(\"load\", ()=>{\r\n    let app = new App(\"#player\", \"#playList\");\r\n});\r\n\r\nwindow.addEventListener(\"keydown\", (e)=>{\r\n    if(e.ctrlKey && e.key.toLowerCase() == \"q\"){\r\n        electron__WEBPACK_IMPORTED_MODULE_2__[\"ipcRenderer\"].send(\"openDev\");\r\n    }\r\n});\n\n//# sourceURL=webpack:///./src/app.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ })

/******/ });