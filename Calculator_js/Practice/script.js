const keys = document.querySelectorAll('.key')
const displayExpression = document.querySelector('.display__expr')
const displayResult = document.querySelector('.display__value')

console.log(displayResult)
let expression = ''
let result = ''

keys.forEach((element) =>{
    element.addEventListener('click', ()=>{
        if(element.innerHTML ==='='){
            result = eval(expression)
            displayResult.innerHTML = result
        }
        else if(element.innerHTML==='AC'){
            result = ''
            expression= ''
            displayExpression.innerHTML = expression
            displayResult.innerHTML = result
        }
        else if (element.innerHTML==='C'){
            expression = expression.slice(0, expression.length-1)
            displayExpression.innerHTML = expression
            
        }
        else{
            expression = expression + element.innerHTML
            displayExpression.innerHTML = expression

        }

    })
})