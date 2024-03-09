
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
            // console.log(this.products)
          })
      },
      methods:{
        addCart: function (product) {
          // this.cart.push(product)
          const productIndex = this.cart.findIndex(item => item.product.id === product.id);
          let total = product.price;
          if (productIndex === -1) {
            // Produk baru
            this.cart.push({ product, qty: 1, total });
           
          } else {
            // Produk sudah ada, tingkatkan qty
            this.cart[productIndex].qty++;
            total = total * this.cart[productIndex].qty;
            this.cart[productIndex].total = total;
            // console.log(product.price,this.cart[productIndex].qty,total)

          }
          
        },
        deleteItem:function(key){
          if(this.cart[key].qty > 1){
            this.cart[key].qty --;
          }else{
            this.cart.splice(key, 1);
          }
        }
      },
      computed: {
      
        calculateItem(){
          let totalCart =0;
          for (i in this.cart){
            totalCart += this.cart[i].total;
          }
          return totalCart;
        },
        totalQty (){
          return this.cart.reduce((sum, item)=> sum + item.qty, 0)
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
       } ,
       formatCurrency(number) {
        const locale = "id-ID";
        const options = { style: "currency", currency: "IDR" };
        const formatter = new Intl.NumberFormat(locale, options);
        return formatter.format(number);
      }
    
      
      // formatCurrency(number) {
      //   const locale = "id-ID";
      //   const options = {
      //     style: "decimal",  // Ubah "currency" menjadi "decimal"
      //     minimumFractionDigits: 2,
      //     maximumFractionDigits: 2,
      //     roundingMode: "ceil",  // Tambahkan opsi "minimumFractionDigits: 2"
      //   };
      //   const formatter = new Intl.NumberFormat(locale, options);
      //   return formatter.format(number);
      // }
      }
})
