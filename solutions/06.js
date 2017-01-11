/* replace() 方法
			 * 如果一个字符串是以一个或多个空格开始，全部空格替换为空
			 * 如果一个字符串是以一个或多个空格结束，全部空格替换为空
			*/
			var inputText = "    zzzzzzzzzzyyyyyyyyyyxxxxxxxx     ";
			var outputText = inputText.replace(/^\s+|\s+$/g,'');
			console.log(inputText);
			console.log(outputText);
			
			
			/* match() 方法			 
			 * 获取匹配数组
			*/
			var pattern = /box/ig;    // i：表示执行不区分大小写      g：表示执行一个全局匹配，即找到所有匹配而非一次匹配 
			var str = "This is a Box!,That is a Box too";
			console.log(str.match(pattern),str.match(pattern).length);      // 匹配到两个 Box,数组长度为2
			
			var num = "220125199508051689";
			// 匹配num的第1-6位数字、第7-10位数字、第11-12位数字、第13-14位数字、第15-18位数字
			// 这里需要注意一点是：RegExp所要匹配的数字必须要等于num的长度  即 6+4+2+2+4=num.length
			var re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{4})$/);    
			var arrSplit = num.match(re);
			console.log(arrSplit);
			
					
			/* search() 方法			 
			 * 查找第一个与参数匹配的字符串的起始位置；如果找不到返回-1
			*/	
			var pattern1 = /box/ig;
			var str1 = "This is a Box!,That is a Box too";
			console.log(str1.search(pattern1));    // 10   空格也占1个位置
			
			
			/* split() 方法			 
			 * 使用split拆分成字符串数组
			*/
			var num1 = "220125199508051689"; 
			var re1 = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{4})$/); 
			var arrSplit1 = num1.split(re1);
			console.log(arrSplit1);     // 注意此时返回的数组，与num.match(re)返回的数组的区别
			
			
			/* exec() 方法			 
			 * 统计子字符串出现的所有位置
			*/
			function count(str){
				var b,r = /def/g;
				while( b = r.exec(str) ){
					console.log(b);
				}
			}
			count('asddefsjdefoiudeoiudefhygdffdredef');
			
			
			//  下面	看一些常用的几个用到正则表达式的例子
			
			/*	
			 * 提取浏览器url中的参数名和参数值
			*/
			function getUrlParamObj(){
				var obj = {};
				// 获取url参数部分
				var params = window.location.search.substr(1);
				// [^&=]+ 表示不含&或=的连续字符
				params.replace(/([^&=]+)=([^&=]*)/gi,function(rs,$1,$2){
					obj[$1] = $2;
				});
				return obj;
			}
			console.log( getUrlParamObj() );
			
			/*	
			 * 在字符串指定位置插入新字符串
			*/
			String.prototype.insertStr = function(str,offset){
				offset = offset + 1;
				var re = new RegExp( "(^.{"+ offset +"})" );
				var result = this.replace(re,"$1"+str);
				console.log(result);
				return result;
			};
			"zxcvb".insertStr("09876",2);     // 在 c字符后面插入09876
			
			/*	
			 * 将手机号码18892568645转化成188****8645
			*/
			function telFormat(tel){
				tel = String(tel);
				var re = new RegExp( /(\d{3})(\d{4})(\d{4})/ );      // 匹配手机号码的前3位，第4-7位，第8-11位
				var result = tel.replace(re,function(rs,$1,$2,$3){
					return $1 + "****" + $3;
				});
				console.log(result);
			}
			telFormat("18892568645");
			
			/*	
			 * 将<, >, &, " 进行转义
			*/
			function escapeHtml(str){
				// [] 定义匹配字符范围 ，匹配< > " &
				var re = new RegExp(/[<>"&]/g);   
				var result = str.replace(re,function(rs){
					switch (rs) {
			            case "<":
			                return "&lt;";
			            case ">":
			                return "&gt;";
			            case "&":
			                return "&amp;";
			            case "\"":
			                return "&quot;";
			        }
				});
				console.log(result);
			}
			escapeHtml('<div>name=123&key=234\"');
			
			/*	
			 * 匹配url
			 * DNS规定：域名中的标号都由英文字母和数字组成，每个标号不超过63个字符，也不区分大小写字母
			 * 			标号除连字符(-)外不能使用其他的标点符号
			 * 			级别最低的域名写在最左边，而级别最高的域名写在最右边
			 * 			由多个标号组成的完整域名总共不超过255个字符
			*/
			function judgeUrl(str){
				var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
							  	+ "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
							  	+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
							  	+ "|" // 允许IP和DOMAIN（域名）
							  	+ "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
							  	+ "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
							  	+ "[a-z]{2,6})" // first level domain- .com or .museum 
							  	+ "(:[0-9]{1,4})?" // 端口- :80 
							  	+ "((/?)|" // a slash isn't required if there is no file name 
							  	+ "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
				var re = new RegExp(strRegex);
				if( re.test(str) ){
					console.log("true");
				}else{
					console.log("false");
				}
			}
			var testUrl1 = "https://64.81.85.161/site/file.php?cow=moo's",
				testUrl2 = "http://electronics.cnet.com/electronics/0-6342366-8-8994967-1.html",
				testUrl3 = "https://www.google.com.hk/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#q=js%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F",
				testUrl4 = "http://stackoverflow.com/questions/25215295/how-to-show-html-on-pop-over-using-angular-ui-bootstrap",
				testUrl5 = "ww.google.com";
			judgeUrl(testUrl1);
			judgeUrl(testUrl2);
			judgeUrl(testUrl3);
			judgeUrl(testUrl4);
			judgeUrl(testUrl5);