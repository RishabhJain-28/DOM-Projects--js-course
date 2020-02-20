
const form = document.getElementById('loan-form');
const loanAmount = document.getElementById('amount');
const interest = document.getElementById('interest');
const years = document.getElementById('years');
const monthlyPayment = document.getElementById('monthly-payment');
const totalPayment = document.getElementById('total-payment');
const totalInterest = document.getElementById('total-interest');
const card = document.querySelector('.card');
const cardHeading = document.querySelector('.heading');
const results = document.getElementById('results');
const loading = document.getElementById('loading');
    
function loadEventListeners(){
    form.addEventListener('submit',function(e){
        results.style.display='none';
        loading.style.display='block';
        setTimeout(calResult,2000);
        e.preventDefault();
    });
}


function calResult(){
    //e.preventDefault();
    loading.style.display='none';
    const principal = parseFloat(loanAmount.value);
    const interestRate = parseFloat(interest.value) /100 / 12;
    const numYears = parseFloat(years.value) *12;
    
    let x = Math.pow(1+interestRate, numYears);
    const monthly =(principal*x*interestRate)/(x-1);
    if(isFinite(monthly)){ //validation
        monthlyPayment.value=monthly.toFixed(2);//setting number of floatig point
        totalPayment.value=(monthly*numYears).toFixed(2);
        totalInterest.value=((monthly*numYears)-principal).toFixed(2);
        results.style.display='block';
        
    }else{
        //error
        //build alert
        const error='Please check your numbers';
        const errorDiv= document.createElement('div');
        errorDiv.className='alert  alert-danger';
        errorDiv.appendChild(document.createTextNode(error));
        card.insertBefore(errorDiv,cardHeading);
        //clear error after 3 sec:
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000) //call func after 3000milli sec 

    }
}

//main 
loadEventListeners();
