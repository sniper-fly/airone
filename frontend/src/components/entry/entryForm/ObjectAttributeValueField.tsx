import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  Box,
  Checkbox,
  IconButton,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import { UseFormSetValue } from "react-hook-form/dist/types/form";

import { GetEntryAttrReferral } from "../../../apiclient/autogenerated";

import { Schema } from "./EntryFormSchema";
import { ReferralsAutocomplete } from "./ReferralsAutocomplete";

interface CommonProps {
  attrName: string;
  schemaId: number;
  index?: number;
  control: Control<Schema>;
  setValue: UseFormSetValue<Schema>;
  handleClickDeleteListItem?: (index: number) => void;
  handleClickAddListItem?: (index: number) => void;
}

export const ObjectAttributeValueField: FC<
  CommonProps & {
    objectName?: string;
    multiple?: boolean;
    disabled?: boolean;
    disabledToAppend?: boolean;
  }
> = ({
  multiple,
  attrName,
  schemaId,
  index,
  disabled,
  disabledToAppend,
  control,
  setValue,
  handleClickAddListItem,
  handleClickDeleteListItem,
  objectName,
}) => {
  // TODO give it via props explicitly???
  const fieldSuffix = (() => {
    if (objectName != null && index != null) {
      return `asArrayNamedObject.${index}.${objectName}`;
    }
    if (objectName != null) {
      return `asNamedObject.${objectName}`;
    }
    if (multiple === true) {
      return "asArrayObject";
    }
    return "asObject";
  })();

  // TODO separate logics based on the types
  const handleChange = (
    value: GetEntryAttrReferral | GetEntryAttrReferral[] | null
  ) => {
    const newValue: any = (() => {
      if (value == null) {
        return null;
      }
      if (multiple === true) {
        const _value = value as GetEntryAttrReferral[];
        return _value.map((v) => ({
          ...v,
          _boolean: false,
        }));
      } else {
        const _value = value as GetEntryAttrReferral;
        return {
          ..._value,
          _boolean: false,
        };
      }
    })();

    setValue(`attrs.${attrName}.value.${fieldSuffix}`, newValue as never, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <Box>
      <Typography variant="caption" color="rgba(0, 0, 0, 0.6)">
        エントリを選択
      </Typography>
      <Box display="flex" alignItems="center">
        <Controller
          name={`attrs.${attrName}.value.${fieldSuffix}`}
          control={control}
          render={({ field, fieldState: { error } }) => (
            <ReferralsAutocomplete
              schemaId={schemaId}
              value={field.value ?? null}
              handleChange={handleChange}
              multiple={multiple}
              disabled={disabled}
              error={error}
            />
          )}
        />
        {index !== undefined && (
          <>
            {handleClickDeleteListItem != null && (
              <IconButton
                sx={{ mx: "20px" }}
                onClick={() => handleClickDeleteListItem(index)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            )}
            {handleClickAddListItem != null && (
              <IconButton
                disabled={disabledToAppend}
                onClick={() => handleClickAddListItem(index)}
              >
                <AddIcon />
              </IconButton>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export const NamedObjectAttributeValueField: FC<
  CommonProps & {
    withBoolean?: boolean;
  }
> = ({
  attrName,
  schemaId,
  index,
  control,
  setValue,
  handleClickAddListItem,
  handleClickDeleteListItem,
  withBoolean,
}) => {
  const value = useWatch({
    control,
    name:
      index != null
        ? `attrs.${attrName}.value.asArrayNamedObject.${index}`
        : `attrs.${attrName}.value.asNamedObject`,
  });
  const objectName = Object.keys(value ?? {})[0] ?? "";

  const handleChangeObjectName = (newName: string) => {
    setValue(
      index != null
        ? `attrs.${attrName}.value.asArrayNamedObject.${index}`
        : `attrs.${attrName}.value.asNamedObject`,
      {
        [newName]: value?.[objectName] ?? null,
      },
      {
        shouldDirty: true,
        shouldValidate: true,
      }
    );
  };

  const disabledToAppend = index === 0 && objectName === "";

  return (
    <Box display="flex" alignItems="flex-end">
      <Box display="flex" flexDirection="column">
        <Typography variant="caption" color="rgba(0, 0, 0, 0.6)">
          name
        </Typography>
        <Box width="280px" mr="32px">
          <TextField
            variant="standard"
            value={objectName}
            error={objectName === ""}
            helperText={objectName === "" ? "name は必須です" : undefined}
            onChange={(e) => handleChangeObjectName(e.target.value)}
          />
        </Box>
      </Box>
      {withBoolean === true && (
        <Box display="flex" flexDirection="column" width="60px" mr="16px">
          <Typography variant="caption" color="rgba(0, 0, 0, 0.6)">
            使用不可
          </Typography>
          <Controller
            name={`attrs.${attrName}.value.asArrayNamedObject.${index}.${objectName}._boolean`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Checkbox
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          />
        </Box>
      )}
      <ObjectAttributeValueField
        attrName={attrName}
        schemaId={schemaId}
        control={control}
        setValue={setValue}
        objectName={objectName}
        index={index}
        handleClickAddListItem={handleClickAddListItem}
        handleClickDeleteListItem={handleClickDeleteListItem}
        disabled={objectName === ""}
        disabledToAppend={disabledToAppend}
      />
    </Box>
  );
};

export const ArrayNamedObjectAttributeValueField: FC<
  CommonProps & {
    disabled?: boolean;
    withBoolean?: boolean;
  }
> = ({ attrName, schemaId, control, setValue, withBoolean }) => {
  const { fields, insert, remove } = useFieldArray({
    control,
    name: `attrs.${attrName}.value.asArrayNamedObject`,
  });

  const handleClickAddListItem = (index: number) => {
    insert(index + 1, { "": null });
  };

  const handleClickDeleteListItem = (index: number) => {
    remove(index);
    fields.length === 1 && handleClickAddListItem(0);
  };

  return (
    <Box>
      <List>
        {fields.map((field, index) => (
          <ListItem key={field.id}>
            <NamedObjectAttributeValueField
              control={control}
              setValue={setValue}
              attrName={attrName}
              schemaId={schemaId}
              index={index}
              handleClickDeleteListItem={handleClickDeleteListItem}
              handleClickAddListItem={handleClickAddListItem}
              withBoolean={withBoolean}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
