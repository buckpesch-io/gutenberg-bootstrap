/**
 * BLOCK: bootstrap-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import '../assets/scss/style.scss';
import '../assets/scss/editor.scss';

// Import JS.
import '../../node_modules/bootstrap/js/src/alert';

const {__}                  = wp.i18n; // Import __() from wp.i18n
const {registerBlockType}   = wp.blocks; // Import registerBlockType() from wp.blocks
const {CheckboxControl, PanelBody, PanelRow} = wp.components;
const {Fragment}            = wp.element;
const {
		  AlignmentToolbar,
		  BlockControls,
		  ColorPalette,
		  InspectorControls,
		  RichText,
	  }                     = wp.editor;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('gbb/alert', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title      : __('Bootstrap Alert'), // Block title.
	description: __(
		'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.'), // Block title.
	icon       : {
		// Specifying a background color to appear with the icon e.g.: in the inserter.
		background: '#fff',
		// Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
		foreground: '#0088cc',
		// Specifying a dashicon for the block
		src       : 'admin-comments',
	}, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	//icon: <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z" /><path d="M19 13H5v-2h14v2z" /></svg>,
	category   : 'gbb', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords   : [
		__('Bootstrap'),
		__('Alert'),
		__('Notification'),
	],
	attributes : {
		theme      : {
			type   : 'string',
			default: 'success'
		},
		textColor      : {
			source  : 'string',
		},
		title      : {
			source  : 'text',
			selector: 'h4.alert-heading'
		},
		content    : {
			type    : 'array',
			source  : 'children',
			selector: 'div.content'
		},
		isDismissable: {
			type: 'boolean',
		},
		alignment  : {
			type: 'string',
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function (props) {
		// Creates a <p class='wp-block-gbb-alert'></p>.

		// Theme selection
		const {attributes: {alignment, content, isDismissable, textColor, title, theme}, setAttributes, isSelected} = props;

		function setTheme(event) {
			const selected = event.target.querySelector('option:checked');
			setAttributes({theme: selected.value});
			event.preventDefault();
		}

		function onChangeAlignment(newAlignment) {
			setAttributes({alignment: newAlignment});
		}

		function onChangeContent(newContent) {
			setAttributes({content: newContent});
		}

		function onTitleContent(newTitle) {
			setAttributes({title: newTitle});
		}

		function showThemeForm() {
			return (
				<form onSubmit={setTheme} style={{textAlign: alignment}}>
					<select value={theme} onChange={setTheme}>
						<option value="primary">Primary</option>
						<option value="secondary">Secondary</option>
						<option value="success">Success</option>
						<option value="danger">Danger</option>
						<option value="warning">Warning</option>
						<option value="info">Info</option>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
					</select>
					{/*<ColorPalette
						value={textColor}
						onChange={(textColor) => setAttributes({ textColor })} />*/}
				</form>
			);
		}

		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={__('Select options')}>
						<PanelRow>
							<label>{__('Theme')}</label>
							{showThemeForm()}
						</PanelRow>
						<PanelRow>
							<CheckboxControl
								label={__('Is dismissable?')}
								help={__('Can the user hide the alert by clicking a X button on the top right.')}
								checked={ isDismissable }
								onChange={ ( isDismissable ) => { setAttributes( { isDismissable } ) } }
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<BlockControls>
					<AlignmentToolbar
						value={alignment}
						onChange={onChangeAlignment}
					/>
				</BlockControls>
				<div className={props.className}>
					<div className={`alert alert-${theme} alert-dismissible fade show`} role="alert"
						 style={{textAlign: alignment}}>
						<RichText
							className="alert-heading"
							tagName="h4"
							onChange={onTitleContent}
							value={title}
						/>
						<RichText
							className="content"
							tagName="div"
							onChange={onChangeContent}
							value={content}
						/>
						{
							isDismissable &&
							<button type="button" className="close" data-dismiss="alert" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						}
					</div>
				</div>
			</Fragment>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function (props) {

		// Initialize theme
		const {attributes: {alignment, content, title, theme}} = props;

		return (
			<div>
				<div className={`alert alert-${theme} alert-dismissible fade show`}
					 role="alert"
					 style={{textAlign: alignment}}
				>
					<RichText.Content
						className="alert-heading"
						tagName="h4"
						value={title}
					/>
					<RichText.Content
						className="content"
						tagName="div"
						value={content}
					/>
					<button type="button" className="close" data-dismiss="alert" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

			</div>
		);
	},
});
