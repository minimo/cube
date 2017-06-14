/*
 *  asset.js
 *  2017/06/14
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("qft.Assets", {
    _static: {
        loaded: [],
        isLoaded: function(assetType) {
            return qft.Assets.loaded[assetType]? true: false;
        },
        get: function(options) {
            qft.Assets.loaded[options.assetType] = true;
            switch (options.assetType) {
                case "splash":
                    return {
                        image: {
                        },
                    };
                case "common":
                    return {
                        image: {
                        },
                        font: {
                        },
                        tmx: {
                        },
                    };
                default:
                    throw "invalid assetType: " + options.assetType;
            }
        },
    },
});

