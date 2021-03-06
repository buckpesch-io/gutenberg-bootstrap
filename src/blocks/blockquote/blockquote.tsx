/**
 * BLOCK: bootstrap-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import * as React from "react";
import * as styles from "../../assets/scss/styles.module.scss";
import icons from "../../lib/icons";
import Inspector from "./components/inspector";

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { Fragment } = wp.element;
const { AlignmentToolbar, BlockControls, RichText } = wp.editor;

const attributes = {
	alignment: {
		type: "string"
	},
	margin: {
		default: "my-3",
		type: "string"
	},
	quote: {
		selector: ".gbb-blockquote",
		source: "text"
	},
	source: {
		selector: "footer.gbb-blockquote-footer",
		source: "text"
	},
	textColor: {
		source: "string"
	}
};

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
registerBlockType("gbb/blockquote", {
	attributes,
	category: "gbb", // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __(
		"For quoting blocks of content from another source within your document."
	),
	icon: icons.blockquote,
	keywords: [__("Bootstrap"), __("Blockquote"), __("Quote")],
	title: __("Bootstrap Blockquote"), // Block title.

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: props => {
		const {
			attributes: { alignment, margin, quote, source },
			setAttributes
		} = props;

		return (
			<Fragment>
				<Inspector {...props} />
				<BlockControls>
					<AlignmentToolbar
						value={alignment}
						onChange={alignment => {
							setAttributes({ alignment });
						}}
					/>
				</BlockControls>
				<div className={props.className}>
					<blockquote
						className={`${styles.blockquote} ${styles[margin]}`}
						style={{ textAlign: alignment }}
					>
						<RichText
							className={`gbb-blockquote ${styles.blockquote} ${
								styles["mb-0"]
							}`}
							tagName="p"
							onChange={quote => {
								setAttributes({ quote });
							}}
							placeholder={"Enter your quote here..."}
							keepPlaceholderOnFocus={true}
							value={quote}
						/>
						<RichText
							className={`gbb-blockquote-footer ${styles["blockquote-footer"]}`}
							format="string"
							tagName="footer"
							onChange={source => {
								setAttributes({ source });
							}}
							placeholder={'Sebastian Buckpesch in "Let\'s talk Gutenberg"'}
							keepPlaceholderOnFocus={true}
							value={source}
						/>
					</blockquote>
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
	save: props => {
		// Initialize theme
		const {
			attributes: { alignment, margin, quote, source }
		} = props;

		return (
			<div>
				<div
					className={`${styles.blockquote} ${styles[margin]}`}
					style={{ textAlign: alignment }}
				>
					<RichText.Content
						className={`gbb-blockquote ${styles.blockquote} ${styles["mb-0"]}`}
						tagName="p"
						value={quote}
					/>
					<RichText.Content
						className={`gbb-blockquote-footer ${styles["blockquote-footer"]}`}
						format="string"
						tagName="footer"
						value={source}
					/>
				</div>
			</div>
		);
	}
});
