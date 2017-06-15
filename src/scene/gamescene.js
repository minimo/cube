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
        this.glLayer.setScale(2);

        this.glCamera = this.glLayer.camera;
        this.glRenderer = this.glLayer.renderer;
        this.glScene = this.glLayer.scene;

        //背景色設定
        this.glRenderer.setClearColor(0x8080B0);

        //カメラ位置の変更
        this.glCamera.position.x = -20;
        this.glCamera.position.y = 100;
        this.glCamera.position.z = 160;

        //ライトの追加
        this.glScene.remove(this.glLayer.light);
        this.glScene.add(new THREE.AmbientLight(0xFFFFFF));
        this.light = new THREE.DirectionalLight(0xffffbb, 1);
        this.light.position.set(-1, 1, -1);
        this.glScene.add(this.light);

        //物理演算設定
        this.phyWorld = new CANNON.World();
        this.phyWorld.gravity.set(0, -10, 0);
        this.phyWorld.broadphase = new CANNON.NaiveBroadphase();
        this.phyWorld.solver.iterations = 8;
        this.phyWorld.solver.tolerance = 0.1;

        //床作成
        let planeGeometory = new THREE.PlaneGeometry(100, 100, 1);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xaaaaaa});
        this.plane = new THREE.Mesh(planeGeometory, planeMaterial);
        this.glScene.add(this.plane);

        let planeMass = 0;
        let planeShape = new CANNON.Plane();
        this.plane.physics = new CANNON.Body({mass: planeMass, shape: planeShape});
        this.plane.physics.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
        this.phyWorld.add(this.plane.physics);

        //箱作成
        let geometory = new THREE.CubeGeometry(10, 10, 10);
        let material = new THREE.MeshLambertMaterial({color: 0x44aa22});
        this.cube = new THREE.Mesh(geometory, material);
        this.glScene.add(this.cube);

        let boxMass = 1;
        let boxShape = new CANNON.Box(new CANNON.Vec3(5, 5, 5));
        this.cube.physics = new CANNON.Body({mass: boxMass, shape: boxShape});
        this.cube.physics.angularVelocity.set(0, 5, 10);
        this.cube.physics.angularDamping = 0.1;
        this.phyWorld.add(this.cube.physics);
    },

    update: function(app) {
        this.phyWorld.step(1 / 60);

        //箱の姿勢位置情報更新
        this.cube.position.copy(this.cube.physics.position);  
        this.cube.quaternion.copy(this.cube.physics.quaternion);  

        this.plane.position.copy(this.plane.physics.position);  
        this.plane.quaternion.copy(this.cube.physics.quaternion);  
    },
});
