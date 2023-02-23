"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __createBinding = this && this.__createBinding || (Object.create ? function (t, e, i, s) { void 0 === s && (s = i), Object.defineProperty(t, s, { enumerable: !0, get: function () { return e[i]; } }); } : function (t, e, i, s) { t[s = void 0 === s ? i : s] = e[i]; }), __exportStar = this && this.__exportStar || function (t, e) { for (var i in t)
    "default" === i || e.hasOwnProperty(i) || __createBinding(e, t, i); };
Object.defineProperty(exports, "__esModule", { value: !0 }), exports.GridStack = void 0;
var gridstack_engine_1 = require("./gridstack-engine"), utils_1 = require("./utils"), types_1 = require("./types"), dd_gridstack_1 = require("./dd-gridstack"), dd_touch_1 = require("./dd-touch"), dd_manager_1 = require("./dd-manager"), dd = new dd_gridstack_1.DDGridStack;
__exportStar(require("./types"), exports), __exportStar(require("./utils"), exports), __exportStar(require("./gridstack-engine"), exports), __exportStar(require("./dd-gridstack"), exports);
var GridStack = /** @class */ (function () {
    function GridStack(t, e) {
        var _this = this;
        if (e === void 0) { e = {}; }
        this._gsEventHandler = {}, this._extraDragRow = 0, e = e || {}, (this.el = t).classList.contains("grid-stack") || this.el.classList.add("grid-stack"), e.row && (e.minRow = e.maxRow = e.row, delete e.row);
        var i = utils_1.Utils.toNumber(t.getAttribute("gs-row"));
        "auto" === e.column && delete e.column;
        var s = e, r = (void 0 !== s.minWidth && (e.oneColumnSize = e.oneColumnSize || s.minWidth, delete s.minWidth), void 0 !== e.alwaysShowResizeHandle && (e._alwaysShowResizeHandle = e.alwaysShowResizeHandle), Object.assign(Object.assign({}, utils_1.Utils.cloneDeep(types_1.gridDefaults)), { column: utils_1.Utils.toNumber(t.getAttribute("gs-column")) || types_1.gridDefaults.column, minRow: i || utils_1.Utils.toNumber(t.getAttribute("gs-min-row")) || types_1.gridDefaults.minRow, maxRow: i || utils_1.Utils.toNumber(t.getAttribute("gs-max-row")) || types_1.gridDefaults.maxRow, staticGrid: utils_1.Utils.toBool(t.getAttribute("gs-static")) || types_1.gridDefaults.staticGrid, draggable: { handle: (e.handleClass ? "." + e.handleClass : e.handle || "") || types_1.gridDefaults.draggable.handle }, removableOptions: { accept: e.itemClass ? "." + e.itemClass : types_1.gridDefaults.removableOptions.accept } })), o = (t.getAttribute("gs-animate") && (r.animate = utils_1.Utils.toBool(t.getAttribute("gs-animate"))), this.opts = utils_1.Utils.defaults(e, r), e = null, this._initMargin(), 1 !== this.opts.column && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.oneColumnSize && (this._prevColumn = this.getColumn(), this.opts.column = 1), "auto" === this.opts.rtl && (this.opts.rtl = "rtl" === t.style.direction), this.opts.rtl && this.el.classList.add("grid-stack-rtl"), null == (i = utils_1.Utils.closestUpByClass(this.el, types_1.gridDefaults.itemClass)) ? void 0 : i.gridstackNode), n = (o && ((o.subGrid = this).parentGridItem = o, this.el.classList.add("grid-stack-nested"), o.el.classList.add("grid-stack-sub-grid")), this._isAutoCellHeight = "auto" === this.opts.cellHeight, this._isAutoCellHeight || "initial" === this.opts.cellHeight ? this.cellHeight(void 0, !1) : ("number" == typeof this.opts.cellHeight && this.opts.cellHeightUnit && this.opts.cellHeightUnit !== types_1.gridDefaults.cellHeightUnit && (this.opts.cellHeight = this.opts.cellHeight + this.opts.cellHeightUnit, delete this.opts.cellHeightUnit), this.cellHeight(this.opts.cellHeight, !1)), "mobile" === this.opts.alwaysShowResizeHandle && (this.opts.alwaysShowResizeHandle = dd_touch_1.isTouch), this._styleSheetClass = "grid-stack-instance-" + gridstack_engine_1.GridStackEngine._idSeq++, this.el.classList.add(this._styleSheetClass), this._setStaticClass(), this.opts.engineClass || GridStack.engineClass || gridstack_engine_1.GridStackEngine);
        if (this.engine = new n({ column: this.getColumn(), float: this.opts.float, maxRow: this.opts.maxRow, onChange: function (t) { var e = 0; _this.engine.nodes.forEach(function (t) { e = Math.max(e, t.y + t.h); }), t.forEach(function (t) { var e = t.el; e && (t._removeDOM ? (e && e.remove(), delete t._removeDOM) : _this._writePosAttr(e, t)); }), _this._updateStyles(!1, e); } }), this.opts.auto) {
            this.batchUpdate();
            var s_1 = [], r_1 = this.getColumn();
            1 === r_1 && this._prevColumn && (r_1 = this._prevColumn), this.getGridItems().forEach(function (t) { var e = parseInt(t.getAttribute("gs-x")), i = parseInt(t.getAttribute("gs-y")); s_1.push({ el: t, i: (Number.isNaN(e) ? 1e3 : e) + (Number.isNaN(i) ? 1e3 : i) * r_1 }); }), s_1.sort(function (t, e) { return e.i - t.i; }).forEach(function (t) { return _this._prepareElement(t.el); }), this.batchUpdate(!1);
        }
        this.opts.children && (e = this.opts.children, delete this.opts.children, e.length && this.load(e)), this.setAnimation(this.opts.animate), this._updateStyles(), 12 != this.opts.column && this.el.classList.add("grid-stack-" + this.opts.column), this.opts.dragIn && GridStack.setupDragIn(this.opts.dragIn, this.opts.dragInOptions), delete this.opts.dragIn, delete this.opts.dragInOptions, this.opts.subGridDynamic && !dd_manager_1.DDManager.pauseDrag && (dd_manager_1.DDManager.pauseDrag = !0), void 0 !== (null == (t = this.opts.draggable) ? void 0 : t.pause) && (dd_manager_1.DDManager.pauseDrag = this.opts.draggable.pause), this._setupRemoveDrop(), this._setupAcceptWidget(), this._updateWindowResizeEvent();
    }
    GridStack.init = function (t, e) {
        if (t === void 0) { t = {}; }
        if (e === void 0) { e = ".grid-stack"; }
        var i = GridStack.getGridElement(e);
        return i ? (i.gridstack || (i.gridstack = new GridStack(i, utils_1.Utils.cloneDeep(t))), i.gridstack) : ("string" == typeof e ? console.error('GridStack.initAll() no grid was found with selector "' + e + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.') : console.error("GridStack.init() no grid element was passed."), null);
    };
    GridStack.initAll = function (e, t) {
        if (e === void 0) { e = {}; }
        if (t === void 0) { t = ".grid-stack"; }
        var i = [];
        return GridStack.getGridElements(t).forEach(function (t) { t.gridstack || (t.gridstack = new GridStack(t, utils_1.Utils.cloneDeep(e)), delete e.dragIn, delete e.dragInOptions), i.push(t.gridstack); }), 0 === i.length && console.error('GridStack.initAll() no grid was found with selector "' + t + '" - element missing or wrong selector ?\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.'), i;
    };
    GridStack.addGrid = function (e, i) {
        if (i === void 0) { i = {}; }
        if (!e)
            return null;
        var s = e;
        if (!e.classList.contains("grid-stack")) {
            var t = document.implementation.createHTMLDocument("");
            t.body.innerHTML = "<div class=\"grid-stack ".concat(i.class || "", "\"></div>"), s = t.body.children[0], e.appendChild(s);
        }
        return GridStack.init(i, s);
    };
    GridStack.registerEngine = function (t) { GridStack.engineClass = t; };
    Object.defineProperty(GridStack.prototype, "placeholder", {
        get: function () { if (!this._placeholder) {
            var t = document.createElement("div");
            t.className = "placeholder-content", this.opts.placeholderText && (t.innerHTML = this.opts.placeholderText), this._placeholder = document.createElement("div"), this._placeholder.classList.add(this.opts.placeholderClass, types_1.gridDefaults.itemClass, this.opts.itemClass), this.placeholder.appendChild(t);
        } return this._placeholder; },
        enumerable: false,
        configurable: true
    });
    GridStack.prototype.addWidget = function (e, i) { var s, t; if ("string" == typeof e) {
        var t_1 = document.implementation.createHTMLDocument("");
        t_1.body.innerHTML = e, s = t_1.body.children[0];
    }
    else if (0 === arguments.length || 1 === arguments.length && (void 0 !== (r = e).el || void 0 !== r.x || void 0 !== r.y || void 0 !== r.w || void 0 !== r.h || void 0 !== r.content))
        if (null !== (t = i = e) && void 0 !== t && t.el)
            s = t.el;
        else if (this.opts.addRemoveCB)
            s = this.opts.addRemoveCB(this, i, !0);
        else {
            r = (null == i ? void 0 : i.content) || "";
            var t_2 = document.implementation.createHTMLDocument("");
            t_2.body.innerHTML = "<div class=\"grid-stack-item ".concat(this.opts.itemClass || "", "\"><div class=\"grid-stack-item-content\">").concat(r, "</div></div>"), s = t_2.body.children[0];
        }
    else
        s = e; var r; if (s)
        return e = this._readAttr(s), i = utils_1.Utils.cloneDeep(i) || {}, utils_1.Utils.defaults(i, e), t = this.engine.prepareNode(i), this._writeAttr(s, i), this._insertNotAppend ? this.el.prepend(s) : this.el.appendChild(s), this._prepareElement(s, !0, i), this._updateContainerHeight(), t.subGrid && this.makeSubGrid(t.el, void 0, void 0, !1), this._prevColumn && 1 === this.opts.column && (this._ignoreLayoutsNodeChange = !0), this._triggerAddEvent(), this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, s; };
    GridStack.prototype.makeSubGrid = function (e, i, s, t) {
        if (t === void 0) { t = !0; }
        var r;
        var o = e.gridstackNode;
        if (null != (e = (o = o || this.makeWidget(e).gridstackNode).subGrid) && e.el)
            return o.subGrid;
        var n, l = this;
        for (; l && !n;)
            n = null == (r = l.opts) ? void 0 : r.subGrid, l = null == (r = l.parentGridItem) ? void 0 : r.grid;
        i = utils_1.Utils.cloneDeep(Object.assign(Object.assign(Object.assign({}, n || {}), { children: void 0 }), i || o.subGrid));
        var a, d = ("auto" === (o.subGrid = i).column && (a = !0, i.column = Math.max(o.w || 1, (null == s ? void 0 : s.w) || 1), i.disableOneColumnMode = !0), o.el.querySelector(".grid-stack-item-content")), h, g;
        if (t) {
            this._removeDD(o.el);
            var t_3 = document.implementation.createHTMLDocument("");
            t_3.body.innerHTML = '<div class="grid-stack-item"></div>', (h = t_3.body.children[0]).appendChild(d), g = Object.assign(Object.assign({}, o), { x: 0, y: 0 }), utils_1.Utils.removeInternalForSave(g), delete g.subGrid, o.content && (g.content = o.content, delete o.content), t_3.body.innerHTML = '<div class="grid-stack-item-content"></div>', d = t_3.body.children[0], o.el.appendChild(d), this._prepareDragDropByNode(o);
        }
        if (s) {
            var e = a ? i.column : o.w, p = o.h + s.h;
            var t_4 = o.el.style;
            t_4.transition = "none", this.update(o.el, { w: e, h: p }), setTimeout(function () { return t_4.transition = null; });
        }
        var u = o.subGrid = GridStack.addGrid(d, i);
        return null != s && s._moving && (u._isTemp = !0), a && (u._autoColumn = !0), t && u.addWidget(h, g), s && (s._moving ? window.setTimeout(function () { return utils_1.Utils.simulateMouseEvent(s._event, "mouseenter", u.el); }, 0) : u.addWidget(o.el, o)), u;
    };
    GridStack.prototype.removeAsSubGrid = function (t) {
        var _this = this;
        var e;
        var i = null == (e = this.parentGridItem) ? void 0 : e.grid;
        i && (i.batchUpdate(), i.removeWidget(this.parentGridItem.el, !0, !0), this.engine.nodes.forEach(function (t) { t.x += _this.parentGridItem.x, t.y += _this.parentGridItem.y, i.addWidget(t.el, t); }), i.batchUpdate(!1), delete this.parentGridItem, t && window.setTimeout(function () { return utils_1.Utils.simulateMouseEvent(t._event, "mouseenter", i.el); }, 0));
    };
    GridStack.prototype.save = function (i, s) {
        if (i === void 0) { i = !0; }
        if (s === void 0) { s = !1; }
        var e = this.engine.save(i);
        if (e.forEach(function (t) { var e; i && t.el && !t.subGrid ? (e = t.el.querySelector(".grid-stack-item-content"), t.content = e ? e.innerHTML : void 0, t.content || delete t.content) : (i || delete t.content, null != (e = t.subGrid) && e.el && (e = t.subGrid.save(i, s), t.subGrid = s ? e : { children: e })), delete t.el; }), s) {
            var t = utils_1.Utils.cloneDeep(this.opts);
            t.marginBottom === t.marginTop && t.marginRight === t.marginLeft && t.marginTop === t.marginRight && (t.margin = t.marginTop, delete t.marginTop, delete t.marginRight, delete t.marginBottom, delete t.marginLeft), t.rtl === ("rtl" === this.el.style.direction) && (t.rtl = "auto"), this._isAutoCellHeight && (t.cellHeight = "auto"), this._autoColumn && (t.column = "auto", delete t.disableOneColumnMode);
            var r = t._alwaysShowResizeHandle;
            return delete t._alwaysShowResizeHandle, void 0 !== r ? t.alwaysShowResizeHandle = r : delete t.alwaysShowResizeHandle, utils_1.Utils.removeInternalAndSame(t, types_1.gridDefaults), t.children = e, t;
        }
        return e;
    };
    GridStack.prototype.load = function (t, s) {
        var _this = this;
        if (s === void 0) { s = this.opts.addRemoveCB || !0; }
        var i = GridStack.Utils.sort(__spreadArray([], t, true), -1, this._prevColumn || this.getColumn());
        this._insertNotAppend = !0, this._prevColumn && this._prevColumn !== this.opts.column && i.some(function (t) { return t.x + t.w > _this.opts.column; }) && (this._ignoreLayoutsNodeChange = !0, this.engine.cacheLayout(i, this._prevColumn, !0));
        t = this.opts.addRemoveCB;
        "function" == typeof s && (this.opts.addRemoveCB = s);
        var r = [];
        if (this.batchUpdate(), s) {
            var t_5 = __spreadArray([], this.engine.nodes, true);
            t_5.forEach(function (e) { i.find(function (t) { return e.id === t.id; }) || (_this.opts.addRemoveCB && _this.opts.addRemoveCB(_this, e, !1), r.push(e), _this.removeWidget(e.el, !0, !1)); });
        }
        return i.forEach(function (e) { var i = e.id || 0 === e.id ? _this.engine.nodes.find(function (t) { return t.id === e.id; }) : void 0; if (i) {
            if (_this.update(i.el, e), e.subGrid && e.subGrid.children) {
                var t_6 = i.el.querySelector(".grid-stack");
                t_6 && t_6.gridstack && (t_6.gridstack.load(e.subGrid.children), _this._insertNotAppend = !0);
            }
        }
        else
            s && _this.addWidget(e); }), this.engine.removedNodes = r, this.batchUpdate(!1), delete this._ignoreLayoutsNodeChange, delete this._insertNotAppend, t ? this.opts.addRemoveCB = t : delete this.opts.addRemoveCB, this;
    };
    GridStack.prototype.batchUpdate = function (t) {
        if (t === void 0) { t = !0; }
        return this.engine.batchUpdate(t), t || (this._triggerRemoveEvent(), this._triggerAddEvent(), this._triggerChangeEvent()), this;
    };
    GridStack.prototype.getCellHeight = function (t) {
        if (t === void 0) { t = !1; }
        if (this.opts.cellHeight && "auto" !== this.opts.cellHeight && (!t || !this.opts.cellHeightUnit || "px" === this.opts.cellHeightUnit))
            return this.opts.cellHeight;
        var e = this.el.querySelector("." + this.opts.itemClass);
        if (e)
            return t = utils_1.Utils.toNumber(e.getAttribute("gs-h")), Math.round(e.offsetHeight / t);
        t = parseInt(this.el.getAttribute("gs-current-row"));
        return t ? Math.round(this.el.getBoundingClientRect().height / t) : this.opts.cellHeight;
    };
    GridStack.prototype.cellHeight = function (t, e) {
        if (e === void 0) { e = !0; }
        e && void 0 !== t && this._isAutoCellHeight !== ("auto" === t) && (this._isAutoCellHeight = "auto" === t, this._updateWindowResizeEvent()), void 0 === (t = "initial" !== t && "auto" !== t ? t : void 0) && (i = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom, t = this.cellWidth() + i);
        var i = utils_1.Utils.parseHeight(t);
        return this.opts.cellHeightUnit === i.unit && this.opts.cellHeight === i.h || (this.opts.cellHeightUnit = i.unit, this.opts.cellHeight = i.h, e && this._updateStyles(!0)), this;
    };
    GridStack.prototype.cellWidth = function () { return this._widthOrContainer() / this.getColumn(); };
    GridStack.prototype._widthOrContainer = function () { return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth; };
    GridStack.prototype.compact = function () { return this.engine.compact(), this._triggerChangeEvent(), this; };
    GridStack.prototype.column = function (t, e) {
        if (e === void 0) { e = "moveScale"; }
        if (t < 1 || this.opts.column === t)
            return this;
        var i = this.getColumn();
        1 === t ? this._prevColumn = i : delete this._prevColumn, this.el.classList.remove("grid-stack-" + i), this.el.classList.add("grid-stack-" + t), this.opts.column = this.engine.column = t;
        var s;
        return 1 === t && this.opts.oneColumnModeDomSort && (s = [], this.getGridItems().forEach(function (t) { t.gridstackNode && s.push(t.gridstackNode); }), s.length || (s = void 0)), this.engine.updateNodeWidths(i, t, s, e), this._isAutoCellHeight && this.cellHeight(), this._ignoreLayoutsNodeChange = !0, this._triggerChangeEvent(), delete this._ignoreLayoutsNodeChange, this;
    };
    GridStack.prototype.getColumn = function () { return this.opts.column; };
    GridStack.prototype.getGridItems = function () {
        var _this = this;
        return Array.from(this.el.children).filter(function (t) { return t.matches("." + _this.opts.itemClass) && !t.matches("." + _this.opts.placeholderClass); });
    };
    GridStack.prototype.destroy = function (t) {
        if (t === void 0) { t = !0; }
        if (this.el)
            return this._updateWindowResizeEvent(!0), this.setStatic(!0, !1), this.setAnimation(!1), t ? this.el.parentNode.removeChild(this.el) : (this.removeAll(t), this.el.classList.remove(this._styleSheetClass)), this._removeStylesheet(), this.el.removeAttribute("gs-current-row"), delete this.parentGridItem, delete this.opts, delete this._placeholder, delete this.engine, delete this.el.gridstack, delete this.el, this;
    };
    GridStack.prototype.float = function (t) { return this.opts.float !== t && (this.opts.float = this.engine.float = t, this._triggerChangeEvent()), this; };
    GridStack.prototype.getFloat = function () { return this.engine.float; };
    GridStack.prototype.getCellFromPixel = function (t, e) {
        if (e === void 0) { e = !1; }
        var i = this.el.getBoundingClientRect();
        var s;
        s = e ? { top: i.top + document.documentElement.scrollTop, left: i.left } : { top: this.el.offsetTop, left: this.el.offsetLeft };
        var e = t.left - s.left, t = t.top - s.top, r = i.width / this.getColumn(), i = i.height / parseInt(this.el.getAttribute("gs-current-row"));
        return { x: Math.floor(e / r), y: Math.floor(t / i) };
    };
    GridStack.prototype.getRow = function () { return Math.max(this.engine.getRow(), this.opts.minRow); };
    GridStack.prototype.isAreaEmpty = function (t, e, i, s) { return this.engine.isAreaEmpty(t, e, i, s); };
    GridStack.prototype.makeWidget = function (t) { t = GridStack.getElement(t); return this._prepareElement(t, !0), this._updateContainerHeight(), this._triggerAddEvent(), this._triggerChangeEvent(), t; };
    GridStack.prototype.on = function (e, i) {
        var _this = this;
        if (-1 === e.indexOf(" "))
            return "change" === e || "added" === e || "removed" === e || "enable" === e || "disable" === e ? (this._gsEventHandler[e] = "enable" === e || "disable" === e ? function (t) { return i(t); } : function (t) { return i(t, t.detail); }, this.el.addEventListener(e, this._gsEventHandler[e])) : "drag" === e || "dragstart" === e || "dragstop" === e || "resizestart" === e || "resize" === e || "resizestop" === e || "dropped" === e ? this._gsEventHandler[e] = i : console.log("GridStack.on(" + e + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.'), this;
        {
            var t = e.split(" ");
            return t.forEach(function (t) { return _this.on(t, i); }), this;
        }
    };
    GridStack.prototype.off = function (e) {
        var _this = this;
        if (-1 === e.indexOf(" "))
            return "change" !== e && "added" !== e && "removed" !== e && "enable" !== e && "disable" !== e || this._gsEventHandler[e] && this.el.removeEventListener(e, this._gsEventHandler[e]), delete this._gsEventHandler[e], this;
        {
            var t = e.split(" ");
            return t.forEach(function (t) { return _this.off(t); }), this;
        }
    };
    GridStack.prototype.removeWidget = function (t, i, s) {
        var _this = this;
        if (i === void 0) { i = !0; }
        if (s === void 0) { s = !0; }
        return GridStack.getElements(t).forEach(function (e) { if (!e.parentElement || e.parentElement === _this.el) {
            var t_7 = e.gridstackNode;
            (t_7 = t_7 || _this.engine.nodes.find(function (t) { return e === t.el; })) && (delete e.gridstackNode, _this._removeDD(e), _this.engine.removeNode(t_7, i, s), i && e.parentElement && e.remove());
        } }), s && (this._triggerRemoveEvent(), this._triggerChangeEvent()), this;
    };
    GridStack.prototype.removeAll = function (t) {
        var _this = this;
        if (t === void 0) { t = !0; }
        return this.engine.nodes.forEach(function (t) { delete t.el.gridstackNode, _this._removeDD(t.el); }), this.engine.removeAll(t), this._triggerRemoveEvent(), this;
    };
    GridStack.prototype.setAnimation = function (t) { return t ? this.el.classList.add("grid-stack-animate") : this.el.classList.remove("grid-stack-animate"), this; };
    GridStack.prototype.setStatic = function (e, i, s) {
        var _this = this;
        if (i === void 0) { i = !0; }
        if (s === void 0) { s = !0; }
        return this.opts.staticGrid === e || (this.opts.staticGrid = e, this._setupRemoveDrop(), this._setupAcceptWidget(), this.engine.nodes.forEach(function (t) { _this._prepareDragDropByNode(t), t.subGrid && s && t.subGrid.setStatic(e, i, s); }), i && this._setStaticClass()), this;
    };
    GridStack.prototype.update = function (t, a) {
        var _this = this;
        var e, i;
        return 2 < arguments.length ? (console.warn("gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update(el, {x, w, content, ...})`. It will be removed soon"), i = 1, a = { x: (e = arguments)[i++], y: e[i++], w: e[i++], h: e[4] }, this.update(t, a)) : (GridStack.getElements(t).forEach(function (n) { if (n && n.gridstackNode) {
            var e_1 = n.gridstackNode, i_1 = utils_1.Utils.cloneDeep(a), t_8 = (delete i_1.autoPosition, ["x", "y", "w", "h"]), s_2;
            if (t_8.some(function (t) { return void 0 !== i_1[t] && i_1[t] !== e_1[t]; }) && (s_2 = {}, t_8.forEach(function (t) { s_2[t] = (void 0 !== i_1[t] ? i_1 : e_1)[t], delete i_1[t]; })), !s_2 && (i_1.minW || i_1.minH || i_1.maxW || i_1.maxH) && (s_2 = {}), i_1.content) {
                var t_9 = n.querySelector(".grid-stack-item-content");
                t_9 && t_9.innerHTML !== i_1.content && (t_9.innerHTML = i_1.content), delete i_1.content;
            }
            var r = !1, o = !1;
            for (var l in i_1)
                "_" !== l[0] && e_1[l] !== i_1[l] && (e_1[l] = i_1[l], r = !0, o = o || !_this.opts.staticGrid && ("noResize" === l || "noMove" === l || "locked" === l));
            s_2 && (_this.engine.cleanNodes().beginUpdate(e_1).moveNode(e_1, s_2), _this._updateContainerHeight(), _this._triggerChangeEvent(), _this.engine.endUpdate()), r && _this._writeAttr(n, e_1), o && _this._prepareDragDropByNode(e_1);
        } }), this);
    };
    GridStack.prototype.margin = function (t) { if (!("string" == typeof t && 1 < t.split(" ").length)) {
        var e = utils_1.Utils.parseHeight(t);
        if (this.opts.marginUnit === e.unit && this.opts.margin === e.h)
            return;
    } return this.opts.margin = t, this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = void 0, this._initMargin(), this._updateStyles(!0), this; };
    GridStack.prototype.getMargin = function () { return this.opts.margin; };
    GridStack.prototype.willItFit = function (t) { var e, i; return 1 < arguments.length ? (console.warn("gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon"), i = 0, i = { x: (e = arguments)[i++], y: e[i++], w: e[i++], h: e[i++], autoPosition: e[4] }, this.willItFit(i)) : this.engine.willItFit(t); };
    GridStack.prototype._triggerChangeEvent = function () { if (this.engine.batchMode)
        return this; var t = this.engine.getDirtyNodes(!0); return t && t.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(t), this._triggerEvent("change", t)), this.engine.saveInitial(), this; };
    GridStack.prototype._triggerAddEvent = function () { return this.engine.batchMode || this.engine.addedNodes && 0 < this.engine.addedNodes.length && (this._ignoreLayoutsNodeChange || this.engine.layoutsNodesChange(this.engine.addedNodes), this.engine.addedNodes.forEach(function (t) { delete t._dirty; }), this._triggerEvent("added", this.engine.addedNodes), this.engine.addedNodes = []), this; };
    GridStack.prototype._triggerRemoveEvent = function () { return this.engine.batchMode || this.engine.removedNodes && 0 < this.engine.removedNodes.length && (this._triggerEvent("removed", this.engine.removedNodes), this.engine.removedNodes = []), this; };
    GridStack.prototype._triggerEvent = function (t, e) { e = e ? new CustomEvent(t, { bubbles: !1, detail: e }) : new Event(t); return this.el.dispatchEvent(e), this; };
    GridStack.prototype._removeStylesheet = function () { return this._styles && (utils_1.Utils.removeStylesheet(this._styleSheetClass), delete this._styles), this; };
    GridStack.prototype._updateStyles = function (t, e) {
        if (t === void 0) { t = !1; }
        if (t && this._removeStylesheet(), e = e || this.getRow(), this._updateContainerHeight(), 0 === this.opts.cellHeight)
            return this;
        var i = this.opts.cellHeight, s = this.opts.cellHeightUnit;
        var r = ".".concat(this._styleSheetClass, " > .") + this.opts.itemClass;
        if (!this._styles) {
            t = this.opts.styleInHead ? void 0 : this.el.parentNode;
            if (this._styles = utils_1.Utils.createStylesheet(this._styleSheetClass, t), !this._styles)
                return this;
            this._styles._max = 0, utils_1.Utils.addCSSRule(this._styles, r, "min-height: " + i + s);
            var t = this.opts.marginTop + this.opts.marginUnit, o = this.opts.marginBottom + this.opts.marginUnit, n = this.opts.marginRight + this.opts.marginUnit, l = this.opts.marginLeft + this.opts.marginUnit, a = r + " > .grid-stack-item-content", d = ".".concat(this._styleSheetClass, " > .grid-stack-placeholder > .placeholder-content");
            utils_1.Utils.addCSSRule(this._styles, a, "top: ".concat(t, "; right: ").concat(n, "; bottom: ").concat(o, "; left: ").concat(l, ";")), utils_1.Utils.addCSSRule(this._styles, d, "top: ".concat(t, "; right: ").concat(n, "; bottom: ").concat(o, "; left: ").concat(l, ";")), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-ne", "right: " + n), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-e", "right: " + n), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-se", "right: ".concat(n, "; bottom: ") + o), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-nw", "left: " + l), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-w", "left: " + l), utils_1.Utils.addCSSRule(this._styles, r + " > .ui-resizable-sw", "left: ".concat(l, "; bottom: ") + o);
        }
        if ((e = e || this._styles._max) > this._styles._max) {
            var h = function (t) { return i * t + s; };
            for (var t_10 = this._styles._max + 1; t_10 <= e; t_10++) {
                var g = h(t_10);
                utils_1.Utils.addCSSRule(this._styles, r + "[gs-y=\"".concat(t_10 - 1, "\"]"), "top: " + h(t_10 - 1)), utils_1.Utils.addCSSRule(this._styles, r + "[gs-h=\"".concat(t_10, "\"]"), "height: " + g), utils_1.Utils.addCSSRule(this._styles, r + "[gs-min-h=\"".concat(t_10, "\"]"), "min-height: " + g), utils_1.Utils.addCSSRule(this._styles, r + "[gs-max-h=\"".concat(t_10, "\"]"), "max-height: " + g);
            }
            this._styles._max = e;
        }
        return this;
    };
    GridStack.prototype._updateContainerHeight = function () { if (!this.engine || this.engine.batchMode)
        return this; var t = this.getRow() + this._extraDragRow; if (this.el.setAttribute("gs-current-row", String(t)), 0 === t)
        return this.el.style.removeProperty("min-height"), this; var e = this.opts.cellHeight, i = this.opts.cellHeightUnit; return e && (this.el.style.minHeight = t * e + i), this; };
    GridStack.prototype._prepareElement = function (t, e, i) {
        if (e === void 0) { e = !1; }
        t.classList.add(this.opts.itemClass), i = i || this._readAttr(t), (t.gridstackNode = i).el = t, i.grid = this;
        var s = Object.assign({}, i);
        return i = this.engine.addNode(i, e), utils_1.Utils.same(i, s) || this._writeAttr(t, i), this._prepareDragDropByNode(i), this;
    };
    GridStack.prototype._writePosAttr = function (t, e) { return void 0 !== e.x && null !== e.x && t.setAttribute("gs-x", String(e.x)), void 0 !== e.y && null !== e.y && t.setAttribute("gs-y", String(e.y)), e.w && t.setAttribute("gs-w", String(e.w)), e.h && t.setAttribute("gs-h", String(e.h)), this; };
    GridStack.prototype._writeAttr = function (t, e) { if (!e)
        return this; this._writePosAttr(t, e); var i = { autoPosition: "gs-auto-position", minW: "gs-min-w", minH: "gs-min-h", maxW: "gs-max-w", maxH: "gs-max-h", noResize: "gs-no-resize", noMove: "gs-no-move", locked: "gs-locked", id: "gs-id" }; for (var s in i)
        e[s] ? t.setAttribute(i[s], String(e[s])) : t.removeAttribute(i[s]); return this; };
    GridStack.prototype._readAttr = function (t) { var e = {}; e.x = utils_1.Utils.toNumber(t.getAttribute("gs-x")), e.y = utils_1.Utils.toNumber(t.getAttribute("gs-y")), e.w = utils_1.Utils.toNumber(t.getAttribute("gs-w")), e.h = utils_1.Utils.toNumber(t.getAttribute("gs-h")), e.maxW = utils_1.Utils.toNumber(t.getAttribute("gs-max-w")), e.minW = utils_1.Utils.toNumber(t.getAttribute("gs-min-w")), e.maxH = utils_1.Utils.toNumber(t.getAttribute("gs-max-h")), e.minH = utils_1.Utils.toNumber(t.getAttribute("gs-min-h")), e.autoPosition = utils_1.Utils.toBool(t.getAttribute("gs-auto-position")), e.noResize = utils_1.Utils.toBool(t.getAttribute("gs-no-resize")), e.noMove = utils_1.Utils.toBool(t.getAttribute("gs-no-move")), e.locked = utils_1.Utils.toBool(t.getAttribute("gs-locked")), e.id = t.getAttribute("gs-id"); for (var i in e) {
        if (!e.hasOwnProperty(i))
            return;
        e[i] || 0 === e[i] || delete e[i];
    } return e; };
    GridStack.prototype._setStaticClass = function () {
        var _a, _b;
        var t = ["grid-stack-static"];
        return this.opts.staticGrid ? ((_a = this.el.classList).add.apply(_a, t), this.el.setAttribute("gs-static", "true")) : ((_b = this.el.classList).remove.apply(_b, t), this.el.removeAttribute("gs-static")), this;
    };
    GridStack.prototype.onParentResize = function () {
        var _this = this;
        if (this.el && this.el.clientWidth) {
            var t = !1;
            var e;
            return this._autoColumn && this.parentGridItem ? this.opts.column !== this.parentGridItem.w && (t = !0, this.column(this.parentGridItem.w, "none")) : (e = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.oneColumnSize, 1 === this.opts.column != e && (t = !0, this.opts.animate && this.setAnimation(!1), this.column(e ? 1 : this._prevColumn), this.opts.animate && this.setAnimation(!0))), this._isAutoCellHeight && (!t && this.opts.cellHeightThrottle ? (this._cellHeightThrottle || (this._cellHeightThrottle = utils_1.Utils.throttle(function () { return _this.cellHeight(); }, this.opts.cellHeightThrottle)), this._cellHeightThrottle()) : this.cellHeight()), this.engine.nodes.forEach(function (t) { t.subGrid && t.subGrid.onParentResize(); }), this;
        }
    };
    GridStack.prototype._updateWindowResizeEvent = function (t) {
        if (t === void 0) { t = !1; }
        var e = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.parentGridItem;
        return t || !e || this._windowResizeBind ? !t && e || !this._windowResizeBind || (window.removeEventListener("resize", this._windowResizeBind), delete this._windowResizeBind) : (this._windowResizeBind = this.onParentResize.bind(this), window.addEventListener("resize", this._windowResizeBind)), this;
    };
    GridStack.getElement = function (t) {
        if (t === void 0) { t = ".grid-stack-item"; }
        return utils_1.Utils.getElement(t);
    };
    GridStack.getElements = function (t) {
        if (t === void 0) { t = ".grid-stack-item"; }
        return utils_1.Utils.getElements(t);
    };
    GridStack.getGridElement = function (t) { return GridStack.getElement(t); };
    GridStack.getGridElements = function (t) { return utils_1.Utils.getElements(t); };
    GridStack.prototype._initMargin = function () { var t, e = 0, i = []; return 2 === (i = "string" == typeof this.opts.margin ? this.opts.margin.split(" ") : i).length ? (this.opts.marginTop = this.opts.marginBottom = i[0], this.opts.marginLeft = this.opts.marginRight = i[1]) : 4 === i.length ? (this.opts.marginTop = i[0], this.opts.marginRight = i[1], this.opts.marginBottom = i[2], this.opts.marginLeft = i[3]) : (t = utils_1.Utils.parseHeight(this.opts.margin), this.opts.marginUnit = t.unit, e = this.opts.margin = t.h), void 0 === this.opts.marginTop ? this.opts.marginTop = e : (t = utils_1.Utils.parseHeight(this.opts.marginTop), this.opts.marginTop = t.h, delete this.opts.margin), void 0 === this.opts.marginBottom ? this.opts.marginBottom = e : (t = utils_1.Utils.parseHeight(this.opts.marginBottom), this.opts.marginBottom = t.h, delete this.opts.margin), void 0 === this.opts.marginRight ? this.opts.marginRight = e : (t = utils_1.Utils.parseHeight(this.opts.marginRight), this.opts.marginRight = t.h, delete this.opts.margin), void 0 === this.opts.marginLeft ? this.opts.marginLeft = e : (t = utils_1.Utils.parseHeight(this.opts.marginLeft), this.opts.marginLeft = t.h, delete this.opts.margin), this.opts.marginUnit = t.unit, this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight && (this.opts.margin = this.opts.marginTop), this; };
    GridStack.getDD = function () { return dd; };
    GridStack.setupDragIn = function (t, e) { void 0 !== (null == e ? void 0 : e.pause) && (dd_manager_1.DDManager.pauseDrag = e.pause), "string" == typeof t && (e = Object.assign(Object.assign({}, types_1.dragInDefaultOptions), e || {}), utils_1.Utils.getElements(t).forEach(function (t) { dd.isDraggable(t) || dd.dragIn(t, e); })); };
    GridStack.prototype.movable = function (t, i) {
        var _this = this;
        return this.opts.staticGrid || GridStack.getElements(t).forEach(function (t) { var e = t.gridstackNode; e && (i ? delete e.noMove : e.noMove = !0, _this._prepareDragDropByNode(e)); }), this;
    };
    GridStack.prototype.resizable = function (t, i) {
        var _this = this;
        return this.opts.staticGrid || GridStack.getElements(t).forEach(function (t) { var e = t.gridstackNode; e && (i ? delete e.noResize : e.noResize = !0, _this._prepareDragDropByNode(e)); }), this;
    };
    GridStack.prototype.disable = function (t) {
        if (t === void 0) { t = !0; }
        if (!this.opts.staticGrid)
            return this.enableMove(!1, t), this.enableResize(!1, t), this._triggerEvent("disable"), this;
    };
    GridStack.prototype.enable = function (t) {
        if (t === void 0) { t = !0; }
        if (!this.opts.staticGrid)
            return this.enableMove(!0, t), this.enableResize(!0, t), this._triggerEvent("enable"), this;
    };
    GridStack.prototype.enableMove = function (e, i) {
        var _this = this;
        if (i === void 0) { i = !0; }
        return this.opts.staticGrid || (this.opts.disableDrag = !e, this.engine.nodes.forEach(function (t) { _this.movable(t.el, e), t.subGrid && i && t.subGrid.enableMove(e, i); })), this;
    };
    GridStack.prototype.enableResize = function (e, i) {
        var _this = this;
        if (i === void 0) { i = !0; }
        return this.opts.staticGrid || (this.opts.disableResize = !e, this.engine.nodes.forEach(function (t) { _this.resizable(t.el, e), t.subGrid && i && t.subGrid.enableResize(e, i); })), this;
    };
    GridStack.prototype._removeDD = function (t) { return dd.draggable(t, "destroy").resizable(t, "destroy"), t.gridstackNode && delete t.gridstackNode._initDD, delete t.ddElement, this; };
    GridStack.prototype._setupAcceptWidget = function () {
        var _this = this;
        if (this.opts.staticGrid || !this.opts.acceptWidgets && !this.opts.removable)
            return dd.droppable(this.el, "destroy"), this;
        var l, a, n = function (t, e, i) { var s = e.gridstackNode; if (s) {
            i = i || e;
            var r = _this.el.getBoundingClientRect(), _a = i.getBoundingClientRect(), o = _a.top, n = _a.left, r = (n -= r.left, { position: { top: o -= r.top, left: n } });
            if (s._temporaryRemoved) {
                if (s.x = Math.max(0, Math.round(n / a)), s.y = Math.max(0, Math.round(o / l)), delete s.autoPosition, _this.engine.nodeBoundFix(s), !_this.engine.willItFit(s)) {
                    if (s.autoPosition = !0, !_this.engine.willItFit(s))
                        return void dd.off(e, "drag");
                    s._willFitPos && (utils_1.Utils.copyPos(s, s._willFitPos), delete s._willFitPos);
                }
                _this._onStartMoving(i, t, r, s, a, l);
            }
            else
                _this._dragOrResize(i, t, r, s, a, l);
        } };
        return dd.droppable(this.el, { accept: function (t) { var e, i = t.gridstackNode; if ((null == i ? void 0 : i.grid) === _this)
                return !0; if (!_this.opts.acceptWidgets)
                return !1; var s = !0; return (s = "function" == typeof _this.opts.acceptWidgets ? _this.opts.acceptWidgets(t) : (e = !0 === _this.opts.acceptWidgets ? ".grid-stack-item" : _this.opts.acceptWidgets, t.matches(e))) && i && _this.opts.maxRow && (t = { w: i.w, h: i.h, minW: i.minW, minH: i.minH }, s = _this.engine.willItFit(t)), s; } }).on(this.el, "dropover", function (t, e, i) { var s = e.gridstackNode; if ((null === s || void 0 === s ? void 0 : s.grid) === _this && !s._temporaryRemoved)
            return !1; if (null !== s && void 0 !== s && s.grid && s.grid !== _this && !s._temporaryRemoved) {
            var t_11 = s.grid;
            t_11._leave(e, i);
        } a = _this.cellWidth(), l = _this.getCellHeight(!0), (s = s || _this._readAttr(e)).grid || (s._isExternal = !0, e.gridstackNode = s), i = i || e; var r = s.w || Math.round(i.offsetWidth / a) || 1, o = s.h || Math.round(i.offsetHeight / l) || 1; return s.grid && s.grid !== _this ? (e._gridstackNodeOrig || (e._gridstackNodeOrig = s), e.gridstackNode = s = Object.assign(Object.assign({}, s), { w: r, h: o, grid: _this }), _this.engine.cleanupNode(s).nodeBoundFix(s), s._initDD = s._isExternal = s._temporaryRemoved = !0) : (s.w = r, s.h = o, s._temporaryRemoved = !0), _this._itemRemoving(s.el, !1), dd.on(e, "drag", n), n(t, e, i), !1; }).on(this.el, "dropout", function (t, e, i) { var s = e.gridstackNode; return s && (s.grid && s.grid !== _this || (_this._leave(e, i), _this._isTemp && _this.removeAsSubGrid(s))), !1; }).on(this.el, "drop", function (t, e, i) { var s = e.gridstackNode; if ((null === s || void 0 === s ? void 0 : s.grid) === _this && !s._isExternal)
            return !1; var r = !!_this.placeholder.parentElement, o = (_this.placeholder.remove(), e._gridstackNodeOrig); if (delete e._gridstackNodeOrig, r && null != o && o.grid && o.grid !== _this) {
            var t_12 = o.grid;
            t_12.engine.removedNodes.push(o), t_12._triggerRemoveEvent()._triggerChangeEvent(), t_12.parentGridItem && !t_12.engine.nodes.length && t_12.opts.subGridDynamic && t_12.removeAsSubGrid();
        } if (!s)
            return !1; if (r && (_this.engine.cleanupNode(s), s.grid = _this), dd.off(e, "drag"), i !== e ? (i.remove(), e.gridstackNode = o, r && (e = e.cloneNode(!0))) : (e.remove(), _this._removeDD(e)), !r)
            return !1; (e.gridstackNode = s).el = e; var n = null == (r = null == (i = s.subGrid) ? void 0 : i.el) ? void 0 : r.gridstack; return utils_1.Utils.copyPos(s, _this._readAttr(_this.placeholder)), utils_1.Utils.removePositioningStyles(e), _this._writeAttr(e, s), e.classList.add(types_1.gridDefaults.itemClass, _this.opts.itemClass), _this.el.appendChild(e), n && (n.parentGridItem = s, n.opts.styleInHead || n._updateStyles(!0)), _this._updateContainerHeight(), _this.engine.addedNodes.push(s), _this._triggerAddEvent(), _this._triggerChangeEvent(), _this.engine.endUpdate(), _this._gsEventHandler.dropped && _this._gsEventHandler.dropped(Object.assign(Object.assign({}, t), { type: "dropped" }), o && o.grid ? o : void 0, s), window.setTimeout(function () { s.el && s.el.parentElement ? _this._prepareDragDropByNode(s) : _this.engine.removeNode(s), delete s.grid._isTemp; }), !1; }), this;
    };
    GridStack.prototype._itemRemoving = function (t, e) { var i = t ? t.gridstackNode : void 0; i && i.grid && (e ? i._isAboutToRemove = !0 : delete i._isAboutToRemove, e ? t.classList.add("grid-stack-item-removing") : t.classList.remove("grid-stack-item-removing")); };
    GridStack.prototype._setupRemoveDrop = function () {
        var _this = this;
        if (!this.opts.staticGrid && "string" == typeof this.opts.removable) {
            var t = document.querySelector(this.opts.removable);
            if (!t)
                return this;
            dd.isDroppable(t) || dd.droppable(t, this.opts.removableOptions).on(t, "dropover", function (t, e) { return _this._itemRemoving(e, !0); }).on(t, "dropout", function (t, e) { return _this._itemRemoving(e, !1); });
        }
        return this;
    };
    GridStack.prototype._prepareDragDropByNode = function (r) {
        var _this = this;
        var o = r.el;
        var t = r.noMove || this.opts.disableDrag, e = r.noResize || this.opts.disableResize;
        if (this.opts.staticGrid || t && e)
            return r._initDD && (this._removeDD(o), delete r._initDD), o.classList.add("ui-draggable-disabled", "ui-resizable-disabled"), this;
        if (!r._initDD) {
            var i_2, s_3;
            var n = function (t, e) { _this._gsEventHandler[t.type] && _this._gsEventHandler[t.type](t, t.target), i_2 = _this.cellWidth(), s_3 = _this.getCellHeight(!0), _this._onStartMoving(o, t, e, r, i_2, s_3); }, l = function (t, e) { _this._dragOrResize(o, t, e, r, i_2, s_3); }, a = function (e) { _this.placeholder.remove(), delete r._moving, delete r._event, delete r._lastTried; var i = e.target; if (i.gridstackNode && i.gridstackNode.grid === _this) {
                if (r.el = i, r._isAboutToRemove) {
                    var t_13 = o.gridstackNode.grid;
                    t_13._gsEventHandler[e.type] && t_13._gsEventHandler[e.type](e, i), _this._removeDD(o), t_13.engine.removedNodes.push(r), t_13._triggerRemoveEvent(), delete o.gridstackNode, delete r.el, o.remove();
                }
                else
                    utils_1.Utils.removePositioningStyles(i), r._temporaryRemoved ? (utils_1.Utils.copyPos(r, r._orig), _this._writePosAttr(i, r), _this.engine.addNode(r)) : _this._writePosAttr(i, r), _this._gsEventHandler[e.type] && _this._gsEventHandler[e.type](e, i);
                _this._extraDragRow = 0, _this._updateContainerHeight(), _this._triggerChangeEvent(), _this.engine.endUpdate();
            } };
            dd.draggable(o, { start: n, stop: a, drag: l }).resizable(o, { start: n, stop: a, resize: l }), r._initDD = !0;
        }
        return dd.draggable(o, t ? "disable" : "enable").resizable(o, e ? "disable" : "enable"), this;
    };
    GridStack.prototype._onStartMoving = function (t, e, i, s, r, o) { this.engine.cleanNodes().beginUpdate(s), this._writePosAttr(this.placeholder, s), this.el.appendChild(this.placeholder), s.el = this.placeholder, s._lastUiPosition = i.position, s._prevYPix = i.position.top, s._moving = "dragstart" === e.type, delete s._lastTried, "dropover" === e.type && s._temporaryRemoved && (this.engine.addNode(s), s._moving = !0), this.engine.cacheRects(r, o, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft), "resizestart" === e.type && (dd.resizable(t, "option", "minWidth", r * (s.minW || 1)).resizable(t, "option", "minHeight", o * (s.minH || 1)), s.maxW && dd.resizable(t, "option", "maxWidth", r * s.maxW), s.maxH && dd.resizable(t, "option", "maxHeight", o * s.maxH)); };
    GridStack.prototype._dragOrResize = function (t, e, i, s, r, o) { var n = Object.assign({}, s._orig), l; var a = this.opts.marginLeft, d = this.opts.marginRight, h = this.opts.marginTop, g = this.opts.marginBottom, p = Math.round(.1 * o), u = Math.round(.1 * r), a = Math.min(a, u), d = Math.min(d, u), h = Math.min(h, p), g = Math.min(g, p); if ("drag" === e.type) {
        if (s._temporaryRemoved)
            return;
        u = i.position.top - s._prevYPix, p = (s._prevYPix = i.position.top, !1 !== this.opts.draggable.scroll && utils_1.Utils.updateScrollPosition(t, i.position, u), i.position.left + (i.position.left > s._lastUiPosition.left ? -d : a)), u = i.position.top + (i.position.top > s._lastUiPosition.top ? -g : h), p = (n.x = Math.round(p / r), n.y = Math.round(u / o), this._extraDragRow);
        if (this.engine.collide(s, n)) {
            u = this.getRow();
            var t_14 = Math.max(0, n.y + s.h - u);
            this.opts.maxRow && u + t_14 > this.opts.maxRow && (t_14 = Math.max(0, this.opts.maxRow - u)), this._extraDragRow = t_14;
        }
        else
            this._extraDragRow = 0;
        if (this._extraDragRow !== p && this._updateContainerHeight(), s.x === n.x && s.y === n.y)
            return;
    }
    else if ("resize" === e.type) {
        if (n.x < 0)
            return;
        if (utils_1.Utils.updateScrollResize(e, t, o), n.w = Math.round((i.size.width - a) / r), n.h = Math.round((i.size.height - h) / o), s.w === n.w && s.h === n.h)
            return;
        if (s._lastTried && s._lastTried.w === n.w && s._lastTried.h === n.h)
            return;
        u = i.position.left + a, p = i.position.top + h;
        n.x = Math.round(u / r), n.y = Math.round(p / o), l = !0;
    } s._event = e, s._lastTried = n; t = { x: i.position.left + a, y: i.position.top + h, w: (i.size ? i.size.width : s.w * r) - a - d, h: (i.size ? i.size.height : s.h * o) - h - g }; this.engine.moveNodeCheck(s, Object.assign(Object.assign({}, n), { cellWidth: r, cellHeight: o, rect: t, resizing: l })) && (s._lastUiPosition = i.position, this.engine.cacheRects(r, o, h, d, g, a), delete s._skipDown, l && s.subGrid && s.subGrid.onParentResize(), this._extraDragRow = 0, this._updateContainerHeight(), u = e.target, this._writePosAttr(u, s), this._gsEventHandler[e.type] && this._gsEventHandler[e.type](e, u)); };
    GridStack.prototype._leave = function (t, e) { var i = t.gridstackNode; i && (dd.off(t, "drag"), i._temporaryRemoved || (i._temporaryRemoved = !0, this.engine.removeNode(i), i.el = i._isExternal && e ? e : t, !0 === this.opts.removable && this._itemRemoving(t, !0), t._gridstackNodeOrig ? (t.gridstackNode = t._gridstackNodeOrig, delete t._gridstackNodeOrig) : i._isExternal && (delete i.el, delete t.gridstackNode, this.engine.restoreInitial()))); };
    GridStack.prototype.commit = function () { return utils_1.obsolete(this, this.batchUpdate(!1), "commit", "batchUpdate", "5.2"), this; };
    return GridStack;
}());
(exports.GridStack = GridStack).Utils = utils_1.Utils, GridStack.Engine = gridstack_engine_1.GridStackEngine, GridStack.GDRev = "7.2.3";
