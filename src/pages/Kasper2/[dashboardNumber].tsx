import type { NextPage } from "next";
import { SectionsWrapper } from "../../components/elements/Section";
import PageLayoutWrapper from "../../components/layout/PageLayoutWrapper";
import { useRouter } from "next/router";
import Haha from "next/link";

/**
 * Does nothing. Just redirection to /sensors
 * Natural page to have in the future
 */
const HomePage: NextPage = () => {
  const router = useRouter();
  const { dashboardNumber, id } = router.query;
  console.log(id, dashboardNumber);
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>
        <p>
          <Haha href={"/Kasper2/"}>Post: hei</Haha>
        </p>
      </SectionsWrapper>
    </PageLayoutWrapper>
  );
};

export default HomePage;
