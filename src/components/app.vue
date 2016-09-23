<template>
    <div class="vueditor">
        <toolbar v-ref:toolbar></toolbar>
        <design v-ref:design></design>
        <code1 v-ref:code></code1>
    </div>
</template>

<script>
    // 取名为code 和 sourcecode 渲染不出来?
    import toolbar from './toolbar.vue';
    import design from './design.vue';
    import code1 from './code.vue';
    import store from '../vuex/store';
    import {updateContent} from '../vuex/actions';

    export default {
        el: '',
        store,
        vuex: {
            // todo 根节点这样有没有问题?
            getters: {
                content: function(state) {
                    return state.content;
                }
            },
            actions: {
                updateContent
            }
        },
        components: {
            toolbar,
            design,
            code1
        },
        methods: {
            getContent () {
                return this.content;
            },
            setContent (content) {
                this.updateContent(content);
            }
        }
    }
</script>