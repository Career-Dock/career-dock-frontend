import {
  Smile,
  CreditCard,
  Settings,
  Mail,
  MessageCircle,
  Play,
  Users,
  Infinity,
  LifeBuoy,
  Boxes,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MaxWidthWrapper from "@/components/common/max-width-wrapper";

export default function FAQSection() {
  const faqs = [
    {
      icon: <Smile className="w-6 h-6 text-primary" />,
      question: "Is there a free trial available?",
      answer:
        "Yes, you can try us for free for 30 days. If you want, we'll provide you with a free 30-minute onboarding call to get you up and running.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-primary" />,
      question: "How does billing work?",
      answer:
        "Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.",
    },
    {
      icon: <Settings className="w-6 h-6 text-primary" />,
      question: "Can I change my plan later?",
      answer:
        "Of course you can! Our pricing scales with your company. Chat to our friendly team to find a solution that works for you as you grow.",
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      question: "How do I change my account email?",
      answer:
        "You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.",
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-primary" />,
      question: "What is your cancellation policy?",
      answer:
        "We understand that things change. You can cancel your plan at any time and we'll refund you the difference already paid.",
    },
    {
      icon: <LifeBuoy className="w-6 h-6 text-primary" />,
      question: "How does support work?",
      answer:
        "If you're having trouble with Untitled UI, we're here to try and help via hello@untitledui.com. We're a small team, but will get back to soon.",
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      question: "Can other info be added to an invoice?",
      answer:
        "At the moment, the only way to add additional information to invoices is to add the information to the workspace's name manually.",
    },
    {
      icon: <Play className="w-6 h-6 text-primary" />,
      question: "Do you provide tutorials?",
      answer:
        "Not yet, but we're working on it! In the meantime, we've done our best to make it intuitive and we're building our documentation page.",
    },
    {
      icon: <Infinity className="w-6 h-6 text-primary" />,
      question: 'What does "lifetime access" mean?',
      answer:
        "Once you have purchased the UI kit, you will have access to all of the future updates, free of charge. We'll let you know about releases.",
    },
    {
      icon: <Boxes className="w-6 h-6 text-primary" />,
      question: "Can I use it for multiple projects?",
      answer:
        "You can use Untitled UI for as many projects as you like. Please read our License Agreement before purchasing.",
    },
  ];

  return (
    <MaxWidthWrapper>
      <section className="w-full px-4 py-12 md:py-24 w-full">
        <div className="px-4 md:px-6">
          <div className="">
            <h2 className="text-5xl font-bold tracking-wide mb-2">
              Frequently asked questions
            </h2>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Stuck on something? We're here to help with all your questions and
              answers in one place.
            </p>
          </div>
          <div className="mx-auto grid gap-6 mt-12 md:grid-cols-2 md:gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 mt-1 p-2 bg-gray-100 h-10 w-10 rounded">{faq.icon}</div>
                <div className="space-y-2">
                  <p className="flex flex-row gap-2 text-base font-semibold hover:no-underline p-0">
                    {faq.question}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
