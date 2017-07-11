/*
 *  GameScene.js
 *  2017/06/15
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.define("stg.GameScene", {
    superClass: "phina.display.DisplayScene",

    init: function(options) {
        this.superInit({width: SC_W, height: SC_H});

        //Three.js用レイヤー
        this.glLayer = phina.display.ThreeLayer({
            width: SC_W,
            height: SC_H,
        }).addChildTo(this);
        this.glLayer.setOrigin(0, 0);

        this.glCamera = this.glLayer.camera;
        this.glRenderer = this.glLayer.renderer;
        this.glScene = this.glLayer.scene;

        this.glRenderer.shadowMap.enabled = true

        //Orbit control
        this.control =  new THREE.OrbitControls(this.glCamera);

        //背景色設定
        this.glRenderer.setClearColor(0x8080B0);

        this.setup3DLayer();
        this.setup3DWorld();
        this.setup3DObject();

        this.time = 0;
    },

    update: function(app) {
        this.control.update();
        this.phyWorld.step(1 / 60);
        this.time++;
    },

    setup3DLayer: function() {
        //カメラ位置の変更
        this.glCamera.position.x = 0;
        this.glCamera.position.y = 50;
        this.glCamera.position.z = 100;
        this.glCamera.lookAt(new THREE.Vector3(0, 0, 0));

        //ライトの追加
        this.glScene.remove(this.glLayer.light);
        this.glScene.add(new THREE.AmbientLight(0xFFFFFF));
        this.light = new THREE.DirectionalLight(0xaaaaaa, 1);
        this.light.position.set(-100, 100, 100);
        this.light.rotation.set(0, 1, 0);
        this.light.castShadow = true;
        this.glScene.add(this.light);
    },

    setup3DWorld: function() {
        //物理演算設定
        this.phyWorld = new CANNON.World();
        this.phyWorld.gravity.set(0, -9.82, 0);
        this.phyWorld.broadphase = new CANNON.NaiveBroadphase();
        this.phyWorld.solver.iterations = 10;
        this.phyWorld.solver.tolerance = 0.1;

        //床の作成
        let phyPlane = new CANNON.Body({mass: 0});
        phyPlane.addShape(new CANNON.Plane());
        phyPlane.position.set(0, 0, 0);
        phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.phyWorld.add(phyPlane);

        let planeGeometory = new THREE.PlaneGeometry(100, 100, 100, 100);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
        this.plane = new THREE.Mesh(planeGeometory, planeMaterial);
        this.plane.position.set(0, 5, 0);
        this.plane.rotation.set(-Math.PI / 2, 0, 0);
        this.plane.physics = phyPlane;
        this.plane.receiveShadow = true;
        this.glScene.add(this.plane);
    },

    setup3DObject: function() {
        let geometory = new THREE.CubeGeometry(10, 10, 10);
        let material = new THREE.MeshLambertMaterial({color: 0x44aa22});
        var cb = phina.extension.ThreeElement(new THREE.Mesh(geometory, material));
        var ph = phina.extension.Physics(this.phyWorld).attachTo(cb);
        cb.setPosition(0, 50, 0);
        cb.addChildTo(this.glLayer);
        this.glScene.add(cb.threeObj);
    },
});
