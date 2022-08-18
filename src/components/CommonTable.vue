<template>
    <div class="common-table">
        <el-table
            :data="tableData"
            style="width: 100%"
            height='90%'
            stripe>
            <el-table-column
                show-overflow-tooltip
                v-for="item in tableLabel"
                :key="item.prop"
                :label="item.label"
                :width="item.width ? item.width :125">
                <template slot-scope="scope">
                    <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
                </template>
            </el-table-column>
            <el-table-column label='操作' min-width="180">
                <el-button  size='mini' @click="handleEdit">编辑</el-button>
                <el-button  size='mini' type="danger" @click="handleDelete">删除</el-button>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pager"
            layout="prev, pager, next"
            :total="config.total"
            :current-page.sync='config.page'
            @current-change='changePage'
            :page-size='20'>
        </el-pagination>
    </div>
</template>
<script>
export default {
    name:'CommonTable',
    props:{
        tableDate:Array,
        tableLabel:Array,
        config:Object
    },
    data(){
        return{

        }
    },
    methods:{
        handleEdit(row){
                this.$emit('edit',row)
        },
        handleDelete(row){
                this.$emit('del',row)
        },
        changePage(page){
                this.$emit('changePage',row)
        }
    }

}
</script>
<style lang="less" scoped>
.common-table{
    height: calc(100%-62px);
    background-color: #fff;
    position: relative;
    .pager{
        position: absolute;
        bottom: 0;
        right: 20px;
    }
}
</style>