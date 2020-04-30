<?php
/**
 * Tests for Contact_Form_Block class.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Blocks;

use MaterialThemeBuilder\Plugin;

/**
 * Tests for Contact_Form_Block class.
 */
class Test_Contact_Form_Block extends \WP_UnitTestCase {
	/**
	 * Created valid post ID.
	 *
	 * @var int
	 */
	public static $valid_post_id = 0;

	/**
	 * Created invalid post ID.
	 *
	 * @var int
	 */
	public static $invalid_post_id = 0;

	/**
	 * Generate some text fixtures.
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function wpSetUpBeforeClass( $factory ) {
		self::generate_fixtures( $factory );
	}

	/**
	 * Helper method to generate the fixtures
	 *
	 * @param WP_UnitTest_Factory $factory WP Factory object.
	 *
	 * @return void
	 */
	public static function generate_fixtures( $factory ) {
		self::$valid_post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/contact-form  -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-1"></div>
				<!-- /wp:material/contact-form -->
				',
			]
		);

		self::$invalid_post_id = $factory->post->create(
			[
				'post_title'   => 'Lorem ipsum dolor sit amet',
				'post_content' => 'Consectetur adipiscing elit. In dui quam, egestas nec aliquet ac, hendrerit vitae ligula. Morbi malesuada in lectus vel sollicitudin. Proin tellus ligula, tincidunt at sagittis eget, tempor non est. In et suscipit metus. Cras in lectus a ex ullamcorper eleifend. Aenean convallis lacus et porttitor convallis. Proin iaculis a diam et euismod. Proin lectus ex, bibendum vel pretium ut, pellentesque eget nisl.

				<!-- wp:material/contact-form -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-1"></div>
				<!-- /wp:material/contact-form -->

				<!-- wp:material/contact-form  -->
					<div class="wp-block-material-contact-form" id="block-material-contact-form-2"></div>
				<!-- /wp:material/contact-form -->
				',
			]
		);
	}

	/**
	 * Test init.
	 *
	 * @see Contact_Form_Block::init()
	 */
	public function test_init() {
		$block = new Contact_Form_Block( new Plugin() );
		$block->init();
		$this->assertEquals( 10, has_action( 'init', [ $block, 'register_block' ] ) );
		$this->assertEquals( 10, has_action( 'wp_ajax_mtb_submit_contact_form', [ $block, 'priv_submit_contact_form' ] ) );
		$this->assertEquals( 10, has_action( 'wp_ajax_nopriv_mtb_submit_contact_form', [ $block, 'nopriv_submit_contact_form' ] ) );
		$this->assertEquals( 10, has_action( 'wp_ajax_mtb_manage_recaptcha_api_credentials', [ $block, 'manage_recaptcha_api_credentials' ] ) );
	}

	/**
	 * Test register_block.
	 *
	 * @see Contact_Form_Block::register_block()
	 */
	public function test_register_block() {
		// Unregister the block if it's registered already.
		unregister_block_type( 'material/contact-form' );

		$block = new Contact_Form_Block( new Plugin() );
		$block->register_block();

		// Assert the block is registered.
		$this->assertTrue( in_array( 'material/recent-posts', get_dynamic_block_names(), true ) );
	}

	/**
	 * Test render_block with missing email attribute.
	 *
	 * @see Contact_Form_Block::test_render_block()
	 */
	public function test_render_block_with_missing_email_attribute() {
		$block = new Contact_Form_Block( new Plugin() );

		$content = '<div>Test Content</div>';

		$attributes = [
			'emailTo' => '',
		];

		$output = $block->render_block( $attributes, $content );

		$this->assertContains( 'The contact form cannot be displayed because the sender email is incorrect.', $output );
	}

	/**
	 * Test render_block with missing subject.
	 *
	 * @see Contact_Form_Block::test_render_block()
	 */
	public function test_render_block_with_missing_subject_attribute() {
		$block = new Contact_Form_Block( new Plugin() );

		$content = '<div>Test Content</div>';

		$attributes = [
			'emailTo' => 'test@test.loc',
			'subject' => '',
		];

		$output = $block->render_block( $attributes, $content );

		$this->assertContains( 'The contact form cannot be displayed because the email subject is not provided.', $output );
	}

	/**
	 * Test render_block with more than one contact form in the post.
	 *
	 * @see Contact_Form_Block::test_render_block()
	 */
	public function test_render_block_with_more_than_one_contact_form() {
		global $post;
		$block = new Contact_Form_Block( new Plugin() );

		$content = '<div>Test Content</div>';

		$attributes = [
			'emailTo' => 'test@test.loc',
			'subject' => 'Test Subject',
		];

		$post   = get_post( self::$invalid_post_id );
		$output = $block->render_block( $attributes, $content );

		$this->assertContains( 'You cannot have multiple contact form instances in one page.', $output );
	}

	/**
	 * Test render_block.
	 *
	 * @see Contact_Form_Block::test_render_block()
	 */
	public function test_render_block() {
		global $post;
		$block = new Contact_Form_Block( new Plugin() );

		$content = '<div>Test Content</div>';

		$attributes = [
			'emailTo'             => 'test@test.loc',
			'subject'             => 'Test Subject',
			'className'           => 'test-class',
			'confirmationMessage' => 'Test Confirmation message',
		];

		$post   = get_post( self::$valid_post_id );
		$output = $block->render_block( $attributes, $content );

		$this->assertContains( '<div class="mtb-contact-form test-class">', $output );
		$this->assertContains( '<form id="mtbContactForm"', $output );
		$this->assertContains( 'mtb_contact_form_nonce', $output );
		$this->assertContains( 'mtb_submit_contact_form', $output );
		$this->assertContains( 'mtb_token', $output );
		$this->assertContains( 'Test Content', $output );
		$this->assertContains( 'Test Confirmation message', $output );
	}
}
