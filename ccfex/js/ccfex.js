var day_bt =document.createElement("button");
day_bt.type = "button";
day_bt.innerText = "Daily";
day_bt.className = 'my_bt_calc_style';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var show_info = "";

async function calcone(iname){
	$("#selectSec").val(iname).change();
	document.getElementById('selectSec').dispatchEvent(new Event('change'))

	document.getElementsByClassName('btn-query')[0].click();

	//console.log("before " + Date());
	await sleep(1 * 1000);

	var tbs=document.getElementsByClassName('IF_if_table');
	//console.log(tbs.length + document.getElementById('selectSec').value);
	//console.log("after " + Date());


	var num = 0;
	var total_delta = 0;
	var vv = 10;
	for (i=0;i<tbs.length;++i)
	{
		num += 1;
		var tdall = tbs[i].getElementsByTagName('td');
		var buy=0;
		var sell=0;
		for (j=0;j<tdall.length;++j)
		{
			if (tdall[j].innerText=='中信期货')
			{
				//console.log(j);
				if (j%12 == 8)
				{
					buy = tdall[j+2].innerText;
				}
				else if (j%12==0)
				{
					sell = tdall[j+2].innerText;
				}

				if (buy != 0 && sell != 0)
				{
					break;
				}
			}
		}
		total_delta += (buy - sell);
	}
	console.log("total value is " + total_delta + " product is : " + iname + " timeis: " + Date());
	//var date = new Date()
	//var show_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
	var show_date = document.getElementById('actualDate').value;
	show_info = show_info + show_date + " " + iname + " 合约净多变化量: " + total_delta + "\n";
}

async function calcweek(iname) {
	$("#selectSec").val(iname).change();
	document.getElementById('selectSec').dispatchEvent(new Event('change'))

	document.getElementsByClassName('btn-query')[0].click();
	await sleep(1 * 1000);

	var tbs=document.getElementsByClassName('IF_if_table');

	var num = 0;
	var total_delta = 0;
	for (i=0;i<tbs.length;++i)
	{
		num += 1;
		var tdall = tbs[i].getElementsByTagName('td');
		var buy=0;
		var sell=0;
		for (j=0;j<tdall.length;++j)
		{
			if (tdall[j].innerText=='中信期货')
			{
				//console.log(j);
				if (j%12 == 8)
				{
					buy = tdall[j+1].innerText;
				}
				else if (j%12==0)
				{
					sell = tdall[j+1].innerText;
				}

				if (buy != 0 && sell != 0)
				{
					break;
				}
			}
		}
		total_delta += (buy - sell);
	}
	console.log("total value is " + total_delta + " product is : " + iname + " timeis: " + Date());
	var show_date = document.getElementById('actualDate').value;
	show_info = show_info + show_date + " " + iname + " 合约交易量净多: " + total_delta + "\n";
}

//var btn=document.getElementsByClassName('btn-query');
//btn[0].addEventListener('click', calcone);


function pushmsg(msgstr) {

	//var XMLHttpRequest = require('xhr2');
	var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象

	var url='https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=309df05b-2216-4e1a-9926-d150a5df5ae4'
	httpRequest.open('POST', url, true); //第二步：打开连接
	httpRequest.setRequestHeader("Content-type","application/json");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头

	var msg = '{ "msgtype": "text", "text": { "content": "hello extensions" }}'

	httpRequest.send(msg);//发送请求 将情头体写在send中
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
	    if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
	        var json = httpRequest.responseText;//获取到服务端返回的数据
	        console.log(json);
	    }
	};
}

day_bt.onclick = async function() {

	await calcone("IC"); // 先刷一次

	show_info = "";
	await calcone("IC");
	//await sleep(3 * 1000);
	await calcone("IF");
	//await sleep(6 * 1000);
	await calcone("IH");
	await calcone("IM");
	alert(show_info);

	chrome.runtime.sendMessage({greeting: "hello", msg: show_info}, function(response) {
	  console.log(response.farewell);
	});

}

var week_bt =document.createElement("button");
week_bt.type = "button";
week_bt.innerText = "Weekly";
week_bt.className = 'my_bt_calc_style';

week_bt.onclick = async function() {
	await calcone("IC");

	show_info = "";
	await calcone("IC");
	await calcone("IF");
	await calcone("IH");
	await calcone("IM");

	show_info = show_info + "\n";

	await calcweek("IC");
	await calcweek("IF");
	await calcweek("IH");
	await calcweek("IM");
	alert(show_info);
}

//week_bt.addEventListener('click', function() {
	//$("#selectSec").val("IC").change();
	//document.getElementsByClassName('btn-query')[0].click();}
//);


var ori=document.getElementsByClassName("ifrankright");
ori[0].appendChild(day_bt);
ori[0].appendChild(week_bt);