<?php
/**
 * Scripts & Styles
 *
 * @package base
 */

/**
 * Enqueue scripts and styles.
 */
function enqueue_scripts() {
    wp_enqueue_style( 'theme-base-style', get_template_directory_uri() . '/assets/css/style.min.css' );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }
}

add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );
