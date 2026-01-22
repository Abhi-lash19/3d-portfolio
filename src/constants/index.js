// src/constants/index.js

import {
  backend,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  nodejs,
  git,
  docker,
  aws,
  fastapi,
  github,
  mulesoft,
  postman,
  python,
  terraform,
  go,
  carrent,
  jobit,
  tripguide,
  absolutelabs,
  bel,
  arcesium,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  { title: "Backend Developer", icon: backend },
  { title: "Cloud / AWS Developer", icon: aws },
  { title: "DevOps & Automation", icon: docker },
  { title: "API Integration Engineer", icon: web },
];

const technologies = [
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  { name: "JavaScript", icon: javascript },
  { name: "TypeScript", icon: typescript },
  { name: "React JS", icon: reactjs },
  { name: "Node JS", icon: nodejs },
  { name: "Git", icon: git },
  { name: "Docker", icon: docker },
  { name: "AWS", icon: aws },
  { name: "FastAPI", icon: fastapi },
  { name: "GitHub", icon: github },
  { name: "MuleSoft", icon: mulesoft },
  { name: "Postman", icon: postman },
  { name: "Python", icon: python },
  { name: "Terraform", icon: terraform },
  { name: "Go", icon: go },
];

const experiences = [
  {
    title: "Senior Software Developer",
    company_name: "AbsoluteLabs",
    icon: absolutelabs,
    iconBg: "#383E56",
    date: "Apr 2025 – Present",
    points: [
      "Built scalable AWS pipelines using API Gateway, Lambda, SQS, S3, DynamoDB for event-driven integrations.",
      "Integrated Newstore ↔ Business Central using MuleSoft with Azure Blob Storage for data exchange & archival.",
      "Developed order-email orchestration using GraphQL, AWS Lambda, S3, and Ometria Email API.",
      "Designed FIFO SQS message processing with SNS triggers for reliable downstream integrations.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "AbsoluteLabs",
    icon: absolutelabs,
    iconBg: "#E6DEDD",
    date: "Oct 2023 – Mar 2025",
    points: [
      "Maintained AWS Lambda + S3 workflows and supported API integration projects.",
      "Optimized SQL queries on production tables to improve performance and reduce execution time.",
      "Implemented observability using Datadog custom metrics and CloudWatch dashboards.",
      "Automated error reporting using Python scripts to export structured Excel reports.",
    ],
  },
  {
    title: "SRE Intern",
    company_name: "Arcesium",
    icon: arcesium,
    iconBg: "#383E56",
    date: "Jan 2023 – May 2023",
    points: [
      "Enabled monitoring and dashboards using Datadog integrations.",
      "Decommissioned legacy orchestration and migrated workloads to modern platforms.",
      "Optimized HTTP request flows to reduce service latency and improve response times.",
      "Automated security + CI/CD workflows using AWS, Linux, Python, and GitLab pipelines.",
    ],
  },
  {
    title: "Intern",
    company_name: "Bharat Electronics Limited (BEL)",
    icon: bel,
    iconBg: "#E6DEDD",
    date: "May 2022 – Aug 2022",
    points: [
      "Worked on GNSS receiver algorithms (RAIM, TRAIM, multipath mitigation), improving accuracy by ~20%.",
      "Applied signal processing on real-world GNSS signals to build fault detection logic.",
      "Contributed to defense R&D project with robust testing and experimentation.",
    ],
  },
];

const projects = [
  {
    name: "MonitorPro (Real-Time Monitoring Dashboard)",
    description:
      "Real-time dashboard to visualize CPU, memory, and system metrics using Flask-SocketIO, Chart.js and Docker; deployed on AWS EKS with Kubernetes.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
      { name: "eks", color: "pink-text-gradient" },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "infra-deploy-aws (Terraform Automation)",
    description:
      "End-to-end CI/CD pipeline with GitHub Actions + Terraform to provision AWS infra and deploy Docker apps to EC2 via ECR with versioned builds.",
    tags: [
      { name: "terraform", color: "blue-text-gradient" },
      { name: "github-actions", color: "green-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "PyMicroServiceWikiAnalyzer",
    description:
      "FastAPI microservice that extracts key phrases and sentiment from Wikipedia articles, with automated CI checks and cloud deployment via Docker.",
    tags: [
      { name: "fastapi", color: "blue-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, projects };
