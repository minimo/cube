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
                mass: 1,
            },
        },

        init: function(world, options) {
            options = (options || {}).$safe(phina.extension.Physics._defaultOptions);
            this.superInit();
            this.world = world;

            //物理演算用
            let shape = null;
            switch (options.type) {
                //箱の作成
                case "box":
                    shape = new CANNON.Box(new CANNON.Vec3(options.size.x, options.size.y, options.size.z));
                    break;
                case "sphere":
                    shape = new CANNON.Sphere(options.radius);
                    break;
            }
            this.phyObj = new CANNON.Body({
                mass: options.mass,
                shape: shape,
            });
            this.world.add(this.phyObj);
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
            element._physics = this;

            //ターゲットにsetter/getterを再定義
            var t = this.target;
            Object.defineProperty(t, "x",{get: function()  { return this._physics.phyObj.position.x;}, set: function(v) { this._physics.phyObj.position.x = v;}});
            Object.defineProperty(t, "y",{get: function()  { return this._physics.phyObj.position.y;}, set: function(v) { this._physics.phyObj.position.y = v;}});
            Object.defineProperty(t, "z",{get: function()  { return this._physics.phyObj.position.z;}, set: function(v) { this._physics.phyObj.position.z = v;}});
            Object.defineProperty(t, "quaternion",{get: function()  { return this._physics.phyObj.quaternion;}});
            Object.defineProperty(t, "scale",{get: function()  { return this._physics.phyObj.scale;}});
            Object.defineProperty(t, "rotation",{get: function()  { return this._physics.phyObj.rotation;}});

            return this;
        },

        remove: function() {
            this.target.detach(this);
            this.target = null;
        },
    });
});
