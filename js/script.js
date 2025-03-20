let form = document.querySelector('form');
let amount = document.getElementById('amount');
let expense = document.getElementById('expense');
let category = document.getElementById('category');

let expensives = JSON.parse(localStorage.getItem("expensives")) || [];
localStorage.setItem("expensives", JSON.stringify(expensives));
let expenseList = document.getElementById('expense-list')


amount.oninput = () => {
   let value = amount.value.replace(/\D/g, '');

   value = Number(value) / 100

   amount.value = formatCurrencyBRL(value) 
}

function formatCurrencyBRL(value){
    value = value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    })

    return value
}

form.onsubmit = (event) => {
    event.preventDefault()

    const newExpensive = {
        id: new Date().getTime(),
        expensive: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_At: new Date(),
    }

    expensives.push(newExpensive)
    localStorage.setItem("expensives", JSON.stringify(expensives)); 
    renderHtml()
}

function renderHtml(newExpensive){
    expenseList.innerHTML = expensives.map(
        (newExpensive) => `
        <li class="expense">
            <img src="./img/${newExpensive.category_id}.svg" alt="${newExpensive.category_id}" />
            <div class="expense-info">
                <strong>${newExpensive.expensive}</strong>
                <span>${newExpensive.category_name}</span>
            </div>
            <span class="expense-amount">${newExpensive.amount}</span>
            <img src="./img/remove.svg" alt="remover" class="remove-icon" onclick="removeExpense(${newExpensive.id})"/>
        </li>
    `
        ).join('')
}

function expenseAdd(newExpensive){
    try{
        renderHtml(newExpensive)

    }catch(error){
        console.log(error)
    }
};

function removeExpense(id){
    expensives = expensives.filter((newExpensive) => 
        newExpensive.id !== id
    );
    localStorage.setItem("expensives", JSON.stringify(expensives));

    renderHtml()
}

renderHtml();