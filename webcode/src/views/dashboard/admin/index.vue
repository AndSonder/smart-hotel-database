<template>
  <div class="dashboard-editor-container">
    <github-corner class="github-corner"/>

    <panel-group @handleSetLineChartData="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}"
              style="padding-right:8px;margin-bottom:30px;">
        <transaction-table/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import {getHotelChart} from '@/api/hote'
import {getToken} from '@/utils/auth'

import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

const lineChartData = {
  newVisitis: {
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    actualData: [120, 82, 91, 154, 162, 140, 140]
  }
}


export default {
  name: 'DashboardAdmin',
  components: {
    GithubCorner,
    PanelGroup,
    LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    TransactionTable,
    // TodoList,
    // BoxCard
  },
  data() {
    return {
      chartData: undefined,
      lineChartData: this.getLineChartData().newVisitis
    }
  },
  created() {
    this.getLineChartData()
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = this.chartData[type]
    },
    getLineChartData() {
      var data = {token: getToken(), num: 7}
      var charData = {
        newVisitis: {
          actualData: [120, 82, 91, 154, 162, 140, 145]
        },
        messages: {
          actualData: [180, 160, 151, 106, 145, 150, 130]
        },
        purchases: {
          actualData: [120, 90, 100, 138, 142, 130, 130]
        },
        shoppings: {
          actualData: [120, 82, 91, 154, 162, 140, 140]
        }
      }
      getHotelChart(data).then(response => {
        charData.newVisitis.actualData = response.data.people_num
        charData.messages.actualData = response.data.question_num
        charData.purchases.actualData = response.data.order_money
        charData.shoppings.actualData = response.data.order_num
      })
      this.chartData = charData
      return charData
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
