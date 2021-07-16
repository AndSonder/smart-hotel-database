<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 180px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.phone" placeholder="手机号" style="width: 180px; margin-left: 10px;"
                class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.level" class="filter-item" placeholder="权限" style="width: 200px;padding-left: 10px">
        <el-option v-for="item in userLevel" :key="item.key" :label="item.display_name" :value="item.key"/>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"
                 style="margin-left: 10px;">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit"
                 @click="handleCreate">
        添加
      </el-button>
      <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">
        导出
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column label="ID" prop="id" align="center" width="50">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信id" prop="wecharid" align="center" width="180">
        <template slot-scope="{row}">
          <span>{{ row.wecharid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" prop="sex" width="50px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.sex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" prop="id_card" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.id_card }}</span>
        </template>
      </el-table-column>
      <el-table-column label="电话号码" prop="phone" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="权限" prop="level" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.level===0">超级管理员</span>
          <span v-if="row.level===1">经理权限</span>
          <span v-if="row.level===2">前台权限</span>
          <span v-if="row.level===3">安保人员权限</span>
          <span v-if="row.level===4">清洁人员权限</span>
          <span v-if="row.level===5">普通用户权限</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑信息
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px"
               style="width: 400px; margin-left:50px;">
        <el-form-item v-if="dialogStatus==='create'" label="微信ID" prop="name">
          <el-input v-model="temp.wecharid"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="temp.name"/>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-input v-model="temp.sex"/>
        </el-form-item>
        <el-form-item label="身份证号" prop="id_card">
          <el-input v-model="temp.id_card"/>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="level" prop="权限">
          <el-select v-model="temp.level" class="filter-item" placeholder="请选择">
            <el-option v-for="item in userLevel" :key="item.key" :label="item.display_name" :value="item.key"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
import {fetchUserList, updateUser, deleteUser, createUser} from '@/api/user'
import {getToken} from '@/utils/auth'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination


const userLevel = [
  {key: 0, display_name: '超级管理员'},
  {key: 1, display_name: '经理权限'},
  {key: 2, display_name: '前台权限'},
  {key: 3, display_name: '安保人员权限'},
  {key: 4, display_name: '清洁人员权限'},
  {key: 5, display_name: '普通用户权限'},
  {key: undefined, display_name: '全部'},
]

export default {
  name: 'ComplexTable',
  components: {Pagination},
  directives: {waves},
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        token: getToken(),
        level: undefined,
        phone: undefined,
        name: undefined
      },
      importanceOptions: [1, 2, 3],
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {},
      userLevel,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      order_data: {
        id: undefined,
        id_status: undefined,
        token: getToken()
      },
      rules: {
        name: [{required: true, message: '该项不能为空', trigger: 'blur'}],
        sex: [{required: true, message: '该项不能为空', trigger: 'blur'}],
        id_card: [{required: true, message: '该项不能为空', trigger: 'blur'}],
        phone: [{required: true, message: '该项不能为空', trigger: 'blur'}],
        levle: [{required: true, message: '该项不能为空', trigger: 'blur'}],
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchUserList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },

    sortChange(data) {
      const {prop, order} = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        rtype: undefined,
        bedtype: undefined,
        maxnum: undefined,
        area: undefined,
        rwin: undefined,
        rlock: undefined,
        money: undefined,
        temperature: undefined,
        humidity: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          var data = {
            wecharid: this.temp.wecharid,
            name: this.temp.name,
            sex: this.temp.sex,
            id_card: this.temp.id_card,
            phone: this.temp.phone,
            level: this.temp.level,
            token: this.listQuery.token
          }
          createUser(data).then((response) => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: response.message,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = {
            wecharid: this.temp.wecharid,
            name: this.temp.name,
            sex: this.temp.sex,
            id_card: this.temp.id_card,
            phone: this.temp.phone,
            level: this.temp.level,
            token: this.listQuery.token
          }
          updateUser(tempData).then((response) => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: response.message,
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      var data = {
        wecharid: row.wecharid,
        token: this.listQuery.token
      }
      var that = this
      this.$confirm("是否确认删除用户信息", "提示", {
        iconClass: "el-icon-question",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showClose: true,
        type: "warning",
      }).then(function () {
        deleteUser(data).then((response) => {
          that.$notify({
            title: 'Success',
            message: response.message,
            type: 'success',
            duration: 2000
          })
          that.list.splice(index, 1)
        })

      }).then((data) => {
        //取消操作
      }).catch(function (err) {
        //捕获异常
      });

    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['微信id', '姓名', '性别', '身份证', '电话', '权限登记']
        const filterVal = ['wecharid', 'name', 'sex', 'id_card', 'phone', 'level']
        const data = this.formatJson(filterVal)
        var now = new Date();
        var now_data = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '用户导出表' + now_data
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'scid' || j === 'sgo' || j === 'cid' || j === 'go') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function (key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
