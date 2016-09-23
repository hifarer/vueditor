
<style lang="less" rel="stylesheet/less">
    .ve-design {
        border: 1px solid #ddd;
        border-top: none;
    }
</style>

<template>
    <div class="ve-design" v-show="currentView == 'design'">
        <iframe src="../dist/iframe/page.html" frameborder="0" @load="init"></iframe>
    </div>
</template>

<script>

    import {updateContent, updateTBActive, updateTBDropdownDisplay} from '../vuex/actions';

    export default {
        data () {
            return {
                iframeEle: null,
                iframeWin: null,
                iframeDoc: null,
                iframeBody: null,
                timer: null,
                inited: false,
                cache: ''
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
                updateContent,
                updateTBActive,
                updateTBDropdownDisplay
            }
        },

        watch: {
            'content': function (val) {
                if(this.inited){
                    this.iframeBody.innerHTML != val && (this.iframeBody.innerHTML = val);
                }else{
                    this.cache = val;
                }
            }
        },

        methods: {

            init (event) {
                this.iframeEle = event.target;
                this.iframeWin = this.iframeEle.contentWindow;
                this.iframeDoc = this.iframeWin.document;
                this.iframeBody = this.iframeWin.document.body;
                this.inited = true;
                if(this.cache){
                    this.iframeBody.innerHTML != this.cache && (this.iframeBody.innerHTML = this.cache);
                    this.cache = '';
                }
                this.addEvent();
            },

            addEvent () {
                this.selectionChange();
                this.iframeDoc.addEventListener('click', this.updateTBDropdownDisplay, false);
                this.iframeBody.addEventListener('keydown', this.keydownHandler, false);
                this.iframeBody.addEventListener('keyup', this.keyupHandler, false);
            },

            keydownHandler (event) {
                let comp = this.$root.$refs.toolbar.$refs.undo;
                if (event.ctrlKey && event.keyCode == 89) {     //恢复
                    event.preventDefault();
                    comp.redo();
                }
                if (event.ctrlKey && event.keyCode == 90) {     //撤销
                    event.preventDefault();
                    comp.undo();
                }
            },

            keyupHandler (event) {
                clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    this.updateContent(this.iframeBody.innerHTML);
                }.bind(this), 500);
            },

            selectionChange () {
                this.iframeDoc.addEventListener('selectionchange', function () {
                    this.updateTBActive(this.iframeDoc);
                }.bind(this), false);
                if (navigator.userAgent.indexOf('Firefox') !== -1) {
                    let oSel = this.iframeWin.getSelection();
                    let focusNode = null;
                    setInterval(function () {
                        if (oSel && oSel.rangeCount) {
                            if (focusNode != oSel.focusNode) {
                                focusNode = oSel.focusNode;
                                this.updateTBActive(this.iframeDoc);
                            }
                        } else {
                            oSel = this.iframeWin.getSelection();
                        }
                    }.bind(this), 500);
                }
            },

            exec (name, value) {
                if(document.queryCommandSupported('styleWithCss')){
                    this.iframeDoc.execCommand('styleWithCss', false, true);
                }
                this[name] ? this[name](name, value) : this.iframeDoc.execCommand(name, false, value);
                this.updateTBActive(this.iframeDoc);
                this.updateContent(this.iframeBody.innerHTML);
            },

            insertHTML (name, value) {
                let oSel = this.iframeWin.getSelection();
                let oRange = this.getRange();
                if (!oRange)return;
                let node = null;
                let frag = this.iframeDoc.createDocumentFragment();
                let obj = this.iframeDoc.createElement('div');
                obj.innerHTML = value;
                while (obj.firstChild) {
                    node = obj.firstChild;
                    frag.appendChild(node);
                }
                oRange.insertNode(frag);
                oRange.setStartAfter(node);
                oRange.collapse(true);
                oSel.removeAllRanges();
                oSel.addRange(oRange);
            },
            
            fontSize (name, value) {
                let selection = this.iframeWin.getSelection();
                let range = this.getRange();
                if(!range || range.collapsed){
                    return;
                }
                let childNodes = range.cloneContents().childNodes;
                if(childNodes.length == 1 && childNodes[0].nodeType == 1 && childNodes[0].tagName.toLowerCase() == 'span'){
                    let span = range.extractContents().childNodes[0];
                    span.style.fontSize = value + 'px';
                    range.insertNode(span);
                    range.selectNode(span);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }else{
                    if(navigator.userAgent.indexOf('Chrome') != -1 && navigator.userAgent.indexOf('Edge') == -1){
                        if(document.queryCommandSupported('styleWithCss')){
                            this.iframeDoc.execCommand('styleWithCss', false, true);
                        }
                        this.iframeDoc.execCommand('fontSize', false, 7);    //设置为1-7一般都可以，但是当设置为3时，在chrome中会没反应，应该是face="3"和默认字号一样大造成的。
                        let container = range.commonAncestorContainer;
                        container.nodeType == 3 && (container = container.parentNode);
                        container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
                        Array.prototype.forEach.call(container.getElementsByTagName('span'), function (span) {
                            if(span.style.fontSize.trim() == '-webkit-xxx-large' || span.style.fontSize.trim() == 'xx-large'){
                                span.style.fontSize = value + 'px';
                            }
                            span.normalize();
                        });
                    }else{
                        if(document.queryCommandSupported('styleWithCss')){
                            this.iframeDoc.execCommand('styleWithCss', false, false);
                        }
                        this.iframeDoc.execCommand('fontSize', false, 7);

                        let fontList = [], spanList = [];
                        let container = range.commonAncestorContainer;
                        container.nodeType == 3 && (container = container.parentNode);
                        container.tagName.toLowerCase() == 'font' && (container = container.parentNode);
                        fontList = container.getElementsByTagName('font');
                        for(let i = 0; i < fontList.length; i++){   //将<font face="7"></font>转换成<span style="font-size: npx;"></span>
                            let font = fontList[i];
                            let span = document.createElement('span');
                            Array.prototype.forEach.call(font.attributes, function (attr) {
                                attr.nodeName == 'size' ? span.style.fontSize = value + 'px' : span.setAttribute(attr.nodeName, attr.nodeValue);
                            });
                            span.innerHTML = font.innerHTML;
                            span.querySelectorAll('span').length != 0 && veUtil.command.format(span, 'span', 'fontSize');   //firefox 不会格式化选区内部元素的字号，手动修改。将来firefox改的跟chrome一样，这个函数不执行。
                            span.normalize();
                            font.parentNode.replaceChild(span, font);
                            spanList.push(span);
                            i--;
                        }
                        range.setStartBefore(spanList[0]);
                        range.setEndAfter(spanList[spanList.length - 1]);
                        selection.removeAllRanges();
                        selection.addRange(range);
                    }
                }
            },

            formatBlock (name, value) {
                let ua = navigator.userAgent.toLowerCase();
                if(ua.match(/rv:([\d.]+)\) like gecko/) || ua.match(/msie ([\d.]+)/)){
                    let range = this.getRange();
                    if(!range || range.collapsed){
                        alert('在IE浏览器中必须选中一段文字才能使用此功能！');
                    }else{
                        this.iframeDoc.execCommand('formatblock', false, '<' + value.toUpperCase() + '>');
                    }
                } else {
                    this.iframeDoc.execCommand('formatblock', false, value);
                }
            },

            formatContent (obj, tagName, cssName) {
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
                    this.formatContent(obj, tagName, cssName);
                }
            },

            removeFormat (name, value) {
                this.iframeDoc.execCommand(name, false, value);
                let range = this.getRange();
                if(!range)return;
                let container = range.commonAncestorContainer;
                container.nodeType == 3 && (container = container.parentNode);
                container.tagName.toLowerCase() == 'span' && (container = container.parentNode);
                this.formatContent(container, 'span', 'verticalAlign');
                container.normalize();
            },

            getRange () {
                let oSel, oRange;
                if (this.iframeWin.getSelection) {
                    oSel = this.iframeWin.getSelection();
                    if (oSel && oSel.rangeCount != 0) {
                        oRange = oSel.getRangeAt(0);
                    }
                }
                return oRange;
            },

            setRange (range) {
                let oSel;
                if (this.iframeWin.getSelection) {
                    oSel = this.iframeWin.getSelection();
                    oSel.removeAllRanges();
                    oSel.addRange(range);
                }
            },

            removeRange () {
                let oSel;
                if (this.iframeWin.getSelection) {
                    oSel = this.iframeWin.getSelection();
                    oSel.removeAllRanges();
                }
            },

            rangeValid () {
                let range = this.getRange();
                return (range && !range.collapsed);
            }

        }
    }

</script>