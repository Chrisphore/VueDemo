
// var pick=require('lodash/pick')

const isNotIn = (obj, v, key) => v && (obj[key] = v)

import pluginHelper from './Grid.column.plugin.js'
import { formatDate } from '@/common/formtDate.js'

export default {
    name: 'GridColumn',
    render(h) {
       var me = this;
        function renderChild(column) {
            var ps = { attrs: {} };
            var {fixed,label, prop, width, sortable, formatter, children, type, pk, slot,align } = pluginHelper(column, h);
            ps.attrs.key = prop || (pk + type);
			isNotIn(ps.attrs, fixed, 'fixed')
            isNotIn(ps.attrs, label, 'label')
            isNotIn(ps.attrs, prop, 'prop')
            isNotIn(ps.attrs, width, 'width')
            isNotIn(ps.attrs, type, 'type')
            isNotIn(ps.attrs, sortable, 'sortable')
            isNotIn(ps.attrs, formatter, 'formatter')
            isNotIn(ps.attrs, align, 'align')
            if (slot) {
                //设定自定义模板页传值
                ps.scopedSlots = { default: ({ row }) => slot({ row, column }, me) }
            }
            if (column.children) {
                ps.attrs.headerAlign = "center";
                return <el-table-column {...ps}>
                    {
                        column.children.map((child, index) => {
                            return renderChild(child)
                        })
                    }
                </el-table-column>
            }
            else {
                return <el-table-column
                    {...ps} >
                </el-table-column>
            }
        }

        if (this.column)
            return renderChild(this.column);
    },
    props: {
        column: null,
        pk: {
            type: String,
        }
    },
}