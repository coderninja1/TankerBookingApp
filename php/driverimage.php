<?php

if(isset($_FILES['image'])){
$image = null;
$ext = pathinfo($_FILES['image']['name'],PATHINFO_EXTENSION);
$image = time().'.'.$ext;
move_uploaded_file($_FILES["image"]["tmp_name"], 'driverimages/'.$image);
$imagepath='driverimages/'.$image;
echo $imagepath;
}
else{
	echo "";
}

?> 