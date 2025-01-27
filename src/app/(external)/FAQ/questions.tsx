import {
    Box,
    Container,
    Heading,
    VStack,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';
  
  const FAQS = [
    {
      question: 'What is SPERO?',
      answer: 'SPERO is a team of college students committed to sharing the gospel through biblically empowered apparel.',
    },
    {
      question: 'What does the word "SPERO" mean?',
      answer: 'In Latin, "SPERO" means "to hope." Our vision is inspired by Matthew 10:29-31, which reflects care for the insignificant.',
    },
    {
      question: 'How much of the profits are donated?',
      answer: '30% of all profits are donated to various social-good organizations such as Compassion International and Laundry Love.',
    },
    {
      question: 'Where are your products made?',
      answer: 'Our products are designed with intentionality and manufactured with high ethical standards.',
    },
    {
      question: 'Can I return or exchange an item?',
      answer: 'Yes, items can be returned or exchanged within 30 days of purchase if they are unused and in their original condition.',
    },
  ];
  
  export default function questions() {
    return (
      <Box bg="gray.50" py={10}>
        <Container maxWidth="900px">
          <Heading as="h2" size="xl" textAlign="center" mb={6}>
            Frequently Asked Questions
          </Heading>
          <VStack spacing={4}>
            <Accordion allowToggle width="100%">
              {FAQS.map((faq, index) => (
                <AccordionItem key={index} border="none">
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: 'gray.200', color: 'black' }}
                      py={4}
                    >
                      <Box as="span" flex="1" textAlign="left" fontWeight="medium">
                        {faq.question}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} fontSize="md" color="gray.600">
                    {faq.answer}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </VStack>
        </Container>
      </Box>
    );
  }
  