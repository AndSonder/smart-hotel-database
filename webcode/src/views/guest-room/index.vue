<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.id" placeholder="房间号" style="width: 180px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-select v-model="listQuery.bedtype" placeholder="房间类型" clearable style="width: 140px;padding-left: 10px" class="filter-item">
        <el-option v-for="item in BedType" :key="item" :label="item" :value="item"/>
      </el-select>
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
      <el-table-column label="房间编号" prop="id" sortable="custom" align="center" width="80"
                       :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间类型" prop="rtype" align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.rtype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="床型" prop="bedtype" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.bedtype }}</span>
        </template>
      </el-table-column>
      <el-table-column label="最大人数" prop="maxnum" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.maxnum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间面积" prop="area" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.area }} m<sup>2</sup></span>
        </template>
      </el-table-column>
      <el-table-column label="是否有窗" prop="rwin" width="150px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.rwin===1">有</span>
          <span v-if="row.rwin===0">无</span>
        </template>
      </el-table-column>
      <el-table-column label="房间锁状态" prop="rlock" width="110px" align="center">
        <template slot-scope="{row}">
          <span v-if="row.rlock===0">已锁</span>
          <span v-if="row.rlock===1">没锁</span>
          <span v-if="row.rlock===2">锁损坏</span>
          <span v-if="row.rlock===3">未锁</span>
        </template>
      </el-table-column>
      <el-table-column label="房间金额/日" prop="money" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="房间当前温度" prop="temperature" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.temperature }} &#8451;</span>
        </template>
      </el-table-column>
      <el-table-column label="房间当前湿度" prop="humidity" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.humidity }} rh</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit"
                @pagination="getList"/>
  </div>
</template>

<script>
import {fetchList, fetchPv, createArticle, updateArticle} from '@/api/article'
import {fetchRoomList, updateRoom, deleteRoom, createRoom, fetchRoomGuest} from '@/api/room'
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

const BedType = ['大床', '单人床', '小型双床', '特大床', '三张床']

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
        bedtype: undefined,
        id: undefined,
        start_date: undefined,
        end_date: undefined
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      roomWin,
      roomLock,
      BedType,
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
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchRoomGuest(this.listQuery).then(response => {
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
            rtype: this.temp.rtype,
            bedtype: this.temp.bedtype,
            maxnum: this.temp.maxnum,
            area: this.temp.area,
            rwin: this.temp.rwin,
            rlock: this.temp.rlock,
            money: this.temp.money,
            temperature: this.temp.temperature,
            humidity: this.temp.humidity,
            token: this.listQuery.token
          }
          updateRoom(tempData).then((response) => {
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
      this.$confirm("是否确认删除房间信息", "提示", {
        iconClass: "el-icon-question",
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        showClose: true,
        type: "warning",
      }).then(function () {
        deleteRoom(data).then((response) => {
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
        const tHeader = ['房间编号', '房间类型', '床型', '最大人数', '房间面积', '是否有窗', '房间锁状态', '房间金额/日', '房间当前温度', '房间当前湿度']
        const filterVal = ['id', 'rtype', 'bedtype', 'maxnum', 'area', 'rwin', 'rlock', 'money', 'temperature', 'humidity']
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
