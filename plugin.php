<?php
/**
 * Plugin Name:       Findkit Blog Archive
 * Description:       Blog archive block powered by Findkit
 * Requires at least: 6.2
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Esa-Matti Suuronen <esamatti@findkit.com>
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       block-archive
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function findkit_blog_archive_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'findkit_blog_archive_init' );


function findkit_get_excerpt($post_id) {
    if (function_exists('the_seo_framework')) {
        $desc = @the_seo_framework()->get_description($post_id);
        if ($desc) {
            return $desc;
        }
    } 

    return \get_the_excerpt($post_id);
}

add_filter('findkit_page_meta', function ($meta, $post) {
    $meta['customFields']["excerpt"] = [
        "type" => "keyword",
        "value" => get_the_excerpt($post),
        "value" => findkit_get_excerpt($post->ID),
    ];

    $thumbnail = get_the_post_thumbnail_url($post, 'medium');
    if ($thumbnail) {
        $meta['customFields']["featuredImage"] = [
            "type" => "keyword",
            "value" => $thumbnail,
        ];
    }

    $author = get_the_author_meta('display_name', $post->post_author);
    if ($author) {
        $meta['customFields']["author"] = [
            "type" => "keyword",
            "value" => $author,
        ];
    }

    return $meta;
}, 10, 2);
