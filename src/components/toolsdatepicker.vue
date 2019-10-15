<template>
  <div class="block">
  <el-date-picker
      v-model="values"
      type="daterange"
      align="center"
      unlink-panelsy
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="changeselect"
     value-format="timestamp"
      >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: {
    datetype: {
      type: String,
      default: "daterange"
    },
    defualtimeprop: {
      type: Array,
      default() {
        return [
          new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),
          new Date()
        ];
      }
    }
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime());
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              end.setTime(end.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      defualtime: this.defualtimeprop,
      values: "",
      starttime: new Date().getTime() - 3600 * 1000 * 24 * 7,
      endtime: new Date().getTime()
    };
  },
	watch: {
		defualtimeprop: function(newVal) {
			this.values = newVal;
		}
	},
  methods: {
    changeselect() {
      if (this.values != null) {
        this.starttime = this.values[0];
        this.endtime = this.values[1];
      }
    }
  },
  created() {
    this.values = this.defualtime;
  }
};
</script>

<style>
</style>
