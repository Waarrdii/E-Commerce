
const app = new Vue({
    el : "#app",
    data : {
      products : []
    },
    mounted() {
        // Fetch data produk dari WooCommerce API
        axios.get(`https://api.escuelajs.co/api/v1/products?offset=0&limit=50`)
          .then(response => {
            // Simpan data produk dalam state
            this.products = response.data
            console.log(this.products)
          })
      },

})
