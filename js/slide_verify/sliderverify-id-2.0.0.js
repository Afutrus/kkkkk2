function _typeof(i) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (i) {
        return typeof i
    } : function (i) {
        return i && "function" == typeof Symbol && i.constructor === Symbol && i !== Symbol.prototype ? "symbol" : typeof i
    }, _typeof(i)
}

function _defineProperty(i, e, t) {
    return (e = _toPropertyKey(e)) in i ? Object.defineProperty(i, e, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : i[e] = t, i
}

function _toPropertyKey(i) {
    var e = _toPrimitive(i, "string");
    return "symbol" == _typeof(e) ? e : e + ""
}

function _toPrimitive(i, e) {
    if ("object" != _typeof(i) || !i) return i;
    var t = i[Symbol.toPrimitive];
    if (void 0 !== t) {
        var s = t.call(i, e || "default");
        if ("object" != _typeof(s)) return s;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === e ? String : Number)(i)
}

!function (i, e) {
    var t = 0, s = 1, n = 0, o = 1, r = 0, a = 1, c = 1, p = 2, d = 3, l = 4, f = "/web/", h = location.protocol,
        u = ["t", "e", "s", "t"];
    f = location.hostname.indexOf(u[0] + u[1] + u[2] + u[3]) >= 0 ? h + "//cpt" + u[0] + u[1] + u[2] + u[3] + ".neptunegame.com/web/" : h + "//captcha.dominosafe.com/web/";
    var v = "slider-verify-css", m = "../../css/slide_verify/sliderverify-2.0.1.css", y = "jquery-xdomainrequest-js",
        g = "../../js/slide_verify/jquery.xdomainrequest.min.js", $ = "jquery-rotate-js";

    function T(i, e) {
        var t = new Image;
        t.onload = function () {
            e.apply(this, [i])
        }, t.src = i
    }

    function S(i, e) {
        var t = document.getElementsByTagName("head")[0], s = document.createElement("link");
        s.type = "text/css", s.rel = "stylesheet", s.href = i, e && (s.id = e), t.appendChild(s)
    }

    function w(i, e) {
        var t = document.getElementsByTagName("head")[0], s = document.createElement("script");
        (s = document.createElement("script")).type = "text/javascript", s.src = i, e && (s.id = e), t.appendChild(s)
    }

    function x() {
        return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) ? r : a
    }

    var b = function (i, e) {
        this.options = {
            appId: i.appId || 1e3,
            ticket: i.ticket,
            selector: i.selector || "",
            fixed: i.fixed || !1,
            defaultVisible: i.defaultVisible || !0,
            success: i.success || null,
            error: i.error || null
        }, this.parent = e, this.url = f, this.verifyType = c, this.isFinger = !1, this.isSuccess = !1, this.isLoading = !1, this.sliceNo = "9503246871", this.sliceWidth = 34, this.maxFailTimes = 3, this.failTimes = 0, this.touchType = {
            Start: "mousedown",
            Move: "mousemove",
            End: "mouseup"
        }, this.imgUrl = null, this.$verify = null, this.$verifyImgWrapper = null, this.$imgSliceBox = null, this.$imgSlider = null, this.$imgSliderMask = null, this.$slider = null, this.$sliderTip = null, this.$verifyTips = null, this.$tipSuccess = null, this.$tipError = null, this.$loading = null, this.init()
    };
    b.prototype = {
        init: function () {
            document.getElementById(v) || S(m, v);
            var i = navigator.userAgent;
            i.indexOf("compatible") > -1 && i.indexOf("MSIE") > -1 && !document.getElementById(y) && (new RegExp("MSIE (\\d+\\.\\d+);").test(i), parseFloat(RegExp.$1) <= 9 && w(g, y));
            x() === r && (this.touchType.Start = "touchstart", this.touchType.Move = "touchmove", this.touchType.End = "touchend"), this.createLabel()
        }, createLabel: function () {
            var i = this;
            this.$verify = e('<div class="slider-verify"><div class="verify-img-wrapper"><div class="verify-img-loading"></div><div class="img-slice-box"></div><span class="img-slider"></span><div class="verify-tips"><div class="tip tip-success"><span class="tip-txt tip-txt-success"></span></div><div class="tip tip-error"><span class="tip-title">Verifikasi gagal: </span><span class="tip-txt tip-txt-error"></span></div></div></div><div class="slider-wrapper"><div class="slider" id="addTrader"><span class="slider-item"></span></div><div class="slider-tip">Geser puzzle ke kanan</div><span class="slider-finger"></span></div></div>'), this.parent.addComponent(this.$verify), this.$verifyImgWrapper = i.$verify.find(".verify-img-wrapper"), this.$imgSliceBox = i.$verify.find(".img-slice-box"), this.$imgSlider = i.$verify.find(".img-slider"), this.$slider = i.$verify.find(".slider"), this.$sliderTip = i.$verify.find(".slider-tip"), this.$verifyTips = i.$verify.find(".verify-tips"), this.$tipSuccess = i.$verify.find(".tip-txt-success"), this.$tipError = i.$verify.find(".tip-txt-error"), this.$loading = i.$verify.find(".verify-img-loading"), i.$slider.on(i.touchType.Start, (function (e) {
                i.onSliderTouchStart(e)
            })), i.$imgSlider.on(i.touchType.Start, (function (e) {
                i.onSliderTouchStart(e)
            }))
        }, onSliderTouchStart: function (t) {
            t.preventDefault();
            var s = this;
            if (!s.isSuccess && !s.isLoading) {
                s.options.defaultVisible || (s.$imgSliceBox.addClass("on"), s.$imgSlider.show());
                var n = 0;
                if (t.originalEvent) n = t.originalEvent.touches ? t.originalEvent.touches[0].pageX : t.originalEvent.clientX; else {
                    var o = t || i.event;
                    n = o.clientX
                }
                var r = s.$verifyImgWrapper.width() - s.$imgSlider.width();
                e("body").on(s.touchType.Move, (function (e) {
                    var t = 0;
                    e.originalEvent ? t = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.originalEvent.clientX : t = (e || i.event).clientX;
                    var o = t - n;
                    o < 0 && (o = 0), o > r && (o = r), s.$slider.css({left: o + "px"}), s.$imgSlider.css({left: o + "px"})
                })), e("body").on(s.touchType.End, (function () {
                    e("body").off(s.touchType.Move), e("body").off(s.touchType.End), s.onSliderTouchEnd()
                }))
            }
        }, onSliderTouchEnd: function () {
            var i = this;
            if (!i.isSuccess) {
                e("body").off(i.touchType.Move), i.isLoading = !0, i.$sliderTip.show();
                var n = i.$imgSlider.position().left;
                e.support.cors = !0, e.ajax(_defineProperty(_defineProperty(_defineProperty({
                    url: f + "verify.do",
                    dataType: "json",
                    data: {
                        appId: i.options.appId,
                        ticket: i.options.ticket,
                        type: i.verifyType,
                        verifyResult: parseInt(1.34 * n),
                        "languageType" : 2 , //1-global 2-id
                    }
                }, "dataType", "json"), "success", (function (e) {
                    i.isLoading = !1, 200 === e.ret ? (i.isSuccess = !0, i.$imgSliceBox.removeClass("on"), i.$imgSlider.hide(), i.verifyResultTip(s), i.options.success && setTimeout((function () {
                        i.hide(), i.options.success.apply(i, [i.options.ticket, e.capCode])
                    }), 500)) : (i.verifyResultTip(t), i.sliderErrorAni(n, (function () {
                        i.failTimes += 1, i.failTimes >= i.maxFailTimes && (i.failTimes = 0, i.refresh()), i.options.error && i.options.error.apply(i, [e])
                    })))
                })), "error", (function (e) {
                    i.isLoading = !1, i.verifyResultTip(t, "Koneksi jaringan bermasalah"), i.options.error && i.options.error.apply(i, [e]), i.sliderErrorAni(n)
                })))
            }
        }, setSliderPoint: function () {
            var i = this, e = parseInt(i.$imgSlider.width()), t = parseInt(i.$verifyImgWrapper.width()) - e,
                s = parseInt(i.$verifyImgWrapper.height()) - parseInt(i.$imgSlider.height());
            i.sliderPointX = Math.floor(Math.random() * (t - e + 1) + e), i.sliderPointY = Math.floor(Math.random() * (s - 0 + 1) + 0), i.$imgSlider.css({top: i.sliderPointY + "px"}), i.$imgSliderMask.css({
                left: i.sliderPointX + "px",
                top: i.sliderPointY + "px"
            })
        }, createVerifyImg: function () {
            var i = this;
            i.$imgSliceBox.empty(), i.imgUrl = i.url + "capImg.do?appId=" + this.options.appId + "&ticket=" + this.options.ticket + "&r=" + Math.random(), i.isLoading = !0, i.$loading.show(), T(i.imgUrl, (function (e) {
                i.isLoading = !1, i.$loading.hide(), i.$imgSlider.css({"background-image": "url(" + e + ")"});
                var t = i.sliceNo.split("");
                if (t && t.length > 0) {
                    for (var s = new Array(10), n = 0; n < t.length; n++) {
                        var o = parseInt(t[n]), r = {};
                        r.num = o, r.element = document.createElement("div"), r.element.className = "img-slice", r.element.style.backgroundImage = "url(" + e + ")", r.element.style.backgroundPositionX = n * -i.sliceWidth + "px", s[o] = r
                    }
                    for (var a = 0; a < s.length; a++) i.$imgSliceBox.append(s[a].element);
                    i.options.defaultVisible && (i.$imgSliceBox.addClass("on"), i.$imgSlider.show()), i.isFinger || (i.isFinger = !0, setTimeout((function () {
                        i.sliderFingerAni()
                    }), 500))
                }
            }))
        }, verifyResultTip: function (i, e) {
            var t = this, n = "", o = e || "";
            i === s ? (n = "success", o || (o = "Verifikasi berhasil!"), t.$tipSuccess.text(o)) : (n = "error", o || (o = "pindahkan puzzle ke tempat yang benar"), t.$tipError.text(o)), t.$verifyTips.addClass(n), t.$verifyTips.animate({bottom: 0}, 300, (function () {
                setTimeout((function () {
                    t.$verifyTips.animate({bottom: "-22px"}, 300, (function () {
                        i === s && t.hide()
                    })), t.$verifyTips.removeClass(n)
                }), 2e3)
            }))
        }, refresh: function () {
            this.parent.getTicket()
        }, show: function (i) {
            this.sliderMove(0), this.isSuccess = !1, this.createVerifyImg(), i && (this.options.success = i)
        }, hide: function () {
            this.parent.hide()
        }, remove: function () {
            this.$verify.remove()
        }, sliderErrorAni: function (i, e) {
            for (var t = this, s = 0; s < 3; s++) t.$slider.animate({left: i - 5}, 25).animate({left: i + 5}, 50).animate({left: i}, 25), t.$imgSlider.animate({left: i - 5}, 25).animate({left: i + 5}, 50).animate({left: i}, 25), 2 === s && setTimeout((function () {
                t.$slider.stop().animate({left: 0}, "normal", "linear", e), t.$imgSlider.stop().animate({left: 0}, "normal", "linear")
            }), 100)
        }, sliderFingerAni: function () {
            var i = e(".slider-finger");
            i.css({left: "28px", opacity: ".5", filter: "alpha(opacity=50)"}), i.show().animate({
                left: 288,
                opacity: 1,
                filter: "alpha(opacity=100)"
            }, 1500, "linear", (function () {
                setTimeout((function () {
                    i.hide()
                }), 500)
            }))
        }, sliderMove: function (i) {
            this.$slider.animate({left: i}), this.$imgSlider.animate({left: i})
        }
    };
    var _ = function (i, e) {
        this.options = {
            appId: i.appId || 0,
            ticket: i.ticket,
            selector: i.selector || "",
            fixed: i.fixed || !1,
            success: i.success || null,
            error: i.error || null
        }, this.parent = e, this.url = f, this.verifyType = p, this.isSuccess = !1, this.isLoading = !1, this.touchType = {
            Start: "mousedown",
            Move: "mousemove",
            End: "mouseup"
        }, this.maxFailTimes = 3, this.failTimes = 0, this.angleRatio = 1, this.init()
    };
    _.prototype = {
        init: function () {
            document.getElementById(v) || S(m, v);
            var i = navigator.userAgent;
            i.indexOf("compatible") > -1 && i.indexOf("MSIE") > -1 && !document.getElementById(y) && (new RegExp("MSIE (\\d+\\.\\d+);").test(i), parseFloat(RegExp.$1) <= 9 && w(g, y));
            document.getElementById($) || w("../../js/slide_verify/jquery.rotate.min.js", $), x() === r && (this.touchType.Start = "touchstart", this.touchType.Move = "touchmove", this.touchType.End = "touchend"), this.createLabel()
        }, createLabel: function () {
            var i = this;
            this.$verify = e('<div class="spin-verify"><div class="spin-verify__title">Drag the slider to make the image angle correct.</div><div class="spin-verify__content"><div class="spin-verify__loading"></div><div class="verify-tip spin-verify__verify-tip"></div><div class="spin-verify__img-border"><img class="spin-verify__img" src="images/spin-1.png" /></div></div><div class="slider-wrapper"><div class="slider"><span class="slider-item"></span></div></div></div>'), this.parent.addComponent(this.$verify), this.$slider = this.$verify.find(".slider"), this.$sliderWrapper = this.$verify.find(".slider-wrapper"), this.$img = this.$verify.find(".spin-verify__img"), this.$loading = this.$verify.find(".spin-verify__loading"), this.$tip = this.$verify.find(".verify-tip"), setTimeout((function () {
                i.angleRatio = 360 / (i.$sliderWrapper.width() - i.$slider.width())
            }), 0), this.$slider.on(i.touchType.Start, (function (e) {
                i.onSliderTouchStart(e)
            }))
        }, onSliderTouchStart: function (t) {
            var s = this;
            if (t.preventDefault(), !s.isSuccess && !s.isLoading) {
                var n = 0;
                if (t.originalEvent) n = t.originalEvent.touches ? t.originalEvent.touches[0].pageX : t.originalEvent.clientX; else {
                    var o = t || i.event;
                    n = o.clientX
                }
                var r = s.$sliderWrapper.width() - s.$slider.width();
                e("body").on(s.touchType.Move, (function (e) {
                    var t = 0;
                    e.originalEvent ? t = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.originalEvent.clientX : t = (e || i.event).clientX;
                    var o = t - n;
                    o < 0 && (o = 0), o > r && (o = r), s.$slider.css({left: o + "px"}), s.$verify.find(".spin-verify__img").rotate(o * s.angleRatio)
                })), e("body").on(s.touchType.End, (function () {
                    e("body").off(s.touchType.Move), e("body").off(s.touchType.End), s.onSliderTouchEnd()
                }))
            }
        }, onSliderTouchEnd: function () {
            var i = this;
            if (!i.isSuccess) {
                e("body").off(i.touchType.Move);
                var n = i.$slider.position().left;
                n && (i.isLoading = !0, i.$loading.show(), e.support.cors = !0, e.ajax({
                    url: f + "verify.do",
                    type: "POST",
                    dataType: "json",
                    data: {
                        appId: i.options.appId,
                        ticket: i.options.ticket,
                        type: i.verifyType,
                        verifyResult: parseInt(n * i.angleRatio * 1.34)
                    },
                    success: function (e) {
                        i.isLoading = !1, i.$loading.hide(), 200 === e.ret ? (i.isSuccess = !0, i.options.success && (i.showTip(s, "Verifikasi berhasil!"), setTimeout((function () {
                            i.hideTip(), i.hide(), i.options.success.apply(i, [i.options.ticket, e.capCode])
                        }), 1e3))) : (i.showTip(t, e.msg), i.sliderErrorAni(n, (function () {
                            i.hideTip(), i.$verify.find(".spin-verify__img").rotate(0), i.options.error && i.options.error.apply(i, [e]), i.failTimes += 1, i.failTimes >= i.maxFailTimes && (i.failTimes = 0, i.refresh())
                        })))
                    },
                    error: function () {
                        i.isLoading = !1, i.$loading.hide(), i.showTip(t, "Koneksi jaringan bermasalah")
                    }
                }))
            }
        }, createVerifyImg: function () {
            var i = this;
            i.imgUrl = i.url + "capImg.do?appId=" + this.options.appId + "&ticket=" + this.options.ticket + "&r=" + Math.random(), i.isLoading = !0, i.$loading.show(), T(i.imgUrl, (function () {
                i.isLoading = !1, i.$img.prop("src", i.imgUrl), i.$loading.hide()
            }))
        }, sliderErrorAni: function (i, e) {
            for (var t = this, s = 0; s < 3; s++) t.$slider.animate({left: i - 5}, 25).animate({left: i + 5}, 50).animate({left: i}, 25), 2 === s && setTimeout((function () {
                t.$slider.stop().animate({left: 0}, "normal", "linear", e)
            }), 100)
        }, showTip: function (i, e) {
            var t = "";
            t = i === s ? '<i class="ico ico-success"></i><span class="txt">' + e + "</span>" : '<i class="ico ico-error"></i><span class="txt">' + e + "</span>", this.$tip.html(t), this.$tip.show()
        }, hideTip: function () {
            this.$tip.hide()
        }, show: function (i) {
            this.sliderMove(0), this.isSuccess = !1, this.createVerifyImg(), i && (this.options.success = i)
        }, hide: function () {
            this.parent.hide()
        }, remove: function () {
            this.$verify.remove()
        }, sliderMove: function (i) {
            this.$slider.animate({left: i})
        }, refresh: function () {
            this.parent.getTicket()
        }
    };
    var I = function (i, e) {
        this.options = {
            appId: i.appId || 0,
            ticket: i.ticket,
            selector: i.selector || "",
            fixed: i.fixed || !1,
            success: i.success || null,
            error: i.error || null
        }, this.parent = this, this.url = f, this.verifyType = l, this.isSuccess = !1, this.isLoading = !1, this.maxFailTimes = 3, this.failTimes = 0, this.init()
    };
    I.prototype = {
        init: function () {
            document.getElementById(v) || S(m, v);
            var i = navigator.userAgent;
            i.indexOf("compatible") > -1 && i.indexOf("MSIE") > -1 && !document.getElementById(y) && (new RegExp("MSIE (\\d+\\.\\d+);").test(i), parseFloat(RegExp.$1) <= 9 && w(g, y));
            this.createLabel()
        }, createLabel: function () {
            var i = this;
            this.$verify = e('<div class="count-verify"><div class="count-verify__content"><div class="count-verify__loading"></div><div class="verify-tip count-verify__verify-tip"></div><img class="count-verify__img" /></div><div class="count-verify-input"><label class="count-verify-input__label">Please input the result of the above image：</label><input type="text" class="count-verify-input__inner"><button class="count-verify-input__submit">verify</button></div></div>'), this.parent.addComponent(this.$verify), this.$img = this.$verify.find(".count-verify__img"), this.$loading = this.$verify.find(".count-verify__loading"), this.$tip = this.$verify.find(".verify-tip"), this.$input = this.$verify.find(".count-verify-input__inner"), this.$submit = this.$verify.find(".count-verify-input__submit"), this.$submit.on("click", (function () {
                if (!i.isSuccess && !i.isLoading) {
                    var n = i.$input.val();
                    if (!n) return i.showTip(t, "please input code"), void setTimeout((function () {
                        i.hideTip()
                    }), 1e3);
                    i.isLoading = !0, i.$loading.show(), e.ajax({
                        url: f + "verify.do",
                        type: "POST",
                        dataType: "json",
                        data: {
                            appId: i.options.appId,
                            ticket: i.options.ticket,
                            type: i.verifyType,
                            verifyResult: parseInt(1.34 * n)
                        },
                        success: function (e) {
                            i.isLoading = !1, i.$loading.hide(), 200 === e.ret ? (i.isSuccess = !0, i.showTip(s, "Verifikasi berhasil!"), setTimeout((function () {
                                i.hideTip(), i.hide(), i.options.success && i.options.success.apply(i, [i.options.ticket, e.capCode])
                            }), 1e3)) : (i.showTip(t, e.msg), setTimeout((function () {
                                i.hideTip(), i.options.error && i.options.error.apply(i, [e]), i.failTimes += 1, i.failTimes >= i.maxFailTimes && (i.failTimes = 0, i.refresh())
                            }), 1e3))
                        },
                        error: function () {
                            i.isLoading = !1, i.$loading.hide(), i.showTip(t, "Koneksi jaringan bermasalah"), setTimeout((function () {
                                i.hideTip(), i.options.error && i.options.error.apply(i, [data])
                            }), 1500)
                        }
                    })
                }
            }))
        }, createVerifyImg: function () {
            var i = this;
            i.imgUrl = i.url + "capImg.do?appId=" + this.options.appId + "&ticket=" + this.options.ticket + "&r=" + Math.random(), i.isLoading = !0, i.$loading.show(), T(i.imgUrl, (function () {
                i.isLoading = !1, i.$loading.hide(), i.$img.prop("src", i.imgUrl)
            }))
        }, showTip: function (i, e) {
            var t = "";
            t = i === s ? '<i class="ico ico-success"></i><span class="txt">' + e + "</span>" : '<i class="ico ico-error"></i><span class="txt">' + e + "</span>", this.$tip.html(t), this.$tip.show()
        }, hideTip: function () {
            this.$tip.hide()
        }, show: function () {
            this.isSuccess = !1, this.createVerifyImg()
        }, hide: function () {
            this.parent.hide()
        }, remove: function () {
            this.$verify.remove()
        }, refresh: function () {
            this.parent.getTicket()
        }
    };
    var E = function (i, e) {
        this.options = {
            appId: i.appId || 0,
            ticket: i.ticket,
            selector: i.selector || "",
            fixed: i.fixed || !1,
            success: i.success || null,
            error: i.error || null
        }, this.parent = e, this.url = f, this.verifyType = d, this.isSuccess = !1, this.isLoading = !1, this.touchType = {
            Start: "mousedown",
            Move: "mousemove",
            End: "mouseup"
        }, this.maxFailTimes = 3, this.failTimes = 0, this.angleRatio = 1, this.pointsLength = 2, this.points = [], this.init()
    };
    E.prototype = {
        init: function () {
            document.getElementById(v) || S(m, v);
            var i = navigator.userAgent;
            i.indexOf("compatible") > -1 && i.indexOf("MSIE") > -1 && !document.getElementById(y) && (new RegExp("MSIE (\\d+\\.\\d+);").test(i), parseFloat(RegExp.$1) <= 9 && w(g, y));
            x() === r && (this.touchType.Start = "touchstart", this.touchType.Move = "touchmove", this.touchType.End = "touchend"), this.createLabel()
        }, createLabel: function () {
            var n = this;
            this.$verify = e('<div class="points-verify"><div class="points-verify__content"><div class="points-verify__loading"></div><div class="verify-tip points-verify__verify-tip"></div><img src="" class="points-verify__img"><div class="points-verify__box"></div></div></div>'), this.parent.addComponent(this.$verify), this.$title = this.$verify.find(".points-verify__title"), this.$loading = this.$verify.find(".points-verify__loading"), this.$img = this.$verify.find(".points-verify__img"), this.$box = this.$verify.find(".points-verify__box"), this.$tip = this.$verify.find(".verify-tip"), this.$box.on("click", (function (o) {
                o = o || i.event;
                var r = parseInt(o.clientX - n.$box.offset().left), a = parseInt(o.clientY - n.$box.offset().top);
                n.addPoint(r, a), n.points.push([r, a]), n.points.length === n.pointsLength && (n.isLoading = !0, n.$loading.show(), e.ajax({
                    url: n.url + "verify.do",
                    type: "POST",
                    dataType: "json",
                    data: {
                        appId: n.options.appId,
                        ticket: n.options.ticket,
                        type: n.verifyType,
                        verifyResult: n.points.join("#")
                    },
                    traditional: !0,
                    success: function (i) {
                        n.isLoading = !1, n.$loading.hide(), 200 === i.ret ? (n.isSuccess = !0, n.options.success && (n.showTip(s, "Verifikasi berhasil!"), setTimeout((function () {
                            n.hideTip(), n.hide(), n.options.success.apply(n, [n.options.ticket, i.capCode])
                        }), 1e3))) : (n.showTip(t, i.msg), n.reset(), setTimeout((function () {
                            n.hideTip(), n.options.error && n.options.error.apply(n, [i]), n.failTimes += 1, n.failTimes >= n.maxFailTimes && (n.failTimes = 0, n.refresh())
                        }), 1e3))
                    },
                    error: function () {
                        n.isLoading = !1, n.$loading.hide(), n.showTip(t, "Koneksi jaringan bermasalah"), setTimeout((function () {
                            n.hideTip(), n.options.error && n.options.error.apply(n, [data])
                        }), 1500)
                    }
                }))
            }))
        }, createVerifyImg: function () {
            var i = this;
            i.imgUrl = i.url + "capImg.do?appId=" + this.options.appId + "&ticket=" + this.options.ticket + "&r=" + Math.random(), i.isLoading = !0, i.$loading.show(), T(i.imgUrl, (function () {
                i.isLoading = !1, i.$loading.hide(), i.$img.prop("src", i.imgUrl)
            }))
        }, reset: function () {
            this.$box.empty(), this.points = []
        }, addPoint: function (i, t) {
            var s = e('<span class="point"></span>');
            this.$box.append(s), s.css("top", t - s.width() / 2), s.css("left", i - s.height() / 2)
        }, showTip: function (i, e) {
            var t = "";
            t = i === s ? '<i class="ico ico-success"></i><span class="txt">' + e + "</span>" : '<i class="ico ico-error"></i><span class="txt">' + e + "</span>", this.$tip.html(t), this.$tip.show()
        }, hideTip: function () {
            this.$tip.hide()
        }, show: function () {
            this.isSuccess = !1, this.createVerifyImg()
        }, hide: function () {
            this.parent.hide()
        }, remove: function () {
            this.$verify.remove()
        }, refresh: function () {
            this.parent.getTicket()
        }
    };
    var k = function (i) {
        this.options = {
            appId: i.appId || 0,
            fixed: !0,
            success: i.success || null,
            error: i.error || null
        }, this.component = null, this.ticket = "", this.init()
    };
    k.prototype = {
        init: function () {
            document.getElementById(v) || S(m, v), this.initWrapper()
        }, initWrapper: function () {
            var i = this;
            this.$container = e('<div class="verify-pop-wrapper fixed" style="display: none;"><div class="verify-loading"></div><div class="verify-status"><div class="verify-status__right"><span class="verify-action verify-action-refresh"></span><span class="verify-action verify-action-close"></span></div></div><div class="verify-wrapper"></div></div>'), this.$mask = e('<div class="verify-pop-mask" style="display: none;"></div>'), e("body").append(this.$mask), e("body").append(this.$container), this.$loading = this.$container.find(".verify-loading"), this.$wrapper = this.$container.find(".verify-wrapper"), this.$btnRefresh = this.$container.find(".verify-action-refresh"), this.$btnClose = this.$container.find(".verify-action-close"), this.$btnRefresh.on("click", (function () {
                i.getTicket()
            })), this.$btnClose.on("click", (function () {
                i.hide()
            }))
        }, show: function (i) {
            this.$container.show(), this.$mask.show(), this.component ? i && (this.component.options.success = i) : (i && (this.options.success = i), this.getTicket())
        }, hide: function () {
            this.$container.hide(), this.$mask.hide(), this.component && this.component.remove()
        }, showLoading: function () {
            this.$loading.show()
        }, hideLoading: function () {
            this.$loading.hide()
        }, addComponent: function (i) {
            this.$wrapper.html(i)
        }, getTicket: function () {
            var i = this;
            this.component && this.component.remove(), this.showLoading(), e.support.cors = !0, e.ajax({
                url: f + "refresh.do?appId=" + i.options.appId + "&languageType=2",
                dataType: "json",
                success: function (t) {
                    if (i.hideLoading(), 200 === t.ret) {
                        var s = t.capType, o = {
                            appId: i.options.appId,
                            ticket: t.ticket || "T" + (new Date).getTime() + Math.round(1e4 * Math.random()),
                            fixed: i.options.fixed,
                            success: i.options.success,
                            error: i.options.error
                        };
                        s === c ? i.component = new b(o, i) : s === p ? i.component = new _(o, i) : s === l ? i.component = new I(o, i) : s === d && (i.component = new E(o, i)), i.ticket = t.ticket, i.component.show()
                    } else i.message(n, t.errMsg), e(".verify-pop-wrapper").hide()
                },
                error: function () {
                    i.message(n, "Koneksi jaringan bermasalah"), e(".verify-pop-wrapper").hide()
                }
            })
        }, message: function (i, t, s) {
            s = s || 2.5;
            var r = "";
            i === o ? r = '<i class="vc-ico ico-success-16"></i>' : i === n && (r = '<i class="vc-ico ico-error-16"></i>');
            var a = e('<div class="vc-message"><div class="vc-message-content"><div class="vc-message-txt">' + r + "<span>" + t + "</span></div></div></div>");
            a.css("top", "-32px"), e("body").append(a), a.animate({top: "32px"}, 250, (function () {
                setTimeout((function () {
                    a.animate({top: "-32px"}, 250, (function () {
                        a.remove(), a = null, e(".verify-pop-mask").hide()
                    }))
                }), 1e3 * s)
            }))
        }
    }, i.SliderVerify = k
}(window, jQuery);