module.exports =(temp,sport)=>{
	// console.log(`${sport.id}`);

	let output=temp.replace(/{%SPORTNAME%}/g,sport.sportName);
	 output=output.replace(/{%IMAGE%}/g,sport.image);
	 output=output.replace(/{%EMOJI%}/g,sport.emoji);
	 output=output.replace(/{%DESCRIPTION%}/g,sport.description);
	 output=output.replace(/{%ID%}/g,sport.id);

}
