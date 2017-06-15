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
SC_W = 750;
SC_H = 1334;

window.onload = function() {
    app = stg.Application();
    app.replaceScene(stg.GameScene());

    //モバイル対応
    if (phina.isMobile()) {
        app.domElement.addEventListener('touchend', function dummy() {
            let s = phina.asset.Sound();
            s.loadFromBuffer();
            s.play().stop();
            app.domElement.removeEventListener('touchend', dummy);
        });
    }

    app.run();
    app.enableStats();
};
