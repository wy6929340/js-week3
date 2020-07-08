/* global Vue */
/* eslint-disable no-new */

new Vue({
    el: "#app",
    data: {
        porducts: [
            {
                /*id: 1586934917210,
                unit: '台',
                category: '掌上主機',
                title: 'Switch',
                origin_price: 20000,
                price: 9980,
                description: '想玩就玩',
                content: '動森太好玩惹',
                is_enabled: 1,
                imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
            */
            },
        ],



        modalTitle: {
            title: "新增商品",              /*------------------------互動表單標題-------------------------------*/

            delete: "刪除商品",
        },

        tempProduct: {},            /*---------------------暫存資料的位置----------------------------------*/
    },
    methods: {
        openModal(isNew, item) {      /*---------------------互動表單----------------------------------*/

            switch (isNew) {                /*---------------------判斷是帶入參數----------------------------------*/
                case "addNew":               /*--------------------addNew代表新增商品----------------------------------*/
                    this.tempProduct = {};      /*---------------------暫存的物件用於新增 編輯 刪除使用----------------------------------*/
                    console.log(this.tempProduct)
                    this.modalTitle.title = "新增商品";/*---------------------互動表單的標題----------------------------------*/
                    $('#addModal').modal('show');/*---------------------jq互動表單顯示----------------------------------*/
                    break;
                case "edit":
                    this.tempProduct = Object.assign({}, item); /*---------------------編輯商品拷貝物件到暫存物件----------------------------------*/
                    console.log(this.tempProduct)
                    this.modalTitle.title = "編輯商品";
                    $('#addModal').modal('show');/*---------------------jq互動表單顯示----------------------------------*/
                    break;
                case "delete":
                    this.tempProduct = Object.assign({}, item);/*---------------------編輯商品拷貝物件到暫存物件----------------------------------*/
                    $('#deleteModal').modal('show');
                    break;
                default:
                    break;
            }

        },
        updateProduct() {             /*---------------------更新資料----------------------------------*/
            const vm = this;            /*---------------------存this----------------------------------*/
            if (vm.tempProduct.id) {    /*---------------------按下確認時 判斷有無id 有id代表有資料----------------------------------*/
                const id = vm.tempProduct.id;/*---------------------存id----------------------------------*/
                vm.porducts.forEach(function (item, i) {/*--------------------全部資料跑迴圈----------------------------------*/
                    if (item.id === id) {           /*---------------------比對id----------------------------------*/
                        vm.porducts[i] = vm.tempProduct;/*---------------------tempProduct id 跟products id相同----------------------------------*/
                    }                                   /*---------------------temProduct 的資料 覆蓋 products[i]的資料(編輯)----------------------------------*/
                })
            } else {                        /*---------------------沒有id沒資料 新增商品----------------------------------*/
                const id = new Date().getTime();/*---------------------取id 存id----------------------------------*/
                vm.tempProduct.id = id; /*---------------------將id 指定給 tempProduct.id----------------------------------*/
                vm.porducts.push(vm.tempProduct);/*---------------------新增資料到products----------------------------------*/
            }
            this.tempProduct = {};  /*---------------------清空tempProduct資料----------------------------------*/
            this.modalTitle.title = "新增商品";
            $('#addModal').modal('hide');
        },
        deleteData() {              /*---------------------刪除資料----------------------------------*/
            const vm = this;
            const id = vm.tempProduct.id;
            console.log(vm.tempProduct.id)
            vm.porducts.forEach(function (item, i) {
                if (item.id === id) {
                    vm.porducts.splice(i, 1);/*--------------------id比對相同的將該筆資料刪除----------------------------------*/
                }
            })
            this.tempProduct = {};
            $('#deleteModal').modal('hide');
        },
    }
})

