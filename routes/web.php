<?php
    Route::view('/{path?}', 'welcome')->where( 'path', '.*' );
