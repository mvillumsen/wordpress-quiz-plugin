<?php
/*
Plugin Name: Wordpress Quiz Plugin
Plugin URI: https://github.com/mvillumsen/wordpress-quiz-plugin
Description: JavaScript plugin for Wordpress enabling different types of quizzes using HTML tags.
Version: 1.0
Author: Martin Villumsen
Author URI: https://github.com/mvillumsen
License: GPLv3 or later
*/

add_action('wp_enqueue_scripts', 'load_scripts');

function load_scripts() {
   wp_enqueue_script('quiz', plugins_url('wordpress-quiz-plugin/rquiz.js'));
   wp_enqueue_script('i18n', plugins_url('wordpress-quiz-plugin/i18n.js'));
}

add_action( 'wp_enqueue_scripts', 'load_styles' );

function load_styles() {
   wp_register_style( 'wordpress-quiz', plugins_url( 'wordpress-quiz-plugin/css/quiz.css' ) );
   wp_enqueue_style( 'wordpress-quiz' );
}

add_action( 'admin_menu', 'wordpress_quiz_admin' );

function wordpress_quiz_admin() {
	add_options_page( 'Wordpress Quiz Plugin Options', 'Wordpress Quiz Plugin', 'manage_options', 'wordpress-quiz-plugin', 'quiz_plugin_options' );
}

function quiz_plugin_options() {
   if ( !current_user_can( 'manage_options' ) )  {
      wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
   }
   echo "
      <p>R-Quiz is a software component that can convert suitable contents into interactive quizzes.</p>

      <h2 id='features'>Features'</h2>
      <p>R-Quiz is available under the GNU Lesser General Public License (LGPL) which makes it free
	software. You can use R-Quiz for all your intends and purposes as long as you don't
	directly sell it. However you can create quiz contents and sell these bundled with
	R-Quiz which itself remains free of charge. You can also use R-Quiz to offer contents
	behind a paywall.</p>

      <h3>Quiz Types</h3>
      <p>R-Quiz currently supports these quiz types:</p>
      <ol>
	<li>matching quiz (drag&amp;drop - either with pairs or categories)</li>
	<li>gapfill quiz (with both drag&amp;drop and text input fields)<br/>
	    With this quiz type you can create regular gapfill exercises as well as a sorting quiz and even a picture puzzle.</li>
	<li>memory quiz</li>
	<li>multiple choice quiz</li>
	<li>wordjumble quiz (with text input fields)</li>
	<li>crossword quiz</li>
	<li>wordsearch quiz</li>
	<li>wordguess quiz (hangman)</li>
      </ol>
      <p>With the exception of the wordguess quiz type all quizzes can be printed on paper and used non-interactively. Use the browser's native printing functionality for this.</p>";
}
?>
