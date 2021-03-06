define([
    'http',
    'config',
    'pointConfig',
    'util',
    'extension'
], function (http, config, pointConfig, util, $$) {
    return {
        name: 'exchanged-bill',
        init: function () {
            // 分页配置
            var pageOptions = {
                page: 1,
                rows: 10,
                userOid: '',
                settingOid: "",
                goodsOid: "",
                state: "",
                startTime: '',
                endTime: ""
            };

            // 初始化数据表格
            var tableConfig = {
                ajax: function (origin) {
                    http.post(pointConfig.api.exchangedBill.list, {
                        data: {
                            page: pageOptions.page,
                            rows: pageOptions.rows,
                            userOid: pageOptions.userOid,
                            goodsOid: pageOptions.goodsOid,
                            type: pageOptions.type,
                            state: pageOptions.state,
                            startTime: pageOptions.startTime,
                            endTime: pageOptions.endTime
                        },
                        contentType: 'form'
                    }, function (rlt) {
                        origin.success(rlt)
                    })
                },
                pageNumber: pageOptions.page,
                pageSize: pageOptions.rows,
                pagination: true,
                sidePagination: 'server',
                pageList: [10, 20, 30, 50, 100],
                queryParams: getQueryParams,
                onLoadSuccess: function () {
                },
                columns: [
                    {
                        width: 30,
                        align: 'center',
                        formatter: function (val, row, index) {
                            return index + 1
                        }
                    },
                    {
                        width: 50,
                        // 用户ID
                        field: 'userOid'

                    }, {
                        width: 50,
                        // 积分产品ID
                        field: 'goodsOid'

                    }, {
                        width: 50,
                        // 商品名称
                        field: 'goodsName'

                    }, {
                        width: 50,
                        // 商品类型（枚举: real实物、virtual虚拟）
                        field: 'type',
                        formatter: function (val, row, index) {
                            switch (row.type) {
                                case 'real':
                                    return '实物';
                                case 'virtual':
                                    return '虚拟';
                                default:
                                    return '-'
                            }
                        }
                    }, {
                        width: 50,
                        // 兑换数量
                        field: 'exchangedCount'

                    }, {
                        width: 50,
                        // 兑换时间
                        field: 'exchangedTime'

                    }, {
                        width: 50,
                        // 状态：0:成功、1:失败
                        field: 'state',
                        formatter: function (val, row, index) {
                            var state = parseInt(row.state);
                            switch (state) {
                                case 0:
                                    return '成功';
                                case 1:
                                    return '失败';
                                default:
                                    return '-'
                            }
                        }
                    }
                    , {
                        width: 50
                        /*
                         width: 100,
                         filed: 'update',
                         title: '操作',
                         formatter: function (value, row) {
                         var res = '-';
                         if (row.state == 0) {
                         res = '<a href="javascript:void(0)" class="style-putOn"  data-toggle="modal">上架</a>';
                         }
                         if (row.state == 1) {
                         res = '<a href="javascript:void(0)" class="style-pullOff"  data-toggle="modal">下架</a>';
                         }
                         return res;
                         },
                         events: {
                         'click .style-putOn': function (e, val, row) {

                         },
                         'click .style-pullOff': function (e, val, row) {

                         }
                         }*/
                    }
                ]
            }

            // 初始化数据表格
            $('#goods_Table').bootstrapTable(tableConfig);
            // 搜索表单初始化
            $$.searchInit($('#searchForm'), $('#goods_Table'));

            //搜索
            function getQueryParams(val) {
                var form = document.searchForm;
                $.extend(pageOptions, util.form.serializeJson(form)); //合并对象，修改第一个对象

                pageOptions.rows = val.limit;
                pageOptions.page = parseInt(val.offset / val.limit) + 1;
                console.log("bbbb:", val)
                return val
            }

            //清空
            $('#clear').on('click', function (e) {
                e.preventDefault()
                var sform = document.searchForm
                util.form.reset($(sform))
                $('#goods_Table').bootstrapTable('refresh', pageOptions);
            });
            // 搜索
            $("#goods_search").on("click", function () {

            });

        }
    }
})
