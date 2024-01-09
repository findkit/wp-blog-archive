<div class="findkit-blog-archive"
    data-public-token="<?php echo esc_attr($attributes["publicToken"] ?? ""); ?>"
    data-instance-id="<?php echo esc_attr($attributes["instanceId"] ?? ""); ?>"
>

    <div class="findkit-blog-archive-loading hide">
        <p>Loading...</p>
    </div>

    <input type="search" class="findkit-search-blog" placeholder="Search from the blog...">

    <form class="findkit-tag-form">
        <?php
        $categories = get_categories([ 'hide_empty' => true ]);

        foreach ($categories as $cat) :
            $id = "tag-$cat->term_id";
        ?>

        <input type="radio" name="tag" id="<?php echo esc_attr($id); ?>" value="<?php echo esc_attr($cat->slug); ?>">
        <label tabindex="0" class="findkit-tag" for="<?php echo esc_attr($id); ?>">
            #<?php echo esc_html($cat->slug); ?>
        </label>

        <?php endforeach; ?>

        <input type="reset" class="findkit-tag" value="x" >

    </form>

    <?php if (empty($attributes["publicToken"])) : ?>
        <div class="findkit-blog-archive-error">
            <p>
                Cannot render Findkit Blog Archive block.
                Please set the public token in the block settings
            </p>
        </div>
    <?php endif; ?>

    <div class="findkit-blog-archive-results">
        <p>
            <?php
            // Inside the gutenber editor ServerSideRender component
            if (defined('REST_REQUEST') && REST_REQUEST) {
                echo 'Results will render here';
            }
            ?>
        </p>
    </div>

</div>
