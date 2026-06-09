var OOPup = function () {
    var maskLayerMap = {
        // key, value
    };
    var defaultLayer = document.body;
    var displayPupModules = [];
    var loadingStyle = document.createElement("style");
    loadingStyle.innerHTML =
        "        .oo-thick-div{position: fixed;top: 0;left: 0;width: 100%;height: 100%; background: #000000;border: 0 none;opacity: 0.5;filter: alpha(opacity=50);z-index: 901;}\n" +
        "        .oo-pup-loading{position:absolute;top: 50%; left: 50%; transform: translate(-50%, -50%); -webkit-transform: translate(-50%, -50%);width:2rem;height:2rem;background:none;border:none;z-index:905}\n" +
        "        .oo-spinner{font-size:.28rem;position:relative;display:inline-block;width:1rem;height:1rem}\n" +
        "        .oo-spinner.oo-center{position:absolute;left:0;right:0;top:0;bottom:0;margin:auto}\n" +
        "        .oo-spinner .oo-spinner-blade{position:absolute;left:0.4rem;bottom:0;width:0.07rem;height:0.27rem;border-radius:0.05rem;background-color:transparent;-webkit-transform-origin:center -0.22rem;-ms-transform-origin:center -0.22rem;transform-origin:center -0.22rem;animation:oo-spinner-fade9234 1s infinite linear}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(1){-webkit-animation-delay:0s;animation-delay:0s;-webkit-transform:rotate(0deg);-ms-transform:rotate(0deg);transform:rotate(0deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(2){-webkit-animation-delay:0.083s;animation-delay:0.083s;-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(3){-webkit-animation-delay:0.166s;animation-delay:0.166s;-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(4){-webkit-animation-delay:0.249s;animation-delay:0.249s;-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(5){-webkit-animation-delay:0.332s;animation-delay:0.332s;-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(6){-webkit-animation-delay:0.415s;animation-delay:0.415s;-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(7){-webkit-animation-delay:0.498s;animation-delay:0.498s;-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(8){-webkit-animation-delay:0.581s;animation-delay:0.581s;-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(9){-webkit-animation-delay:0.664s;animation-delay:0.664s;-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(10){-webkit-animation-delay:0.747s;animation-delay:0.747s;-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(11){-webkit-animation-delay:0.83s;animation-delay:0.83s;-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}\n" +
        "        .oo-spinner .oo-spinner-blade:nth-child(12){-webkit-animation-delay:0.913s;animation-delay:0.913s;-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}\n" +
        "        @keyframes oo-spinner-fade9234{0%{background-color:#E48B2B}\n" +
        "            100%{background-color:transparent}\n" +
        "        }";
    document.head.appendChild(loadingStyle);
    var pupLoading = document.createElement("div");
    pupLoading.className = "oo-pup-loading";
    var centerLoad = document.createElement("div");
    centerLoad.className = "oo-spinner oo-center";
    pupLoading.appendChild(centerLoad);
    for (var i = 0; i < 12; i++) {
        var item = document.createElement("div");
        item.className = "oo-spinner-blade";
        centerLoad.appendChild(item);
    }
    function getStyle(obj, attr){
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else if (window.getComputedStyle) {
            return window.getComputedStyle(obj)[attr];
        } else {
            return null;
        }
    }
    return {
        showLoading : function () {
            document.body.appendChild(pupLoading);
            this.showPup(pupLoading);
        },
        hideLoading : function () {
            this.hidePup(pupLoading);
            document.body.removeChild(pupLoading);
        },
        setDefaultLayer : function (pupLayer) {
            defaultLayer = pupLayer;
        },
        showPup : function (pupModule, maskTarget) {
            if (!pupModule) {
                return;
            }
            if (!maskTarget) {
                maskTarget = defaultLayer;
            }
            var maskLayer = maskLayerMap[maskTarget];
            if (!maskLayer) {
                maskLayer = document.createElement("div");
                maskLayerMap[maskTarget] = maskLayer;
                maskLayer.className = "oo-thick-div";
                maskTarget.appendChild(maskLayer);
            }
            if (displayPupModules && displayPupModules.length > 0) {
                for (var i = displayPupModules.length - 1; i >= 0; i--) {
                    var tempPupMask = displayPupModules[i];
                    var tempPupModule =  tempPupMask["module"];
                    var tempMaskLayer =  tempPupMask["mask"];
                    if (tempPupModule == pupModule) {
                        displayPupModules.splice(i, 1);
                        if (tempMaskLayer != maskLayer) {
                            tempMaskLayer.style.display = "none";
                        }
                        continue;
                    }
                    tempPupModule.style.display = "none";
                    tempMaskLayer.style.display = "none";
                }
            }
            displayPupModules.push({"module" : pupModule, "mask" : maskLayer});
            var pupZIndex = getStyle(pupModule, "zIndex");
            if (pupZIndex) {
                maskLayer.style.zIndex = pupZIndex - 1;
            }
            maskLayer.style.display = "block";
            pupModule.style.display = "block";
        },
        hidePup : function (pupModule) {
            if (!pupModule) {
                return;
            }
            var hideMaskLayer = null;
            if (displayPupModules && displayPupModules.length > 0) {
                for (var i = 0; i < displayPupModules.length; i++) {
                    var tempPupMask = displayPupModules[i];
                    var tempPupModule =  tempPupMask["module"];
                    var tempMaskLayer =  tempPupMask["mask"];
                    if (tempPupModule == pupModule) {
                        hideMaskLayer = tempMaskLayer;
                        tempPupModule.style.display = "none";
                        displayPupModules.splice(i, 1);
                    }
                }
            }
            if (displayPupModules && displayPupModules.length > 0) {
                var showPupMask = displayPupModules[displayPupModules.length - 1];
                var tempPupModule =  showPupMask["module"];
                var tempMaskLayer =  showPupMask["mask"];
                var pupZIndex = getStyle(tempPupModule, "zIndex");
                if (pupZIndex) {
                    tempMaskLayer.style.zIndex = pupZIndex - 1;
                }
                tempMaskLayer.style.display = "block";
                tempPupModule.style.display = "block";
                if (hideMaskLayer != null && tempMaskLayer != hideMaskLayer) {
                    hideMaskLayer.style.display = "none";
                }
            } else {
                if (hideMaskLayer != null) {
                    hideMaskLayer.style.display = 'none';
                }
            }
        }
    };
}();