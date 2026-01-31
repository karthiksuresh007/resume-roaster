/**
 * Mock Data for Results Page
 * Used for testing and development
 */

export const mockRoastData = {
  mild: `Your resume has some good points, but there's definitely room for improvement. 

Your summary could be more specific about your achievements. Instead of saying you're "hardworking," try quantifying your impact with numbers.

The experience section uses "responsible for" quite a bit. Consider using stronger action verbs like "led," "developed," or "implemented."

Your skills section looks comprehensive, but make sure each skill is relevant to the jobs you're applying for. Quality over quantity!`,

  savage: `Oh boy, where do I even start... 🔥

Your summary says "hardworking." So does literally everyone. You used "responsible for" 6 times. HR fell asleep by the second one.

Your skills section looks like you googled "top tech skills 2023" and copy-pasted the first result. Do you actually know all 47 of these, or are we playing resume bingo?

"Team player with excellent communication skills" — congrats, you just described every human who's ever had a job. Your bullet points are weaker than my WiFi signal.

The good news? At least you spelled your name right. The bad news? Everything else needs work.`
}

export const mockATSScore = {
  score: 47,
  breakdown: {
    Formatting: 65,
    Keywords: 35,
    Impact: 40,
    Clarity: 50
  }
}

export const mockFixes = [
  {
    category: 'Summary',
    issue: 'Generic buzzwords without substance',
    before: 'Hardworking and motivated professional with experience in software development.',
    after: 'Software Engineer with 5+ years building scalable web applications, increasing user engagement by 40% and reducing load times by 60% at TechCorp.'
  },
  {
    category: 'Experience',
    issue: 'Weak action verbs and passive language',
    before: 'Responsible for developing features and fixing bugs.',
    after: 'Led development of 15+ user-facing features, reducing bug count by 35% through implementation of automated testing suite.'
  },
  {
    category: 'Skills',
    issue: 'Overwhelming skill list without context',
    before: 'JavaScript, React, Node.js, Python, Java, C++, HTML, CSS, SQL, MongoDB, PostgreSQL, AWS, Docker, Kubernetes...',
    after: 'Core: JavaScript (ES6+), React, Node.js, TypeScript | Cloud: AWS (EC2, S3, Lambda), Docker | Databases: PostgreSQL, MongoDB'
  },
  {
    category: 'Impact',
    issue: 'Missing quantifiable achievements',
    before: 'Improved application performance.',
    after: 'Optimized database queries and implemented caching, reducing API response time from 2.5s to 400ms (84% improvement).'
  },
  {
    category: 'Keywords',
    issue: 'Missing industry-standard terms',
    before: 'Worked on team projects using modern tools.',
    after: 'Collaborated in Agile/Scrum environment using Jira, Git, and CI/CD pipelines to deliver features 25% faster.'
  },
  {
    category: 'Formatting',
    issue: 'Inconsistent date formatting',
    before: 'Jan 2020 - Present, 03/2018 - 12/2019',
    after: 'January 2020 - Present, March 2018 - December 2019'
  },
  {
    category: 'Clarity',
    issue: 'Vague job responsibilities',
    before: 'Helped with various development tasks.',
    after: 'Developed RESTful APIs serving 50K+ daily requests, integrated third-party payment systems, and mentored 3 junior developers.'
  },
  {
    category: 'Grammar',
    issue: 'Tense inconsistency',
    before: 'Developed new features. Currently working on mobile app. Will implement new design.',
    after: 'Developed new features, implemented mobile app, and designed user interface.'
  }
]

export const mockResumeData = {
  fileName: 'john-doe-resume.pdf',
  uploadDate: new Date().toISOString(),
  atsScore: mockATSScore,
  roast: mockRoastData,
  fixes: mockFixes
}
