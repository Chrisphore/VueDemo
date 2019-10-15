<template>
  <div>
    <textarea :id="tinymceId"></textarea>
  </div>
</template>

<script>
import cdn from "@/common/cdnhelper";
import config from "@/config";
export default {
  name: "tinymce",
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    //可以自定义toolbar
    toolbar: {
      type: Array,
      require: false,
      default() {
        return [
          "bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat"
        ];
      }
    },
    menubar: {
      default: ""
    },
    height: {
      type: Number,
      requier: false,
      default: 400
    },
    width: {
      type: Number,
      requier: false,
      default: 800
    }
  },
  data() {
    return {
      tinymceId: this.id || "vue-tinymce" + Date.parse(new Date().getSeconds()),
      hasInit: false,
      hasChange: false
    };
  },
  mounted() {
    this.initTinymce();
  },
  watch: {
    value(newV, oldV) {
      //当传入值不变化的时候更新富文本内容,
      if (this.hasInit && !this.hasChange) {
        window.tinymce.get(this.tinymceId).setContent(newV);
      }
    }
  },
  methods: {
    initTinymce() {
      const _this = this;
      tinymce.init({
        selector: `#${this.tinymceId}`,
        height: this.height,
        //    width: this.width,
        body_class: "panel-body rich-text",
        theme: "modern",
        content_style: "{p{color_red} }",
        //是否可拉伸
        resize: true,
        //语言
        language_url: "http://down.starwj.com/b2admin/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        //是否显示POWERED BY TINYMCE
        branding: false,
        //toolbar
        toolbar: this.toolbar,
        fixed_toolbar_container: "#mytoolbar",
        //menubar
        //    menubar: this.menubar,
        //插件
        plugins:
          "advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,image ",

        powerpaste_word_import: "clean",
        skin_url: "http://down.starwj.com/b2admin/tinymce/skins/lightgray",
        //源代码弹出层宽
        code_dialog_height: 450,
        //源代码弹出层高
        code_dialog_width: 800,
        //
        block_formats: "Paragraph=p;Header 1=h1;Header 2=h2;Header 3=h3",
        imagetools_cors_hosts: [],
        //链接打开方式
        default_link_target: "_blank",
        images_upload_url: "",
        //上传图片回调
        images_upload_handler: (blobInfo, success, failure) => {
          var cospath = cdn.getCosFilePath(3, blobInfo.filename());
          cdn
            .sliceUploadFile(cospath, blobInfo.blob())
            .then(function(data) {
              if (data.statusCode == "200") {
                var url =
                  config.httphead +
                  data.Location.toString().replace(config.cdnurl, config.url);
                success(url);
              }
            })
            .catch(function(err) {
              console.error(err);
            });
          // let formdata = new FormData();
          // formdata.set("upload_file", blobInfo.blob());
        },
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change input KeyUp", () => {
            //change触发watch去setContent，光标变化了，
            this.hasChange = true;
            this.$emit("input", editor.getContent({ format: "raw" }));
          });
        }
      });
    },
    destroyTiny() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(val) {
      window.tinymce.get(this.tinymceId).setContent(val);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    }
  },
  destroyed() {
    this.destroyTiny();
  }
};
</script>
