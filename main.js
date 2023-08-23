let title = document.getElementById('name');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category')
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;

function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = 'green';
    }
    else{
        total.innerHTML = '';
        total.style.background = 'red';
    }
}
let container;
if(localStorage.product != null)
{
    container = JSON.parse(localStorage.product);
}
else{
    container = [];
}
submit.onclick = function()
{
    let getNew = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if(title.value != ''
    && price.value != '' 
    && category.value != ''
    && getNew.count < 100)
    {
        if(mood === 'create')
        {
            if(getNew.count > 1)
            {
                for(let i = 0; i < getNew.count; i++)
                {
                    container.push(getNew);
                }
            }
            else{
                container.push(getNew);
            }
        
        }
        else
        {
            container [     tmp    ] = getNew;
            submit.innerHTML = 'Create';
            mood = 'create';
            count.style.display = 'block';
            
        
        }
        clearData();
      
    }
    

    
    localStorage.setItem('product', JSON.stringify(container));
    
    showData();
}
function clearData()
{
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
function showData()
{
    getTotal();
    
    let table = '';
    for(let i = 0; i < container.length; i++)
    {
        table += `   <tr>
        <td>${i+1}</td>
        <td>${container[i].title}</td>
        <td>${container[i].price}</td>
        <td>${container[i].taxes}</td>
        <td>${container[i].ads}</td>
        <td>${container[i].discount}</td>
        <td>${container[i].total}</td>
        <td>${container[i].category}</td>
        <td><button onclick = "updateData(${i})" id="update">update</button></td>
       <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
     </tr>`;
    }
    let deleteAll = document.getElementById("deleteAll");
    if(container.length > 0){
        deleteAll.innerHTML  = `<button onclick= "deleteAll()">Delete All (${container.length})</button>`
    }
    else{
        deleteAll.innerHTML = '';
    }

    document.getElementById('tbody').innerHTML = table;
}
showData();
function deleteData(i)
{
    container.splice(i,1);
    localStorage.product = JSON.stringify(container);
    showData()
}
function deleteAll()
{
    localStorage.clear();
    container.splice(0);
    showData();
}
function updateData(i)
{
    title.value = container[i].title;
    price.value = container[i].price;
    taxes.value = container[i].taxes;
    ads.value = container[i].ads;
    discount.value = container[i].discount;
    category.value = container[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    count.style.display = 'none';
    getTotal();
    mood = 'update'
    tmp = i;
    scroll({
        top:0,
        behavior:"smooth"
    })

}

let searchMood = 'name';
function getSearchMood(id)
{
    let search = document.getElementById('search')
    if(id == 'searchName')
    {
        searchMood = 'name';
    }
    else
    {
        searchMood = 'category';
    }
    search.Placeholder = 'Search By' + searchMood;
    search.focus()
    
}
function searchData(value)
{
    let table = '';
    if(searchMood == 'name')
    {
        for(let i = 0; i < container.length; i++)
        {
            if(container[i].title.includes(value.toLowerCase()))
            {
                table += `   <tr>
                <td>${i}</td>
                <td>${container[i].title}</td>
                <td>${container[i].price}</td>
                <td>${container[i].taxes}</td>
                <td>${container[i].ads}</td>
                <td>${container[i].discount}</td>
                <td>${container[i].total}</td>
                <td>${container[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
               <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
             </tr>`;
            }
        }
    }
    else{
        for(let i = 0; i < container.length; i++)
        {
            if(container[i].category.includes(value.toLowerCase()))
            {
                table += `   <tr>
                <td>${i}</td>
                <td>${container[i].title}</td>
                <td>${container[i].price}</td>
                <td>${container[i].taxes}</td>
                <td>${container[i].ads}</td>
                <td>${container[i].discount}</td>
                <td>${container[i].total}</td>
                <td>${container[i].category}</td>
                <td><button onclick = "updateData(${i})" id="update">update</button></td>
               <td><button onclick = "deleteData(${i})" id="delete">delete</button></td>
             </tr>`;
            }
        }
    }


    document.getElementById('tbody').innerHTML = table;




}
