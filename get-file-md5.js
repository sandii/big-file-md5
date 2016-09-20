const content = document.querySelector('#content');
const SAMPLESIZE = 200;
const CHUNKNUM = 5;

document.querySelector('#file').addEventListener('change', handleChange, false);

function handleChange (e) {
	let file = e.target.files[0];
	console.log(file);
  if (!file) return;
  let isBigFile = !!(file.size > (SAMPLESIZE + 1) * CHUNKNUM);
  if (isBigFile) {
  	readBigFile(file);
  } else {
  	readSmallFile(file);
  }
}

function readBigFile (file) {
	let reader = new FileReader();
	let chunkSize = Math.ceil(file.size / CHUNKNUM);
  let count = 0;
  let abstr = [];
  let read = () => {
  	let start = chunkSize * count;
  	let end = start + SAMPLESIZE;
  	let blob = file.slice(start, end);
  	reader.readAsText(blob);
  };

  reader.onload = (e) => {
  	console.log('load big file');
  	abstr.push(reader.result);
  	count++;
  	if (count < CHUNKNUM) {
  		read();
  	} else {
  		console.log(abstr);
  		content.innerHTML = md5(abstr.join(''));
  	}
  };
  read();
}

function readSmallFile (file) {
	let reader = new FileReader();
  reader.onload = (e) => {
  	console.log('load small file');
  	content.innerHTML = md5(reader.result);
  };
  reader.readAsText(file);
}
