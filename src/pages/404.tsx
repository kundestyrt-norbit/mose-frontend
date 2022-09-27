import { SectionsWrapper } from "../components/elements/Section";
import PageLayoutWrapper from "../components/layout/PageLayoutWrapper";

/**
 * Page for when we enter a route that does not lead to any other page.
 */
const NotFoundPage = (): JSX.Element => {
  return (
    <PageLayoutWrapper>
      <SectionsWrapper>Side ikke funnet.</SectionsWrapper>
    </PageLayoutWrapper>
  );
};

export default NotFoundPage;
