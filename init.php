<?php
/**!
 * Plugin Name: Shapla FullScreen Nav
 * Plugin URI:  https://github.com/sayful1/shapla-fullscreen-nav
 * Description: A stylish and lightweight Full Screen Navigation for Shapla WordPress Theme.
 * Version:     1.1.0
 * Author:      Sayful Islam
 * Author URI:  https://sayfulislam.com/
 * License:     GPL2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

if ( ! class_exists( 'Shapla_FullScreen_Nav' ) ) {
	class Shapla_FullScreen_Nav {

		/**
		 * @var string
		 */
		private $plugin_name = 'shapla-fullscreen-nav';

		/**
		 * @var string
		 */
		private $version = '1.0.0';

		/**
		 * @var null
		 */
		private static $instance = null;

		/**
		 * Ensures only one instance of Shapla_FullScreen_Nav is loaded or can be loaded.
		 *
		 * @return Shapla_FullScreen_Nav - Main instance
		 */
		public static function init() {
			if ( is_null( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		public function __construct() {
			// define constants
			$this->define_constants();

			// Update plugin from GitHub
			$this->update_plugin();

			register_activation_hook( __FILE__, array( $this, 'activation' ) );
			register_deactivation_hook( __FILE__, array( $this, 'deactivation' ) );

			add_action( 'wp_enqueue_scripts', array( $this, 'scripts' ), 20 );
			add_action( 'wp_head', array( $this, 'ms_tap_highlight' ) );

			add_action( 'init', array( $this, 'init_plugin' ) );
		}

		public function update_plugin() {
			require_once SHAPLA_FULLNAV_LIBRARIES . '/ShaplaGitHubPluginUpdater.php';
			new ShaplaGitHubPluginUpdater( __FILE__, 'sayful1', "shapla-slider" );
		}

		public function init_plugin() {
			remove_action( 'shapla_header', 'shapla_primary_navigation', 30 );
			add_action( 'shapla_header', array( $this, 'fullscreen_nav_html' ), 8 );
		}

		public function define_constants() {
			$this->define( 'SHAPLA_FULLNAV_VERSION', $this->version );
			$this->define( 'SHAPLA_FULLNAV_FILE', __FILE__ );
			$this->define( 'SHAPLA_FULLNAV_PATH', dirname( SHAPLA_FULLNAV_FILE ) );
			$this->define( 'SHAPLA_FULLNAV_INCLUDES', SHAPLA_FULLNAV_PATH . '/includes' );
			$this->define( 'SHAPLA_FULLNAV_LIBRARIES', SHAPLA_FULLNAV_INCLUDES . '/libraries' );
			$this->define( 'SHAPLA_FULLNAV_TEMPLATES', SHAPLA_FULLNAV_PATH . '/templates' );
			$this->define( 'SHAPLA_FULLNAV_URL', plugins_url( '', SHAPLA_FULLNAV_FILE ) );
			$this->define( 'SHAPLA_FULLNAV_ASSETS', SHAPLA_FULLNAV_URL . '/assets' );
		}

		/**
		 * Define constant if not already set.
		 *
		 * @param  string $name
		 * @param  string|bool $value
		 */
		private function define( $name, $value ) {
			if ( ! defined( $name ) ) {
				define( $name, $value );
			}
		}

		public function activation() {
			do_action( 'shapla_fullscreen_nav_activation' );
			flush_rewrite_rules();
		}

		public function deactivation() {
			flush_rewrite_rules();
		}

		public function scripts() {
			wp_enqueue_style( 'shapla-fullscreen-nav', SHAPLA_FULLNAV_ASSETS . '/css/style.css', array(), SHAPLA_FULLNAV_VERSION, 'all' );
			wp_enqueue_script( 'shapla-fullscreen-nav', SHAPLA_FULLNAV_ASSETS . '/js/functions.js', array(), SHAPLA_FULLNAV_VERSION, true );
		}

		/**
		 * Add meta tag to theme header (no tap highlighting on Windows devices)
		 */
		public function ms_tap_highlight() {
			?>
            <meta name="msapplication-tap-highlight" content="no"/><?php
		}

		public function fullscreen_nav_html() {
			?>
            <button class="menu-toggle NavBtnWrapper">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="NavBackground"></div>
            <div class="NavWrapper">
                <div class="MenuWrapper">
					<?php
					wp_nav_menu( array(
						'container_class' => 'MenuContainer',
						'theme_location'  => 'primary',
						'fallback_cb'     => ''
					) );
					?>
                </div>
            </div>
            <div class="NavLines"></div>
			<?php
		}
	}
}

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 */
Shapla_FullScreen_Nav::init();
