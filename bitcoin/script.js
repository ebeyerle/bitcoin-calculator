var pv = 0;
var days = [31,28,31,30,31,30,31,31,30,31,30,31];
var beginning_balances = [];
var interest_list = [];
var ending_balances = [];

function calculate(){
  var investment = document.getElementById("investment").value;
  var output = document.getElementById("balance");
  
  pv = investment;
  
  investment = (1+.062) * Math.abs(investment);
  
  output.innerHTML = investment.toFixed(2);
}

function fv(pval, i, n){
  var x=(1+i/100);
  var fv=pval*(Math.pow(x,n));
  
  return fv.toFixed(2);
}

function total(){

  var total = document.getElementById("total");

  var future_val = 0;	
  var investment = 5;

  if(Math.abs(investment) < 5){
    //fv(.016, 365, 0, investment);
	future_val = fv(investment, .016, 365);
  }else{
    //fv(.016, 365, 0, -5);
	future_val = fv(-5, .016, 365);
  }
  
  total.innerHTML = future_val;
}

function illustrate(){
	
  var n = 0;	
	
  for(var i = 0; i < 12; i++){
    var beg_balance = document.getElementById("beg_balance_"+String(i+1));
    var interest = document.getElementById("interest_"+String(i+1));
    var end_balance = document.getElementById("end_balance_"+String(i+1));
  
    var end = 0;
    var diff = 0;

	n += days[i];
    //var days = document.getElementById("month1").value;
    console.log(n);
    end = get_ending(n);
    diff = end - pv;
    
	beginning_balances.push(pv);
	interest_list.push(diff.toFixed(2));
	ending_balances.push(end);
	
    beg_balance.innerHTML = pv;
    //interest.innerHTML = end_balance-pv;
    interest.innerHTML = diff.toFixed(2);
    end_balance.innerHTML = end;

    pv = end;	
  }
 
}

function get_ending(n){
  var ending = 0;
  var x1 = 0;
  var x2 = 0;
  
  if(investment <= 5){
    ending = fv(-5, .016, n);
	console.log("The first ending:"+ending);
  }else{
	x1 = fv(-5, .016, n);
	x2 = fv(-31.5, .009, n);
	ending = parseFloat(x1) + parseFloat(x2);
    //ending = fv(-5, .016, 31) + fv(-31.5, .009, 31);
	console.log("The second ending:"+ending);
  }
  return Math.abs(ending.toFixed(2));
}

function ending_prices(){
  
  var initial_price = document.getElementById("initial-price").value;
  var appreciation = document.getElementById("price-appreciation").value;
  var year_end = document.getElementById("year-end");
  
  var sum = 0;
  
  sum = parseFloat(initial_price) * (1 + parseFloat(appreciation));

  year_end.innerHTML = sum;
  
  update_price_table(parseInt(initial_price), sum);
}

function update_price_table(price, end){
  
  var beg_sum = 0;
  var month_sum = 0;
  var interest = 0;
  var gain = 0;
  var end_sum = 0;
  var prev_price = 0;
  var init_price = price;  
  
  
  for(var i = 0; i < 12; i++){
	  
	  var beg_price = document.getElementById("beg_price"+String(i+1));
	  var month_price = document.getElementById("month_price"+String(i+1));
	  var earned_interest = document.getElementById("int_earned"+String(i+1));
	  var unrealized_gain = document.getElementById("gain"+String(i+1));
	  var end_price = document.getElementById("end"+String(i+1));
	  

	  if(i == 0){
		beg_sum = beginning_balances[i] * price;
		month_sum = price + ((end - price)/12);
	    interest = month_sum * interest_list[0];
	    end_sum = ending_balances[0] * month_sum;
	    gain = end_sum.toFixed(0) - beg_sum - interest.toFixed(0);

        //month_sum = month_sum;
		
		beg_sum = parseInt(beg_sum);
		month_sum = parseInt(month_sum);
		interest = parseInt(interest);
		end_sum = parseInt(end_sum);
		gain = parseInt(gain);
		
		price = end_sum;
		prev_price = month_sum;
	  }else{
		console.log("The price is:"+price+", Gain is:"+gain);
		console.log("End is:"+end+", interest_list is:"+interest_list[i]);
		beg_sum = price - gain;
	    month_sum = prev_price +((end - init_price)/12);
		//month_sum = "Here";
		console.log("month_sum is:"+month_sum+", interest_list is:"+interest_list[i]);
	    interest = month_sum * interest_list[i];
	    end_sum = ending_balances[i] * month_sum;
	    gain = end_sum.toFixed(0) - beg_sum - interest.toFixed(0);
		
		
		beg_sum = parseInt(beg_sum);
		month_sum = parseInt(month_sum);
		interest = parseInt(interest);
		end_sum = parseInt(end_sum);
		gain = parseInt(gain);
		//month_sum = month_sum.toFixed(0);
		price = end_sum.toFixed(0);
	  }
	  
	  beg_price.innerHTML = beg_sum;
	  month_price.innerHTML = month_sum;
	  earned_interest.innerHTML = interest.toFixed(0);
	  unrealized_gain.innerHTML = gain;
	  end_price.innerHTML = end_sum.toFixed(0);
	  
  }
  
  
/*  
  for(var i = 1; i < 12; i++){
    beg_sum = end_sum.toFixed(0) - interest;
	month_sum = end_sum.toFixed(0) +((end - end_sum.toFixed(0))/12);
	interest = month_sum * interest_list[i];
	end_sum = ending_balances[i] * month_sum.toFixed(0);
	gain = end_sum.toFixed(0) - beg_sum - interest.toFixed(0);
	
	beg_price.innerHTML = beg_sum;
    month_price.innerHTML = month_sum.toFixed(0);
    earned_interest.innerHTML = interest.toFixed(0);
    unrealized_gain.innerHTML = gain;
    end_price.innerHTML = end_sum.toFixed(0);
  }
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

*/
}













