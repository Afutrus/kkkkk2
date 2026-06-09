var time = 55;
var leftTime = 60;

function formatNumberStr(num) {
    if (!num) {
        return num;
    }
    if (num >= 1000000000) {
        return (num / 1000000000) + "B";
    }
    if (num >= 1000000) {
        return (num / 1000000) + "M";
    }
    if (num >= 1000) {
        return (num / 1000) + "K";
    }
    return num;
}

function formatThousandthNumber(num) {
    if (!num) {
        return num;
    }
    return num.toLocaleString();
}

function formatImageNumber(num) {
    if (!num) {
        return num;
    }
    var numHtml = "";
    var numStr = String(num);
    var len = numStr.length;
    for (var i = 0; i < numStr.length; i++) {
        numHtml += '<span class="num-0' + numStr[i] + '"></span>';
        var remainingDigits = len - i - 1;
        if (remainingDigits > 0 && remainingDigits % 3 === 0) {
            numHtml += '<span class="num-comma"></span>';
        }
    }
    return numHtml;
}

function formatImageNumberStr(num) {
    if (!num) {
        return num;
    }
    var numHtml = "";
    var numStr = formatNumberStr(num);
    for (var i = 0; i < numStr.length; i++) {
        if (numStr[i] == "B") {
            numHtml += '<span class="price-b"></span>';
        } else if (numStr[i] == "M") {
            numHtml += '<span class="price-m"></span>';
        } else if (numStr[i] == "K") {
            numHtml += '<span class="price-k"></span>';
        } else {
            numHtml += '<span class="price-0' + numStr[i] + '"></span>';
        }
    }
    return numHtml;
}

function GoldProductItem(productConfig, productPayments) {
    this.productConfig = productConfig;
    this.productPayments = productPayments;
    var $itemTemplate = document.getElementById("goldProductList");
    this.root = document.createElement("li");
    this.root.classList.add("listBg");

    this.goldCoinIconDom = document.createElement("img");
    this.goldCoinIconDom.classList.add("convertGold");
    this.goldCoinIconDom.src = WebInfull.domain + this.productConfig.propImg;

    this.propNumDom = document.createElement("div");
    this.propNumDom.classList.add("regNum");
    if (this.productConfig.giftNum !== 0) {
        this.propNumDom.innerHTML = "<p class='df original'>" + formatImageNumber(this.productConfig.propNum) + "</p><p class='bonus'>+ " + formatThousandthNumber(this.productConfig.giftNum) + "</p>";
    } else {
        this.propNumDom.innerHTML = "<p class='df original'>" + formatImageNumber(this.productConfig.propNum) + "</p>";
    }

    this.localPrice = document.createElement("a");
    this.localPrice.classList.add("exchangeBtn");
    this.localPrice.innerHTML = "<span class='price-idr'></span>" + formatImageNumberStr(this.productConfig.localPrice);

    this.root.appendChild(this.goldCoinIconDom);
    this.root.appendChild(this.propNumDom);
    this.root.appendChild(this.localPrice);

    $itemTemplate.appendChild(this.root);
    var self = this;
    $(this.root).click(function (evt) {
        WebInfull.showPupPayments(self.productConfig, self.productPayments);
    });

}

GoldProductItem.prototype.productConfig = null;
GoldProductItem.prototype.productPayments = null;
GoldProductItem.prototype.root = null;
GoldProductItem.prototype.giftPercentDivDom = null;
GoldProductItem.prototype.giftPercentDom = null;
GoldProductItem.prototype.goldCoinIconDom = null;
GoldProductItem.prototype.giftNumDom = null;
GoldProductItem.prototype.propNumDom = null;
GoldProductItem.prototype.chooseBtnDom = null;
GoldProductItem.prototype.localPrice = null;

function DiamondProductItem(productConfig, productPayments) {
    this.productConfig = productConfig;
    this.productPayments = productPayments;
    var $itemTemplate = document.getElementById("diamondProductList");
    this.root = document.createElement("li");
    this.root.classList.add("listBg");

    this.diamondCoinIconDom = document.createElement("img");
    this.diamondCoinIconDom.classList.add("convertGold");
    this.diamondCoinIconDom.src = WebInfull.domain + this.productConfig.propImg;

    this.propNumDom = document.createElement("div");
    this.propNumDom.classList.add("regNum");
    if (this.productConfig.giftNum !== 0) {
        this.propNumDom.innerHTML = "<p class='df original'>" + formatImageNumber(this.productConfig.propNum) + "</p><p class='bonus'>+ " + formatThousandthNumber(this.productConfig.giftNum) + "</p>";
    } else {
        this.propNumDom.innerHTML = "<p class='df original'>" + formatImageNumber(this.productConfig.propNum) + "</p>";
    }

    this.localPrice = document.createElement("a");
    this.localPrice.classList.add("exchangeBtn");
    this.localPrice.innerHTML = "<span class='price-idr'></span>" + formatImageNumberStr(this.productConfig.localPrice);

    this.root.appendChild(this.diamondCoinIconDom);
    this.root.appendChild(this.propNumDom);
    this.root.appendChild(this.localPrice);

    $itemTemplate.appendChild(this.root);
    var self = this;
    $(this.root).click(function (evt) {
        WebInfull.showPupPayments(self.productConfig, self.productPayments);
    });

}

DiamondProductItem.prototype.productConfig = null;
DiamondProductItem.prototype.productPayments = null;
DiamondProductItem.prototype.root = null;
DiamondProductItem.prototype.propNumDom = null;
DiamondProductItem.prototype.localPrice = null;

function FirstGiftProductItem(productConfig, productPayments) {
    this.productConfig = productConfig;
    this.productPayments = productPayments;
    this.root = document.createElement("div");
    this.root.classList.add("recharge-holder");

    var idName = this.productPayments.productId;
    if (idName) {
        $(this.root).attr("id", "gift" + idName);
    }

    this.giftContent = document.createElement("div");
    this.giftContent.classList.add("recharge-box_img");
    this.root.appendChild(this.giftContent);

    this.txtSwitch = document.createElement("a");
    this.txtSwitch.classList.add("switchBtn");
    this.txtSwitch.textContent = "GANTI";
    if (WebInfullData.firstPkgState != 3) {
        this.txtSwitch.style.display = 'none';
    }
    this.root.appendChild(this.txtSwitch);
    var self = this;

    $(this.txtSwitch).click(function (evt) {
        var nextItem = $(self.root).next();
        $(self.root).hide();
        if (nextItem && nextItem.length != 0) {
            nextItem.show();
        } else {
            $("#giftFirstInfullProductList").children().eq(0).show();
        }
    });

    this.giftSrc = document.createElement("img");
    this.giftSrc.src = UrlParams.resourceUrl + this.productConfig.propImg;

    this.localPrice = document.createElement("a");
    this.localPrice.classList.add("exchangeBtn");
    this.localPrice.innerHTML = "<span class='price-idr'></span>" + formatImageNumberStr(this.productConfig.localPrice);

    this.giftContent.appendChild(this.giftSrc);
    this.giftContent.appendChild(this.localPrice);


    $(this.localPrice).click(function (evt) {
        WebInfull.showPupPayments(self.productConfig, self.productPayments);
    });

}

FirstGiftProductItem.prototype.productConfig = null;
FirstGiftProductItem.prototype.productPayments = null;
FirstGiftProductItem.prototype.root = null;
FirstGiftProductItem.prototype.propNumDom = null;
FirstGiftProductItem.prototype.localPrice = null;

function ActivityGiftProductItem(productConfig, productPayments) {
    this.productConfig = productConfig;
    this.productPayments = productPayments;
    this.root = document.createElement("div");
    this.root.classList.add("recharge-holder");

    var idName = this.productPayments.productId;
    if (idName) {
        $(this.root).attr("id", "gift" + idName);
    }

    this.giftContent = document.createElement("div");
    this.giftContent.classList.add("recharge-box_img");

    this.root.appendChild(this.giftContent);

    this.giftSrc = document.createElement("img");
    this.giftSrc.src = this.productConfig.propImg;

    this.localPrice = document.createElement("a");
    this.localPrice.classList.add("exchangeBtn");
    this.localPrice.innerHTML = "<span class='price-idr'></span>" + formatImageNumberStr(this.productConfig.localPrice);

    this.giftContent.appendChild(this.giftSrc);
    this.giftContent.appendChild(this.localPrice);


    var self = this;
    $(this.root).click(function (evt) {
        WebInfull.showPupPayments(self.productConfig, self.productPayments);
    });

}

ActivityGiftProductItem.prototype.productConfig = null;
ActivityGiftProductItem.prototype.productPayments = null;
ActivityGiftProductItem.prototype.root = null;
ActivityGiftProductItem.prototype.propNumDom = null;
ActivityGiftProductItem.prototype.localPrice = null;

function PaymentItem(productConfig, paymentConfig, infullTypeConfig) {
    this.productConfig = productConfig;
    this.paymentConfig = paymentConfig;
    this.infullTypeConfig = infullTypeConfig;
    // var $itemTemplate = $("#paymentTemplate").find("[item-type='paymentInfull']");
    this.root = document.createElement("li");
    this.root.classList.add("discount");
    if (this.paymentConfig.ifHasDiscount){
        this.root.classList.add("show-discount");
    }

    this.paymentImg = document.createElement("img");
    this.paymentImg.src = WebInfull.domain + this.infullTypeConfig.imgSrc;

    this.root.appendChild(this.paymentImg);

    var idName = this.infullTypeConfig.infullType;
    if (idName) {
        $(this.root).attr("id", "infullType" + idName);
    }

    var self = this;
    $(this.root).click(function (evt) {
        WebInfull.showSureDiv(self.paymentConfig);
    });
}

PaymentItem.prototype.productConfig = null;
PaymentItem.prototype.productPayments = null;
PaymentItem.prototype.infullTypeConfig = null;
PaymentItem.prototype.root = null;
PaymentItem.prototype.giftPercentDivDom = null;
PaymentItem.prototype.giftPercentDom = null;
PaymentItem.prototype.goldCoinIconDom = null;
PaymentItem.prototype.giftNumDom = null;
PaymentItem.prototype.propNumDom = null;
PaymentItem.prototype.chooseBtnDom = null;
PaymentItem.prototype.localPrice = null;

var WebInfull = {

    requestFlag: false,
    selectShop: 0,
    infullType: 0,
    payUrl: "",
    centerInfullType: 0,
    chooseProduct: null,
    choosePayment: null,
    domain: UrlParams.resourceUrl,
    firstGiftProducts: [],
    init: function () {
        WebInfull.loadGoldProductConfigs();
        WebInfull.loadDiamondProductConfigs();
        WebInfull.noSorll();
        if (WebInfull.checkIdInput()) {
            WebInfull.checkUser();
        }
    },
    loadFirstGiftProductConfigs: function () {
        $("#firstGiftDiv").hide();
        $("#giftFirstInfullProductList").html("");

        if (WebInfullData.firstPkgState === 0) {
            return;
        }
        if (WebInfullData.firstGiftProductConfigs && WebInfullData.firstGiftProductConfigs.length > 0) {
            for (var i = 0; i < WebInfullData.firstGiftProductConfigs.length; i++) {
                var productConfig = WebInfullData.firstGiftProductConfigs[i];


                if (productConfig.productId == 301 && ([0, 2].indexOf(WebInfullData.firstPkgState) >= 0)) {
                    continue;
                }
                if (productConfig.productId == 302 && ([0, 1].indexOf(WebInfullData.firstPkgState) >= 0)) {
                    continue;
                }

                var productPayments = WebInfullData.getProductPayments(productConfig.productId);
                if (!productPayments || productPayments.length == 0) {
                    continue;
                }
                var firstGiftProductItem = new FirstGiftProductItem(productConfig, productPayments);
                $("#giftFirstInfullProductList").append(firstGiftProductItem.root);
                WebInfull.firstGiftProducts.push(firstGiftProductItem);
                $("#firstGiftDiv").show();
            }
            $("#giftFirstInfullProductList").children().hide();
            $("#giftFirstInfullProductList").children().eq(0).show();
        }
    },
    loadActivityGiftProductConfigs: function () {
        $("#activityGiftDiv").hide();
        $("#giftActivityInfullProductList").html("");
        if (WebInfullData.actPkgState === 0) {
            return;
        }

        if (WebInfullData.activityGiftProductConfigs && WebInfullData.activityGiftProductConfigs.length > 0) {
            for (var i = 0; i < WebInfullData.activityGiftProductConfigs.length; i++) {
                var productConfig = WebInfullData.activityGiftProductConfigs[i];


                if (productConfig.productId == 401 && ([2, 3, 4].indexOf(WebInfullData.actPkgState) >= 0)) {
                    continue;
                }
                if (productConfig.productId == 402 && ([1, 3, 4].indexOf(WebInfullData.actPkgState) >= 0)) {
                    continue;
                }
                if (productConfig.productId == 403 && ([1, 2, 4].indexOf(WebInfullData.actPkgState) >= 0)) {
                    continue;
                }

                if (productConfig.productId == 404 && ([1, 2, 3].indexOf(WebInfullData.actPkgState) >= 0)) {
                    continue;
                }
                var productPayments = WebInfullData.getProductPayments(productConfig.productId);
                if (!productPayments || productPayments.length == 0) {
                    continue;
                }
                var activityGiftProductItem = new ActivityGiftProductItem(productConfig, productPayments);
                if (activityGiftProductItem && activityGiftProductItem.root) {
                    $("#activityGiftDiv").show();
                    $("#giftActivityInfullProductList").append(activityGiftProductItem.root)
                }
            }
        }
    },
    loadGoldProductConfigs: function () {
        if (WebInfullData.goldProductConfigs && WebInfullData.goldProductConfigs.length > 0) {
            for (var i = 0; i < WebInfullData.goldProductConfigs.length; i++) {
                var productConfig = WebInfullData.goldProductConfigs[i];
                var productPayments = WebInfullData.getProductPayments(productConfig.productId);
                if (!productPayments || productPayments.length == 0) {
                    continue;
                }
                var goldProductItem = new GoldProductItem(productConfig, productPayments);
                if (goldProductItem && goldProductItem.root) {
                    $("#goldProductList").append(goldProductItem.root)
                }
            }
        }
    },
    loadDiamondProductConfigs: function () {
        if (WebInfullData.diamondProductConfigs && WebInfullData.diamondProductConfigs.length > 0) {
            for (var i = 0; i < WebInfullData.diamondProductConfigs.length; i++) {
                var productConfig = WebInfullData.diamondProductConfigs[i];
                var productPayments = WebInfullData.getProductPayments(productConfig.productId);
                if (!productPayments || productPayments.length == 0) {
                    continue;
                }
                var diamondProductItem = new DiamondProductItem(productConfig, productPayments);
                if (diamondProductItem && diamondProductItem.root) {
                    $("#diamondProductList").append(diamondProductItem.root)
                }
            }
        }
    },
    showPupPayments: function (productConfig, productPayments) {
        if (WebInfull.checkIdInput()) {
            WebInfull.payUserId = parseInt($("#infullId").val());
        } else {
            WebInfull.showTips("Silakan masukkan ID!")
            return;
        }
        if (!WebInfull.payUserId) {
            WebInfull.showTips("Silakan masukkan User ID!");
            return;
        }
        if (!productConfig || productPayments.length == 0) {
            WebInfull.showTips("Pilih Nominal Top Up");
            return;
        }
        WebInfull.chooseProduct = productConfig;
        $("#ewalletInfullTypeList").html("");
        $("#smsInfullTypeList").html("");
        $("#lainnyaInfullTypeList").html("");
        var ewalletNum = 0;
        var smsNum = 0;
        var otherNum = 0;
        for (var i = 0; i < productPayments.length; i++) {
            var productPayment = productPayments[i];
            var infullTypeConfig = WebInfullData.getInfullTypeConfig(productPayment.infullType);
            if (!infullTypeConfig) {
                continue;
            }
            var paymentItem = new PaymentItem(productConfig, productPayment, infullTypeConfig);
            if (infullTypeConfig.group == 'ewallet') {
                ewalletNum = ewalletNum + 1;
                $("#ewalletInfullTypeList").append(paymentItem.root);
            } else if (infullTypeConfig.group == 'sms') {
                smsNum = smsNum + 1;
                $("#smsInfullTypeList").append(paymentItem.root);
            } else if (infullTypeConfig.group == 'lainnya') {
                otherNum = otherNum + 1;
                $("#lainnyaInfullTypeList").append(paymentItem.root);
            }
        }
        if (ewalletNum == 0) {
            $("[item-group='ewallet']").hide();
        } else {
            $("[item-group='ewallet']").show();
        }
        if (smsNum == 0) {
            $("[item-group='sms']").hide();
        } else {
            $("[item-group='sms']").show();
        }
        if (otherNum == 0) {
            $("[item-group='lainnya']").hide();
        } else {
            $("[item-group='lainnya']").show();
        }
        $("#thickdiv").show();
        $("#rechargeMode").show();
    },

    showTips: function (msg) {
        $("#thickTipDiv").show();
        $("#tipMsg").text(msg);
        $("#tipDiv").show();
    },
    hideTips: function () {
        $("#thickTipDiv").hide();
        $("#tipMsg").text("");
        $("#tipDiv").hide();
    },

    hideRechargeModeDiv() {
        $("#thickdiv").hide();
        $("#rechargeMode").hide();
    },
    hideSureDiv() {
        $("#thickdiv2").hide();
        $("#sureDiv").hide();
    },

    showPayResultDiv() {
        $("#thickdiv2").show();
        $("#payResultDiv").show();
    },
    hidePayResultDiv() {
        $("#thickdiv2").hide();
        $("#payResultDiv").hide();
    },
    showWaitDiv() {
        $("#thickdiv2").show();
        $("#waitDiv").show();
    },
    hideWaitDiv() {
        $("#thickdiv2").hide();
        $("#waitDiv").hide();
    },

    showFailDiv() {
        $("#thickdiv2").show();
        $("#failDiv").show();
    },
    hideFailDiv() {
        $("#thickdiv2").hide();
        $("#failDiv").hide();
    },

    showSuccessDiv() {
        $("#thickdiv2").show();
        $("#successDiv").show();
    },
    hideSuccessDiv() {
        $("#thickdiv2").hide();
        $("#successDiv").hide();
        window.location.reload();
    },

    showViewDiv() {
        $("#thickdiv").show();
        $("#viewDiv").show();
    },

    hideViewDiv() {
        $("#thickdiv").hide();
        $("#viewDiv").hide();
    },
    showOrderConfirm: function (nickname) {
        $("#thickdiv").hide();
        $("#rechargeMode").hide();
        // WebInfull.hideLoadingTips();
        var userId = WebInfull.payUserId;
        var productConfig = WebInfull.chooseProduct;
        var paymentConfig = WebInfull.choosePayment;
        var displayGoldNum = formatNumberStr(productConfig.propNum);
        var displayPrice = "Rp " + formatNumberStr(paymentConfig.price);

        if (productConfig.type === 'activityInfull' && paymentConfig.giftNum !== 0) {
            displayGoldNum = displayGoldNum + " + " + formatNumberStr(paymentConfig.giftNum);
            if (paymentConfig.giftNum !== 0) {
                displayGoldNum = displayGoldNum + "Koin";
            }
        } else if (paymentConfig.giftNum !== 0) {
            displayGoldNum = displayGoldNum + " + " + formatNumberStr(paymentConfig.giftNum);
        }

        $("#userId").html(WebInfull.payUserId);
        $("#nickName").html(nickname);
        $("#goldNum").html(displayGoldNum);
        $("#payMoney").html(displayPrice);
        $("#thickdiv2").show();
        $("#sureDiv").show();
    },

    noSorll: function () {
        document.getElementById('rechargeMode').addEventListener('touchmove', function (event) {
            event.preventDefault();
        });
    },
    showRechargeModeDiv: function (type) {
        var infullId = $("#infullId").val();
        if (infullId == null || infullId == "") {
            WebInfull.showTips("Format ID Salah!");
            return;
        }
        WebInfull.chooseSupportInfull(type);
        WebInfull.selectShop = type;
        $("#thickdiv").show();
        $("#rechargeMode").show();

    },
    checkIdInput: function () {
        var userId = $("#infullId").val();
        if (userId && !isNaN(userId) && parseInt(userId) > 0) {
            return true;
        } else {
            return false;
        }
    },
    checkUser: function () {
        if (!WebInfull.checkIdInput()) {
            WebInfull.showTips("Silakan masukkan ID!")
            return;
        }
        $("#firstGiftDiv").hide();
        $("#activityGiftDiv").hide();
        // WebInfull.loadFirstGiftProductConfigs();
        // WebInfull.loadActivityGiftProductConfigs();
        var tempUserId = parseInt($("#infullId").val());
        if (WebInfull.isRequest) {
            return;
        }
        WebInfull.isRequest = true;
        var pkgInfoUrl = WebInfullData.getPkgInfoUrl();
        $.ajax({
            url: pkgInfoUrl,
            method: 'POST',
            dataType: 'json',
            data: {
                "userId": tempUserId,
                "languageType": WebInfullData.languageType,
                "timestamp": new Date().getTime()
            },
            success: function (res) {

                WebInfull.isRequest = false;
                if (res.code == 0) {
                    if (res.data && (res.data.firstPkgState || res.data.firstPkgState == 0)) {
                        // var firstPkgState = res.data.firstPkgState;
                        WebInfullData.firstPkgState = res.data.firstPkgState;
                        WebInfull.loadFirstGiftProductConfigs();
                    }
                    if (res.data && (res.data.actPkgState || res.data.actPkgState == 0)) {
                        var actPkgState = res.data.actPkgState;
                        var actPkgList = res.data.actPkgList;
                        WebInfullData.actPkgState = res.data.actPkgState;
                        WebInfullData.actPkgList = res.data.actPkgList;
                        WebInfullData.refreshActivityGiftConfigs(actPkgList);
                        WebInfull.loadActivityGiftProductConfigs();
                    }
                } else if (res.code == 304) {
                    if (res.message) {
                        WebInfull.showTips(res.message);
                    } else {
                        WebInfull.showTips('ID tidak ada.');
                    }
                    $("#infullId").val("");
                } else {
                    WebInfull.showTips(res.message);
                }
            },
            error: function (err) {
                WebInfull.isRequest = false;
            }
        });
    },
    showSureDiv: function (paymentConfig) {
        if (!paymentConfig) {
            WebInfull.showTips("Pilih Metode Pembayaran");
            return;
        }
        if (!WebInfull.chooseProduct) {
            WebInfull.showTips("Pilih Nominal Top Up");
            return;
        }
        var userId = $("#infullId").val();
        if (WebInfull.requestFlag) {
            return;
        }

        WebInfull.choosePayment = paymentConfig;
        if (!WebInfull.choosePayment) {
            WebInfull.showTips("Pilih Metode Pembayaran");
            return;
        }
        WebInfull.requestFlag = true;
        var costKey = WebInfull.chooseProduct.costKey;
        $.ajax({
            url: WebInfullData.getRechargeOrder(),
            type: 'post',
            cache: false,
            dataType: 'json',
            data: {
                "userId": userId,
                "costKey": costKey,
                "languageType": WebInfullData.languageType,
                "infullType": WebInfull.choosePayment.infullType,
                "timestamp": new Date().getTime()
            },
            success: function (data) {
                if (data.code == 0) {
                    // WebInfull.writeMessage(infullType, data.message.nickName, userId);
                    WebInfull.infullType = WebInfull.choosePayment.infullType;
                    WebInfull.payUrl = data.data.infullUrl;
                    WebInfull.centerInfullType = data.data.centerInfullType;
                    WebInfull.requestFlag = false;
                    WebInfull.showOrderConfirm(data.data.nickName);

                } else {
                    if (data.message) {
                        WebInfull.showTips(data.message);
                        WebInfull.requestFlag = false;
                    } else {
                        WebInfull.showTips("Kesalahan sistem, harap beroperasi kembali.");
                        WebInfull.requestFlag = false;
                    }
                }
            },
            error: function () {
                WebInfull.showTips("Kesalahan sistem, harap beroperasi kembali.");
                WebInfull.requestFlag = false;
            }
        });

    },

    commitOrder: function () {
        WebInfull.hideSureDiv();
        if (WebInfull.centerInfullType == 'UPOINT') {
            upoint.pay(WebInfull.payUrl);
        } else {
            window.open(WebInfull.payUrl);
        }

        WebInfull.showPayResultDiv();
    },

    checkReult: function () {
        WebInfull.hidePayResultDiv();
        WebInfull.showWaitDiv();
        if (WebInfull.requestFlag) {
            return;
        }
        WebInfull.requestFlag = true;
        leftTime = 60;
        time = 55;
        $("#queryTime").text(leftTime);
        var t2 = setInterval(function () {
            leftTime = leftTime - 1;
            if (leftTime <= 0) {
                clearInterval(t2);
            }
            $("#queryTime").text(leftTime);
        }, 1000);

        var t = setInterval(function () {
            time = time - 5;
            if (time < 0) {
                clearInterval(t);
                clearInterval(t2);
                WebInfull.requestFlag = false;
                WebInfull.hideWaitDiv();
                WebInfull.showFailDiv();
            }
            $.ajax({
                url: WebInfullData.getCheckResultUrl(),
                type: 'post',
                cache: false,
                dataType: 'json',
                data: {
                    "userId": $("#infullId").val(),
                    "languageType": WebInfullData.languageType,
                    "timestamp": new Date().getTime()
                },
                success: function (data) {
                    if (data.code == 0) {
                        clearInterval(t);
                        clearInterval(t2);
                        WebInfull.requestFlag = false;
                        WebInfull.hideWaitDiv();
                        WebInfull.showSuccessDiv();
                        WebInfull.hideRechargeModeDiv();
                        WebInfull.checkUser();
                    }
                },
                error: function () {
                    WebInfull.showTips("Kesalahan sistem, harap beroperasi kembali.");
                    clearInterval(t);
                    WebInfull.requestFlag = false;
                    WebInfull.checkUser();
                }
            });
        }, 5000);


    },
    ifSpecialId: function () {
        var infullId = $("#infullId").val();
        if (infullId == "10020" || infullId == "10047" || infullId == "10018" || infullId == "2756864" || infullId == "50076659") {
            return true;
        }
        return false;
    }


};

WebInfull.init();

