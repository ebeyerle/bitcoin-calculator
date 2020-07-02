var pv = 0;
var rate = 0;
var initial_illus = 0;
var illus_rate = 0;
var global_end_total = 0;
var global_interest = 0;
var year_end_balance = [];
var days = [31,28,31,30,31,30,31,31,30,31,30,31];
var btc_totals = [];
var illus_unit_alloc = [];
var illus_totals = [];
var beginning_balances = [];
var interest_list = [];
var ending_balances = [];

var future_beginnings = [];
var future_interests = [];
var future_gains = [];

var future_end_units = 0;
var final_price = 0;

function refresh(){
  location.reload();
}

function calculate(){
  var investment = document.getElementById("investment").value;
  var rate_output = document.getElementById("effective_rate");
  var beg_output = document.getElementById("beg_units");
  var output = document.getElementById("balance");
  var interest_output = document.getElementById("new_interest");
  
  var interest = 0;
  
  investment = Math.abs(investment);
  
  pv = investment;
  
  investment = (1+.037) * Math.abs(investment);
  //year_end_balance.push(investment.toFixed(3));
  
  calc_rates();
  
  //interest = investment - Math.abs(pv);
  
  beg_output.innerHTML = Math.abs(pv);
  
  
  interest = year_end_balance[0] - Math.abs(pv);
  
  console.log(year_end_balance+"One");  
  
  rate = rate * 100;
  
  rate_output.innerHTML = rate.toFixed(1)+"%";
  output.innerHTML = year_end_balance[0];
  interest_output.innerHTML = interest.toFixed(3);
  
  //illustrate();
}

function calc_rates(){
  var total_1 = document.getElementById("btc1-total");
  var unit_output1 = document.getElementById("unit_all_1");

  var total_2 = document.getElementById("btc2-total");
  var unit_output2 = document.getElementById("unit_all_2");

  
  var btc1_total = 0;
  var btc2_total = 0;
  var unit_allocation = 0;
  var unit_allocation2 = 0;

  
  btc1_total = total();
  btc2_total = total2();
  unit_allocation = allocate();
  unit_allocation2 = allocate2();

  
  total_1.innerHTML = btc1_total;
  unit_all_1.innerHTML = unit_allocation;

  
  total_2.innerHTML = btc2_total;
  unit_all_2.innerHTML = unit_allocation2;

  
  period_end();
  period_increases(unit_allocation);
}

function period_end(){

  var period_total_output = document.getElementById("peroid_end_total");
  var end_simple_output = document.getElementById("end_simple_units");
  
  var end_total = 0;
  
  
  end_total = getEndTotal();
  year_end_balance.push(end_total);
  //global_end_total = end_total;

  //console.log(year_end_balance+"Two");
  period_total_output.innerHTML = end_total;
  end_simple_output.innerHTML = year_end_balance[0];
}

function period_increases(units){
  
  var total_increase_output = document.getElementById("net_increase_total");
  var unit_increase_output = document.getElementById("net_increase_units");
  
  var total_increase = getTotalIncrease();
  var unit_increase = getUnitIncrease(units);
  
  //console.log("****Period Net Increase ->"+total_increase)
  total_increase_output.innerHTML = total_increase.toFixed(3);
  unit_increase_output.innerHTML = unit_increase;
  
  setEffectiveRate(total_increase);
}

function getTotalIncrease(){
  //console.log("***year_end_balance->"+year_end_balance[0]+", pv->"+pv);
  return year_end_balance[0] - pv;
  
}

function getUnitIncrease(units){
  return year_end_balance[0] - units;
}

function getEndTotal(){
	
  var x = 0;
  
  x = btc_totals[0] + btc_totals[1];

  return x.toFixed(3);

}

function setEffectiveRate(units){
  
  var end_total = getEndTotal();
  var sum = 0;
  
  sum = units/(end_total-units);
  //sum = 1.333/(37.833-1.333);
  
  //console.log("---"+end_total+"-"+units+"--->"+sum);
  
  rate = sum.toFixed(3);
}

function fv(pval, i, n){
  var x=(1+i/100);
  var fv=pval*(Math.pow(x,n));
  
  return fv.toFixed(3);
}

function total(){

  //var total = document.getElementById("total");

  var future_val = 0;	
  //var investment = 5;

  if(Math.abs(pv) < 5){
    //fv(.016, 365, 0, investment);
	future_val = fv(pv, .016438, 365);
  }else{
    //fv(.016, 365, 0, -5);
	future_val = fv(5, .016438, 365);
  }
  
  //console.log(future_val);
  btc_totals.push(parseFloat(future_val));
  
  return future_val;
}

function total2(){

  //var total = document.getElementById("total");
  //console.log("---in total2---");

  var future_val = 0;	
  var initial = 0;
  //var investment = 5;

  if(Math.abs(pv) > 5){
    //fv(.016, 365, 0, investment);
	initial = Math.abs(pv)-5;
	
	future_val = fv(initial, .008767, 365);
  }else{
    //fv(.016, 365, 0, -5);
	future_val = 0;
  }
  
  btc_totals.push(parseFloat(future_val));
  
  return future_val;
}

function allocate(){

  var x = 0;
  
  if(Math.abs(pv) < 5){
	x = Math.abs(pv);
  }else{
	x = 5;
  }

  return x;
}

function allocate2(){

  var x = 0;
  
  if(Math.abs(pv) > 5){
	x = Math.abs(pv) - 5;
  }else{
	x = 0;
  }

  return x;
}

function illus_allocate(){
  var x = 0;
  
  if(Math.abs(initial_illus) < 5){
	x = Math.abs(initial_illus);
  }else{
	x = 5;
  }

  return x;
}

function illus_allocate2(){
  var x = 0;
  
  if(Math.abs(initial_illus) > 5){
	x = Math.abs(initial_illus) - 5;
  }else{
	x = 0;
  }

  return x;
}

function updateRateTable(val){
  var end_total_output = document.getElementById("end_illus_units");
  var units_increase_output = document.getElementById("net_increase_illus");
  
  var rate_output = document.getElementById("test1");
  var balance_output = document.getElementById("test2");
  var daily_output = document.getElementById("daily");
  
  var interest_output = document.getElementById("bitcoin_interest");
  var end_output = document.getElementById("bitcoin_end");
  
  var sum = 0;
  var daily_rate = 0;
  var prev_rate = 0;
  
  console.log(initial_illus);
  sum = val - initial_illus;
  sum = sum.toFixed(3);
  
  illus_rate = sum/(val - sum);
  prev_rate = illus_rate;
  illus_rate = 100 * illus_rate;
  illus_rate = illus_rate.toFixed(1);
  
  daily_rate = illus_rate/365;
  
  end_total_output.innerHTML = val;
  units_increase_output.innerHTML = sum;
  
  interest_output.innerHTML = prev_rate*10;
  end_output.innerHTML = val;
  
  rate_output.innerHTML = illus_rate+"%";
  balance_output.innerHTML = val;
  daily_output.innerHTML = daily_rate.toFixed(3)+"%";
  
  future_end_units = val;

}

function updateIllustrationAllocation(){
  var illus_output1 = document.getElementById("illus_unit_1");
  var illus_output2 = document.getElementById("illus_unit_2");
  
  var illus_allocation = 0;
  var illus_allocation2 = 0;
  
  illus_allocation = illus_allocate();
  illus_allocation2 = illus_allocate2();
  
  illus_unit_alloc.push(illus_allocation);
  illus_unit_alloc.push(illus_allocation2);
  
  illus_output1.innerHTML = illus_allocation;
  illus_output2.innerHTML = illus_allocation2;
}

function illustrate(){
	
  var initial = document.getElementById("initial_illus").value;
  initial_illus = Math.abs(initial);
  initial = Math.abs(initial);
  
  var n = 0;
  
  updateIllustrationAllocation();

  for(var i = 0; i < 12; i++){
    var beg_balance = document.getElementById("beg_balance_"+String(i+1));
    var interest = document.getElementById("interest_"+String(i+1));
    var end_balance = document.getElementById("end_balance_"+String(i+1));

    var end = 0;
    var diff = 0;

	n += days[i];
    //var days = document.getElementById("month1").value;
    //console.log(n);
    end = get_ending(n);
    diff = end - initial;

    //console.log("End:"+end+"initial:"+initial);

	beginning_balances.push(initial);
	interest_list.push(diff.toFixed(3));
	ending_balances.push(end);
	
    beg_balance.innerHTML = initial;
    //interest.innerHTML = end_balance-pv;
    interest.innerHTML = diff.toFixed(3);
    end_balance.innerHTML = end;

    initial = end;	
  }
  updateRateTable(end);
}

function get_ending(n){
  var ending = 0;
  var x1 = 0;
  var x2 = 0;
  
  if(investment <= 5){
    ending = fv(-illus_unit_alloc[0], .01643835, n);
	//console.log("The first ending:"+ending);
  }else{
	x1 = fv(-illus_unit_alloc[0], .01643835, n);
	x2 = fv(-illus_unit_alloc[1], .00876712, n);
	ending = parseFloat(x1) + parseFloat(x2);
    //ending = fv(-5, .016, 31) + fv(-31.5, .009, 31);
	//console.log("The second ending:"+ending);
  }
  return Math.abs(ending.toFixed(3));
}

function ending_prices(){
  
  var initial_price = document.getElementById("initial-price").value;
  var appreciation = document.getElementById("price-appreciation").value;
  var year_end = document.getElementById("year-end");
  
  var sum = 0;
  
  if(appreciation > 1){
    appreciation = appreciation/100;
  }else if(appreciation < 0){
    alert("Please enter a positive number");
  }
  
  sum = parseFloat(initial_price) * (1 + parseFloat(appreciation));

  year_end.innerHTML = sum;
  
  update_price_table(parseInt(initial_price), sum);
  
  get_final_results();
}

function get_final_results(){
  var beginning_output = document.getElementById("btc_beg_value");
  var accumulated_output = document.getElementById("btc_accumulated_cost");
  var gain_output = document.getElementById("btc_gain");
  var end_output = document.getElementById("btc_year_end");
  
  var sum = 0;
  var total = 0;
  
  sum = getAccumulated();
  total = future_end_units * final_price;
  
  beginning_output.innerHTML = future_beginnings[0];
  accumulated_output.innerHTML = sum;
  gain_output.innerHTML = future_gains[11];
  end_output.innerHTML = total.toFixed(0);
}

function getAccumulated(){
  
  var sum = 0;
  
  for(var i = 0; i < future_interests.length; i++){
	sum += future_interests[i];
  }
  
  return sum;
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
		console.log("Month:"+month_sum+", interest:"+interest_list[0]);
		
		beg_sum = parseInt(beg_sum);
		month_sum = parseInt(month_sum);
		interest = parseInt(interest);
		end_sum = parseInt(end_sum);
		gain = parseInt(gain);
		
		future_beginnings.push(beg_sum);
		future_interests.push(interest);
		future_gains.push(gain);
		
		price = end_sum;
		prev_price = month_sum;
	  }else{
		//console.log("The price is:"+price+", Gain is:"+gain);
		//console.log("End is:"+end+", interest_list is:"+interest_list[i]);
		beg_sum = price - gain;
		//console.log("End of Month Sum Variables are:: prev_price-"+prev_price+", end-"+end+", init_price-"+init_price);
	    month_sum = prev_price +((end - init_price)/12);
		//month_sum = "Here";
		//console.log("month_sum is:"+month_sum+", interest_list is:"+interest_list[i]);
	    interest = month_sum * interest_list[i];
	    end_sum = ending_balances[i] * month_sum;
	    gain = end_sum.toFixed(0) - beg_sum - interest.toFixed(0);
		
		prev_price = month_sum;
		
		beg_sum = parseInt(beg_sum);
		month_sum = parseInt(month_sum);
		interest = parseInt(interest);
		end_sum = parseInt(end_sum);
		gain = parseInt(gain);
		
		future_beginnings.push(beg_sum);
		future_interests.push(interest);
		future_gains.push(gain);
		final_price = month_sum;
		//month_sum = month_sum.toFixed(0);
		price = end_sum.toFixed(0);
	  }
	  
	  beg_price.innerHTML = beg_sum;
	  month_price.innerHTML = "$"+month_sum;
	  earned_interest.innerHTML = interest.toFixed(0);
	  unrealized_gain.innerHTML = gain;
	  end_price.innerHTML = end_sum.toFixed(0);
	  
  }
  month_price.innerHTML = "$"+end;
  
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













