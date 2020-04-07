/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

/**
 * Card Primary Component.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.displayTitle - Whether or not to display the title.
 * @param {string} props.title - Title.
 * @param {boolean} props.displaySecondaryText - Whether or not to display the secondary text.
 * @param {string} props.secondaryText - Secondary text.
 * @param {boolean} props.cardIndex - Card Index.
 * @param {Function} props.setter - Block attribute setter.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const CardPrimary = ( {
	displayTitle,
	title,
	displaySecondaryText,
	secondaryText,
	cardIndex,
	setter,
} ) => (
	<div className="mtb-card__primary">
		{ displayTitle && (
			<RichText
				tagName="h2"
				className="mtb-card__title mdc-typography mdc-typography--headline6"
				value={ title }
				onChange={ value => setter( 'title', value, cardIndex ) }
				placeholder={ __( 'Title goes here', 'material-theme-builder' ) }
				place
			/>
		) }
		{ displaySecondaryText && (
			<RichText
				tagName="h3"
				className="mtb-card__subtitle mdc-typography mdc-typography--subtitle2"
				value={ secondaryText }
				onChange={ value => setter( 'secondaryText', value, cardIndex ) }
				placeholder={ __( 'Secondary text', 'material-theme-builder' ) }
			/>
		) }
	</div>
);

export default CardPrimary;
