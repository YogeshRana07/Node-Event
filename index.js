
//HTTP REQUEST
const fs=require('fs');
const url=require('url');
const http=require('http');
const slugify=require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');


const tempOverview=fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempSport=fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');
const tempCard=fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');

const data=fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj=JSON.parse(data);

const slugs=dataObj.map(el=>slugify(el.sportName,{lower:true}));
console.log(slugs);

const server=http.createServer((req,res)=>{
	console.log(req.url);
	const {query,pathname}=(url.parse(req.url,true));
	 // pathName=req.url;
	 // console.log(query);


	if(pathname==='/' || pathname==='/overview'){
        res.writeHead(200,{'Content-type':'text/html'});

        const cardsHtml=dataObj.map(el=>replaceTemplate(tempCard,el)).join('');

        const output=tempOverview.replace('{%SPORT_CARDS%}',cardsHtml);
        // console.log(cardsHtml);


		res.end(output);
	}
	else if(pathname==='/sport'){
		 res.writeHead(200,{'Content-type':'text/html'});
		 console.log(query);
		 const sport = dataObj[query.id];
         // console.log(sport);
		 const output=replaceTemplate(tempSport,sport);
		res.end(output);
	}

	else if(pathname==='/api'){

		 	res.writeHead(200,{
			'Content-type':'application/json'
		});

		 	res.end(data);

	}
	else{
		res.writeHead(404,{
			'Content-type':'text/html',
			'my-own-header':'hello-world'
		});
		res.end('<h1 style="text-align:center;">Page not found!</h1>');
	}

});

server.listen(8000,'127.0.0.1',()=>{
	console.log('Server is on');
 });
