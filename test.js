function factorial(input){
    let fac = 1;
    if(input === 0){
        console.log('hihi');
        return 1;        
    }else{
        console.log('hii1')
        for(let i = 1; i <= input; i++){
            fac *= i
        }
        return fac;
    }
}

console.log(factorial(5));