/*
 *  application.js
 *  2017/06/14
 *  @auther minimo  
 *  This Program is MIT license.
 */

var stg = {};

phina.namespace(function() {
    phina.define("stg.Application", {
        superClass: "phina.display.CanvasApp",

        init: function() {
            this.superInit({
                query: '#world',
                width: SC_W,
                height: SC_H,
                backgroundColor: 'rgba(0, 0, 0, 1)',
            });
            this.fps = 60;
        },
    });
});
