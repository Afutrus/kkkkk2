$.ajax({
    url: "/web/getDomainConfig",
    type: 'post',
    cache: false,
    dataType: 'json',
    data: {},
    success: function (data) {
        if (data.code == 0) {
            if (data.data.ifShowTopDownLoad) {
                $("#topDownLoadUrl").val(data.data.gwTopDownLoadButtonUrl);
                $("#topDownLoadDiv").show();
                $("#extraNav").show();
                $("#giftcardNav").hide();
            }
            if (data.data.kefuUrl) {
                var kefuUrlElement = document.getElementById("kefuUrl");
                kefuUrlElement.setAttribute("href", data.data.kefuUrl + "/web/index.do");
            }
            var gwBottomSmsConfig = data.data.gwBottomSmsConfig.split(",");
            for (var i = 0; i < gwBottomSmsConfig.length; i++) {
                var bottomItem = gwBottomSmsConfig[i];
                var bottomItemHtml = "<a href='" + bottomItem.split("|")[1] + "' target='_blank'><img class='ico-enter-media' src='/images/gw/global/ico_join_light_" + bottomItem.split("|")[0] + ".png'></a>";
                $("#gwSmsList").append(bottomItemHtml);
            }


        }
    },
    error: function () {
        showTipDiv("Kesalahan sistem, harap beroperasi kembali.");
    }
});

$(document).ready(function () {
    $("#giftCardPin").on("input", function () {
        if ($(this).val() !== "") {
            $(this).css("border-color", "");
        }
    });


    $("#giftCardUserId").on("input", function () {
        if ($(this).val() !== "") {
            $(this).css("border-color", "");
        }
    });

    $("#validateCode").on("input", function () {
        if ($(this).val() !== "") {
            $(this).css("border-color", "");
        }
    });
});

function showGuideViewDiv() {
    $("#thickdiv").show();
    $("#viewDiv").show();
};

function hideGuideViewDiv() {
    $("#thickdiv").hide();
    $("#viewDiv").hide();
};


function showTipDiv(tipMsg) {
    $("#thickdiv").show();
    $("#tipMsg").text(tipMsg)
    $("#tipDiv").show();
}


function hideTipDiv() {
    $("#thickdiv").hide();
    $("#tipMsg").val("")
    $("#tipDiv").hide();
}

function showTipAndFocusDiv(tipMsg, elementId) {
    $("#thickdiv").show();
    $("#tipFocusMsg").text(tipMsg)
    $("#focusElementId").val(elementId);
    $("#tipAndFocusDiv").show();

}

function hideTipAndFocusDiv() {
    $("#thickdiv").hide();
    $("#tipFocusMsg").val("")
    var elementId = $("#focusElementId").val();
    var element = $("#" + elementId)
    if (element != "") {
        element.css("border-color", "red");
        element.focus();
    }
    $("#tipAndFocusDiv").hide();
}

function clearInput() {
    $("#giftCardPin").val("");
    $("#giftCardUserId").val("");
    $("#validateCode").val("");
    $("#codeButton").html("Kirim");
    $("#codeButton").removeClass("grey");
    $("#codeButton").prop("disabled", false);
    clearCountdown();
    wait = 60;
}

function sendValidateCode(ifCheckWaitTime,withCaptcha) {
    if (ifCheckWaitTime) {
        if (wait != 60) {
            return;
        }
    }
    var param = {};
    var giftCardPin = $("#giftCardPin").val().trim();
    var giftCardUserId = $("#giftCardUserId").val().trim();
    if (giftCardPin == "" && giftCardUserId == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardPin");
        return;
    }

    if (giftCardPin == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardPin");
        return;
    }

    if (giftCardUserId == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardUserId");
        return;
    }

    if (requestFlag) {
        return;
    }
    requestFlag = true;
    var timestamp = Date.now();
    param["giftCode"] = giftCardPin;
    param["userId"] = giftCardUserId;
    param["timestamp"] = timestamp;
    param["timestamp"] = timestamp;
    param["captcha"] = "";
    param["ticket"] = "";
    if (withCaptcha){
        param["captcha"] = verifyCaptcha;
        param["ticket"] = verifyTicket;
    }
    param["sign"] = getGiftCodeSign(param, timestamp);


    $.ajax({
        url: "/giftCard/giftCardGetCode",
        type: 'post',
        cache: false,
        dataType: 'json',
        data: param,
        success: function (data) {
            if (data.code == 0) {
                verifyCaptcha = "";
                verifyTicket = "";
                startCountdown($("#codeButton"));
                showTipDiv("Kode verifikasi berhasil dikirim. Silakan buka Inbox di game.");
            } else if (data.code == 1445) {
                startCountdown($("#codeButton"));
                var sliderVerify = new SliderVerify({
                    appId: 1009,
                    fixed: true,
                    defaultVisible: true
                });
                sliderVerify.show(function (captcha, capCode) {
                    verifyTicket = sliderVerify.ticket;
                    verifyCaptcha = capCode;
                    sendValidateCode(false,true)
                });

            } else {
                if (data.message) {
                    showTipDiv(data.message);
                } else {
                    showTipDiv("Kesalahan sistem, harap beroperasi kembali.");
                }
            }
            requestFlag = false;
        },
        error: function () {
            showTipDiv("Kesalahan sistem, harap beroperasi kembali.");
            requestFlag = false;
        }
    });

}


function sureExchange() {
    if (requestFlag) {
        return;
    }
    var param = {};
    var giftCardPin = $("#giftCardPin").val().trim();
    var giftCardUserId = $("#giftCardUserId").val().trim();
    var validateCode = $("#validateCode").val().trim();
    if (giftCardPin == "" && giftCardUserId == "" && validateCode == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardPin");
        return;
    }

    if (giftCardPin == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardPin");
        return;
    }

    if (giftCardUserId == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "giftCardUserId");
        return;
    }
    if (validateCode == "") {
        showTipAndFocusDiv("Tidak boleh kosong. Silakan diisi.", "validateCode");
        return;
    }
    requestFlag = true;
    var timestamp = Date.now();
    param["giftCode"] = giftCardPin;
    param["userId"] = giftCardUserId;
    param["verifyCode"] = validateCode;
    param["timestamp"] = timestamp;
    param["sign"] = getGiftCodeSign(param, timestamp);
    $.ajax({
        url: "/giftCard/giftCardExchange",
        type: 'post',
        cache: false,
        dataType: 'json',
        data: param,
        success: function (data) {
            if (data.code == 0) {
                showTipDiv("Penukaran berhasil! Buka Inbox game untuk klaim.");
                clearInput();
            } else {
                if (data.message) {
                    showTipDiv(data.message);
                } else {
                    showTipDiv("Kesalahan sistem, harap beroperasi kembali.");
                }
            }
            requestFlag = false;
        },
        error: function () {
            showTipDiv("Kesalahan sistem, harap beroperasi kembali.");
            requestFlag = false;
        }
    });
}


function getGiftCodeSign(params, signKey) {
    const keyList = Object.keys(params).sort();

    let sb = '';
    for (const key of keyList) {
        const value = params[key];
        sb += `&${key}=${value}`;
    }
    sb += `&key=${signKey}`;

    return hex_md5(sb.substring(1)).toString();
}


function formatNumberSimpleShow(num, digits) {
    var si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "K"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "B"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "Q"}
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}


function startCountdown(obj) {
    if (this.wait == 0) {
        obj.html("Kirim");
        obj.removeClass("grey");
        obj.prop("disabled", false);
        this.wait = 60;
        clearCountdown()
    } else {
        obj.html(this.wait + "s");
        obj.addClass("grey");
        obj.prop("disabled", true);
        this.wait--;
        var self = this;
        this.timeoutId = setTimeout(function () {
            self.startCountdown(obj);
        }, 1000);
    }
}


function clearCountdown() {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }
}