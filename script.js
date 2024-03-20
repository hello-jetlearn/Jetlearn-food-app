document.querySelector('#searchBtn').addEventListener('click', function(e) {
    e.preventDefault();

    getData();

});

let getData = async () => {
    let searchInputTxt = document.querySelector('#search').value;
    try {
        //three api calls wrt category (c), area (a) and item (i)
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchInputTxt}`);
       
        let data = await response.json();
        console.log(data.meals);
        append(data.meals);

    } catch (error) {
        console.log(error);
        alert('No Data Found');
    }
}

let getData2 = async () => {
  
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=indian`);
        let data = await response.json();
        // console.log(data.meals);
        append(data.meals);

    } catch (error) {
        console.log(error);
    }
}
getData2()


// strMeal
// strMealThumb

let foodArr = JSON.parse(localStorage.getItem('food')) || [];


const append =(data)=>{


    document.getElementById('show').innerHTML = '';
    let price  = Math.floor(Math.random() * 500); 

    data.forEach(el => {
        
        let div = document.createElement('div');

        let img = document.createElement('img');
        img.src = el.strMealThumb;
        
        let div2 = document.createElement('div');
        div2.classList.add('text')
        let p = document.createElement('h3');
        p.innerHTML = el.strMeal;

        let p2 = document.createElement('p');
        p2.innerHTML =`<i class="fa-solid fa-heart"></i>`
        p2.classList.add('heart')
        p2.addEventListener('click', function(e) {
          
            p2.style.color = 'oranged';
            let foodObj = {
                name: el.strMeal,
                price: parseInt(price.innerHTML),
                img: el.strMealThumb

            }
           
            
        });

        div2.append(p,p2);

        let div3 = document.createElement('div');
        div3.classList.add('price');
        let price  = document.createElement('p');
        // <i class="fa-solid fa-rupee-sign"></i>. 
        price.innerHTML = `${Math.floor(Math.random() * 500)}`;

        let cart = document.createElement('button');
        // cart.classList.add('cssbuttons-io-button');
        cart.innerHTML = `Add to Cart`;
        cart.addEventListener('click', function(e) {
           
            let foodObj = {
                name: el.strMeal,
                price: parseInt(price.innerHTML),
                img: el.strMealThumb

            }
           foodArr.push(foodObj);
           localStorage.setItem('food', JSON.stringify(foodArr));
            
        });

        div3.append(price,cart);

        div.append(img,div2,div3);
        document.getElementById('show').append(div);


    });
}