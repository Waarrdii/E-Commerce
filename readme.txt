delete item gagal, tanyakan hubungan (cart) pada handle @click="deleteItem(cart)" dengan key pada methods







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


Format currency =>
formatCurrency(number) {
        const locale = "id-ID";
        const options = { style: "currency", currency: "IDR" };
        const formatter = new Intl.NumberFormat(locale, options);
        return formatter.format(number);
      }

bard tolong ubah script diatas tanpa simbol

Jawaban : 

Anda dapat memodifikasi fungsi formatCurrency untuk menghilangkan simbol mata uang (Rp) dan menampilkan format angka dengan dua digit di belakang koma tanpa simbol, seperti ini:

JavaScript
function formatCurrency(number) {
  const locale = "id-ID";
  const options = {
    style: "decimal",  // Ubah "currency" menjadi "decimal"
    minimumFractionDigits: 2,  // Tambahkan opsi "minimumFractionDigits: 2"
  };
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(number);
}

const formattedNumber = formatCurrency(1234567.89);
console.log(formattedNumber); // Output: 1,234,567.89 (tanpa simbol Rp., dengan 2 koma)
Use code with caution.
Penjelasan:

Mengubah style menjadi "decimal":

Opsi style: "currency" digunakan untuk memformat angka sebagai mata uang, yang menyertakan simbol mata uang (seperti Rp untuk rupiah).
Oleh karena kita ingin menghilangkan simbol mata uang, kita ubah menjadi style: "decimal". Ini akan memformat angka sebagai angka desimal standar.
Menambahkan minimumFractionDigits: 2:

Opsi minimumFractionDigits memastikan minimal terdapat 2 digit di belakang koma.
Dengan mengatur nilainya menjadi 2, angka yang diformat akan selalu menampilkan minimal 2 digit di belakang koma, meskipun angka aslinya mungkin memiliki lebih sedikit atau bahkan tidak memiliki digit di belakang koma.
Dengan perubahan ini, fungsi formatCurrency akan menghasilkan format angka dengan dua digit di belakang koma, tanpa simbol mata uang.

profile picture
apa perbedaan style: "currency" dan style: "decimal"?

1
Berikut perbedaan antara style: "currency" dan style: "decimal" dalam fungsi Intl.NumberFormat:

style: "currency":

Memformat angka sebagai mata uang.
Menampilkan simbol mata uang sesuai dengan kode mata uang yang didefinisikan (misalnya, Rp untuk rupiah).
Mengikuti aturan pemformatan mata uang untuk lokal yang ditentukan (misalnya, pemisah ribuan).
style: "decimal":

Memformat angka sebagai angka desimal standar.
Tidak menampilkan simbol mata uang.
Mengikuti aturan pemformatan desimal untuk lokal yang ditentukan (misalnya, pemisah ribuan, tanda desimal).
Contoh:

JavaScript
const number = 1234567.89;

const currencyFormatter = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
const currencyFormattedNumber = currencyFormatter.format(number); // Output: Rp1.234.567,89

const decimalFormatter = new Intl.NumberFormat("id-ID", { style: "decimal" });
const decimalFormattedNumber = decimalFormatter.format(number); // Output: 1.234.567,89
Use code with caution.
Pada contoh di atas:

currencyFormattedNumber menghasilkan format mata uang dengan simbol Rp dan pemisah ribuan.
decimalFormattedNumber menghasilkan format angka desimal standar tanpa simbol mata uang.
Kesimpulan:

Gunakan style: "currency" jika Anda ingin menampilkan angka sebagai mata uang dengan simbol mata uang.
Gunakan style: "decimal" jika Anda ingin menampilkan angka sebagai angka desimal standar tanpa simbol mata uang.
Referensi:

MDN Web Docs: Intl.NumberFormat: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
Semoga penjelasan ini membantu!

Sources
github.com/SamuelEarl/fanny-pack-ui
profile picture
minimumFractionDigits: 2, script ini untuk apa?
Dalam fungsi formatCurrency yang Anda miliki, opsi minimumFractionDigits: 2 digunakan untuk mengatur jumlah minimal digit yang ditampilkan di belakang koma pada angka yang diformat.

Penjelasan:

minimumFractionDigits adalah properti yang termasuk dalam objek options yang diteruskan ke fungsi Intl.NumberFormat.
Nilai yang ditetapkan pada properti ini menentukan jumlah minimal digit yang harus ditampilkan di belakang koma.
Contoh:

Jika minimumFractionDigits diatur menjadi 2:
Angka dengan 2 digit di belakang koma (misalnya, 12.34) akan tetap ditampilkan sama.
Angka dengan 1 digit di belakang koma (misalnya, 12.3) akan memiliki 0 ditambahkan di belakang koma menjadi 12.30.
Angka tanpa digit di belakang koma (misalnya, 12) akan memiliki 2 nol ditambahkan di belakang koma menjadi 12.00.
Hal penting yang perlu diperhatikan:

minimumFractionDigits hanya mengatur jumlah minimal digit, bukan jumlah maksimal. Jika angka aslinya memiliki lebih dari 2 digit di belakang koma, maka semua digit tersebut akan tetap ditampilkan.
Ini berguna untuk memastikan konsistensi dalam tampilan angka, terutama saat Anda ingin menampilkan beberapa angka berdampingan dan ingin semuanya memiliki jumlah digit desimal yang sama.
Kesimpulan:

Opsi minimumFractionDigits: 2 memastikan bahwa angka yang diformat oleh fungsi formatCurrency akan selalu memiliki minimal 2 digit di belakang koma, terlepas dari jumlah digit desimal pada angka aslinya.

profile picture
lalu bagaimana agar, jika angka yang bulat tanpa koma akan menampilkan 2 nol dibelakang koma, dan jika memiliki lebih dari 2 digit dibelakang koma, akan di bulatkan ke atas hingga 2 digit dibelakang koma ?
Show drafts

























Untuk mencapai format yang Anda inginkan, di mana angka bulat tanpa koma akan menampilkan 2 nol di belakang koma dan angka dengan lebih dari 2 digit di belakang koma dibulatkan ke atas hingga 2 digit, Anda dapat menggunakan kombinasi beberapa opsi dalam fungsi Intl.NumberFormat:

1. minimumFractionDigits: 2:

Seperti yang dijelaskan sebelumnya, opsi ini memastikan bahwa angka yang diformat akan selalu memiliki minimal 2 digit di belakang koma.

2. maximumFractionDigits: 2:

Opsi ini membatasi jumlah digit maksimal di belakang koma. Dalam hal ini, nilainya 2 untuk membatasi hingga 2 digit di belakang koma.

3. roundingMode: "ceil":

Opsi ini menentukan cara pembulatan jika angka desimal melebihi jumlah digit yang diizinkan. Nilai ceil akan membulatkan angka ke atas.

Contoh:

JavaScript
function formatCurrency(number) {
  const locale = "id-ID";
  const options = {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    roundingMode: "ceil",
  };
  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(number);
}

const num1 = 12; // Angka bulat
const num2 = 12.345; // Angka dengan lebih dari 2 digit desimal
const num3 = 12.37; // Angka dengan 2 digit desimal

const formattedNum1 = formatCurrency(num1); // Output: 12.00
const formattedNum2 = formatCurrency(num2); // Output: 12.35
const formattedNum3 = formatCurrency(num3); // Output: 12.38

console.log(formattedNum1, formattedNum2, formattedNum3);
Use code with caution.
Pada contoh di atas:

formattedNum1 (angka bulat) ditampilkan dengan 2 nol di belakang koma.
formattedNum2 (angka dengan lebih dari 2 digit desimal) dibulatkan ke atas ke 2 digit di belakang koma.
formattedNum3 (angka dengan 2 digit desimal) tidak diubah karena sudah sesuai dengan format yang diinginkan.
Kesimpulan:

Dengan menggabungkan opsi minimumFractionDigits, maximumFractionDigits, dan roundingMode, Anda dapat memformat angka sesuai kebutuhan, di mana angka bulat akan menampilkan 2 nol di belakang koma dan angka dengan lebih dari 2 digit di belakang koma dibulatkan ke atas hingga 2 digit.

============