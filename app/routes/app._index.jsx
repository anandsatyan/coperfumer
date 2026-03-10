import { useNavigate } from "react-router";
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  BlockStack,
  InlineStack,
  Badge,
} from "@shopify/polaris";

export default function Index() {
  const navigate = useNavigate();

  return (
    <Page title="Coperfumer"> 
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingMd">Scent Quiz</Text>
                  <Badge tone="info">Core Feature</Badge>
                </InlineStack>
                <Text tone="subdued">
                  Build a personalized scent quiz for your storefront. Capture
                  emails and match customers to your perfumes.
                </Text>
                <Button variant="primary" onClick={() => navigate("/app/quiz")}>
                  Build Your Quiz
                </Button>
              </BlockStack>
            </Card>

            <Card>
              <BlockStack gap="300">
                <InlineStack align="space-between">
                  <Text variant="headingMd">Packamor Packaging</Text>
                  <Badge tone="success">Recommended</Badge>
                </InlineStack>
                <Text tone="subdued">
                  Source premium glass perfume bottles and packaging for your
                  brand. Trusted by indie perfumers worldwide.
                </Text>
                <Button
                  url="https://packamor.com"
                  external
                >
                  Browse Packamor Catalog
                </Button>
              </BlockStack>
            </Card>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
}