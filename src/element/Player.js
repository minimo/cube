/*
 *  Player.js
 *  2017/08/08
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.namespace(function() {
    phina.define("stg.Player", {
        superClass: "phina.extension.ThreeElement",

        init: function(phyWorld) {
            let geometory = new THREE.CubeGeometry(10, 10, 10);
            let material = new THREE.MeshLambertMaterial({color: 0xffffff});
            this.superInit(new THREE.Mesh(geometory, material));

            //物理オブジェクト追加
            var ph = phina.extension.Physics(phyWorld, {
                type: "box",
                size: {x: 5, y: 5, z: 5},
                mass: 10,
            }).attachTo(this);
        },

        update: function() {
            var p = app.mouse;
            if (p.getPointing()) {
                var pt = p.deltaPosition;
                this.x += ~~(pt.x*1.8);
                this.y += ~~(pt.y*1.8);
            }
        },
    });
});
