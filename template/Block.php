<?php
defined('ABSPATH') or die('No script kiddies please!');

/**
 * Plugin Name: guter block ###name###
 * Description: This plugin adds a custom ###name### Block to the Gutenberg editor_style
 * Author: ###author###
 */


class ###nameC###
{

    const BLOCK_GROUP_TITLE = "guter block";
    const BLOCK_SLUG = "guter_block";

    /**
     * constructor.
     */
    public function __construct()
    {

        define('GUTER_BLOCK_PATH',plugin_dir_path(__FILE__));
        add_filter( 'block_categories', function( $categories, $post ) {
            return array_merge(
                $categories,
                array(
                    array(
						'slug'  => self::BLOCK_SLUG,
						'title' => self::BLOCK_GROUP_TITLE,
						'icon' => "screenoptions"
                    ),
                )
            );
        }, 10, 2 );

        $asset_file = include ('build/index.asset.php');

        $frontendStylesPath = plugins_url('build/style.css', __FILE__);
        wp_register_style(
            '###prefix###-###nameK###-fe',
            $frontendStylesPath,
            []
        );

        $backendStylesPath = plugins_url('build/editor.css', __FILE__);
        wp_register_style(
            '###prefix###-###nameK###-be',
            $backendStylesPath,
            ['wp-edit-blocks' ]
        );

        wp_register_script(
            '###prefix###-###nameK###-js',
            plugins_url('/build/index.js', __FILE__),
            array_merge($asset_file['dependencies'],['wp-api' ]) ,
            $asset_file['version']
        );


        register_block_type(
            '###prefix###/###nameK###',
            [
                'editor_style' => '###prefix###-###nameK###-be',
                'editor_script' => '###prefix###-###nameK###-js',
                'attributes' => [],
                'render_callback' => [$this, 'renderCallback']
            ]
        );
    }

    public function renderCallback( $attributes, $content )
    {
        wp_enqueue_style( '###prefix###-###nameK###-fe' );
        ob_start();
        include __DIR__.'/templates/###nameK###.php';
        return str_replace(["\r","\n"],'',trim(ob_get_clean()));
    }
}

/**
 * Init Plugin
 */
new ###nameC###();
