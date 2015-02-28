<?php

# WARNING: THIS HAS ABSOLUTELY NO SECURITY IMPLEMENTED WHATSOEVER
# DO NOT USE OUTSIDE OF MZ

	$dbhost = "localhost";
	$dbusername = "web";
	$dbpassword = "";
	$database = "textminer";
	
	$url = $_GET["url"];
	$data = $_GET["data"];
	$tag = $_GET["tag"];

	
	
	
	$dbh = new mysqli($dbhost, $dbusername, $dbpassword, $database);
	if($dbh->connect_error)
	{
		trigger_error('Database connection failed: ' . $dbh->connect_error, E_USER_ERROR); 
	}
	
	$sql = "INSERT INTO tagged_data (url, data, tag) VALUES (?, ?, ?)";
	$cmd = $dbh->prepare($sql);
	if($cmd === false)
	{
		trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $dbh->error, E_USER_ERROR);
	}
	$cmd->bind_param("sss", $url, $data, $tag);
	$cmd->execute();
?>
