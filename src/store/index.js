import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store=new Vuex.Store({
    state:{
        isCollapse:false
    },
    getters:{
        setStr(state){
            return state.str+'拿到了吗'
        }
    },
    mutations:{
        collapseMenu(state){
            this.state.isCollapse=!state.isCollapse;
        }
    }

})
export default store