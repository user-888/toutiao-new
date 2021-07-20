<template>
   <el-menu
      default-active="/"
      class="el-menu-vertical-demo nav-menu"
      background-color="#002033"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      :collapse="isCollapse"
      >
    <el-menu-item index="/">
        <i class="iconfont icon-indexactive"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/article">
        <i class="iconfont icon-article"></i>
        <span slot="title">内容管理</span>
      </el-menu-item>
      <el-menu-item index="/image">
        <i class="iconfont icon-image"></i>
        <span slot="title">素材管理</span>
      </el-menu-item>
      <el-menu-item index="/publish">
        <i class="iconfont icon-publish"></i>
        <span slot="title">发布文章</span>
      </el-menu-item>
       <el-menu-item index="/comment">
        <i class="iconfont icon-comment"></i>
        <span slot="title">评论管理</span>
      </el-menu-item>
       <el-menu-item index="/fans">
        <i class="iconfont icon-fans"></i>
        <span slot="title">粉丝管理</span>
      </el-menu-item>
       <el-menu-item index="/settings">
        <i class="iconfont icon-set"></i>
        <span slot="title">个人设置</span>
      </el-menu-item>
    </el-menu>
</template>

<script>
export default {
 name: 'AppAside',
 components: {},
 props: ['is-collapse'],
 data () {
     return {
      
     }
 },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
    
 }
}
</script>

<style scoped lang="less">
.nav-menu {
    .iconfont {
        margin-right: 10px;
    }
}
</style>