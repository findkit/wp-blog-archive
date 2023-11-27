/* eslint-disable */
// eslint does not undestand blocks

import * as React from "react";
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { TextControl, Panel, PanelBody, PanelRow } from "@wordpress/components";
import { __experimentalHeading as Heading } from "@wordpress/components";
import metadata from "./block.json";
import "./editor.css";
import ServerSideRender from "@wordpress/server-side-render";

registerBlockType(metadata.name, {
    attributes: metadata.attributes,
    title: metadata.title,
    category: "widgets",
    edit(props) {
        const blockBlocks = useBlockProps();

        return (
            <div {...blockBlocks}>
                <InspectorControls>
                    <Panel>
                        <PanelBody
                            title="Settings"
                            icon="more"
                            initialOpen={true}
                        >
                            <PanelRow>
                                <TextControl
                                    value={props.attributes.publicToken}
                                    onChange={value => {
                                        props.setAttributes({
                                            publicToken: value,
                                        });
                                    }}
                                    label="Findkit Public Token"
                                    placeholer="The token here..."
                                    help="Get public token from the Findkit Hub"
                                />
                            </PanelRow>
                            <PanelRow>
                                <TextControl
                                    value={props.attributes.instanceId}
                                    onChange={value => {
                                        props.setAttributes({
                                            instanceId: value,
                                        });
                                    }}
                                    label="FindkitUI Instance ID"
                                    placeholer="The id here..."
                                    help={
                                        <>
                                            Must be unique for each block on a
                                            page. See the{" "}
                                            <a href="https://findk.it/instanceid">
                                                docs
                                            </a>
                                            .
                                        </>
                                    }
                                />
                            </PanelRow>
                        </PanelBody>
                    </Panel>
                </InspectorControls>
                <ServerSideRender
                    block={metadata.name}
                    attributes={props.attributes}
                />
            </div>
        );
    },
    save() {
        return null;
    },
});
