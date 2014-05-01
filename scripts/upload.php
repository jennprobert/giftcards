<?php
$uploads_dir = '/uploads';

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

$sFileName = $_FILES['img_file']['name'];
$sFileType = $_FILES['img_file']['type'];
$sFileSize = bytesToSize1024($_FILES['img_file']['size'], 1);

foreach ($_FILES["img_file"]["error"] as $key => $error) {
	if ($error == UPLOAD_ERR_OK) {
		$tmp_name = $_FILES["img_file"]["tmp_name"][$key];
		$name = $_FILES["img_file"]["name"][$key];
		move_uploaded_file($tmp_name, "$uploads_dir/$name");
	}
}

?>
