<template>
	<van-calendar
		:min-date="mindate"
		:max-date="maxdate"
		:default-date="selectDate"
		:show-confirm="false"
		:poppable="false"
		:row-height="30"
		:style="{ height: '300px'}"
		:formatter="formatter"
		color="deepskyblue">
		<template slot="title">
			<el-row type="flex" justify="space-between" style="margin:0 10px">
				<el-col :span="6" align="left">
					<el-button size="mini" type="text" @click="lastYear()"><i class="el-icon-d-arrow-left"></i></el-button>
					<el-button size="mini" type="text" @click="lastMonth()"><i class="el-icon-arrow-left"></i></el-button>
				</el-col>
				<el-col :span="12" align="center">{{calendarTitle}}</el-col>
				<el-col :span="6" align="right">
					<el-button size='mini' type="text" @click="nextMonth()"><i class="el-icon-arrow-right"></i></el-button>
					<el-button size='mini' type="text" @click="nextYear()"><i class="el-icon-d-arrow-right"></i></el-button>
				</el-col>
			</el-row>
		</template>
	</van-calendar>
</template>

<script>
import {get_month} from "common/utils"

export default {
	name: 'CalendarBar',
	props:{
		data:{
			type: Array,
			default(){
				return []
			}
		}
	},
	data(){
		return {
			selectDate:new Date(),
			mindate:null,
			maxdate:null,
		}
	},
	components: {
	},
	created(){
		let date = get_month(this.selectDate)
		this.mindate = new Date(date[0])
		this.maxdate = new Date(date[1])
		// console.log(date,this.mindate,this.maxdate)
	},
	computed:{
		calendarTitle(){
			return this.selectDate.getFullYear() + '年' + (this.selectDate.getMonth() + 1) + '月'
		}
	},
	methods: {
		formatter(day) {
			const year = day.date.getFullYear()
      const month = day.date.getMonth() + 1;
			const today = day.date.getDate();
			// console.log(year,month,today)
			for (let post of this.data){
				let y = new Date(post.timestamp).getFullYear()
				let m = new Date(post.timestamp).getMonth() + 1
				let d = new Date(post.timestamp).getDate()
				if (year === y && month === m && today === d){
					day.type = 'start'
					return day
				}
			}
			//一天的毫秒数86400000
			if (day.date < new Date() - 86400000){
				day.type = 'disabled'
				return day
			}else if (day.date > new Date()){
				return day
			}else{
				day.text = '今天'
				day.type = 'start'
				return day;
			}
		},
		lastYear(){
			this.selectDate = new Date(this.selectDate.getFullYear()-1,this.selectDate.getMonth(),this.selectDate.getDate())
		},
		lastMonth(){
			this.selectDate = new Date(this.selectDate.getFullYear(),this.selectDate.getMonth()-1,this.selectDate.getDate())
		},
		nextYear(){
			this.selectDate = new Date(this.selectDate.getFullYear()+1,this.selectDate.getMonth(),this.selectDate.getDate())
		},
		nextMonth(){
			this.selectDate = new Date(this.selectDate.getFullYear(),this.selectDate.getMonth()+1,this.selectDate.getDate())
			// console.log(this.selectDate)
		}
	},
	watch:{
		selectDate(){
			
			let date = get_month(this.selectDate)
			this.mindate = new Date(date[0])
			this.maxdate = new Date(date[1])
		}
	}
}
</script>
<style scoped>
</style>

