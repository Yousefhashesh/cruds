

let title = document.getElementById('title');
let price=document.getElementById('price');
 let taxes=document.getElementById('taxes');
 let ads=document.getElementById('ads');
 let discount=document.getElementById('discount');
 let total=document.getElementById('total');
 let amount=document.getElementById('amount');
 let category=document.getElementById('category');
 let create =document.getElementById('create');
 let searchInput=document.getElementById('search');
let  searchBy_title=document.getElementById("searchTitle");
let searchBy_category=document.getElementById('searchCategory');

let tbody = document.getElementById('tbody');


 let dlAll = document.getElementById('deleteAll');

let myarr = [price,taxes,ads,discount];

 myarr.filter(function(e)
    {
        e.addEventListener('keyup',function getTotal()
        {
            if(price.value > 0 || price.value >= discount.value  )
            {
            total.innerHTML= +price.value + +taxes.value + +ads.value - discount.value;
            total.classList.remove('bg-danger');
            total.classList.add('bg-success');
        }
    else
    {
        total.innerHTML="";
        total.classList.add('bg-danger');
    }
} );}
);
 
// create a new product
let myProducts ;
if(localStorage.product !=null)
{
    myProducts=JSON.parse(localStorage.product);
    
    dlAll.style.display = 'block';

}else{
    myProducts = [];
    dlAll.style.display = 'none';
}

let temp;

create.onclick = function()
{
    let newpro =
     {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount: discount.value,
        total:total.innerHTML,
        amount:amount.value, 
        category:category.value,
        
    }
    if(create.id ==='update')
    {
        myProducts[temp]=newpro;
        localStorage.setItem("product" , JSON.stringify(myProducts));
        create.innerHTML='create category';
        create.id = "create";
        
    }
  else {
        myProducts.push(newpro);
        localStorage.setItem("product" , JSON.stringify(myProducts));
  }
       
 clearfields();
 window.showdata();
 dlAll.style.display = 'block';
 total.classList.add('bg-danger');
}

function clearfields()
 {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    category.value='';
    amount.value='';
    searchInput.value='';
 }

function showdata()
{
   let table = "";
    for(let i = 0;i < myProducts.length ; i++)
    {
   table +=`
 <tr>
   <td>${i+1}</td>
   <td>${myProducts[i].title}</td>
   <td>${myProducts[i].price}</td>
   <td>${myProducts[i].taxes}</td>
   <td>${myProducts[i].ads}</td>
   <td>${myProducts[i].discount}</td>
   <td>${myProducts[i].total}</td>
   <td>${myProducts[i].amount}</td>
   <td>${myProducts[i].category}</td>
   
<td><div class="btn btn-primary" onclick="updateData(${i}) ""id="update">update</div></td>
   <td><div class="btn btn-primary " onclick="deleteData(${i})" "id="delete">delete</div></td> <tr> 
   <hr>`
    }
tbody.innerHTML = table;
};
 
// clear all data

dlAll.onclick = function()
{
    localStorage.clear();
    myProducts=[];
    tbody.innerHTML = "";
    dlAll.style.display="none";
}

function deleteData(i)
{
    myProducts.splice(i,1);
        localStorage.product=JSON.stringify(myProducts); 
    window.showdata();
    if(tbody.innerHTML==="")
    {
        dlAll.style.display="none";
    }
   
}

function updateData(i)
{
    temp=i;
    create.innerHTML='update';
    create.id = "update";
title.value= myProducts[i].title;
price.value= myProducts[i].price;
taxes.value= myProducts[i].taxes;
ads.value=   myProducts[i].ads;
amount.value=myProducts[i].amount;
category.value=myProducts[i].category;
 
scroll(
    {
        top:0,
        behavior:'smooth',
    }
);
 
  
window.showdata();

}



let moodSearch ='title';
function search(id)
{
    
 if(id==='searchTitle')
 {
    moodSearch='title';
    searchInput.placeholder='search by title ';
 }
else
{ 
    searchInput.placeholder='search by category ';
    moodSearch='category';
}
searchInput.focus();
searchInput.onblur = ()=>
{
searchInput.placeholder='search';
}


console.log(moodSearch);
}

searchInput.addEventListener('keyup',function()
{
    let table="";
if(moodSearch == 'title')
{
    
for(let i=0;myProducts.length;i++)
{
    if(myProducts[i].title.includes(searchInput.value))
    {
        table +=`
        <tr>
          <td>${i+1}</td>
          <td>${myProducts[i].title} </td>
          <td>${myProducts[i].price}</td>
          <td>${myProducts[i].taxes}</td>
          <td>${myProducts[i].ads}</td>
          <td>${myProducts[i].discount}</td>
          <td>${myProducts[i].total}</td>
          <td>${myProducts[i].amount}</td>
          <td>${myProducts[i].category}</td>
    
       <td><div class="btn btn-primary" onclick="updateData(${i}) ""id="update">update</div></td>
          <td><div class="btn btn-primary " onclick="deleteData(${i})" "id="delete">delete</div></td> <tr> 
          <hr>`
           }
           tbody.innerHTML = table;
         
    }
}
else{
    for(let i=0;myProducts.length;i++)
{
    if(myProducts[i].category.includes(searchInput.value))
    {
        table +=`
        <tr>
          <td>${i+1}</td>
          <td>${myProducts[i].title}</td>
          <td>${myProducts[i].price}</td>
          <td>${myProducts[i].taxes}</td>
          <td>${myProducts[i].ads}</td>
          <td>${myProducts[i].discount}</td>
          <td>${myProducts[i].total}</td>
          <td>${myProducts[i].amount}</td>
          <td>${myProducts[i].category}</td>
    
       <td><div class="btn btn-primary" onclick="updateData(${i}) ""id="update">update</div></td>
          <td><div class="btn btn-primary " onclick="deleteData(${i})" "id="delete">delete</div></td> <tr> 
          <hr>`
           }
           tbody.innerHTML = table;
         
    }
    
}
})




window.showdata();
 
// let countdown=document.querySelector('.count');

// let i =10;
// function counter()
// {
//  if(i>=0)
//  {
//     countdown.innerHTML =i; 
//  }
// i--;
// };
// setInterval(counter,2000)
