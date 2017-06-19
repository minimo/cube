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

        //背景色設定
        this.glRenderer.setClearColor(0x8080B0);

        this.setup3DLayer();
        this.setup3DWorld();
        this.setup3DObject();
    },

    update: function(app) {
        this.phyWorld.step(1 / 60);

        //箱の姿勢位置情報更新
        if (this.cube) {
            this.cube.position.copy(this.cube.physics.position);
            this.cube.quaternion.copy(this.cube.physics.quaternion);
        }
    },

    setup3DLayer: function() {
        //カメラ位置の変更
        this.glCamera.position.x = 0;
        this.glCamera.position.y = 30;
        this.glCamera.position.z = 30;
        this.glCamera.lookAt(new THREE.Vector3(0, 0, 0));

        //ライトの追加
        this.glScene.remove(this.glLayer.light);
        this.glScene.add(new THREE.AmbientLight(0xFFFFFF));
        this.light = new THREE.DirectionalLight(0xaaaaaa, 1);
        this.light.position.set(-1, 1, -1);
        this.light.rotation.set(0, Math.PI / 2, 0);
        this.glScene.add(this.light);
    },

    setup3DWorld: function() {
        //物理演算設定
        this.phyWorld = new CANNON.World();
        this.phyWorld.gravity.set(0, -9.82, 0);
        this.phyWorld.broadphase = new CANNON.NaiveBroadphase();
        this.phyWorld.solver.iterations = 10;
        this.phyWorld.solver.tolerance = 0.1;
    },

    setup3DObject: function() {
        //床の作成
        let phyPlane = new CANNON.Body({mass: 0});
        phyPlane.addShape(new CANNON.Plane());
        phyPlane.position.set(0, 0, 0);
        phyPlane.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.phyWorld.add(phyPlane);

        let planeGeometory = new THREE.PlaneGeometry(200, 200, 10, 10);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
        this.plane = new THREE.Mesh(planeGeometory, planeMaterial);
        this.plane.position.set(0, 0, 0);
        this.plane.rotation.set( -Math.PI / 2, 0, 0);
        this.plane.physics = phyPlane;
        this.glScene.add(this.plane);

        //箱の作成
        let phyBox = new CANNON.Body({mass: 1});
        phyBox.addShape(new CANNON.Box(new CANNON.Vec3(5, 5, 5)));
        phyBox.position.y = 10;
        phyBox.angularVelocity.set(10, 0, 0);
        phyBox.angularDamping = 0.1;
        this.phyWorld.add(phyBox);

        let geometory = new THREE.CubeGeometry(5, 5, 5);
        let material = new THREE.MeshLambertMaterial({color: 0x44aa22});
        this.cube = new THREE.Mesh(geometory, material);
        this.cube.physics = phyBox;
        this.cube.position.set(0, 5, 0);
        this.glScene.add(this.cube);
    },
});
