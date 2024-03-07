lanjut ke mengenal event dan method di codepolitan untuk membuat cart

style baru : 
1. style="vertical-align: middle;" jika posisi gambar svg dan text tidak sejajar.
2.  v-if directive: Digunakan untuk menampilkan elemen hanya jika kondisinya terpenuhi. Dalam hal ini, elemen hanya akan ditampilkan jika cart.length lebih besar dari 0.
    v-show directive: Mirip dengan v-if, tetapi v-show hanya menyembunyikan elemen, sedangkan v-if menghapus elemen dari DOM.
    Computed property: Merupakan fungsi yang dihitung setiap kali nilai dependensi berubah. Dalam hal ini, cartLength akan dihitung ulang setiap kali cart berubah.
    Template ternary operator: Operator ternary adalah operator kondisional yang dapat digunakan untuk mengevaluasi ekspresi dan mengembalikan nilai berdasarkan hasil evaluasi.

26-02-24 : lanjut membuat data togle dan rapihkan script style css

currency format =>

function formatCurrency(number) {
  const locale = "id-ID";
  const options = { style: "currency", currency: "IDR" };
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(number);
}

const formattedNumber = formatCurrency(123456789);
console.log(formattedNumber); // Output: Rp123.456.789



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
      
      }
})
