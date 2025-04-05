import { Meta, StoryObj } from "@storybook/react";
import LoadingSkeleton from "../components/LoadingSkeleton.tsx";
import styled from "styled-components";

const meta: Meta<typeof LoadingSkeleton> = {
  title: "LoadingSkeleton",
  component: LoadingSkeleton,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "A placeholder preview for content that is loading",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["rectangular", "circular", "rounded", "text"],
      description: "The shape of the skeleton",
      table: {
        defaultValue: { summary: "text" },
      },
    },
    width: {
      control: "number",
      description: "Width of the skeleton component",
    },
    height: {
      control: "number",
      description: "Height of the skeleton component",
    },
    fontSize: {
      control: "text",
      description: "Used when text is selected as a variant",
    },
    animation: {
      control: "radio",
      options: ["pulse", "wave", false],
      description: "The animation effect applied to the skeleton",
      table: {
        defaultValue: { summary: "pulse" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof LoadingSkeleton>;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 600px;
  padding: 1.5rem;
  border-radius: 8px;
`;

const Section = styled.div`
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.75rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 500;
`;

const SectionDescription = styled.p`
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.875rem;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const AllVariants: Story = {
  decorators: [
    () => {
      return (
        <Container>
          <Section>
            <SectionTitle>Text</SectionTitle>
            <SectionDescription>
              Used for text content like paragraphs and titles.
            </SectionDescription>
            <LoadingSkeleton variant="text" fontSize="16px" />
          </Section>

          <Section>
            <SectionTitle>Circular Variant</SectionTitle>
            <SectionDescription>
              Perfect for avatars, icons, and profile pictures.
            </SectionDescription>
            <FlexRow>
              <LoadingSkeleton variant="circular" width={40} height={40} />
              <LoadingSkeleton variant="circular" width={60} height={60} />
              <LoadingSkeleton variant="circular" width={80} height={80} />
            </FlexRow>
          </Section>

          <Section>
            <SectionTitle>Rectangular Variant</SectionTitle>
            <SectionDescription>
              Used for cards, images, and content blocks.
            </SectionDescription>
            <LoadingSkeleton variant="rectangular" height={120} />
          </Section>

          <Section>
            <SectionTitle>Rounded Variant</SectionTitle>
            <SectionDescription>
              For buttons, chips, and elements with rounded corners.
            </SectionDescription>
            <FlexRow>
              <LoadingSkeleton variant="rounded" width={100} height={36} />
              <LoadingSkeleton variant="rounded" width={120} height={36} />
              <LoadingSkeleton variant="rounded" width={80} height={36} />
            </FlexRow>
          </Section>
        </Container>
      );
    },
  ],
  parameters: {
    controls: {
      disable: true,
    },
  },
};

// Add individual stories for each variant with enabled controls
export const SingleVariant: Story = {
  args: {
    variant: "rectangular",
    animation: "pulse",
    height: 50,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The text variant is ideal for paragraph text and headings. The height is automatically calculated based on the fontSize.",
      },
    },
  },
};
