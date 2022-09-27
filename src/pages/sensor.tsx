import { SectionsWrapper } from "../components/elements/Section";
import SensorPageTemplate from "../components/elements/SensorPageTemplate";
import PageLayoutWrapper from "../components/layout/PageLayoutWrapper";
import {
  TimestreamWriteClient,
  ListDatabasesCommand,
} from "@aws-sdk/client-timestream-write";

/**
 * Page for displaying information about a sensor.
 */
declare const process: {
  env: {
    NODE_ENV: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
  };
};
const writeClient = new TimestreamWriteClient({
  region: "eu-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

interface Params {
  MaxResults: number;
  NextToken?: string;
}
const params: Params = {
  MaxResults: 15,
};
const command = new ListDatabasesCommand(params);

async function getDatabasesList(
  nextToken: string | null,
  databaseList: string[]
): Promise<string[]> {
  if (nextToken !== null) {
    params.NextToken = nextToken;
  }

  try {
    const data = await writeClient.send(command);
    if (data !== undefined) {
      data?.Databases?.forEach(function (database) {
        if (database.DatabaseName !== undefined) {
          databaseList.push(database.DatabaseName);
        }
      });

      if (data.NextToken !== undefined) {
        return await getDatabasesList(data.NextToken, databaseList);
      }
    }
  } catch (error) {
    console.log("Error while listing databases", error);
  }
  return databaseList;
}
const SensorsPage = ({ data }: any): JSX.Element => {
  console.log(data);
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>
        <SensorPageTemplate />
      </SectionsWrapper>
    </PageLayoutWrapper>
  );
};
export async function getServerSideProps(): Promise<{
  props: { data: string[] };
}> {
  // Fetch data from external API
  const data = await getDatabasesList(null, []);

  // Pass data to the page via props
  return { props: { data } };
}
export default SensorsPage;
