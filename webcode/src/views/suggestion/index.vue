<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.message" placeholder="建议" style="width: 180px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-date-picker v-model="listQuery.start_date" type="datetime" value-format="timestamp" placeholder="请选择开始时间"
                      class="filter-item"
                      style="width: 220px;padding-left: 10px"/>
      <el-date-picker v-model="listQuery.end_date" type="datetime" value-format="timestamp" placeholder="请选择结束时间"
                      class="filter-item"
                      style="width: 220px;padding-left: 10px"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter"
                 style="margin-left: 10px;">
        搜索
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
      <el-table-column label="消息编号" prop="id" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="name" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="微信ID" prop="wecharid" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.wecharid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建议" prop="message" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.message }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" prop="message_time" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.message_time | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑信息
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除建议
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules[dialogStatus]" :model="temp" label-position="left" label-width="130px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="temp.phone"/>
        </el-form-item>
        <el-form-item label="建议" prop="message">
          <el-input v-model="temp.message"/>
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
import {fetchSuggestionList, updateSuggestion, deleteSuggestion, createSuggestion} from '@/api/suggestion'
import {getToken} from '@/utils/auth'
import waves from '@/directive/waves' // waves directive
import {parseTime} from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  {key: 'CN', display_name: 'China'},
  {key: 'US', display_name: 'USA'},
  {key: 'JP', display_name: 'Japan'},
  {key: 'EU', display_name: 'Eurozone'}
]

const roomWin = [
  {key: 0, display_name: '有窗'},
  {key: 1, display_name: '无窗'},
]

const roomLock = [
  {key: 0, display_name: '已锁'},
  {key: 1, display_name: '没锁'},
  {key: 2, display_name: '锁损坏'},
  {key: 3, display_name: '没锁'},
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

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
        sort: '+id',
        token: getToken(),
        message: undefined,
        start_date: undefined,
        end_date: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      roomWin,
      roomLock,
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {},
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
        phone: [{required: true, message: '该项不能为空', trigger: 'blur'}],
        message: [{required: true, message: '该项不能为空', trigger: 'blur'}],
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
      fetchSuggestionList(this.listQuery).then(response => {
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
            rtype: this.temp.rtype,
            bedtype: this.temp.bedtype,
            maxnum: this.temp.maxnum,
            area: this.temp.area,
            rwin: this.temp.rwin,
            rlock: this.temp.rlock,
            money: this.temp.money,
            token: this.listQuery.token
          }
          createRoom(data).then((response) => {
            this.temp.temperature = 20
            this.temp.humidity = 20
            this.temp.id = this.total + 1
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
            id: this.temp.id,
            message: this.temp.message,
            message_time: this.temp.message_time,
            token: this.listQuery.token
          }
          updateSuggestion(tempData).then((response) => {
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
        id: row.id,
        token: this.listQuery.token
      }
      var that = this
      this.$confirm("是否确认删除建议信息", "提示", {
        iconClass: "el-icon-question",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showClose: true,
        type: "warning",
      }).then(function () {
        deleteSuggestion(data).then((response) => {
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
        const tHeader = ['编号', '姓名', '微信ID', '手机号', '建议', '时间']
        const filterVal = ['id', 'name', 'wecharid', 'phone', 'message', 'message_time']
        const data = this.formatJson(filterVal)
        var now = new Date();
        var now_data = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '房间导出表' + now_data
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
