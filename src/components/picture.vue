<style lang="less" rel="stylesheet/less">
    .pic-dialog .ve-dialog-wrap {
        width: 500px;
    }
</style>

<template>
    <a href="javascript:;" title="插入图片" :class="{'ve-disabled': disabled}" @click="toggle">
        <i class="fa fa-file-image-o"></i>
    </a>
    <div class="ve-dialog pic-dialog" v-show="display" @click="hideDialog" :style="{width: ctnW + 'px', height: ctnH + 'px'}">
        <div class="ve-dialog-wrap" v-on:click.stop>
            <div class="dialog-header">插入图片<a href="javascript:;" class="ve-close" @click="hideDialog">&times;</a></div>
            <div class="dialog-body">
                <input type="file">
            </div>
            <div class="dialog-footer">
                <div class="ve-btn-box">
                    <buttton class="ve-btn" @click="hideDialog">取消</buttton>
                    <buttton class="ve-btn" @click="certainHandler">确定</buttton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {updateTBDropdownDisplay} from '../vuex/actions';

    export default {
        data () {
            return {
                ctnW: window.innerWidth,
                ctnH: window.innerHeight
            }
        },
        vuex: {
            getters: {
                disabled: function (state) {
                    return state.toolBtns.picture.disabled;
                },
                display: function (state) {
                    return state.toolBtns.picture.showmenu;
                }
            },
            actions: {
                updateTBDropdownDisplay
            }
        },
        methods: {
            toggle () {
                if(!this.disabled){
                    this.updateTBDropdownDisplay('picture');
                }
            },
            hideDialog () {
                this.updateTBDropdownDisplay();
            },
            certainHandler (event) {
                let url = '';
                let parent = this.$el.nextElementSibling.nextElementSibling || this.$el.nextSibling.nextSibling;
                let obj = parent.querySelector('input');
                if (navigator.userAgent.indexOf('MSIE')>=1) { // IE
                    url = obj.value;
                } else {
                    if(obj.files.length != 0 && obj.files.item(0).type.indexOf('image') != -1) {
                        url = window.URL.createObjectURL(obj.files.item(0));
                    }
                }
                if(url){
                    this.$root.$refs.design.exec('insertHTML', `<img src="${url}">`);
                    this.hideDialog();
                }else{
                    alert('未选择图片或选择的文件并非图片!');
                }
            }
        },
        ready () {
            window.addEventListener('resize', function () {
                this.ctnW = window.innerWidth;
                this.ctnH = window.innerHeight;
            }.bind(this), false);
        }
    }
</script>