import { Box } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { Entity, EntityWithAttr } from "apiclient/autogenerated";
import { AttributesFields } from "./entityForm/AttributesFields";
import { BasicFields } from "./entityForm/BasicFields";
import { entitiesPath } from "Routes";

import { entitiesPath } from "Routes";
import { createEntity, updateEntity } from "utils/AironeAPIClient";
import { DjangoContext } from "utils/DjangoContext";

interface Props {
  entity?: EntityWithAttr;
  entityInfo: {
    name: string;
    note: string;
    isTopLevel: boolean;
    attributes: { [key: string]: any }[];
  };
  setEntityInfo: (entityInfo: {
    name: string;
    note: string;
    isTopLevel: boolean;
    attributes: { [key: string]: any }[];
  }) => void;
  referralEntities?: Entity[];
  setSubmittable: (isSubmittable: boolean) => void;
}

export const EntityForm: FC<Props> = ({
  entity,
  entityInfo,
  setEntityInfo,
  referralEntities,
  setSubmittable,
}) => {
  const history = useHistory();

  const createMode = entity?.id === undefined;
  /*
  const [name, setName] = useState(entity?.name ?? "");
  const [note, setNote] = useState(entity?.note ?? "");
  const [isTopLevel, setIsTopLevel] = useState(entity?.isToplevel ?? false);
  const [attributes, setAttributes] = useState<{ [key: string]: any }[]>(
    entity?.attrs.map((attr) => {
      return { ...attr, refIds: attr.referrals.map((r) => r.id) };
    }) ?? []
  );
  */
  //const [submittable, setSubmittable] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Adjusted attributes for the API
    const attrs = entityInfo.attributes
      .filter((attr) => attr.id != null || !attr.deleted)
      .map((attr, index) => {
        return {
          id: attr.id,
          name: attr.name,
          type: String(attr.type),
          row_index: String(index),
          is_mandatory: attr.is_mandatory,
          is_delete_in_chain: attr.is_delete_in_chain,
          ref_ids: attr.refIds,
          deleted: attr.deleted,
        };
      });

    if (createMode) {
      await createEntity(
        entityInfo.name,
        entityInfo.note,
        entityInfo.isTopLevel,
        attrs
      );
      history.replace(entitiesPath());
    } else {
      await updateEntity(
        entity.id,
        entityInfo.name,
        entityInfo.note,
        entityInfo.isTopLevel,
        attrs
      );
      history.go(0);
    }
  };

  const handleCancel = () => {
    history.replace(entitiesPath());
  };

  const checkSubmittable = () => {
    if (entityInfo.name === "") {
      return false;
    }
    if (entityInfo.attributes.some((a) => a.name === "")) {
      return false;
    }

    const dc = DjangoContext.getInstance();
    if (
      entityInfo.attributes.some(
        (a) =>
          (Number(a.type) & Number(dc.attrTypeValue.object)) > 0 &&
          a.refIds.length === 0
      )
    ) {
      //if (attributes.some((a) => a.refIds === [])) {
      return false;
    }
    return true;
  };
  useEffect(() => {
    setSubmittable(checkSubmittable());
  });

  return (
    <Box>
      <Box>
        <Box>
          <BasicFields entityInfo={entityInfo} setEntityInfo={setEntityInfo} />

          <AttributesFields
            entityInfo={entityInfo}
            setEntityInfo={setEntityInfo}
            referralEntities={referralEntities}
          />
        </Box>
      </Box>

      {/*
      <Box display="flex" justifyContent="center" my="32px">
        <Box mx="16px">
          <Button
            variant="contained"
            color="secondary"
            disabled={!submittable}
            onClick={handleSubmit}
          >
            保存
          </Button>
        </Box>
        <Box mx="16px">
          <Button variant="outlined" color="primary" onClick={handleCancel}>
            キャンセル
          </Button>
        </Box>
      </Box>
      */}
    </Box>
  );
};
