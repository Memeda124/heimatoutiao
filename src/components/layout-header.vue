<template>
<!-- 头部组件 el-row布局  -->
<el-row type = 'flex' justify="space-between" align='middle'>
    <!-- 左侧内容 -->
    <el-col :span='6' class="left">
        <i class='el-icon-s-fold'></i>
        <span>江苏传智博客教育科技股份有限公司</span>
    </el-col>
    <!-- 右侧内容 -->
    <el-col :span='3' class="right">
        <!-- 头像 -->
        <img src="../assets/img/avatar.jpg" alt="">
        <!-- 下拉菜单 -->
            <el-dropdown trigger='click'>
            <span>噜噜噜</span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>账户信息</el-dropdown-item>
                <el-dropdown-item>git地址</el-dropdown-item>
                 <!-- 如果想要给一个组件注册一个原生 Javascript事件 使用 .native修饰符 -->
                <el-dropdown-item @click.native = 'onlogout'>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </el-col>
</el-row>
</template>

<script>
export default {
  methods: {
    onlogout () {
      this.$confirm('确定退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        // 删除Token
        window.localStorage.removeItem('user-token')
        // 跳转到登录页
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.left {
    display: flex;
    align-items: center;
    i {
        font-size: 24px;
    }
    span {
        margin-left: 4px;
    }
}
.right {
    display: flex;
    align-items: center;
    img {
        border-radius: 50%;
        margin-right: 5px;
    }
}

</style>
