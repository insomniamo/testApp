document.addEventListener("DOMContentLoaded", function () {
    const productInput = document.getElementById("product-input");
    const addProductBtn = document.getElementById("add-product-btn");
    const clearProductsBtn = document.getElementById("clear-products-btn");
    const productList = document.getElementById("product-list");

    // Загрузка продуктов из локального хранилища
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Функция для сохранения продуктов в локальное хранилище
    function saveProducts() {
        localStorage.setItem("products", JSON.stringify(savedProducts));
    }

    // Функция для отображения списка продуктов
    function displayProducts() {
        productList.innerHTML = "";
        const completedProducts = savedProducts.filter(product => product.completed);
        const uncompletedProducts = savedProducts.filter(product => !product.completed);

        uncompletedProducts.forEach((product) => {
            const li = createProductListItem(product);
            productList.appendChild(li);
        });

        completedProducts.forEach((product) => {
            const li = createProductListItem(product);
            li.classList.add("completed");
            productList.appendChild(li);
        });
    }

    // Функция для создания элемента списка продуктов
    function createProductListItem(product) {
        const li = document.createElement("li");
        li.textContent = product.name;
        li.addEventListener("click", () => {
            product.completed = !product.completed;
            saveProducts();
            displayProducts();
        });
        return li;
    }

    // Обработчик клика по кнопке "Добавить"
    addProductBtn.addEventListener("click", addProduct);

    // Обработчик клика по кнопке "Очистить список"
    clearProductsBtn.addEventListener("click", () => {
        savedProducts.length = 0; // Очищаем массив продуктов
        saveProducts();
        displayProducts();
    });

    // Обработчик нажатия клавиши "Enter" в поле ввода продукта
    productInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addProduct();
        }
    });

    // Функция для добавления продукта
    function addProduct() {
        const productName = productInput.value.trim();
        if (productName) {
            savedProducts.push({ name: productName, completed: false });
            saveProducts();
            productInput.value = "";
            displayProducts();
        }
    }

    // Инициализация отображения списка продуктов
    displayProducts();
});