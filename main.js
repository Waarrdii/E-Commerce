
const app = new Vue({
    el : "#app",
    data : {
      products : null,
      cart : [{product : product, qty : qty}]
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
        addCart:function (product){
          let productIndex;
          let ceckProduct = this.cart.filter(function(item, index){
            
          })

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
