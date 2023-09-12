// app.js

new Vue({
    el: "#app",
    data: {
      newProduct: "",
      products: JSON.parse(localStorage.getItem("products")) || [],
    },
    methods: {
      addProduct() {
        const productName = this.newProduct.trim();
        if (productName) {
          this.products.push({ name: productName, completed: false });
          this.saveProducts();
          this.newProduct = "";
        }
      },
      clearProducts() {
        this.products = [];
        this.saveProducts();
      },
      toggleComplete(product, index) {
        if (product.completed) {
          // Если продукт был зачеркнут, делаем его незачеркнутым
          product.completed = false;
          // Перемещаем продукт в начало списка
          this.products.splice(index, 1);
          this.products.unshift(product);
        } else {
          // Если продукт был незачеркнутым, делаем его зачеркнутым
          product.completed = true;
          // Перемещаем продукт в конец списка
          this.products.splice(index, 1);
          this.products.push(product);
        }
        this.saveProducts();
      },
      saveProducts() {
        localStorage.setItem("products", JSON.stringify(this.products));
      },
    },
    mounted() {
      this.$nextTick(() => {
        this.newProduct = ""; // Сбрасываем поле ввода при загрузке приложения
      });
    },
  });