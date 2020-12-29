import * as React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flexCenter: {
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
        },
        smallMargin: {
            margin: theme.spacing(1)
        },
        arrayRoot: {
            display: "flex",
            flexWrap: "wrap"
        },
        arrayItem: {
            m: 0.2,
        },
        arrayItemBig: {
            m: theme.spacing(1),
        },
        tableNoBottomBorder: {
            "&:last-child th, &:last-child td": {
                borderBottom: 0
            }
        },
        imageWrap:{
            position: "relative",
            maxWidth: "100%",
            maxHeight: "100%"
        }
    })
);
