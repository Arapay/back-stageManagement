import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const router=new Router({
    mode:'history',
    base:process.env.BASE_URL,
    routes:[{
         path:'/',
         name:'Main',
         component:()=>import('../views/Main'),
         children:[{
            path:'/home',
            name:'home',
            component:()=>import('../views/home')
            
            },
            {
                path:'/user',
                name:'User',
                component:()=>import('../views/User')  
            }
         ]
     }
    ]  
})
export default router