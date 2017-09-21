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
   wp_enqueue_script('quiz', plugins_url('wordpress-quiz-plugin/js/rquiz.js'));
   wp_enqueue_script('i18n', plugins_url('wordpress-quiz-plugin/js/i18n.js'));
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
   $description = file_get_contents('description.html');
   echo $description;
}
?>
