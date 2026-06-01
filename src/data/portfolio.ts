export type AchievementCategory =
  | 'ai'
  | 'cloud'
  | 'devops'
  | 'leadership'

export interface Achievement {
  id: number
  text: string
  category: AchievementCategory
  metric?: string
  highlight?: string
}

export interface WorkExperience {
  company: string
  role: string
  period?: string
  isCurrent?: boolean
  achievements: Achievement[]
}

export interface Stat {
  label: string
  value: string
  detail: string
}

export const introParagraphs = [
  'Software Engineer with strong experience in scalable distributed systems, cloud infrastructure, machine learning, and logistics technology across Southeast Asia. I specialize in building high-availability platforms, optimizing engineering productivity, and leading teams to deliver reliable systems at scale.',
  'Experienced in designing distributed applications on Docker Swarm, AWS, ECS, and microservices architectures with a strong focus on scalability, resilience, and cost efficiency. Successfully improved service availability to 99.99%, reduced infrastructure costs by up to 70%, and optimized deployment pipelines and containerization workflows for faster engineering delivery.',
  'Passionate about combining software engineering with data and AI solutions. Built machine learning models for shipment prediction, sprint forecasting, and operational analytics, while also implementing Retrieval-Augmented Generation (RAG) systems using Ollama and Llama 3 to significantly accelerate internal knowledge retrieval.',
  'Strong background in backend engineering using Node.js, distributed messaging systems with NATS JetStream, CI/CD automation with GitLab, and cloud-native infrastructure on AWS. I enjoy solving complex technical problems, improving system reliability, and mentoring engineering teams to build impactful products.',
  'Currently focused on scalable backend systems, cloud infrastructure, AI-assisted engineering workflows, and high-performance distributed architectures.',
]

export const focusAreas = [
  'Distributed Systems',
  'AWS & Cloud Native',
  'Machine Learning',
  'RAG & AI Workflows',
  'Node.js Backend',
  'NATS JetStream',
  'Docker & ECS',
  'CI/CD & GitLab',
  'MongoDB & Atlas',
  'System Resilience',
]

export const stats: Stat[] = [
  { label: 'Availability', value: '99.99%', detail: 'Service uptime target achieved' },
  { label: 'Cost reduction', value: '70%', detail: 'Infrastructure optimization peak' },
  { label: 'RAG retrieval', value: '15s', detail: 'Down from 7 minutes' },
  { label: 'Image size', value: '40 MB', detail: 'Down from 1 GB containers' },
]

export const workExperiences: WorkExperience[] = [
  {
  company: 'Marine Technologies',
  role: 'Software Engineer Manager',
  isCurrent: true,
  achievements: [
    {
      id: 1,
      text: 'Increased engineering productivity by implementing a Retrieval-Augmented Generation (RAG) system using Ollama and Llama 3, reducing internal data retrieval time from 7 minutes to 15 seconds.',
      category: 'ai',
      metric: '96% faster',
      highlight: '7 min → 15 sec',
    },
    {
      id: 2,
      text: 'Improved team delivery predictability by developing a linear regression model to forecast sprint completion timelines using engineering metrics such as story points, frontend/backend availability, and total task volume.',
      category: 'ai',
      metric: 'Sprint forecasting',
      highlight: 'Linear regression',
    },
    {
      id: 3,
      text: 'Enhanced operational decision-making and revenue forecasting by building machine learning models to predict shipment completion dates and laycan timelines using linear regression techniques.',
      category: 'ai',
      metric: 'ML predictions',
      highlight: 'Shipment & laycan',
    },
    {
      id: 4,
      text: 'Reduced cloud infrastructure costs by 60% through optimization initiatives, including migrating from Amazon DocumentDB to MongoDB Atlas and right-sizing AWS resources such as RDS and EC2 instances.',
      category: 'cloud',
      metric: '60% savings',
      highlight: 'DocumentDB → Atlas',
    },
    {
      id: 5,
      text: 'Increased deployment efficiency by 20% through the design and implementation of scalable CI/CD infrastructure on AWS with GitLab Runner pipelines.',
      category: 'devops',
      metric: '+20% efficiency',
      highlight: 'GitLab on AWS',
    },
    {
      id: 6,
      text: 'Optimized containerization workflows by reducing Docker image sizes from 1 GB to 40 MB through dependency caching and build process improvements.',
      category: 'devops',
      metric: '96% smaller',
      highlight: '1 GB → 40 MB',
    },
    {
      id: 7,
      text: 'Improved service availability and system resilience by implementing multi-node deployment architecture using Amazon ECS services.',
      category: 'cloud',
      metric: 'Multi-node ECS',
      highlight: 'High availability',
    },
    {
      id: 8,
      text: 'Strengthened cloud security posture by developing automated AWS access key rotation using AWS Lambda.',
      category: 'cloud',
      metric: 'Auto rotation',
      highlight: 'AWS Lambda',
    },
    {
      id: 9,
      text: 'Led and mentored a cross-functional team of 15 engineers and infrastructure specialists in building scalable logistics platforms.',
      category: 'leadership',
      metric: '15 engineers',
      highlight: 'Team leadership',
    },
  ],
  },
  {
    company: 'Unirsal',
    role: 'Senior Software Engineer',
    period: 'July 2021 – December 2023',
    achievements: [
      {
        id: 10,
        text: 'Increased service availability to 99.99% by designing, deploying, and maintaining distributed system applications running on Docker Swarm.',
        category: 'cloud',
        metric: '99.99% uptime',
        highlight: 'Docker Swarm',
      },
      {
        id: 11,
        text: 'Led technical back-of-the-envelope cost optimization initiatives, reducing infrastructure and operational expenses by up to 70%.',
        category: 'leadership',
        metric: '70% savings',
        highlight: 'Cost optimization',
      },
      {
        id: 12,
        text: 'Improved messaging scalability and reliability by enhancing NATS publisher/consumer architecture through the implementation of JetStream streaming and persistence capabilities.',
        category: 'devops',
        metric: 'JetStream',
        highlight: 'NATS messaging',
      },
      {
        id: 13,
        text: 'Enhanced high availability of orchestration infrastructure by increasing manager node replicas within Docker Swarm clusters.',
        category: 'cloud',
        metric: 'HA orchestration',
        highlight: 'Swarm manager replicas',
      },
      {
        id: 14,
        text: 'Reduced API load by up to 80% by refactoring synchronous bulk transaction processing into asynchronous background jobs using Node.js cron-based task scheduling.',
        category: 'devops',
        metric: '80% less load',
        highlight: 'Async background jobs',
      },
    ],
  },
  {
    company: 'Corgee',
    role: 'Senior Software Engineer',
    period: 'July 2021 – December 2023',
    achievements: [
      {
        id: 15,
        text: 'Built and maintained a cross-platform Flutter mobile application for iOS and Android, delivering a consistent user experience and reducing development overhead through a unified codebase.',
        category: 'devops',
        metric: 'iOS & Android',
        highlight: 'Flutter mobile app',
      },
      {
        id: 16,
        text: 'Designed and developed a scalable data pipeline for data scientists, integrating with European Open Banking APIs to process and deliver more than 1 million financial transactions daily with high reliability and efficiency.',
        category: 'cloud',
        metric: '1M+ tx/day',
        highlight: 'Open Banking APIs',
      },
    ],
  },
]

export const categoryLabels: Record<AchievementCategory, string> = {
  ai: 'AI & ML',
  cloud: 'Cloud',
  devops: 'DevOps',
  leadership: 'Leadership',
}
