
const app = new Vue({
    el : "#app",
    data : {
      products : null,
      cart : []
    },
    mounted() {
        // Fetch data produk dari WooCommerce API
        axios.get(`https://fakestoreapi.com/products`)
          .then(response => {
            // Simpan data produk dalam state
            this.products = response.data
            console.log(this.products)
          })
      },
      methods:{
        addCart: function (product) {
          // this.cart.push(product)
          const productIndex = this.cart.findIndex(item => item.product.id === product.id);
          
          if (productIndex === -1) {
            // Produk baru
            this.cart.push({ product, qty: 1 });
          } else {
            // Produk sudah ada, tingkatkan qty
            this.cart[productIndex].qty++;
          }
          
        }
      },
      computed: {
        totalQty (){
          return this.cart.reduce((sum, item)=> sum + item.qty, 0)
        },
        calculateItem(){
          let total ;
          for (i in this.cart){
            total = this.cart[i].product.title;
          }
          return total;
        }
      },
      filters : {
       trunCate(text, length, suffix){
        if (text.length <= length){
          return text;
        }
        return text.substring(0,length)+ suffix;
       },
       currencyFormat(price){
        return 'Rp. '+ Number.parseFloat(price).toFixed(2);
       } 
      }
})
