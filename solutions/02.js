function fib(n){
	if( n <= 0 )  return "n必须大于0";
	if( n === 1 ) return 0;
	if( n === 2 ) return 1;
	var a = 0,b = 1;
	for( var i = 2;i < n-1;i++ ){
		b = a + b;
		a = b - a;
	}
	return a + b;
}