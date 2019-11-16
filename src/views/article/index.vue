<template>
  <div class="article">
    <!-- 筛选数据 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
      <el-form ref = 'form' :model='filterForm' label-width='80px'>
        <el-form-item label= '文章状态'>
          <el-radio-group v-model = 'filterForm.status'>
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label= '频道列表'>
          <el-select placeholder="请选择活动区域" v-model = 'filterForm.channel_id'>
            <el-option label = '区域一' value='shanghai'></el-option>
            <el-option label = '区域二' value='beijing'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择">
          <el-date-picker
            v-model='rangeDate'
            type="daterange"
            range-separator= "至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
          <el-form-item>
            <el-button type='primary'>查询</el-button>
          </el-form-item>
      </el-form>

    </el-card>
    <!-- 筛选数据 -->

    <!-- 文章列表 -->
     <el-card class="box-card">
       <div slot="header" class="clearfix">
         <span>共找到59806条符合条件的内容</span>
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
        style="width: 100%">
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
          <template>
            <el-button type='danger' size = 'mini'>删除</el-button>
            <el-button type='primary' size = 'mini'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
     </el-card>

  </div>
</template>

<script>
export default {
  name: 'Article',
  data () {
    return {
      // 过滤数据的表单
      filterForm: {
        status: '',
        channel_id: '',
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
      ]

    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      // 在我们的项目中，除了 /login 接口不需要 token，其他所有的 token 才能请求
    // 否则后端返回 401 错误
    // 我们这里的后端要求吧Token 放到请求中
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'GET',
        url: '/articles',
        headers: { // 添加请求头
        // 名字：值
        // 后端要求把 token 放到请求头中，使用一个名字叫：Authorization
        // 注意，token的格式要求：Bearer用户 token
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        this.articles = res.data.data.results
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }

}
</script>

<style>

</style>
