<template>
<div>
  <tool-categorylist></tool-categorylist>
  <tool-list :columndata="columndata" :bindata="tableData"
   :headHeight="0"
   :menudata="menulists"
   @btnclick="btnclick"
   ></tool-list>
   <!-- <tinymce id="1"  :height="tiny.height" v-model="sendObj.content"></tinymce> -->
      <!-- <tinymce id="2" :height="tiny.height" v-model="sendObj.content"></tinymce> -->
<!-- <tinymce :height="tiny.height" v-model="sendObj.content"></tinymce>
<template>
  <tools-img :limit="1" :typeid="1" :fileslist="fileslist"></tools-img>
</el-upload>
<el-dialog :visible.sync="dialogVisible">
  <img width="100%" :src="dialogImageUrl" alt="">
</el-dialog>
</template>
<tool-tree></tool-tree> -->
<tool-tree></tool-tree>
<tool-contentmenu ></tool-contentmenu>

</div>
</template>

<script>
import tinymce from "@/components/toolstinymce";
import cdn from "@/common/cdnhelper";
import toolsimg from "@/components/toolsimgupload";
import tooltree from "@/components/toolstree";
import grid from "@/components/list";
import toolscontentmenu from "@/components/toolscontentmenu";
import toolscategorylist from "@/components/toolscategorylist";
export default {
  name: "addNews",
  components: {
    tinymce,
    "tools-img": toolsimg,
    "tool-tree": tooltree,
    "tool-list": grid,
    "tool-contentmenu": toolscontentmenu,
    "tool-categorylist": toolscategorylist
  },
  data() {
    return {
      tiny: {
        height: 500
      },
      sendObj: {
        content: ""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileslist: [],
      columndata: [
        {
          // header: "选择",
          prop: "id",
          type: "selection"
        },
        {
          label: "名称1",

          width: 100,
          children: [
            {
              label: "名称",
              prop: "name",
              width: 100
            },
                    {
              label: "名称0",
              prop: "name",
              width: 100
            }
            ,
                    {
              label: "名称3",
              prop: "date",
              width: 100
            }
          ]
        },
        {
          label: "日期",
          prop: "date",
          type: "ymd"
        },
        {
          label: "图片",
          prop: "url",
          type: "img",
          imgheight: "40px"
        },
        {
          label: "编辑",
          type: "btns",
          btns: [
            {
              type: "success",
              text: "编辑",
              handle: "btnhandle"
            }
          ]
        }
      ],
      tableData: [
        {
          date: "2016-05-04",
          name: "王小虎1",
          id: "1",
          url: "http://down.starwj.com/b2admin/1/10/5/15348517459098292.png"
        },
        {
          date: "2016-05-04",
          name: "王小虎2",
          id: "2",
          url: "http://down.starwj.com/b2admin/1/10/5/15348517459098292.png"
        },
        {
          date: "2016-05-01",
          name: "王小虎3",
          id: "3",
          url: "http://down.starwj.com/b2admin/1/10/5/15348517459098292.png"
        },
        {
          date: "2016-05-03",
          name: "王小虎4",
          id: "4",
          url: "http://down.starwj.com/b2admin/1/10/5/15348517459098292.png"
        }
      ],
      transferIndex: null, // Show the menu that was clicked

      menulists: [
        {
          fnHandler: "savedata",
          icoName: "fa fa-home fa-fw",
          btnName: "Save"
        },
        {
          fnHandler: "newdata",
          icoName: "fa fa-home fa-fw",
          btnName: "New"
        }
      ]
    };
  },
  methods: {
    btnclick(id, handle) {
      eval("this." + handle + "(" + id + ")");
    },
    btnhandle(id) {
      console.log(id);
    }
  }
};
</script>
