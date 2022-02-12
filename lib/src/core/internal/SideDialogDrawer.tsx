import React from "react";
import { styled } from '@mui/material/styles';
import clsx from "clsx";
import { Backdrop, Modal, Paper, Theme } from "@mui/material";
import { SlideFade } from "./SlideFadeTransition";

const PREFIX = 'SideDialogDrawer';

const classes = {
    root: `${PREFIX}-root`,
    paper: `${PREFIX}-paper`,
    paperAnchorRight: `${PREFIX}-paperAnchorRight`,
    modal: `${PREFIX}-modal`
};

export interface EntityDrawerProps {

    /**
     * The contents of the drawer.
     */
    children: React.ReactNode,

    /**
     * Callback fired when the component requests to be closed.
     *
     * @param {object} event The event source of the callback.
     */
    onClose?: () => void,

    /**
     * If `true`, the drawer is open.
     */
    open: boolean,

    /**
     * The offset position of this view determines if it needs to be translated
     * when nested
     */
    offsetPosition: number;

    onExitAnimation?: () => void;

}

export interface StyleProps {
    offsetPosition: number;
}


const defaultTransitionDuration = {
    enter: 225,
    exit: 175
};

/**
 * The props of the [Modal](/api/modal/) component are available
 * when `variant="temporary"` is set.
 */
export const SideDialogDrawer = React.forwardRef<HTMLDivElement, EntityDrawerProps>(function EntityDrawer(props, ref) {

    const {
        children,
        onClose,
        open,
        offsetPosition,
        onExitAnimation
    } = props;



    const drawer = (
        <Paper
            elevation={1}
            square
            style={{
                transition: "transform 1000ms cubic-bezier(0.33, 1, 0.68, 1)",
                transform: `translateX(-${(offsetPosition) * 240}px)`
            }}
            sx={{
                height: "100%",
                WebkitOverflowScrolling: "touch", // Add iOS momentum scrolling.
                position: "fixed",
                outline: 0,
                left: "auto",
                right: 0
            }}
        >
            {children}
        </Paper>
    );


    const slidingDrawer = (
        <SlideFade
            in={open}
            timeout={defaultTransitionDuration}
            onExitAnimation={onExitAnimation}
        >
            {drawer}
        </SlideFade>
    );

    return (
        <Modal
            BackdropProps={{
                transitionDuration: defaultTransitionDuration
            }}
            BackdropComponent={Backdrop}
            className={clsx(classes.root, classes.modal)}
            open={open}
            onClose={onClose}
            ref={ref}
            keepMounted={true}
            // disableEnforceFocus related to https://github.com/Camberi/firecms/issues/50
            disableEnforceFocus={true}
        >
            {slidingDrawer}
        </Modal>
    );
});


