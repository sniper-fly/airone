import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAsync } from "react-use";

import { useTypedParams } from "../hooks/useTypedParams";

import { topPath } from "Routes";
import { aironeApiClientV2 } from "apiclient/AironeApiClientV2";
import { ACLForm } from "components/common/ACLForm";
import { AironeBreadcrumbs } from "components/common/AironeBreadcrumbs";
import { Loading } from "components/common/Loading";

export const ACLPage: FC = () => {
  const { objectId } = useTypedParams<{ objectId: number }>();

  const acl = useAsync(async () => {
    return await aironeApiClientV2.getAcl(objectId);
  });

  return (
    <Box className="container-fluid">
      <AironeBreadcrumbs>
        <Typography component={Link} to={topPath()}>
          Top
        </Typography>
        <Typography color="textPrimary">ACL</Typography>
      </AironeBreadcrumbs>

      {acl.loading ? (
        <Loading />
      ) : (
        <>
          <Typography>{acl.value.name} の ACL 設定</Typography>
          <ACLForm objectId={objectId} acl={acl.value} />
        </>
      )}
    </Box>
  );
};