<template>
  <div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref = 'form' :model='filterForm' label-width='80px'>
        <el-form-item label= '文章状态'>
          <!-- 单选框组会把选中的 radio 的 label 同步给绑定的数据 -->
          <el-radio-group v-model = 'filterForm.status'>
            <el-radio :label="null">全部</el-radio>
            <el-radio label="0">草稿</el-radio>
            <el-radio label="1">待审核</el-radio>
            <el-radio label="2">审核通过</el-radio>
            <el-radio label="3">审核失败</el-radio>
            <el-radio label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label= '频道列表'>
          <el-select placeholder="请选择活动区域" v-model = 'filterForm.channel_id'>
            <el-option label = '所有频道' :value = 'null'></el-option>
            <el-option
             :label = channel.name
             :value='channel.id'
             v-for="channel in channels"
             :key='channel.id'
            ></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model='rangeDate'
            type="daterange"
            range-separator= "至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
          <el-form-item>
            <el-button type='primary' @click ='loadArticles(1)'>查询</el-button>
          </el-form-item>
      </el-form>

    </el-card>
    <!-- 筛选数据 -->

    <!-- 文章列表 -->
     <el-card class="box-card">
       <div slot="header" class="clearfix">
         <span>共找到{{totalCount}}条符合条件的内容</span>
       </div>
       <!--
            el-table表格组件  要求是数组
            表格组件会使用data数据，在内部自己进行遍历
            el-data-colum 表格列组件
            prop 用来指定那个数据字段
            label 表头名称
            width 列宽
            表格默认只能渲染普通文本，如果像想要渲染别的东西（如图片），需要自定义别的表格列
       -->
       <el-table
        :data="articles"
        style="width: 100%"
         v-loading='loading'>
        <el-table-column
          prop="date"
          label="封面"
          width="180">
           <!--
             自定义表格列
             在 template 上声明 slot-scope = 'scope',然后就可以通过 scpoe.row获取遍历项
             scope.row相当于 v-for的 item
          -->
          <template slot-scope = 'scope'>
            <img width='50px' :src="scope.row.cover.images[0]" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">

        </el-table-column>
        <el-table-column
          prop="address"
          label="状态">
          <template slot-scope = 'scope'>
            <!--
              0 草稿
              1 待审核
              2 审核通过
              3 审核失败
              4 已删除
              -->
              <!-- <span v-show = 'scope.row.status == 0'>草稿</span>
              <span v-show = 'scope.row.status == 1'>待审核</span>
              <span v-show = 'scope.row.status == 2'>审核通过</span>
              <span v-show = 'scope.row.status == 3'>审核失败</span>
              <span v-show = 'scope.row.status == 4'>已删除</span> -->
              <!-- scope.row.status
              0 1 2 3 4
              articleStatus
              [ {value:'草稿' } ，{label：'待审核'}...] -->
              <!-- <span>{{articleStatus[scope.row.status].label}}</span> -->
              <el-tag
              :type = 'articleStatus[scope.row.status].type'
              >{{articleStatus[scope.row.status].label}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope = 'scope'>
            <el-button type='danger' size = 'mini' @click = 'onDelete(scope.row.id)'>删除</el-button>
            <el-button type='primary' size = 'mini'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
     </el-card>

     <!-- 分页 -->
     <el-pagination
      background
      layout = 'prev,pager,next'
      :total='totalCount'
      @current-change = 'onPageChange'
      :disabled = 'loading'>  <!-- 禁用分页 -->
     </el-pagination>
     <!-- 分页 -->

  </div>
</template>

<script>
// import { url } from 'inspector'
export default {
  name: 'Article',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: null,
        channel_id: null,
        begin_pubdate: '',
        end_pubdate: ''
      },
      rangeDate: '',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [], // 文章数据列表
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'success',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ],
      totalCount: 0, // 总记录数
      loading: true, // 表格的 loading 状态
      channels: [], // 频道列表
      page: 0

    }
  },
  created () {
    // 初始化应该加载第一页数据
    this.loadArticles(1)
    // 加载频道列表
    this.loadChannels()
  },
  methods: {
    // 如果page 就使用传递的，如果没传递 默认1
    loadArticles (page = 1) {
      // 加载 loading
      this.loading = true
      // 在我们的项目中，除了 /login 接口不需要 token，其他所有的 token 才能请求
      // 否则后端返回 401 错误
      // 我们这里的后端要求吧Token 放到请求中
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        // headers: { // 添加请求头
        // // 名字：值
        // // 后端要求把 token 放到请求头中，使用一个名字叫：Authorization
        // // 注意，token的格式要求：Bearer用户 token
        //   Authorization: `Bearer ${token}`
        // },
        // Query 参数使用 params 传递
        params: {
          page, // 页码
          per_page: 10, // 每页页数，后端按照默认10条每页
          status: this.filterForm.status, // 文章状态
          channel_id: this.filterForm.channel_id, // 频道ID
          begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, // 开始时间
          end_pubdate: this.rangeDate ? this.rangeDate[1] : null // 结束时间

        }
      }).then(res => {
        // 更新文章列表数组
        this.articles = res.data.data.results
        // 更新总记录数
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '获取数据失败')
      }).finally(() => {
        // 停止loading
        this.loading = false
      })
    },

    onPageChange (page) {
      // 记录当前最新页码
      this.page = page
      // 请求加载指定指定页码的文章列表
      this.loadArticles(page)
    },

    loadChannels () {
      this.$axios({
        method: 'GET',
        url: '/channels'
      }).then(res => {
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    },
    onDelete (articleId) {
      this.$axios({
        method: 'DELETE',
        url: `/articles/${articleId}`
        // headers: {
        //   Authorization: `Bearer${window.localStorage.getItem('user-token')}`
        // }
      }).then(res => {
        this.loadArticles(this.page)
      }).catch(err => {
        console.log(err, '删除失败')
      })
    }

  }

}
</script>

<style>

</style>
