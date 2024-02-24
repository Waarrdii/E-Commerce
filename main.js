
const app = new Vue({
    el : "#app",
    data : {
      products : []
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
      
})
