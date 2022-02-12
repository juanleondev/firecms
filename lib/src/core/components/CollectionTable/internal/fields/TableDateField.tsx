import React, { useCallback } from "react";
import { styled } from '@mui/material/styles';
import {
    Box,
    TextField as MuiTextField,
    Theme,
    Typography
} from "@mui/material";
import { TimestampProperty } from "../../../../../models";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { EmptyValue, TimestampPreview } from "../../../../../preview";


const PREFIX = 'TableDateField';

const classes = {
    hidden: `${PREFIX}-hidden`
};

const StyledBox = styled(Box)((
    {
        theme
    }
) => ({
    [`& .${classes.hidden}`]: {
        display: "none"
    }
}));


export function TableDateField(props: {
    name: string;
    error: Error | undefined;
    internalValue: Date | undefined | null;
    updateValue: (newValue: (Date | null)) => void;
    focused: boolean;
    disabled: boolean;
    property: TimestampProperty;
    onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    setPreventOutsideClick: (value: any) => void;
}) {

    const {
        disabled,
        error,
        internalValue,
        setPreventOutsideClick,
        updateValue,
        property
    } = props;

    const handleOpen = useCallback(() => {
        setPreventOutsideClick(true);
    }, []);

    const handleClose = useCallback(() => {
        setPreventOutsideClick(false);
    }, []);


    return (
        <StyledBox display={"flex"} alignItems={"center"}>

            <Box flexGrow={1}>
                {internalValue &&
                <Typography variant={"body2"}>
                    <TimestampPreview value={internalValue}
                                      property={property}
                                      size={"regular"}/>
                </Typography>}
                {!internalValue && <EmptyValue/>}
            </Box>

            <Box width={40}>
                <DateTimePicker
                    clearable
                    disabled={disabled}
                    renderInput={(inputProps) => (
                        <MuiTextField
                            {...inputProps}
                            sx={{
                                height: "100%"
                            }}
                            variant={"standard"}
                            error={Boolean(error)}
                            InputProps={{
                                ...inputProps.InputProps,
                                classes: {
                                    input: classes.hidden
                                },
                                disableUnderline: true
                            }}
                        />
                    )}
                    InputAdornmentProps={{
                        style: {
                            fontSize: "small",
                            height: 26
                        }
                    }}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    value={internalValue ?? null}
                    onChange={(dateValue: Date | null) => {
                        updateValue(dateValue);
                    }}
                />
            </Box>
        </StyledBox>
    );
}
