/**
 * External dependencies
 */
import { some, find, findIndex } from 'lodash';
import classNames from 'classnames';

/**
 * WordPress dependencies
 */
import { InspectorControls, MediaPlaceholder } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	withNotices,
} from '@wordpress/components';
import { useCallback, useEffect, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import BlockIcon from './components/block-icon';
import { GridIcon, MasonryIcon } from '../recent-posts/components/style-icons';
import ImageRadioControl from '../../components/image-radio-control';
import genericAttributesSetter from '../../utils/generic-attributes-setter';
import Gallery from './components/gallery';
import './style.css';

const STYLES = [
	{
		label: __( 'Masonry', 'material-theme-builder' ),
		value: 'masonry',
		src: MasonryIcon,
	},
	{
		label: __( 'Grid', 'material-theme-builder' ),
		value: 'grid',
		src: GridIcon,
	},
];

const GUTTER_DEVICES = [
	{
		name: 'desktop',
		icon: 'computer',
	},
	{
		name: 'mobile',
		icon: 'smartphone',
	},
	{
		name: 'tablet',
		icon: 'tablet',
	},
];

/**
 * Image List Edit component.
 *
 * @param {Object} props - Component props.
 * @param {Array} props.attributes.images - List of images in the gallery.
 * @param {string} props.attributes.style - Layout style of the gallery.
 * @param {number} props.attributes.columns - Columns in the gallery.
 * @param {Object} props.attributes.gutter - Column gutter for various devices.
 * @param {number} props.attributes.cornerRadius - Corner radius.
 * @param {boolean} props.attributes.displayCaptions - Display/hide captions.
 * @param {boolean} props.attributes.textProtection - Display/hide captions with text protection.
 * @param {string} props.attributes.linkTo - Image should link to.
 * @param {string} props.className - Class name for the block.
 * @param {boolean} props.isSelected - Determine if the block is selected.
 * @param {*} props.noticeUI - Null or NoticeUI component.
 * @param {Object} props.noticeOperations - Object with methods to show/remove notices.
 * @param {Function} props.onFocus - Callback when focused.
 * @param {Function} props.setAttributes - Callback to update block attributes.
 *
 * @return {Function} A functional component.
 */
const ImageListEdit = ( {
	attributes: {
		images,
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
	},
	className,
	isSelected,
	noticeUI,
	noticeOperations,
	onFocus,
	setAttributes,
} ) => {
	/**
	 * Get captions from media library using REST API.
	 */
	const useCaptions = useSelect(
		select => {
			return select( 'core' ).getEntityRecords( 'root', 'media', {
				include: images.map( image => image.id ),
			} );
		},
		[ images ]
	);

	const [ selectedImage, setSelectedImage ] = useState( 0 );
	const [ gutterDevice, setGutterDevice ] = useState( 'desktop' );

	// If `isSelected` is updated unselect images in the gallery.
	useEffect( () => {
		setSelectedImage( 0 );
	}, [ isSelected ] );

	const hasImages = !! images.length;
	const hasImagesWithId = hasImages && some( images, ( { id } ) => id );

	const setter = useCallback( genericAttributesSetter( setAttributes ) );

	// Set the gutter for selected device.
	const setGutter = useCallback(
		newGutter => {
			setAttributes( {
				gutter: { ...gutter, ...{ [ gutterDevice ]: newGutter } },
			} );
		},
		[ gutter, gutterDevice, setAttributes ]
	);

	// Get the caption for an image.
	const getCaption = id => {
		const item = find( useCaptions, image => Number( id ) === image.id );

		if ( item && item.hasOwnProperty( 'caption' ) ) {
			return item.caption.raw;
		}

		return '';
	};

	// Pick required image props.
	const selectImages = newImages => {
		setAttributes( {
			images: newImages.map( image => ( {
				id: image.id,
				url: image.sizes.full.url,
				alt: image.alt,
				link: image.link,
				caption: image.caption,
				selected: false,
			} ) ),
		} );
	};

	// Remove an image from the gallery.
	const removeImage = useCallback(
		id => {
			setAttributes( { images: images.filter( image => id !== image.id ) } );
		},
		[ images, setAttributes ]
	);

	// Move an image in the gallery.
	const moveImage = useCallback(
		( id, dir = 'left' ) => {
			const newImages = [ ...images ],
				index = findIndex( newImages, image => id === image.id ),
				moveTo = 'left' === dir ? index - 1 : index + 1;

			if ( -1 !== index && -1 < moveTo ) {
				const image = newImages.splice( index, 1 );
				newImages.splice( moveTo, 0, image.pop() );

				setAttributes( { images: newImages } );
			}
		},
		[ images, setAttributes ]
	);

	/**
	 * Update image link.
	 *
	 * @param {number} id Image attachment ID.
	 * @param {string} link Link the image should point to.
	 */
	const updateImageLink = ( id, link ) => {
		const newImages = [ ...images ],
			index = findIndex( newImages, image => id === image.id );

		if ( -1 !== index ) {
			newImages[ index ].link = link;
			setAttributes( { images: newImages } );
		}
	};

	/**
	 * Handle upload errors.
	 *
	 * @param {string} message Error message.
	 */
	const onUploadError = message => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const galleryProps = {
		images: images.map( image => {
			image.caption = getCaption( image.id ) || image.caption;
			return image;
		} ),
		style,
		columns,
		gutter,
		cornerRadius,
		displayCaptions,
		textProtection,
		linkTo,
		selectedImage,
		onRemove: removeImage,
		onMove: moveImage,
		onSelect: setSelectedImage,
		onLinkChange: updateImageLink,
	};

	return (
		<>
			{ 'function' === typeof noticeUI ? noticeUI() : noticeUI }

			{ hasImages && <Gallery { ...galleryProps } /> }

			<MediaPlaceholder
				addToGallery={ hasImagesWithId }
				isAppender={ hasImages }
				className={ className }
				disableMediaButtons={ hasImages && ! isSelected }
				icon={ ! hasImages && <BlockIcon /> }
				labels={ {
					title: ! __( 'Image List', 'material-theme-builder' ),
					instructions: __(
						'Drag images, upload new ones or select files from your library.',
						'material-theme-builder'
					),
				} }
				onSelect={ selectImages }
				accept="image/*"
				allowedTypes={ [ 'image' ] }
				multiple
				value={ hasImagesWithId ? images : undefined }
				onError={ onUploadError }
				notices={ hasImages ? undefined : noticeUI }
				onFocus={ onFocus }
			/>

			<InspectorControls>
				<PanelBody
					title={ __( 'Styles', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<ImageRadioControl
						selected={ style }
						options={ STYLES }
						onChange={ setter( 'style' ) }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<RangeControl
						label={ __( 'Columns', 'material-theme-builder' ) }
						value={ columns }
						onChange={ setter( 'columns' ) }
						min={ 2 }
						max={ 5 }
					/>
					<RangeControl
						label={
							<>
								{ __( 'Gutter', 'material-theme-builder' ) }
								<div className="components-base-control__label-actions">
									{ GUTTER_DEVICES.map( device => (
										<button
											key={ device.name }
											className={ classNames( '', {
												'is-selected': device.name === gutterDevice,
											} ) }
											onClick={ () => setGutterDevice( device.name ) }
										>
											<i className="material-icons">{ device.icon }</i>
										</button>
									) ) }
								</div>
							</>
						}
						value={ gutter[ gutterDevice ] || 0 }
						onChange={ value => setGutter( value ) }
						min={ 0 }
						max={ 24 }
					/>
					<RangeControl
						label={ __( 'Rounded Corners', 'material-theme-builder' ) }
						value={ cornerRadius }
						onChange={ setter( 'cornerRadius' ) }
						min={ 0 }
						max={ 16 }
					/>
					<ToggleControl
						label={ __( 'Captions', 'material-theme-builder' ) }
						checked={ displayCaptions }
						onChange={ setter( 'displayCaptions' ) }
					/>
					<ToggleControl
						label={ __( 'Text Protection', 'material-theme-builder' ) }
						checked={ textProtection }
						onChange={ setter( 'textProtection' ) }
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Link Settings', 'material-theme-builder' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Link to', 'material-theme-builder' ) }
						value={ linkTo }
						options={ [
							{
								label: __( 'Media File', 'material-theme-builder' ),
								value: 'media',
							},
							{
								label: __( 'Attachment Page', 'material-theme-builder' ),
								value: 'attachment',
							},
							{
								label: __( 'Custom URL', 'material-theme-builder' ),
								value: 'custom',
							},
						] }
						onChange={ setter( 'linkTo' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default withNotices( ImageListEdit );
