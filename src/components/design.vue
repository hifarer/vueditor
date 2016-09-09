
<style lang="less" rel="stylesheet/less">
    .ve-design {
        border: 1px solid #ddd;
        border-top: none;
    }
</style>

<template>
    <div class="ve-design" v-show="currentView == 'design'">
        <iframe src="../dist/iframe/page.html" frameborder="0" class="ve-iframe" @load="init"></iframe>
    </div>
</template>

<script>

    import {updateToolbarActive} from '../vuex/toolbar-actions';

    export default {
        data () {
            return {
                iframeEle: null,
                iframeWin: null,
                iframeDoc: null,
                iframeBody: null
            }
        },

        vuex: {
            getters: {
                currentView: function(state) {
                    return state.currentView;
                },
                content: function(state) {
                    return state.content;
                }
            },
            actions: {
                updateToolbarActive
            }
        },

        computed: {
            range: {
                get () {
                    let oSel, oRange;
                    if (this.iframeWin.getSelection) {
                        oSel = this.iframeWin.getSelection();
                        if (oSel && oSel.rangeCount != 0) {
                            oRange = oSel.getRangeAt(0);
                        }
                    }
                    return oRange;
                },
                set (range) {
                    let oSel;
                    if (this.iframeWin.getSelection) {
                        oSel = this.iframeWin.getSelection();
                        oSel.removeAllRanges();
                        oSel.addRange(range);
                    }
                }
            },

            content: {
                get () {
                    return this.iframeBody.innerHTML;
                },
                set (content) {
                    this.iframeBody.innerHTML = content;
                }
            }
        },

        methods: {
            init (event) {
                this.iframeEle = event.target;
                this.iframeWin = this.iframeEle.contentWindow;
                this.iframeDoc = this.iframeWin.document;
                this.iframeBody = this.iframeWin.document.body;
                this.addEvent();
            },
            addEvent () {

                this.iframeBody.addEventListener('focus', function (event) {
                    this.$broadcast('dropdownToggle', null);
                }.bind(this), false);

                this.iframeDoc.addEventListener('selectionchange', this.selectionChange.bind(this), false);
                if (navigator.userAgent.indexOf('Firefox') !== -1) {
                    let oSel = this.iframeWin.getSelection();
                    let focusNode = null;
                    setInterval(function () {
                        if (oSel && oSel.rangeCount) {
                            if (focusNode != oSel.focusNode) {
                                focusNode = oSel.focusNode;
                                this.selectionChange();
                            }
                        } else {
                            oSel = this.iframeWin.getSelection();
                        }
                    }.bind(this), 500);
                }
            },

            selectionChange () {
                this.updateToolbarActive(this.iframeDoc);
            },

            exec (name, value) {
                if(document.queryCommandSupported('styleWithCss')){
                    this.iframeDoc.execCommand('styleWithCss', false, true);
                }
                this.iframeDoc.execCommand(name, false, value);
                if(name == 'removeformat'){
                    let range = this.range;
                    if(!range)return;
                    let container = range.commonAncestorContainer;
                    container.nodeType == 3 && (container = container.parentNode);
                    container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
                    this.format(container, 'span', 'verticalAlign');
                    container.normalize();
                }
            },

            format (obj, tagName, cssName) {
                let temp = [];
                let pattern = {fontSize: /font\-size:\s?\d+px;/g, verticalAlign: /vertical\-align:\s?(sub|super);/g};
                let nodeList = obj.getElementsByTagName(tagName);
                for(let i = 0; i < nodeList.length; i++){
                    let node = nodeList[i];
                    if(node.attributes.length == 1 && node.style.length != 0 && node.getAttribute('style').match(pattern[cssName]) != null){
                        if(node.children.length == 0){
                            if(node.style.length == 1){
                                let parent = node.parentNode;
                                parent.replaceChild(document.createTextNode(node.innerHTML), node);
                                parent.normalize();
                                i--;
                            }else{
                                node.style[cssName] = '';
                            }
                        }else{
                            temp.push(node);
                        }
                    }
                }
                if(temp.length != 0){
                    this.format(obj, tagName, cssName);
                }
            }

        }
    }

</script>