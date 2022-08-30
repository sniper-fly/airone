import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import {
  Box,
  Button,
  Container,
  Fab,
  Input,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

import { EditableEntry, EditableEntryAttrs } from "./entryForm/EditableEntry";

import { EntryRetrieveValueAsObject } from "apiclient/autogenerated";
import { EditAttributeValue } from "components/entry/entryForm/EditAttributeValue";
import { DjangoContext } from "utils/DjangoContext";

interface asArrayNamedObjectBoolean {
  [key: string]: EntryRetrieveValueAsObject & {
    boolean: boolean;
  };
}

interface Props {
  entryInfo: EditableEntry;
  setEntryInfo: React.Dispatch<React.SetStateAction<EditableEntry>>;
}

export const EntryForm: FC<Props> = ({ entryInfo, setEntryInfo }) => {
  const djangoContext = DjangoContext.getInstance();

  const changeName = (name: string) => {
    setEntryInfo({
      ...entryInfo,
      name: name,
    });
  };

  const changeAttributes = (attrs: Record<string, EditableEntryAttrs>) => {
    setEntryInfo({
      ...entryInfo,
      attrs: attrs,
    });
  };

  const handleChangeAttribute = (
    attrName: string,
    attrType: number,
    valueInfo: any
  ) => {
    switch (attrType) {
      case djangoContext.attrTypeValue.date:
      case djangoContext.attrTypeValue.string:
      case djangoContext.attrTypeValue.text:
        entryInfo.attrs[attrName].value.asString = valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.boolean:
        entryInfo.attrs[attrName].value.asBoolean = valueInfo.checked;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.object:
        entryInfo.attrs[attrName].value.asObject = valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.group:
        entryInfo.attrs[attrName].value.asGroup = valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.named_object:
        if (valueInfo?.key !== undefined) {
          entryInfo.attrs[attrName].value.asNamedObject = {
            [valueInfo.key]:
              Object.values(
                entryInfo.attrs[attrName].value.asNamedObject ?? {}
              )[0] ?? null,
          };
        } else {
          entryInfo.attrs[attrName].value.asNamedObject = {
            [Object.keys(
              entryInfo.attrs[attrName].value.asNamedObject ?? {}
            )[0] ?? ""]: valueInfo.value,
          };
        }
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.array_string:
        if (entryInfo.attrs[attrName].value?.asArrayString == null) {
          entryInfo.attrs[attrName].value.asArrayString = [];
        }
        entryInfo.attrs[attrName].value.asArrayString[valueInfo.index] =
          valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.array_object:
        entryInfo.attrs[attrName].value.asArrayObject = valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.array_group:
        entryInfo.attrs[attrName].value.asArrayGroup = valueInfo.value;
        changeAttributes({ ...entryInfo.attrs });
        break;

      case djangoContext.attrTypeValue.array_named_object:
        if (
          entryInfo.attrs[attrName].value.asArrayNamedObject.length <=
          valueInfo.index
        ) {
          entryInfo.attrs[attrName].value.asArrayNamedObject.push({ "": null });
          changeAttributes({ ...entryInfo.attrs });
          break;
        }

        if (valueInfo?.key !== undefined) {
          entryInfo.attrs[attrName].value.asArrayNamedObject[valueInfo.index] =
            {
              [valueInfo.key]:
                Object.values(
                  entryInfo.attrs[attrName].value.asArrayNamedObject[
                    valueInfo.index
                  ]
                )[0] ?? null,
            };
        } else {
          entryInfo.attrs[attrName].value.asArrayNamedObject[valueInfo.index] =
            {
              [Object.keys(
                entryInfo.attrs[attrName].value.asArrayNamedObject[
                  valueInfo.index
                ]
              )[0] ?? ""]: {
                ...Object.values(
                  entryInfo.attrs[attrName].value.asArrayNamedObject[
                    valueInfo.index
                  ]
                )[0],
                id: valueInfo.value.id,
                name: valueInfo.value.name,
              },
            };
        }

      case djangoContext.attrTypeValue.array_named_object_boolean:
        (
          entryInfo.attrs[attrName].value
            .asArrayNamedObject as asArrayNamedObjectBoolean[]
        )[valueInfo.index] = {
          [Object.keys(
            entryInfo.attrs[attrName].value.asArrayNamedObject[valueInfo.index]
          )[0] ?? ""]: {
            ...Object.values(
              entryInfo.attrs[attrName].value.asArrayNamedObject[
                valueInfo.index
              ]
            )[0],
            boolean: valueInfo.checked,
          },
        };

        changeAttributes({ ...entryInfo.attrs });
        break;
    }
  };

  const handleClickAddListItem = (
    attrName: string,
    attrType: number,
    index: number
  ) => {
    switch (attrType) {
      case djangoContext.attrTypeValue.array_string:
        entryInfo.attrs[attrName].value.asArrayString.splice(index + 1, 0, "");
        break;
      case djangoContext.attrTypeValue.array_named_object:
        entryInfo.attrs[attrName].value.asArrayNamedObject.splice(
          index + 1,
          0,
          { "": null }
        );
        break;
      default:
        throw new Error(`${attrType} is not array-like type`);
    }
    changeAttributes({ ...entryInfo.attrs });
  };

  const handleClickDeleteListItem = (
    attrName: string,
    attrType: number,
    index?: number
  ) => {
    if (index !== undefined) {
      switch (attrType) {
        case djangoContext.attrTypeValue.array_string:
          entryInfo.attrs[attrName].value.asArrayString.splice(index, 1);
          break;
        case djangoContext.attrTypeValue.array_named_object:
          entryInfo.attrs[attrName].value.asArrayNamedObject.splice(index, 1);
          break;
        default:
          throw new Error(`${attrType} is not array-like type`);
      }
      changeAttributes({ ...entryInfo.attrs });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Container sx={{ mb: "100px" }}>
      <Box my="40px" display="flex" flexWrap="wrap">
        <Box m="8px">
          <Button
            href="#name"
            sx={{
              border: "0.5px solid gray",
              borderRadius: 16,
              textTransform: "none",
            }}
          >
            <Typography sx={{ color: "black" }}>エントリ名</Typography>
            <ArrowDropDownIcon sx={{ color: "black", padding: "0 4px" }} />
          </Button>
        </Box>
        {Object.keys(entryInfo.attrs).map((attributeName) => (
          <Box key={attributeName} m="8px">
            <Button
              href={`#attrs-${attributeName}`}
              sx={{
                border: "0.5px solid gray",
                borderRadius: 16,
                textTransform: "none",
              }}
            >
              <Typography sx={{ color: "black", padding: "0 4px" }}>
                {attributeName}
              </Typography>
              <ArrowDropDownIcon sx={{ color: "black" }} />
            </Button>
          </Box>
        ))}
      </Box>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#455A64" }}>
            <TableCell sx={{ color: "#FFFFFF", width: "384px" }}>
              項目
            </TableCell>
            <TableCell sx={{ color: "#FFFFFF", width: "768px" }}>
              内容
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Box display="flex" alignItems="center">
                {/* an anchor link adjusted fixed headers etc. */}
                <Link
                  id="name"
                  sx={{ marginTop: "-500px", paddingTop: "500px" }}
                />
                <Typography flexGrow={1}>エントリ名</Typography>
                <Typography
                  sx={{
                    border: "0.5px solid gray",
                    borderRadius: 16,
                    color: "white",
                    backgroundColor: "gray",
                    padding: "0 8px",
                  }}
                >
                  必須
                </Typography>
              </Box>
            </TableCell>
            <TableCell>
              <Input
                type="text"
                defaultValue={entryInfo.name}
                onChange={(e) => changeName(e.target.value)}
                fullWidth
                error={entryInfo.name === ""}
              />
            </TableCell>
          </TableRow>
          {Object.keys(entryInfo.attrs).map((attributeName, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  {/* an anchor link adjusted fixed headers etc. */}
                  <Link
                    id={`attrs-${attributeName}`}
                    sx={{ marginTop: "-500px", paddingTop: "500px" }}
                  />
                  <Typography flexGrow={1}>{attributeName}</Typography>
                  {entryInfo.attrs[attributeName]?.isMandatory && (
                    <Typography
                      sx={{
                        border: "0.5px solid gray",
                        borderRadius: 16,
                        color: "white",
                        backgroundColor: "gray",
                        padding: "0 8px",
                      }}
                    >
                      必須
                    </Typography>
                  )}
                </Box>
              </TableCell>
              <TableCell>
                <EditAttributeValue
                  attrName={attributeName}
                  attrInfo={entryInfo.attrs[attributeName]}
                  handleChangeAttribute={handleChangeAttribute}
                  handleClickDeleteListItem={handleClickDeleteListItem}
                  handleClickAddListItem={handleClickAddListItem}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box display="flex" justifyContent="flex-end" my="12px">
        <Fab color="primary" onClick={scrollToTop}>
          <KeyboardArrowUpRoundedIcon />
        </Fab>
      </Box>
    </Container>
  );
};
