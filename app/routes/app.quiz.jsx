import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Page,
  Layout,
  Card,
  Button,
  Text,
  BlockStack,
  InlineStack,
  TextField,
  Select,
  Badge,
  Divider,
  Banner,
} from "@shopify/polaris";

const DEFAULT_QUESTIONS = [
  {
    id: 1,
    question: "What's your mood today?",
    options: [
      { label: "Romantic & Sensual", tag: "romantic" },
      { label: "Fresh & Energetic", tag: "fresh" },
      { label: "Mysterious & Dark", tag: "dark" },
      { label: "Calm & Peaceful", tag: "calm" },
    ],
  },
  {
    id: 2,
    question: "When do you wear perfume most?",
    options: [
      { label: "Daily / Office", tag: "everyday" },
      { label: "Evenings & Date Nights", tag: "evening" },
      { label: "Special Occasions", tag: "occasion" },
      { label: "Whenever I feel like it", tag: "casual" },
    ],
  },
  {
    id: 3,
    question: "Which scent family do you love?",
    options: [
      { label: "Florals (Rose, Jasmine, Peony)", tag: "floral" },
      { label: "Orientals (Oud, Amber, Musk)", tag: "oriental" },
      { label: "Fresh (Citrus, Aquatic, Green)", tag: "fresh" },
      { label: "Woody (Sandalwood, Cedar, Vetiver)", tag: "woody" },
    ],
  },
  {
    id: 4,
    question: "How intense do you like your scent?",
    options: [
      { label: "Light & Subtle", tag: "light" },
      { label: "Moderate — noticeable but not overwhelming", tag: "moderate" },
      { label: "Bold & Powerful", tag: "bold" },
      { label: "It depends on the day", tag: "versatile" },
    ],
  },
  {
    id: 5,
    question: "What feeling should your perfume give others?",
    options: [
      { label: "Luxurious & Sophisticated", tag: "luxury" },
      { label: "Approachable & Warm", tag: "warm" },
      { label: "Edgy & Unique", tag: "unique" },
      { label: "Pure & Natural", tag: "natural" },
    ],
  },
];

export default function QuizBuilder() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(DEFAULT_QUESTIONS);
  const [quizTitle, setQuizTitle] = useState("Find Your Signature Scent");
  const [quizSubtitle, setQuizSubtitle] = useState(
    "Answer 5 quick questions and we'll match you to your perfect perfume."
  );
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // Save to localStorage for now — we'll connect to DB in next step
    localStorage.setItem(
      "coperfumer_quiz",
      JSON.stringify({ quizTitle, quizSubtitle, questions })
    );
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateQuestion = (id, newQuestion) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, question: newQuestion } : q)));
  };

  const updateOptionLabel = (questionId, optionIndex, newLabel) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((o, i) =>
                i === optionIndex ? { ...o, label: newLabel } : o
              ),
            }
          : q
      )
    );
  };

  return (
    <Page
      title="Scent Quiz Builder"
      backAction={{ onAction: () => navigate("/app") }}
      primaryAction={
        <Button variant="primary" onClick={handleSave}>
          Save Quiz
        </Button>
      }
    >
      <Layout>
        <Layout.Section>
          <BlockStack gap="500">
            {saved && (
              <Banner tone="success" title="Quiz saved successfully!" />
            )}

            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Quiz Header</Text>
                <TextField
                  label="Quiz Title"
                  value={quizTitle}
                  onChange={setQuizTitle}
                  autoComplete="off"
                />
                <TextField
                  label="Subtitle"
                  value={quizSubtitle}
                  onChange={setQuizSubtitle}
                  autoComplete="off"
                  multiline={2}
                />
              </BlockStack>
            </Card>

            {questions.map((q, qIndex) => (
              <Card key={q.id}>
                <BlockStack gap="400">
                  <InlineStack align="space-between">
                    <Text variant="headingMd">Question {qIndex + 1}</Text>
                    <Badge tone="info">4 options</Badge>
                  </InlineStack>
                  <TextField
                    label="Question text"
                    value={q.question}
                    onChange={(val) => updateQuestion(q.id, val)}
                    autoComplete="off"
                  />
                  <Divider />
                  <Text variant="bodySm" tone="subdued">
                    Answer options (edit labels, keep tags for product matching)
                  </Text>
                  <BlockStack gap="300">
                    {q.options.map((option, oIndex) => (
                      <InlineStack key={oIndex} gap="300" align="start">
                        <div style={{ flex: 1 }}>
                          <TextField
                            label={`Option ${oIndex + 1}`}
                            value={option.label}
                            onChange={(val) =>
                              updateOptionLabel(q.id, oIndex, val)
                            }
                            autoComplete="off"
                          />
                        </div>
                        <div style={{ paddingTop: "20px" }}>
                          <Badge>{option.tag}</Badge>
                        </div>
                      </InlineStack>
                    ))}
                  </BlockStack>
                </BlockStack>
              </Card>
            ))}
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="300">
              <Text variant="headingMd">How it works</Text>
              <Text tone="subdued">
                1. Customer clicks "Find Your Scent" on your store
              </Text>
              <Text tone="subdued">
                2. They answer these 5 questions
              </Text>
              <Text tone="subdued">
                3. Their answers match product tags in your store
              </Text>
              <Text tone="subdued">
                4. They enter their email to see results
              </Text>
              <Text tone="subdued">
                5. You capture the lead + they see matched products
              </Text>
              <Divider />
              <Text variant="bodySm" tone="subdued">
                Tag your Shopify products with the tags shown in badges above
                to enable matching.
              </Text>
            </BlockStack>
          </Card>

          <div style={{ marginTop: "16px" }}>
            <Card>
              <BlockStack gap="300">
                <Text variant="headingMd">Need bottles?</Text>
                <Text tone="subdued">
                  Growing your perfume brand? Packamor supplies premium glass
                  bottles to indie perfumers worldwide.
                </Text>
                <Button url="https://packamor.com" external>
                  View Packamor Catalog
                </Button>
              </BlockStack>
            </Card>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}