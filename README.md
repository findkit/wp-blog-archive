# Blog Archive Block with Findkit

A WordPress Gutenberg block for blog archives powered by Findkit. Running on
[findkit.com/blog](https://www.findkit.com/blog/).

This is a WordPress plugin. Download it as a
[zip](https://github.com/findkit/wp-blog-archive/archive/refs/heads/main.zip)
and upload it to the WordPress plugin manager.

## Developing

This plugin is build using [@wordpress/scripts](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/).

Clone the plugin from git to your plugins

```
cd wp-content/plugins
git clone https://github.com/findkit/wp-blog-archive.git
cd wp-blog-archive
```

Install the npm deps and start wp-scripts

```
npm ci
npm run dev # runs wp-scripts start
```
