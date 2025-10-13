"use client";
import {
  Box,
  Container,
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Link,
  Input,
  HStack,
  Text,
  Icon
} from "@chakra-ui/react";

import { useMemo, useState } from "react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

type Faq = { question: string; answer: React.ReactNode; id: string; keywords?: string[] };

const FAQS: Faq[] = [
  {
    id: "what-does-spero-mean",
    question: "What does the word “SPERO” mean?",
    answer: <>
      In Latin, “SPERO” means “to hope.” Our vision is inspired by Matthew 10:29–31, which reflects care for the seemingly insignificant.
      <br /><br />
      Learn more in our{" "}
      <Link href="https://shopspero.medium.com/what-does-spero-mean-8abf8394a91a" isExternal rel="noopener">
        Medium article <ExternalLinkIcon mx="2px" />
      </Link>.
    </>,
    keywords: ["name", "meaning", "hope"]
  },
  {
    id: "how-much-is-donated",
    question: "Where do the profits go?",
    answer: <>Spero is a nonprofit organization, and all proceeds go directly toward supporting Christian ministries, local faith-based
      initiatives, and expanding Spero’s mission to bring the Gospel to more people. Every purchase contributes to something greater—helping
      us design more faith-driven apparel, collaborate with campus fellowships, and support organizations that align with our mission.</>,
    keywords: ["donate", "charity", "impact", "profits"]
  },
  {
    id: "returns-exchanges",
    question: "Can I return or exchange an item?",
    answer: <>
      We want you to love your Spero apparel! If you need to make a return, we allow returns within one week of receiving your order, provided
      the hoodie is brand new and unworn. We also accept returns if the product has any defects or quality issues upon arrival. If you
      have any concerns, please reach out, and we’ll be happy to assist you! Need help?{" "}
      <Link as={NextLink} href="mailto:shopspero@gmail.com">Email us</Link><ExternalLinkIcon mx="2px" /> with your order details.
    </>,
    keywords: ["return", "exchange", "refund", "policy"]
  },
];

export default function Questions() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return FAQS;
    return FAQS.filter(f =>
      f.question.toLowerCase().includes(needle) ||
      (f.keywords || []).some(k => k.includes(needle))
    );
  }, [q]);

  // FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": typeof f.answer === "string" ? f.answer : "" }
    }))
  };

  return (
    <Box bg="gray.50" py={10}>
      <Container maxW="900px">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Frequently Asked Questions
        </Heading>

        <HStack mb={4}>
          <Input
            placeholder="Search FAQs…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search frequently asked questions"
          />
        </HStack>

        <VStack spacing={3}>
          <Accordion allowToggle w="100%">
            {filtered.map((faq) => (
              <AccordionItem key={faq.id} id={faq.id} border="1px solid" borderColor="gray.200" rounded="lg" mb={2} bg="white">
                <h3>
                  <AccordionButton _expanded={{ bg: "gray.100" }} py={4}>
                    <Box as="span" flex="1" textAlign="left" fontWeight="semibold">
                      <Link as={NextLink} href={`#${faq.id}`} _hover={{ textDecoration: "none" }}>
                        {faq.question}
                      </Link>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h3>
                <AccordionPanel pb={4} fontSize="md" color="gray.700">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>

        <Box mt={8} textAlign="center">
          <Text>Didn’t find what you need?</Text>
          <Link as={NextLink} href="mailto:hello@shopspero.com" fontWeight="semibold">Contact us</Link>
        </Box>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </Container>
    </Box>
  );
}
