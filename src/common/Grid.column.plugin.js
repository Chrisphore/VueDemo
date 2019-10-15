import { bus } from '../bus'
import { formatDate } from '@/common/formtDate.js'
const typeFormaters = {
    'ymd': 'dateFormat',
    'title': 'titleFormat',
    "yyyy-MM-dd": "datetoymd"
}
const typeRenders = {
    'switch': h => ({ row, column }) => <el-switch value={row[column.prop]}></el-switch>,
    'btns': h => ({ row, column }, me) =>
        <div class="nowrap">
            {
                column.btns.map(btn => {
                    return <el-button size="mini" type={btn.type || 'primary'}
                        on-click={(event) => btnHandler(row, btn.handle, me)}>{btn.text}</el-button>
                })
            }
        </div>,
    'img': h => ({ row, column }) => {
        return <img src={row[column.prop]}
            style={{ height: column.imgheight == undefined ? "80px" : column.imgheight }}
            on-click={showimg(row[column.prop])}></img>
    },
    'checkbox': h => ({ row, column }) => <el-checkbox value={row[column.prop]}></el-checkbox>,
    'input': h => ({ row, column }, me) => <el-input value={row[column.prop]} placeholder="请输入内容" on-change={(val) => bindinput(val, row, column)}></el-input>,
    'btntype': h => ({ row, column },me) => {
        if (row[column.uploadtype].indexOf("img")!=-1 ) {
            return <el-button size="mini" type='primary' 
            on-click={(event) => choseHandler(row, column.imghandle, me)}>上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
        }
        else {
            return <el-button size="mini" type='primary' 
             on-click={(event) => choseHandler(row, column.goodshandle, me)}>选择商品<i class="el-icon-upload el-icon--right"></i></el-button>
        }

    },
    'labeltype': h => ({ row, column }) => {
        if (row[column.labeltype.type].indexOf("img")!=-1 ) {
            return <img src={row[column.labeltype.prop]}
                style={{ height: column.imgheight == undefined ? "80px" : column.imgheight }}
                on-click={showimg(row[column.labeltype.prop])}></img>
        }
        else {
            return  <span>{row[column.labeltype.prop1]}</span> 
        }

    }

}

const btnHandler = function (row, handle, me) {
    me.$parent.$parent.cellclick(row.id, handle);
}
const choseHandler = function (row, handle, me) {
    me.$parent.$parent.cellclick(row.dictId, handle);
}
const showimg = (url) => () => {
    if (url != null && url != '' && url != undefined) {
        bus.$store.dispatch('setimgurl', url)
        bus.$store.dispatch('setimgstate', true)
    }

}
const bindinput = function (val, row, column) {
    row[column.prop] = val;
}
//格式化处理
const formatlist = {
    'dateFormat': function (row, column) {
        if (row[column.property] == null || row[column.property].length == 0) {
            return "";
        } else {
            var date = new Date(row[column.property]);
            return formatDate(date, "yyyy-MM-dd hh:mm:ss");
        }
    },
    'datetoymd': function (row, column) {
        if (row[column.property] == null || row[column.property].length == 0) {
            return "";
        } else {
            var date = new Date(row[column.property]);
            return formatDate(date, "yyyy-MM-dd");
        }
    },
    'titleFormat': function (row, column) {
        var title = row[column.property];
		
        if (title) {
            if (title.length > 15) {
                return title.substring(0, 15) + "...";
            }else{
				return title;
			}
        }

    }
}
export default (column, h) => {
    //对column 进行补充
    column = types(column, h)

    column = customsTypes(column, h);

    column = customs(column, h);
    return column;
}

const types = (column, h) => {
    //类型补充
    if (!column.formatter && 'type' in column && typeFormaters[column.type]) {
        let formatter, format = typeFormaters[column.type];
        if (typeof format == "function") {
            formatter = format;
        }
        else {
            formatter = formatlist[format];
        }
        return {
            ...column,
            formatter
        }
    }

    return column;
}

const customsTypes = (column, h) => {

    if (!column.render && column.type in typeRenders) {
        column.render = typeRenders[column.type]
    }
    return column;
}


const customs = (column, h) => {
    if ('render' in column) {
        var slot = column.render(h);
        var { render, ...left } = column
        return {
            ...left,
            slot
        }
    }
    return column;
}
