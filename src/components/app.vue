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

    export default {
        el: '',
        store,
        components: {
            toolbar,
            design,
            code1
        }
    }

</script>