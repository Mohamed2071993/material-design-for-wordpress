/**
 * External dependencies
 */
import classNames from 'classnames';
import { debounce } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { LIST_STYLES, ICON_POSITIONS, ICON_SIZES } from './options';
import ButtonGroup from '../../components/button-group';
import IconPicker from '../../components/icon-picker';
import ImageRadioControl from '../../components/image-radio-control';
import ToolbarUrlInputPopover from '../../components/toolbar-url-input-popover';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import ListItem from './components/list-item';
import { useEffect } from 'react';

/**
 * Material list edit component.
 */
const ListEdit = ( {
	attributes: { style, iconPosition, iconSize, items },
	className,
	setAttributes,
} ) => {
	useEffect( () => {
		if ( 0 === items.length ) {
			setAttributes( {
				items: [
					{
						primaryText: '',
						secondaryText: '',
						icon: 'favorite',
					},
				],
			} );
		}
	}, [ items, setAttributes ] );

	const setter = genericAttributesSetter( setAttributes );
	const isSecondaryEnabled = style === 'two-line';
	const [ selected, setSelected ] = useState( {
		index: 0,
		isSecondary: false,
		start: 0,
	} );

	const addItem = ( index, text = '' ) => {
		const newItems = [ ...items ];
		const item = {
			primaryText: text,
			secondaryText: '',
			icon: 'favorite',
		};

		if ( 'number' === typeof index ) {
			newItems.splice( index, 0, item );
		} else {
			newItems.push( item );
		}

		setAttributes( { items: newItems } );
	};

	const setItem = ( index, newItem ) => {
		const newItems = [ ...items ];
		const item = newItems[ index ] || {};
		newItems[ index ] = { ...item, ...newItem };

		setAttributes( { items: newItems } );
		items = newItems;
	};

	const onPrimaryTextChange = ( index, text ) => {
		if ( ! items[ index ] ) {
			return;
		}

		items[ index ].primaryText = text;
		setAttributes( { items } );
	};

	const onSecondaryTextChange = ( index, text ) => {
		if ( ! items[ index ] ) {
			return;
		}

		items[ index ].secondaryText = text;
		setAttributes( { items } );
	};

	const deleteItem = ( index, text, secondaryText = '' ) => {
		if ( index === 0 ) {
			return;
		}

		const newItems = [ ...items ];
		newItems.splice( index, 1 );
		const prevItem = newItems[ index - 1 ];
		let start = 0;

		if ( isSecondaryEnabled ) {
			start = prevItem.secondaryText.length;
			prevItem.secondaryText = `${ prevItem.secondaryText }${ text } ${ secondaryText }`;
		} else {
			start = prevItem.primaryText.length;
			prevItem.primaryText = `${ prevItem.primaryText }${ text } ${ secondaryText }`;
		}

		setAttributes( { items: newItems } );
		setSelected( { index: index - 1, start, isSecondary: isSecondaryEnabled } );
	};

	const onEnter = ( index, isSecondary = false, text = '' ) => {
		if ( ! isSecondary ) {
			addItem( index, text );
		}

		setSelected( { index, isSecondary } );
	};

	const onIconChange = debounce( icon => {
		const newItems = [ ...items ];
		newItems[ selected.index ].icon = icon.name;
		setAttributes( { items: newItems } );
	}, 300 );

	const onURLChange = debounce( url => {
		const newItems = [ ...items ];
		newItems[ selected.index ].url = url;
		setAttributes( { items: newItems } );
	}, 300 );

	const onNewTabChange = debounce( newTab => {
		const newItems = [ ...items ];
		newItems[ selected.index ].target = newTab ? '_blank' : '';
		setAttributes( { items: newItems } );
	}, 300 );

	const getSelectedItem = () => {
		return items[ selected.index ] || {};
	};

	const setPrimaryFocus = index => {
		setSelected( { index, isSecondary: false } );
	};

	return (
		<>
			<ul
				className={ classNames(
					'mdc-list',
					className ? className.replace( 'mdc-list--two-line', '' ) : '',
					{
						'mdc-list--two-line': isSecondaryEnabled,
						'mdc-list--avatar-list': 'large' === iconSize,
					}
				) }
			>
				{ items.map( ( item, i ) => (
					<ListItem
						key={ i }
						index={ i }
						{ ...item }
						{ ...{
							iconPosition,
							isSecondaryEnabled,
						} }
						onEnter={ onEnter }
						onFocus={ ( index, isSecondary = false ) =>
							setSelected( { index, isSecondary } )
						}
						isSelected={ i === selected.index }
						isSecondarySelected={ i === selected.index && selected.isSecondary }
						selectionStart={ selected.start }
						setItem={ setItem }
						deleteItem={ deleteItem }
						onPrimaryTextChange={ onPrimaryTextChange }
						onSecondaryTextChange={ onSecondaryTextChange }
						setPrimaryFocus={ setPrimaryFocus }
					/>
				) ) }
			</ul>

			{ selected && (
				<ToolbarUrlInputPopover
					url={ getSelectedItem().url }
					setURL={ onURLChange }
					isSelected={ true }
					opensInNewTab={ getSelectedItem().target === '_blank' }
					onChangeNewTab={ onNewTabChange }
				/>
			) }

			<InspectorControls>
				<PanelBody
					title={ __( 'Block Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ LIST_STYLES }
						onChange={ setter( 'style' ) }
					/>
					<ButtonGroup
						label={ __( 'Icon Position' ) }
						buttons={ ICON_POSITIONS }
						current={ iconPosition }
						onClick={ setter( 'iconPosition' ) }
					/>
					{ 'leading' === iconPosition && (
						<ButtonGroup
							label={ __( 'Icon Size' ) }
							buttons={ ICON_SIZES }
							current={ iconSize }
							onClick={ setter( 'iconSize' ) }
						/>
					) }
				</PanelBody>

				{ selected && 'none' !== iconPosition && (
					<PanelBody
						title={ __( 'List item Settings', 'material-theme-builder' ) }
						initialOpen={ true }
					>
						<IconPicker
							currentIcon={ {
								name: getSelectedItem().icon,
							} }
							onChange={ onIconChange }
						/>
					</PanelBody>
				) }
			</InspectorControls>
		</>
	);
};

export default ListEdit;
