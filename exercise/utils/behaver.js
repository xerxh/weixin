// 假设目前有三个组件,组件a,组件b,组件c,其中组件b和组件c是兄弟组件,
// 组件a是b和c的祖先组件。为了减少代码的重复性我们把获取父组件的方法,
// 和获取兄弟组件的方法封装一下,封装在behavior和methods中。
// 只要是引入该behavior的组件,都可以便捷的调用方法

module.exports = Behavior({
    methods:{
        // 获取父组件实例的方法
        _parent () {
            // 如果根据该路径获取到acestor组件为null，则说明this为ancesor
            var parentNode = this.getRelationNodes('../parent/parent');
            if(parentNode&&parentNode.length != 0) {
                return parentNode[0];
            }else{
                return this;
            }
        },
        // 获取兄弟组件实例的快捷方法
        _sibling (name) {
          var node = this._parent().getRelationNodes(name);
          console.log(this._parent())
            if(node&&node.length > 0) {
                return node[0];
            }
        }
    }
})

