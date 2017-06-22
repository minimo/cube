/*
 *  Physics.js
 *  2017/06/20
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.namespace(function() {
    phina.define("phina.extension.Physics", {
        superClass: "phina.accessory.Accessory",

        //物理演算オブジェクト
        phyObj: null,

        _static: {
            _defaultOptions: {
                type: "box",
                size: {x: 10, y: 10, z: 10},
                radius: 10,
            },
        },

        init: function(world, options) {
            options = (options || {}).$safe(phina.extension.Physics._defaultOptions);
            this.superInit();

            //物理演算用
            let shape = null;
            switch (options.type) {
                //箱の作成
                case "box":
                    shape = new CANNON.Box(new CANNON.Vec3(options.size.x, options.size.y, options.size.z);
                    break;
                case "sphere":
                    shape = new CANNON.Sphere(options.radius);
                    break;
            }
            this.phyObj = new CANNON.Body({
                mass: mass,
                shape: shape,
            });
        },

        update: function() {
            if (this.target) {
                var t = this.target.threeObj;
                t.position.copy(this.phyObj.position);
                t.quaternion.copy(this.phyObj.quaternion);
            }
        },

        attachTo: function(element) {
            element.attach(this);
            this.setTarget(element);
            this._physics = this;

            //ターゲットにsetter/getterを定義
            var t = this.target;
            Object.defineProperty(t, "x", {set: function(v) { this.physics.position.x = v;}, get: function() { return this.physics.position.x;} });
            Object.defineProperty(t, "y", {set: function(v) { this.physics.position.y = v;}, get: function() { return this.physics.position.y;} });
            Object.defineProperty(t, "z", {set: function(v) { this.physics.position.z = v;}, get: function() { return this.physics.position.z;} });

            return this;
        },

        remove: function() {
            this.target.detach(this);
            this.target = null;
        },
    });
});
