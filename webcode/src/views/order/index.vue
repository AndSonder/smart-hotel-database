<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="姓名" style="width: 180px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-input v-model="listQuery.id" placeholder="订单号" style="width: 180px; margin-left: 10px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
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
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="应付金额" prop="pmoney" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.pmoney }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预定入住日期" prop="scid" width="150px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.scid !== 0">
            <span>{{ row.scid | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <div v-else>
            <span></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预定离开日期" prop="sgo" width="150px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.sgo !== 0">
            <span>{{ row.sgo | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <div v-else>
            <span></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="实际入住时间" prop="cid" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.cid !== 0">{{ row.cid | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          <span v-else></span>
        </template>
      </el-table-column>
      <el-table-column label="结账离开日期" prop="go" width="150px" align="center">
        <template slot-scope="{row}">
          <div v-if="row.go !== 0">
            <span>{{ row.go | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <div v-else>
            <span></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="住户姓名" prop="name" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="住户微信id" prop="wecharid" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.wecharid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间号" prop="room_id" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.room_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" prop="id_status" width="110px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.id_status===0">进行中</span>
          <span v-if="row.id_status===1">已完成</span>
          <span v-if="row.id_status===2">已取消</span>
        </template>
      </el-table-column>
      <el-table-column label="入住状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑信息
          </el-button>
          <el-button v-if="row.status==='draft'" size="mini" type="success"
                     @click="handleModifyStatus(row,'published',0)">
            登记入住
          </el-button>
          <el-button v-if="row.status==='published'" size="mini" @click="handleModifyStatus(row,'ended',1)">
            登记离开
          </el-button>
          <el-button v-if="row.status==='ended'" size="mini">
            订单完成
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row)">
            取消订单
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="130px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="订单编号" prop="id">
          <el-input v-model="temp.id"/>
        </el-form-item>
        <el-form-item label="应付金额" prop="pmoney">
          <el-input v-model="temp.pmoney"/>
        </el-form-item>
        <el-form-item label="房间编号" prop="room_id">
          <el-input v-model="temp.room_id"/>
        </el-form-item>
        <el-form-item label="预计入住时间" prop="scid">
          <el-date-picker v-model="temp.scid" type="datetime" value-format="timestamp" placeholder="请选择一个日期"/>
        </el-form-item>
        <el-form-item label="预计离开时间" prop="sgo">
          <el-date-picker v-model="temp.sgo" type="datetime" value-format="timestamp" placeholder="请选择一个日期"/>
        </el-form-item>
        <el-form-item label="实际入住时间" prop="cid">
          <el-date-picker v-model="temp.cid" type="datetime" value-format="timestamp" placeholder="请选择一个日期"/>
        </el-form-item>
        <el-form-item label="实际离开时间" prop="go">
          <el-date-picker v-model="temp.go" type="datetime" value-format="timestamp" placeholder="请选择一个日期"/>
        </el-form-item>
        <el-form-item label="订单状态" prop="id_status">
          <el-select v-model="temp.id_status" class="filter-item" placeholder="请选择">
            <el-option v-for="item in idStatus" :key="item.key" :label="item.display_name" :value="item.key"/>
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
import {fetchOrderList, recordOrderCheck, updateOrder, deleteOrder} from '@/api/order'
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

const idStatus = [
  {key: 0, display_name: '进行中'},
  {key: 1, display_name: '已完成'},
  {key: 2, display_name: '已取消'}
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
        title: undefined,
        name: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      idStatus,
      sortOptions: [{label: 'ID Ascending', key: '+id'}, {label: 'ID Descending', key: '-id'}],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: undefined,
        pmoney: undefined,
        scid: new Date(),
        sgo: new Date(),
        cid: new Date(),
        go: new Date(),
        wecharid: undefined,
        room_id: undefined,
        status: 'published',
        id_status: undefined
      },
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
        id: [{required: true, message: '订单编号不能为空', trigger: 'blur'}],
        pmoney: [{required: true, message: '支付金额不能为空', trigger: 'blur'}],
        scid: [{type: 'date', required: true, message: '预定入住日期不能为空', trigger: 'change'}],
        sgo: [{type: 'date', required: true, message: '预定离开日期不能为空', trigger: 'change'}],
        wecharid: [{type: 'date', required: true, message: '用户微信id不能为空', trigger: 'change'}],
        room_id: [{required: true, message: '用户房间号不能为空', trigger: 'blur'}],
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
      fetchOrderList(this.listQuery).then(response => {
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
    handleModifyStatus(row, status, id_status) {
      row.status = status
      row.id_status = id_status
      this.order_data.id = row.id
      this.order_data.status = status
      recordOrderCheck(this.order_data).then(response => {
        this.$notify({
          title: 'Success',
          message: response.message,
          type: 'success',
          duration: 2000
        })
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 3000)
      })
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
        pmoney: undefined,
        scid: new Date(),
        sgo: new Date(),
        cid: new Date(),
        go: new Date(),
        wecharid: undefined,
        room_id: undefined,
        status: 'published',
        id_status: undefined
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
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
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
            cid: this.temp.cid,
            go: this.temp.go,
            sgo: this.temp.sgo,
            scid: this.temp.scid,
            pmoney: this.temp.pmoney,
            id_status: this.temp.id_status,
            room_id: this.temp.room_id,
            token: this.listQuery.token
          }
          updateOrder(tempData).then((response) => {
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
    handleDelete(row) {
      var data = {
        id: row.id,
        token: this.listQuery.token
      }
      row.id_status = 2
      row.status = 'ended'
      deleteOrder(data).then((response) => {
        this.$notify({
          title: 'Success',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
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
        const tHeader = ['订单号', '应付金额', '预定入住日期', '预定离开日期', '实际入住日期', '结账离开日期', '住户姓名', '住户微信id', '房间号', '订单状态']
        const filterVal = ['id', 'pmoney', 'scid', 'sgo', 'cid', 'go', 'name', 'wecharid', 'room_id', 'id_status']
        const data = this.formatJson(filterVal)
        var now = new Date();
        var now_data = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '订单导出表' + now_data
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
