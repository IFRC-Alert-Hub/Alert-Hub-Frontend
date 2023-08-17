import axios from "axios";
import React, { useEffect } from "react";
import {
  ModifiedSourceData,
  SourceFeedsComponent,
} from "../../components/SourceFeedsTableComponent/SourceFeedsTableComponent";
import { Alert, Container } from "@mui/material";
import Progress from "../../components/Layout/Progress";
import TitleHeader from "../../components/Layout/TitleHeader";
interface ResponseType {
  data: {
    sources?: SourceData[];
  };
}

export type SourceData = {
  source: {
    authorEmail?: string;
    authorName: string;
    authorityCountry: string;
    capAlertFeed: string;
    capAlertFeedStatus?: string;
    sourceId: number;
    sourceIsOfficial: boolean;
    byLanguage: { code: string; logo: string; name: string }[];
    name?: string;
  };
};

const GetAllSources = () => {
  const [data, setData] = React.useState<ModifiedSourceData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ResponseType = await axios.get(
          "https://cap-aggregator.azurewebsites.net/feeds/"
        );

        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error("Data is empty or invalid.");
        }
        console.log(response.data.sources);
        const modifiedSources = response.data.sources!.map(
          (single_source: SourceData) => {
            if (single_source.source.byLanguage.length > 0) {
              const modifiedSource: any = {};
              modifiedSource.sourceName =
                single_source.source.byLanguage.find(
                  (item) => item.code === "en"
                )?.name || single_source.source.byLanguage[0]?.name;

              modifiedSource.logo =
                single_source.source.byLanguage.find(
                  (item) => item.code === "en"
                )?.logo || single_source.source.byLanguage[0]?.logo;

              modifiedSource.language =
                single_source.source.byLanguage.find(
                  (item) => item.code === "en"
                )?.code || single_source.source.byLanguage[0]?.code;

              modifiedSource.capAlertFeed = single_source.source.capAlertFeed;
              modifiedSource.sourceId = single_source.source.sourceId;
              return modifiedSource;
            }
            return single_source.source;
          }
        );
        setData(modifiedSources);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
const SourceFeeds = () => {
  const { data, loading, error } = GetAllSources();

  useEffect(() => {
    if (!loading || !error) {
      console.log(data);
    }
  });
  return (
    <>
      <Container maxWidth="lg" sx={{ paddingTop: "20px" }}>
        <TitleHeader title={`Source Feeds`} />
        {loading && <Progress />}
        {error && (
          <Alert severity="error">
            There is current an error, please try again later
          </Alert>
        )}
        {!loading && !error && (
          <SourceFeedsComponent rows={data}></SourceFeedsComponent>
        )}
      </Container>
    </>
  );
};

export default SourceFeeds;
