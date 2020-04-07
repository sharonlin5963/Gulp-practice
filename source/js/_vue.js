$(function() {

    var vm = new Vue({
        el: '#app',
        data: {
            items: itemData,
            itemDetail: itemData[0],
            // path: '商品總覽'
            path: {
                text: '商品總覽',
                className: ''
            }
        },
        methods: {
            goItemDetail: function() {
                var num = $(event.target).data('num')
                console.log(num);
                console.log(this.items[num]);
                // vm.itemDetail.push(this.items[num])
                vm.itemDetail = this.items[num];
                // this.$router.push("/product-detail.html");
                window.location.href = './product-detail.html';
            },
        },
        computed: {
            newItems() {
                if (this.path.text === '商品總覽') return this.items;

                if (this.path.text === 'sale') return this.items.filter(function(obj) {
                    return obj.isDiscount === true;
                })

                if (this.path.className === 'type') return this.items.filter(function(obj) {
                    return obj.bigGroupName === vm.path.text;
                })

                return this.items.filter(function(obj) {
                    return obj.groupName === vm.path.text;
                })
            }
        },
    });

    $('.productMenu a,.nav-item a').click(function() {
        var value = event.target.innerText;
        var className = event.target.className;
        vm.path.text = value;
        vm.path.className = className;
    });
})