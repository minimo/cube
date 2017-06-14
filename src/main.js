/*
 *  main.js
 *  2017/06/14
 *  @auther minimo  
 *  This Program is MIT license.
 */

//phina.globalize();

//デバッグフラグ
DEBUG = false;
DEBUG_MOBILE = false;

//定数
SC_W = 576;
SC_H = 324;
// SC_W = 480;
// SC_H = 320;

//インスタンス
var app;

window.onload = function() {
    app = qft.Application();
    app.replaceScene(stg.GameScene());

    //モバイル対応
    if (phina.isMobile()) {
        app.domElement.addEventListener('touchend', function dummy() {
            var s = phina.asset.Sound();
            s.loadFromBuffer();
            s.play().stop();
            app.domElement.removeEventListener('touchend', dummy);
        });
    }

    app.run();
//    app.enableStats();
};
