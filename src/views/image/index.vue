<template>
  <div class="image-container">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
           <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- / 面包屑路径导航 -->
        </div>
        <div class="action-head">
             <el-radio-group v-model="collect" size= "mini" @change="loadImage(1)">
               <el-radio-button
          :label="false"
        >全部</el-radio-button>
        <el-radio-button
          :label="true"
        >收藏</el-radio-button>
      </el-radio-group>
            <el-button 
            size="mini" 
            type= "success"
            @click="dialogUploadVisible = true"
           
            >上传素材</el-button>
        </div>
        <!-- 素材列表 -->
        <el-row :gutter= "10">
            <el-col :lg="4" :md="6" :xs= "12" :sm="6" 
            v-for="(img,index) in images"
            :key="index"
            class="image-item"
            >
                 <el-image
                    style=" height: 100px"
                    :src="img.url"
                    fit= "cover"
                    ></el-image>
                    <div class="image-action">

                       <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="small"
            @click= "onCollect(img)"
            :loading="img.loading"
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete-solid"
            circle
            :loading="img.loading"
            @click="onDelete(img)"
          ></el-button>
                    </div>
            </el-col>
        
            </el-row>
         <!-- / 素材列表 -->

        <!-- 数据分页 -->
        <el-pagination
            background
            layout="prev, pager, next"
             @current-change= "onPageChange"
             :page-size = "pageSize"
             :current-page.sync="page"
            :total="totalCount">
            </el-pagination>
             <!-- / 数据分页 -->

        </el-card>
        <el-dialog 
        title="上传素材" 
        :append-to-body = true
        :visible.sync="dialogUploadVisible">

        <!-- 拖拽上传 upload 组件自身就支持请求提交上传操作，说白了你使用他就不用自己去发请求
        他自己就会去发，
        请求路径：action，必须写完整路径
        请求头：headers -->
            <el-upload
                class="upload-demo"
                drag
                action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
                multiple
                name= 'image'
                :headers="uploadHeaders"
                :on-success= "onUploadSuccess"
                >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-dialog>
  </div>
</template>

<script>
import {getImages ,collectImage ,deleteImage} from '@/api/image'
export default {
 name: 'ImageIndex',
 components: {},
 props: {},
 data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
     return {
         collect: false,
         images: []  ,// 图片素材列表
         dialogUploadVisible:false,
         uploadHeaders: {
            Authorization: `Bearer ${user.token}`
            },
            totalCount: 0 ,// 总页码数据
            pageSize: 10 , // 每页大小数据
            page: 1,  // 当前页码
            collectLoading: false // 收藏的loading状态
     }
 },
 computed: {},
 watch: {},
 created () {
     this.loadImage(1)
 },
 mounted () {},
 methods: {
     loadImage(page = 1) {
        //  重置高亮页码，防止数据与页码不对应
         this.page = page
         getImages({
             collect: this.collect,
             page,
             per_page: this.pageSize
         }).then(res => {
             const results = res.data.data.results
                results.forEach(img => {
                    img.loading = false
                })

             this.images = results
             this.totalCount = res.data.data.total_count
     })
     },
     onUploadSuccess() {
        //  关闭对话框
         this.dialogUploadVisible = false
        //  更新素材列表
        this.loadImage(this.page)
        this.$message({
            type:'success',
            message: '上传成功'
        })
     },
     onPageChange(page) {
         this.loadImage(page)
     },
   onCollect (img) {
      // 展示 loading
      img.loading = true
      collectImage(img.id, !img.is_collected).then(res => {
        // 更新视图状态
        img.is_collected = !img.is_collected
        // 关闭 loading
        img.loading = false
      })
      // if (img.is_collected) {
      //   // 已收藏，取消收藏
      //   collectImage(img.id, false)
      // } else {
      //   // 没有收藏，添加收藏
      //   collectImage(img.id, true)
      // }
    },
    onDelete (img) {
      img.loading = true
      deleteImage(img.id).then(res => {
        // 重新加载数据列表
        this.loadImage(this.page)
        img.loading = false
      })
    }
 }
}
</script>

<style scoped lang="less">
.action-head {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
.image-action {
    font-size: 25px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fff;
    height: 40px;
    background-color: rgba(204,204,204,.5);
    position: absolute;
    bottom: 0;
    left: 5px;
    right: 5px;
}
.image-item{
    position: relative;
}
</style>