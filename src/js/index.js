const getBtn = document.querySelector('.transaction-btn');
const initialPage = document.getElementById('initial-page');
const transactionsPage = document.getElementById('transactions-page');
const tableBody = document.querySelector('.table-body');
const searchItem = document.querySelector('.searchInput');
const searchBtn = document.querySelector('.search-btn');
const sortPrice = document.querySelector('.price-sort');
const sortDate = document.querySelector('.date-sort');
const arrowItem = document.querySelector('.arrow');
const arrowDateItem = document.querySelector('.arrow-date');
const preloader = document.getElementById('preloader');


searchBtn.addEventListener('click', () => {
    searchItem.classList.toggle('active');
});
searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('active');
});


window.addEventListener('load', () => {

    setTimeout(() => {
        preloader.style.display = 'none';  
        initialPage.style.display = 'block'; 
    }, 2000);
});

getBtn.addEventListener('click', getAllTransaction);

const app = axios.create({
    baseURL: 'http://localhost:3000',
});

function getAllTransaction() {
    app
        .get(`/transactions?_sort=date&_order=desc`)
        .then((res) => {
            console.log(res.data);
            displayTransactions(res.data);
            initialPage.style.display = 'none';
            transactionsPage.style.display = 'block';
        })
        .catch((err) => {
            console.log(err);
        });
}

function displayTransactions(transactions) {
    tableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${transaction.type}</td>
                <td>${transaction.price}</td>
                <td>${transaction.refId}</td>
                <td>${new Date(transaction.date).toLocaleString("fa-IR", { dateStyle: "long", timeStyle: "short" })}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

searchItem.addEventListener('input', (e) => {
    const query = e.target.value;

    app.get(`/transactions?refId_like=${query}`)
        .then((res) => {
            displayTransactions(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
});

let flag = "desc";

sortPrice.addEventListener('click', () => {
    flag = flag === "asc" ? "desc" : "asc";

    arrowItem.classList.toggle('spin');

    app.get(`/transactions?_sort=price&_order=${flag}`)
        .then((res) => {
            displayTransactions(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
});

let dateFlag = "desc";

sortDate.addEventListener('click', () => {
    dateFlag = dateFlag === "asc" ? "desc" : "asc";
    arrowDateItem.classList.toggle('spin');

    app.get(`/transactions?_sort=date&_order=${dateFlag}`)
        .then((res) => {
            displayTransactions(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
});
