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
  datadog,
  k8s,
  xoGame,
  scribeai,
  jenkinsAws,
  pythonFastapiAws,
  monitorpro,
  infraDeployAws,
  expressTypescript,
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
  { name: "DataDog", icon : datadog },
  { name: "k8s", icon: k8s },
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
    name: "3D Portfolio (React + Three.js)",
    description:
      "Personal developer portfolio built using React, Three.js (R3F), TailwindCSS and Framer Motion with smooth animations and 3D components.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "threejs", color: "green-text-gradient" },
      { name: "tailwind", color: "pink-text-gradient" },
    ],
    image: scribeai,
    source_code_link: "https://github.com/Abhi-lash19/3d-portfolio",
  },
  {
    name: "ScribeAI (AI Writing Assistant)",
    description:
      "AI-powered chat + content writing assistant built using OpenAI + Stream Chat with real-time collaboration and clean UI.",
    tags: [
      { name: "typescript", color: "blue-text-gradient" },
      { name: "openai", color: "green-text-gradient" },
      { name: "stream-chat", color: "pink-text-gradient" },
    ],
    image: scribeai,
    source_code_link: "https://github.com/Abhi-lash19/ScribeAI",
  },
  {
    name: "Express TypeScript Backend",
    description:
      "Backend project using Express.js + TypeScript covering REST APIs, middleware, error handling, static assets, and scalable architecture patterns.",
    tags: [
      { name: "nodejs", color: "blue-text-gradient" },
      { name: "express", color: "green-text-gradient" },
      { name: "typescript", color: "pink-text-gradient" },
    ],
    image: expressTypescript,
    source_code_link: "https://github.com/Abhi-lash19/express-typescript-backend",
  },
  {
    name: "MonitorPro (Real-time Monitoring Dashboard)",
    description:
      "Real-time monitoring dashboard to visualize CPU/memory metrics using Flask-SocketIO and Chart.js, packaged with Docker for deployment.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
      { name: "websockets", color: "pink-text-gradient" },
    ],
    image: monitorpro,
    source_code_link: "https://github.com/Abhi-lash19/MonitorPro",
  },

  {
    name: "XO Game (Tic-Tac-Toe)",
    description:
      "Classic XO (Tic-Tac-Toe) game with interactive UI, turn-based logic, winner detection, and reset functionality.",
    tags: [
      { name: "javascript", color: "blue-text-gradient" },
      { name: "html", color: "green-text-gradient" },
      { name: "css", color: "pink-text-gradient" },
    ],
    image: xoGame,
    source_code_link: "https://github.com/Abhi-lash19/xo-game",
  },

  {
    name: "infra-deploy-aws (Terraform CI/CD)",
    description:
      "CI/CD automation using GitHub Actions + Terraform to provision AWS infra and deploy Docker applications with versioned builds.",
    tags: [
      { name: "terraform", color: "blue-text-gradient" },
      { name: "github-actions", color: "green-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
    ],
    image: infraDeployAws,
    source_code_link: "https://github.com/Abhi-lash19/infra-deploy-aws",
  },
  {
    name: "Jenkins EKS Automation",
    description:
      "Infrastructure automation project focusing on Jenkins pipelines and EKS provisioning workflows for modern DevOps deployments.",
    tags: [
      { name: "jenkins", color: "blue-text-gradient" },
      { name: "eks", color: "green-text-gradient" },
      { name: "devops", color: "pink-text-gradient" },
    ],
    image: jenkinsAws,
    source_code_link: "https://github.com/Abhi-lash19/jenkins-eks-automation",
  },
  {
    name: "Python FastAPI AWS",
    description:
      "FastAPI-based project demonstrating cloud-ready backend services and deployment practices using AWS-friendly patterns.",
    tags: [
      { name: "fastapi", color: "blue-text-gradient" },
      { name: "python", color: "green-text-gradient" },
      { name: "aws", color: "pink-text-gradient" },
    ],
    image: pythonFastapiAws,
    source_code_link: "https://github.com/Abhi-lash19/Python-FastApi-AWS",
  },
];


export { services, technologies, experiences, projects };
