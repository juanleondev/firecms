import React from "react";
import { Box, CardMedia, Link } from "@mui/material";

import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { MediaType } from "../../models";
import { PreviewComponentProps } from "../internal";
import { ImagePreview } from "./ImagePreview";
import { getThumbnailMeasure } from "../util";

/**
 * @category Preview components
 */
export function UrlComponentPreview({
                                        value,
                                        property,
                                        size
                                    }: PreviewComponentProps<string>): React.ReactElement {



    if (!value) return <div/>;
    const url = value;
    if (typeof property.url === "boolean" && property.url) {
        return (
            <Link sx={(theme) => ({
                display: "flex",
                wordBreak: "break-word",
                fontWeight: theme.typography.fontWeightMedium
            })}
                  href={url}
                  onMouseDown={(e: React.MouseEvent) => {
                      e.preventDefault();
                  }}
                  target="_blank">
                <OpenInNewIcon style={{ marginRight: 8 }} fontSize={"small"}/>
                {url}
            </Link>
        );
    }

    const mediaType: MediaType = property.url as MediaType ||
        property.storage?.mediaType;
    if (mediaType === "image") {
        return <ImagePreview key={`image_preview_${url}_${size}`}
                             url={url}
                             size={size}/>;
    } else if (mediaType === "audio") {
        return <audio controls
                      src={url}
                      key={`audio_preview_${url}_${size}`}>
            Your browser does not support the
            <code>audio</code> element.
        </audio>;
    } else if (mediaType === "video") {
        return <CardMedia
            key={`video_preview_${url}_${size}`}
            sx={{ maxWidth: size === "small" ? 300 : 500 }}
            component="video"
            controls
            image={url}
        />;
    } else {
        return (
            <a
                key={`link_preview_${url}_${size}`}
                href={url}
                rel="noopener noreferrer"
                target="_blank"
                onClick={(e) => e.stopPropagation()}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: getThumbnailMeasure(size),
                    height: getThumbnailMeasure(size)
                }}>
                    <DescriptionOutlinedIcon/>
                </Box>
            </a>
        );
    }
}
