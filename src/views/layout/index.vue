<template>
  <div class="layout-container">
      <!-- <div>顶部导航栏</div>

     
      <div>侧边导航栏</div>  -->
      
      <!-- 子路由出口 -->
      <!-- <router-view /> -->
      <el-container class="layout-container">
        <el-aside 
        width= "auto"
        class="aside"
        >
        <app-aside class="aside-menu" :is-collapse="isCollapse"/>
        </el-aside>
        <el-container>
          <el-header class="header">
            <template>
              <div class="header-container">
                <div>
                  <i 
                  :class="{
                      'el-icon-s-fold': isCollapse,
                      'el-icon-s-unfold': !isCollapse
                    }"
                   @click="isCollapse = !isCollapse"
                   ></i>
                  <span>江苏传智播客科技教育有限公司</span>
                </div>
                <el-dropdown>
                  <div class="avatar-wrap">
                    <img class="avatar" :src="user.photo" alt="">
                    <span>{{user.name}}</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </div>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>设置</el-dropdown-item>
                    <!-- 组件时默认不识别默认事件的，除非内部做了处理 -->
                    <el-dropdown-item
                    @click.native = "onLogout"
                    >退出</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </template>
          </el-header>
          <el-main class="main">
           <!-- 子路由出口 -->
          <router-view />
          </el-main>
        </el-container>
      </el-container>
  </div>
</template>

<script>
import AppAside from './compponents/aside.vue'
import { getUserProfile } from '@/api/user'
export default {
 name: 'LayoutIndex',
 components: {
   AppAside
 },
 props: {},
 data () {
     return {
      user: {}, // 当前登录用户信息
      isCollapse: false // 侧边菜单栏的展示状态
     }
 },
 computed: {},
 watch: {},
 created () {
   // 组件初始化好，请求获取用户资料
    this.loadUserProfile()
 },
 mounted () {},
 methods: {
   // 除了登录接口，其它所有接口都需要授权才能请求使用
    // 或者说，除了登录接口，其它接口都需要提供你的身份令牌才能获取数据
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
         this.$confirm('确认退出吗？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           // 将用户的登录状态清除
            window.localStorage.removeItem('user')
            
            // 跳转到登录页
            this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    }
 }
}
</script>

<style scoped lang="less">
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
.aside {
  background-color:  #D3DCE6;
  .aside-menu {
    height: 100%;
  }
}
.header {
  .header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
}
.main {
    background-color: #dfe9f7;
}
</style>