<style lang="less" rel="stylesheet/less">
    .emoji-wrap {
        overflow: hidden;
        a {
            float: left;
            width: 30px;
            height: 30px;
        }
        img {
            max-width: 100%;
        }
    }
</style>

<template>
    <a href="javascript:;" title="插入表情" :class="{'ve-disabled': disabled, 've-active': display}" @click="toggle">
        <i class="fa fa-smile-o"></i>
    </a>
    <div class="ve-popover emoji-popover" v-show="display" :style="{width: width + 'px', height: height + 'px', left: left + 'px', top: top + 'px'}">
        <div class="pop-arrow"></div>
        <div class="pop-header">插入表情</div>
        <div class="pop-body">
            <div class="emoji-wrap" @click="insertItem">
                <a href="javascript:;" v-for="item in arr">
                    <img :src="'../dist/images/emoji/'+item+'.png'">
                </a>
            </div>
        </div>
    </div>
</template>

<script>

    import {updateTBDropdownDisplay} from '../vuex/actions';

    export default {
        data () {
            return {
                arr: ["U_E056", "U_E057", "U_E058", "U_E059", "U_E105", "U_E106", "U_E107", "U_E108", "U_E401", "U_E402",
                    "U_E403", "U_E404", "U_E405", "U_E406", "U_E407", "U_E408", "U_E409", "U_E410", "U_E411", "U_E412",
                    "U_E413", "U_E414", "U_E415", "U_E416", "U_E417", "U_E418", "U_E40A", "U_E40B", "U_E40C", "U_E40D",
                    "U_E40E", "U_E40F"],
                width: 260,
                height: 180,
                left: 0,
                top: 0
            }
        },
        vuex: {
            getters: {
                disabled: function (state) {
                    return state.toolBtns.emoji.disabled;
                },
                display: function (state) {
                    return state.toolBtns.emoji.showmenu;
                }
            },
            actions: {
                updateTBDropdownDisplay
            }
        },
        methods: {
            toggle () {
                if(!this.disabled){
                    let obj = this.$el.nextElementSibling || this.$el.nextSibling;
                    this.left = obj.offsetLeft - this.width/2 + obj.offsetWidth/2;
                    this.top = obj.offsetTop + (obj.offsetHeight + parseInt(getComputedStyle(obj).marginBottom));
                    this.updateTBDropdownDisplay('emoji');
                }
            },
            insertItem (event) {
                let img = event.target.cloneNode(true);
                img.style.width = '30px';
                this.$root.$refs.design.exec('insertHTML', img.outerHTML.replace('/dist', ''));
            }
        }
    }
</script>