import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertInfo,
  Area,
  AreaPolygon,
  Country_Admin1s_Data,
  admin1,
} from "./types";
import { Autocomplete, TextField } from "@mui/material";

import React from "react";
import { useParams } from "react-router-dom";
import { number } from "yup";
import { convertCoordinates } from "./helperFunctions";

type ResponseAdmin1Type = {
  id: number;
  name: string;
  polygon: string;
  multipolygon: string;
  filters: any;
};

interface ResponseType {
  data: Alert;
}

export const GetAlertInfoByAlertID = () => {
  const [data, setData] = useState<Alert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const currentAlertID = useRef<number | null>(null);

  const refetch = async (alertID: number | null) => {
    console.log("currentAlertID : ", currentAlertID.current);
    console.log("ALERT ID : ", alertID);

    if (currentAlertID.current === null || currentAlertID.current !== alertID) {
      setLoading(true);
      setError(null);
      try {
        if (!alertID) {
          throw new Error("Alert ID is not provided.");
        }

        const response: ResponseType = await axios.get(
          `https://alert-manager.azurewebsites.net/alerts/${alertID}`
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }

        let data = response.data;
        data.info!.forEach((alert_info: AlertInfo) => {
          alert_info.area.forEach((area: any) => {
            if (area.polygon.length > 0) {
              area.polygon = area.polygon.map((polygon: any, index: number) => {
                polygon.name = `Polygon ${index + 1}`;
                polygon.coordinates = convertCoordinates(polygon.value).map(
                  ([x, y]) => [y, x]
                );
                polygon.type = "Polygon";
                delete polygon.value;
                return polygon;
              });
            }
            if (area.circle.length > 0) {
              area.circle = area.circle.map((circle: any, index: number) => {
                circle.name = `Circle ${index + 1}`;
                const [coordinatesStr, radius] = circle.value.split(" ");
                const coordinates = coordinatesStr.split(",").map(parseFloat);
                circle.center = [coordinates[1], coordinates[0]];
                circle.type = "Circle";
                circle.radius = radius as number;
                delete circle.value;
                return circle;
              });
            }
          });
        });
        setData(data);
        setLoading(false);
        currentAlertID.current = alertID;
      } catch (error: any) {
        console.log(error.message);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  return { data, loading, error, refetch };
};

export const AlertInfoTest = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error, refetch } = GetAlertInfoByAlertID();

  useMemo(() => {
    refetch(Number(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (!loading && !error) {
      console.log(data);
    }
  }, [data, loading, error]);

  return (
    <>
      {error && <h1>Error</h1>}
      {data && !loading && !error && (
        <div>
          <h1>{data.id}</h1>
        </div>
      )}
    </>
  );
};
