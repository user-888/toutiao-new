<template>
  <div class="settings-container">
      <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>

    <el-row>
        <el-col :span="15">
              <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="编号">
                    {{ user.id }}
                    </el-form-item>
                    
                        <el-form-item label="手机">
                   {{user.mobile}}
                    </el-form-item>
                    
                        <el-form-item label="媒体名称">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                    <el-form-item label="媒体介绍">
                        <el-input type="textarea" v-model="user.intro"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="user.email"></el-input>
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>
        <el-col :span="4" :offset= "4">
            <label for="file">
               <el-avatar 
               shape="square" 
               :size="150" 
               fit="cover" 
               :src="user.photo"></el-avatar>
               <!-- <p @click="$ref.file.cilck()">点击修改头像</p> -->
               <p>点击修改头像</p>
               </label>
               <input 
               type="file" 
               id="file" 
               hidden 
               ref="file"
               @change="onFileChange"
               >
        </el-col>
    </el-row>

  
    </el-card>
    <el-dialog
        title="修改头像"
        :visible.sync="dialogVisible"
        append-to-body
        @opened= "onDialogOpened"
        @closed= "onDialogClosed"
        >
        <div class="preview-image-wrap">
            <img 
            class="preview-image"
            :src="preiewImage" 
            ref="preview-image"
            >
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button 
            type="primary" 
            @click="onUpdatePhoto">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
import { getUserProfile ,updateUserPhoto} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
// 操作dom节点
// const image = document.getElementById('image');
// 初始化裁切器
// const cropper = new Cropper(image, {
//   aspectRatio: 16 / 9,
//   crop(event) {
//     console.log(event.detail.x);
//     console.log(event.detail.y);
//     console.log(event.detail.width);
//     console.log(event.detail.height);
//     console.log(event.detail.rotate);
//     console.log(event.detail.scaleX);
//     console.log(event.detail.scaleY);
//   },
// });
export default {
 name: 'SettingsIndex',
 components: {},
 props: {},
 data () {
     return {
     form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
     user: {
         email: '',
         id: null ,
         intro: '',
         mobile: '',
         name: '',
         photo: ''
     }, // 用户资料
     dialogVisible: false,   // 控制上传图片裁切预览状态
     preiewImage: '',  // 预览图片
     cropper: null
     }
 },
 computed: {},
 watch: {},
 created () {
     this.loadUser()
 },
 mounted () {},
 methods: {
      onSubmit() {
        console.log('submit!')
      },
      loadUser () {
          getUserProfile().then(res => {
              this.user = res.data.data
          }) 
      },
      onFileChange () {
          // 处于图片预览
          const file = this.$refs.file
        //   console.log(file.files[0]);
        // h5新增的api ， 他是可以直接设置图片的src
      const blobData = window.URL.createObjectURL(file.files[0])
        // console.log(blobData);
        this.preiewImage = blobData
        // 展示弹出层，预览用户选择图片
        this.dialogVisible = true

        

        //   解决选择相同文件不触发change事件问题
          this.$refs.file.value = ""
      },
      onDialogOpened () {
          // 图片裁切器必须是 基于image可见状态才能正常完成初始化
        // 操作dom节点
        const image = this.$refs['preview-image']
        // 第一次初始化以后，如果预览裁切图片发生了变化，裁切器默认不会更新，
        // 如果需要预览图片发生变化更新裁切器
        // 方式一：裁切器，replace 方法
        // 方式二：销毁裁切器 并从图片中重新初始化
        // 初始化裁切器
        if (this.cropper) {
            this.cropper.replace(this.preiewImage)
            return
        }
        this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        movable: true,
        cropBoxResizable: false

        // 当你触发裁切器的时候会触发
        // crop(event) {
        //     console.log(event.detail.x);
        //     console.log(event.detail.y);
        //     console.log(event.detail.width);
        //     console.log(event.detail.height);
        //     console.log(event.detail.rotate);
        //     console.log(event.detail.scaleX);
        //     console.log(event.detail.scaleY);
        // },
        })
      },
      onDialogClosed () {
          // 对话框关闭，销毁裁切器
        this.cropper.destroy()
      },
     onUpdatePhoto () {
      // 让确定按钮开始 loading
      this.updatePhotoLoading = true
      // 获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 请求更新用户头像请求提交 fd
        updateUserPhoto(fd).then(res => {
          console.log(res)
          // 关闭对话框
          this.dialogVisible = false
          // 更新视图展示

          // 直接把裁切结果的文件对象转为 blob 数据本地预览
          this.user.photo = window.URL.createObjectURL(file)

          // 关闭确定按钮的 loading
          this.updatePhotoLoading = false

          this.$message({
            type: 'success',
            message: '更新头像成功'
          })

          // 更新顶部登录用户的信息
          globalBus.$emit('update-user', this.user)

          // 把服务端返回的图片进行展示有点慢
          // this.user.photo = res.data.data.photo
        })
      })
    }
 }
}
</script>

<style scoped lang="less">
.preview-image-wrap {
    /* Ensure the size of the image fit the container perfectly */
.preview-image {
  display: block;

  /* This rule is very important, please don't ignore this */
  max-width: 100%;
  height: 200px;
}
}
</style>