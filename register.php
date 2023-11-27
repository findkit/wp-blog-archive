<?php

\add_action('init', function () {
    \register_block_type( BLOCKS_BUILD . '/' .  basename(__DIR__) );
});

function findkit_get_excerpt($post_id) {
    if (function_exists('the_seo_framework')) {
        $desc = \the_seo_framework()->get_description($post_id);
        if ($desc) {
            return $desc;
        }
    } 

    return \get_the_excerpt($post_id);
}

add_filter('findkit_page_meta', function ($meta, $post) {
    $meta['customFields']["excerpt"] = [
        "type" => "keyword",
        "value" => \get_the_excerpt($post),
        "value" => findkit_get_excerpt($post->ID),
    ];

    $thumbnail = \get_the_post_thumbnail_url($post, 'medium');
    if ($thumbnail) {
        $meta['customFields']["featuredImage"] = [
            "type" => "keyword",
            "value" => $thumbnail,
        ];
    }

    $author = \get_the_author_meta('display_name', $post->post_author);
    if ($author) {
        $meta['customFields']["author"] = [
            "type" => "keyword",
            "value" => $author,
        ];
    }

    return $meta;
}, 10, 2);
