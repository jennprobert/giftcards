//variables
var iPreviousBytesLoaded = 0;
var oTimer = 0;
var sResultFileSize = '';

function secondsToTime(secs) { // we will use this function to convert seconds in normal time format
	var hr = Math.floor(secs / 3600);
	var min = Math.floor((secs - (hr * 3600))/60);
	var sec = Math.floor(secs - (hr * 3600) -  (min * 60));
		 
	if (hr < 10) {hr = "0" + hr; }
	if (min < 10) {min = "0" + min;}
	if (sec < 10) {sec = "0" + sec;}
	if (hr) {hr = "00";}
	return hr + ':' + min + ':' + sec;
};
function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB'];
	if (bytes == 0) return 'n/a';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};
function filepicked() {
    var oFile = document.getElementById('img_file').files[0];

    var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/jpg|image\/png|image\/tiff)$/i;
    if (! rFilter.test(oFile.type)) {
        document.getElementById('error').style.display = 'block';
        return;
    }

    var oImage = document.getElementById('imgPreview');

    var oReader = new FileReader();
        oReader.onload = function(e){
			oImage.src = e.target.result;
			oImage.onload = function () { // binding onload event

            sResultFileSize = bytesToSize(oFile.size);
            document.getElementById('fileInformation').style.display = 'block';
            document.getElementById('filename').innerHTML = 'Name: ' + oFile.name;
            document.getElementById('filesize').innerHTML = 'Size: ' + sResultFileSize;
            document.getElementById('filetype').innerHTML = 'Type: ' + oFile.type;
            document.getElementById('filedimension').innerHTML = 'Dimension: ' + oImage.naturalWidth + ' x ' + oImage.naturalHeight;
        };
    };

    // read selected file as DataURL
    oReader.readAsDataURL(oFile);
}
function startUploading() {
    iPreviousBytesLoaded = 0;
    document.getElementById('error').style.display = 'none';

    var vFD = new FormData(document.getElementById('uploadForm')); 

    var oXHR = new XMLHttpRequest();
    oXHR.addEventListener('load', uploadFinish, false);
    oXHR.open('POST', 'upload.php');
    oXHR.send(vFD);
}
function uploadFinish(e) {
	document.getElementById('filesize').innerHTML = sResultFileSize;
	clearInterval(oTimer);
} 