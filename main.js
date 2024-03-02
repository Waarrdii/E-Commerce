
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
        addCart:function (product){
          this.cart.push(product); 
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
