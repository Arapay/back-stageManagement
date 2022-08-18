<template>
    <div class="manage">
        <el-dialog
            :title="operateType=='add' ? '新增用户':'更新用户'"
            :visible.sync="isShow"
           >
            <common-form
                :formLabel="operateFormLaber"    
                :form="operateForm"  
                :inline="true" 
                ref="form"     
            >
            </common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="isShow">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser" style="height:40px ;margin-top:10px" >+新增</el-button>
             <common-form
                style="display:flex;margin-top:10px"
                :formLabel="formLaber"    
                :form="searchForm"  
                :inline="true" 
                ref="form"     
            >
            <el-button class='searchbtn'  type="primary" @click='getList' style="display:inline-block">搜索</el-button>
            </common-form>
        </div>
        <common-table
            :tableDate='tableData'
            :tableLabel='tableLabel'
            :config='config'
            @changePage='getList()'
            @edit='editUser'
            @del='delUser'
        ></common-table>
    </div>
</template>
<script>
import CommonForm from '../src/components/CommonForm.vue'
import CommonTable from '../src/components/CommonForm.vue'
import {getUser} from '../api/data.js'
export default {
  components: { CommonForm, CommonTable},
    name:'User',
    commponents:{
        CommonForm
    },
    data(){
        return{
            operateType:'add',
            isShow: false,
            operateFormLaber:[
          {
            model:'name',
            label:'姓名',
            type:'input'
          },
           {
            model:'age',
            label:'年龄',
            type:'input'
          },
           {
            model:'sex',
            label:'性别',
            type:'select',
            opts:[
              {
                label:'男',
                value:1
              },
              {
                label:'女',
                value:0
              }
            ]
          },
          {
            model:'birth',
            label:'出生日期',
            type:'date'
          },
          {
            model:'addr',
            label:'地址',
            type:'input'
          },

                  ],
            operateForm:{
            name:'',
            addr:'',
            age:'',
            birth:'',
            sex:''
        },
        formLaber:[
            {
                model:'keyword',
                label:'',
                type:'input'
            }
        ],
        searchForm:{

        },
        tableData:[],
        tableLabel:[{
            prop:'name',
            label:'姓名'
        },
        {
            prop:'age',
            label:'年龄'
        },{
            prop:'sexLabel',
            label:'性别'
        },{
            prop:'birth',
            label:'出生日期',
            width:320
        },{
            prop:'addr',
            label:'地址',
            width:320
        }],
        config:{
            page:1,
            total:30
        }
        }
        
    },
    methods:{
        confirm(){
            if(this.operateType==='edit'){
                this.$http.post('/user/edit',this.operateForm).then(res=>{
                    this.isShow=false
                    console.log(res);
                    this.getList()
                })
            }else{
                this.$http.post('/user/add',this.operateForm).then(res=>{
                    this.isShow=false
                    console.log(res);
                    this.getList()
            })
        }},
        addUser(){
            this.isShow=true
            this.operateType='add'
            this.operateForm={
            name:'',
            addr:'',
            age:'',
            birth:'',
            sex:''
        }
        },
        editUser(row){
            this.operateType='edit'
            this.isShow=true
            this.operateForm=row
        },
        delUser(row){
            this.$confirm('此操作将永久删除该文件，是否继续','提示',{
                confirmButtonText:'确认',
                cancelButtonText:'取消',
                type:'warning'
            }).then(()=>{
                const id= row.id
                this.$http.get("/user/del",{
                    params:{id}
                }).then(() =>{
                    this.$message({
                        type:'success',
                        message:'删除成功'
                    })
                    this.getList()
                })
            })
        },
        getList(name = ''){
            this.config.loading=true
            name ? (this.config.page=1) : ''
            getUser({
                page:this.config.page,
                name
            }).then(res=>{
                this.tableData=res.list.map(item=>{
                    item.sexLabel = item.sex===0 ? '女' : '男'
                    return item
                })
                this.config.total=res.count
                this.config.loading=false
            })
        }
    },
    created(){
        this.getList()
    }
}
</script>
<style lang="less" scoped>
.manage-header{
    display: flex;
    justify-content: space-between;
    align-content: center;
    
}
</style>