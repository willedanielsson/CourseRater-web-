<div class="message">
	<h1>Message page</h1>

	<?php
	$confirmEmail = $_GET['emailConfirmation'];

		if($confirmEmail=="ok"){ ?>
			<p>Succes!</p>
			<p>A confirmation email has been sent to you</p>
	<?php } ?>

	<?php
		if(5>2){ ?>
			<p>It seems like you already have an account</p>
	<?php } ?>
	
	<?php
		if(5>2){ ?>
			<p>Course was added succesfully!</p>
	<?php } ?>
</div>