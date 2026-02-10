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
  portfolio,
  scribeai,
  jenkinsAws,
  pythonFastapiAws,
  monitorpro,
  infraDeployAws,
  expressTypescript,
  absolutelabs,
  bel,
  arcesium,
  linkedin,
  gmail,
  ig,
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
  { name: "DataDog", icon: datadog },
  { name: "k8s", icon: k8s },
];

const socials = [
  { href: "https://github.com/Abhi-lash19", icon: github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/abhilash-giri/", icon: linkedin, label: "LinkedIn" },
  { href: "https://instagram.com/_abhilash_._._", icon: ig, label: "Instagram" },
  { href: "mailto:abhilashkumargiri63@gmail.com", icon: gmail, label: "Email" },
];

const experiences = [
  {
    title: "Senior Software Developer",
    company_name: "AbsoluteLabs",
    icon: absolutelabs,
    iconBg: "#E6DEDD",
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
      "Built AWS integration infrastructure using SAM templates, enabling scalable and repeatable deployments.",
      "Optimized SQL queries on production tables to improve performance and reduce execution time.",
      "Implemented observability using Datadog custom metrics and CloudWatch dashboards.",
      "Automated error reporting using Python scripts to export structured Excel reports.",
    ],
  },
  {
    title: "SRE Intern",
    company_name: "Arcesium",
    icon: arcesium,
    iconBg: "#E6DEDD",
    date: "Jan 2023 – May 2023",
    points: [
      "Integrated Datadog for system monitoring, metrics collection, and dashboard visualization across multiple services.",
      "Contributed to decommissioning a legacy orchestration system (Podmaster) and migrated Kubernetes workloads to Veritas and Veda platforms.",
      "Analyzed HTTP request flows within Kubernetes pods to identify latency bottlenecks and debug performance issues.",
      "Developed a feature to integrate the internal ticketing system with Slack, enabling automated responses and follow-ups on tickets.",
    ],
  },
  {
    title: "Software Development Intern",
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
      { name: "react", color: "text-violet-400" },
      { name: "threejs", color: "text-emerald-400" },
      { name: "tailwind", color: "text-rose-400" },
    ],
    image: portfolio,
    source_code_link: "https://github.com/Abhi-lash19/3d-portfolio",
  },
  {
    name: "ScribeAI (AI Writing Assistant)",
    description:
      "AI-powered chat + content writing assistant built using OpenAI + Stream Chat with real-time collaboration and clean UI.",
    tags: [
      { name: "typescript", color: "text-violet-400" },
      { name: "openai", color: "text-emerald-400" },
      { name: "stream-chat", color: "text-rose-400" },
    ],
    image: scribeai,
    source_code_link: "https://github.com/Abhi-lash19/ScribeAI",
  },
  {
    name: "Express TypeScript Backend",
    description:
      "Backend project using Express.js + TypeScript covering REST APIs, middleware, error handling, static assets, and scalable architecture patterns.",
    tags: [
      { name: "nodejs", color: "text-violet-400" },
      { name: "express", color: "text-emerald-400" },
      { name: "typescript", color: "text-rose-400" },
    ],
    image: expressTypescript,
    source_code_link: "https://github.com/Abhi-lash19/express-typescript-backend",
  },
  {
    name: "MonitorPro (Real-time Monitoring Dashboard)",
    description:
      "Real-time monitoring dashboard to visualize CPU/memory metrics using Flask-SocketIO and Chart.js, packaged with Docker for deployment.",
    tags: [
      { name: "python", color: "text-violet-400" },
      { name: "docker", color: "text-emerald-400" },
      { name: "websockets", color: "text-rose-400" },
    ],
    image: monitorpro,
    source_code_link: "https://github.com/Abhi-lash19/MonitorPro",
  },
  {
    name: "XO Game (Tic-Tac-Toe)",
    description:
      "Classic XO (Tic-Tac-Toe) game with interactive UI, turn-based logic, winner detection, and reset functionality.",
    tags: [
      { name: "javascript", color: "text-violet-400" },
      { name: "html", color: "text-emerald-400" },
      { name: "css", color: "text-rose-400" },
    ],
    image: xoGame,
    source_code_link: "https://github.com/Abhi-lash19/xo-game",
  },
  {
    name: "infra-deploy-aws (Terraform CI/CD)",
    description:
      "CI/CD automation using GitHub Actions + Terraform to provision AWS infra and deploy Docker applications with versioned builds.",
    tags: [
      { name: "terraform", color: "text-violet-400" },
      { name: "github-actions", color: "text-emerald-400" },
      { name: "aws", color: "text-rose-400" },
    ],
    image: infraDeployAws,
    source_code_link: "https://github.com/Abhi-lash19/infra-deploy-aws",
  },
  {
    name: "Jenkins EKS Automation",
    description:
      "Infrastructure automation project focusing on Jenkins pipelines and EKS provisioning workflows for modern DevOps deployments.",
    tags: [
      { name: "jenkins", color: "text-violet-400" },
      { name: "eks", color: "text-emerald-400" },
      { name: "devops", color: "text-rose-400" },
    ],
    image: jenkinsAws,
    source_code_link: "https://github.com/Abhi-lash19/jenkins-eks-automation",
  },
  {
    name: "Python FastAPI AWS",
    description:
      "FastAPI-based project demonstrating cloud-ready backend services and deployment practices using AWS-friendly patterns.",
    tags: [
      { name: "fastapi", color: "text-violet-400" },
      { name: "python", color: "text-emerald-400" },
      { name: "aws", color: "text-rose-400" },
    ],
    image: pythonFastapiAws,
    source_code_link: "https://github.com/Abhi-lash19/Python-FastApi-AWS",
  },
];


export { services, technologies, socials, experiences, projects };
