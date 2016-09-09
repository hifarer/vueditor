<template>
    <div class="vueditor">
        <toolbar></toolbar>
        <design></design>
        <code1></code1>
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