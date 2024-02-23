
const app = new Vue({
    el : "#app",
    data : {
        product : []
    },
    mounted() {
        // Fetch data produk dari WooCommerce API
        axios.get(`https://api.escuelajs.co/api/v1/products`)
          .then(response => {
            // Simpan data produk dalam state
            this.products = response.data
            console.log(this.products)
          })
      }
    
})
