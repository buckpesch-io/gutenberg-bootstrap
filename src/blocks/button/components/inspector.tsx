/**
 * Inspector Controls
 */
import * as React from 'react';
import { CirclePicker } from 'react-color';
import {GutenbergBlockProps} from "../../../@types/global";

// Setup the block
const {__} = wp.i18n;
const {Component} = wp.element;

// Import block components
const {
    InspectorControls,
    PanelColorSettings,
} = wp.editor;

// Import Inspector components
const {
    Button,
    ButtonGroup,
    PanelBody,
    PanelRow,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends React.Component<GutenbergBlockProps, {}> {


    render() {

        // Setup the attributes
        const {attributes: {isBlockWidth, isOutline, margin, size, theme}, setAttributes} = this.props;
        const availableColors = [
            {'name': 'primary', color: '#007bff'},
            {'name': 'secondary', color: '#6c757d'},
            {'name': 'success', color: '#28a745'},
            {'name': 'info', color: '#17a2b8'},
            {'name': 'warning', color: '#ffc107'},
            {'name': 'danger', color: '#dc3545'},
            {'name': 'light', color: '#f8f9fa'},
            {'name': 'dark', color: '#343a40'},
        ];
        const selectedThemeColor = availableColors.find(c => c.name === theme) ||  {color: '#007bff', name: 'primary'};

        function setMargin(event) {
            const selected = event.target.querySelector('option:checked');
            setAttributes({margin: selected.value});
            event.preventDefault();
        }

        function setThemeColor(color: {
            hex: string
            hsl: any
            hsv: any
            oldHue: any
            rgb: any
            source: "hex" | "hsl" | "hsv" | "rbg"
        }) {
            const selectedTheme = availableColors.find(c => c.color === color.hex) || {color: '#007bff', name: 'primary'};
            setAttributes({theme: selectedTheme.name});
        }


        return (
            <InspectorControls key="inspector">
                <PanelBody title={__('Select options')}>
                    <PanelRow>
                        <label>{__('Margin')}</label>
                        <form onSubmit={setMargin}>
                            <select value={margin} onChange={setMargin}>
                                <option value="my-0">No margin</option>
                                <option value="my-1">my-1 - Tiny margin</option>
                                <option value="my-2">my-2 - Small margin</option>
                                <option value="my-3">my-3 - Middle margin</option>
                                <option value="my-4">my-4 - Large margin</option>
                                <option value="my-5">my-5 - Hugh margin</option>
                            </select>
                        </form>
                    </PanelRow>
                    <PanelRow>
                        <label>{__('Color')}</label>
                        <CirclePicker
                            color={ selectedThemeColor.color }
                            colors={ availableColors.map(color => color.color) }
                            onChangeComplete={ setThemeColor }
                        />
                    </PanelRow>
                    <PanelRow>
                        <label>{__('Style')}</label>
                        <ButtonGroup>
                            <Button isLarge isPrimary={isOutline} onClick={() => {
                                setAttributes({isOutline: !isOutline})
                            }}>Outline</Button>
                            <Button isLarge isPrimary={isBlockWidth} onClick={() => {
                                setAttributes({isBlockWidth: !isBlockWidth})
                            }}>Full-Width</Button>
                        </ButtonGroup>
                    </PanelRow>
                    <PanelRow>
                        <label>{__('Size')}</label>
                        <ButtonGroup>
                            <Button isLarge isPrimary={size === 'sm'} onClick={() => {
                                setAttributes({size: 'sm'})
                            }}>Small</Button>
                            <Button isLarge isPrimary={size === ''} onClick={() => {
                                setAttributes({size: ''})
                            }}>Default</Button>
                            <Button isLarge isPrimary={size === 'lg'} onClick={() => {
                                setAttributes({size: 'lg'})
                            }}>Large</Button>
                        </ButtonGroup>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
        );
    }
}