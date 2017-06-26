/*
 *  ThreeElement.js
 *  2017/06/22
 *  @auther minimo  
 *  This Program is MIT license.
 */

phina.namespace(function() {
    phina.define("phina.extension.ThreeElement", {
        superClass: "phina.app.Element",

        //Three.jsオブジェクト
        threeObj: null,

        init: function(threeObj, physicsObj) {
            this.superInit();
            this.threeObj = threeObj;
        },

        addChild: function(child) {
            if (child.parent) child.remove();
            child.parent = this;
            this.children.push(child);

            if (child.threeObj) {
                this.threeObj.add(child.threeObj);
            }
            child.flare('added');

            return child;
        },

        setPosition: function(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            return this;
        },

        setScale: function(x, y, z) {
            if (y === undefined) {
                y = x;
                z = x;
            } else if (z === undefined) {
                //Zのみ未指定の場合はそのまま
                z = this.scaleZ;
            }

            this.scaleX = x;
            this.scaleY = y;
            this.scaleZ = z;
            return this;
        },

        setRotation: function(x, y, z) {
            this.rotationX = x;
            this.rotationY = y;
            this.rotationZ = z;
            return this;
        },

        _accessor: {
            position: {
                get: function() {
                    return this.threeObj.position;
                },
            },
            rotation: {
                get: function() {
                    return this.threeObj.rotation;
                },
            },
            quaternion: {
                get: function() {
                    return this.threeObj.quaternion;
                },
            },
            scale: {
                get: function() {
                    return this.threeObj.scale;
                },
            },
            matrix: {
                get: function() {
                    return this.threeObj.matrix;
                },
            },
            x: {
                get: function() {
                    return this.threeObj.position.x;
                },
                set: function(v) {
                    this.threeObj.position.x = v;
                },
            },
            y: {
                get: function() {
                    return this.threeObj.position.y;
                },
                set: function(v) {
                    this.threeObj.position.y = v;
                },
            },
            z: {
                get: function() {
                    return this.threeObj.position.z;
                },
                set: function(v) {
                    this.threeObj.position.z = v;
                },
            },
            scaleX: {
                get: function() {
                    return this.threeObj.scale.x;
                },
                set: function(v) {
                    this.threeObj.scale.x = v;
                },
            },
            scaleY: {
                get: function() {
                    return this.threeObj.scale.y;
                },
                set: function(v) {
                    this.threeObj.scale.y = v;
                },
            },
            scaleZ: {
                get: function() {
                    return this.threeObj.scale.z;
                },
                set: function(v) {
                    this.threeObj.scale.z = v;
                },
            },
            rotationX: {
                get: function() {
                    return this.threeObj.rotation.x;
                },
                set: function(v) {
                    this.threeObj.rotation.x = v;
                },
            },
            rotationY: {
                get: function() {
                    return this.threeObj.rotation.y;
                },
                set: function(v) {
                    this.threeObj.rotation.y = v;
                },
            },
            rotationZ: {
                get: function() {
                    return this.threeObj.rotation.z;
                },
                set: function(v) {
                    this.threeObj.rotation.z = v;
                },
            },
            visible: {
                get: function() {
                    return this.threeObj.visible;
                },
                set: function(v) {
                    this.threeObj.visible = v;
                },
            },
        },
    });
});
