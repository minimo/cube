/*
 *  PhysicsObject.js
 *  2017/06/20
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.namespace(function() {
    phina.define("phina.extension.PhysicsObject", {
        superClass: "phina.app.Element",

        //物理演算オブジェクト
        phyObj: null,

        //Three.jsオブジェクト
        threeObj: null,

        _static: {
            _defaultOptions: {
                type: "box",
                size: {x: 10, y: 10, z: 10},
                radius: 10,
                threeObj: null,
            },
        },

        init: function(options) {
            options = (options || {}).$safe(phina.extension.PhysicsObject._defaultOptions);
            this.superInit();

            //物理演算用
            let shape = null;
            switch (options.type) {
                //箱の作成
                case "box":
                    shape = new CANNON.Box(new CANNON.Vec3(options.size.x, options.size.y, options.size.z);
                    break;
            }
            this.phyObj = new CANNON.Body({
                mass: mass,
                shape: shape,
            });
        },

        _accessor: {
            position: {
                get: function() {
                return this.phyObj.position;
            },
            rotation: {
                get: function() {
                return this.phyObj.rotation;
            },
            quaternion: {
                get: function() {
                return this.phyObj.quaternion;
            },
        },
    });
});
