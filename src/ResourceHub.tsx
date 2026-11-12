import { useEffect, useMemo, useState, type ComponentType } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  Code2,
  ExternalLink,
  GraduationCap,
  Landmark,
  Lightbulb,
  Moon,
  Rocket,
  Search,
  Sparkles,
  Sun,
  Target,
  UsersRound,
} from 'lucide-react'
import {
  siAccenture,
  siAmd,
  siApple,
  siAtlassian,
  siCisco,
  siCoursera,
  siDatadog,
  siDell,
  siDevpost,
  siGoogle,
  siHcl,
  siInfosys,
  siIntel,
  siMeta,
  siNvidia,
  siQualcomm,
  siRedhat,
  siSap,
  siSnowflake,
  siUdemy,
  siWipro,
  siYcombinator,
  siYoutube,
  siZoho,
} from 'simple-icons'

import './resource-hub.css'
import './resource-premium.css'
import './resource-boxes.css'

type Theme = 'light' | 'dark'
type Resource = { name: string; href?: string; note?: string; tag?: string }
type ResourceGroup = { id: string; label: string; title: string; description: string; icon: ComponentType<{ size?: number }>; resources: Resource[] }

const isroCourses: Resource[] = [
  { name: 'IIRS / ISRO course calendar', href: 'https://isrolms.iirs.gov.in/edusatregistration/coursecalender', note: 'Browse upcoming remote-sensing and space-science courses.', tag: 'Calendar' },
  { name: 'IIRS registration portal', href: 'https://isrolms.iirs.gov.in/edusatregistration/', note: 'Register for available ISRO / IIRS learning programmes.', tag: 'Register' },
  { name: 'IIRS Learning Management System', href: 'https://isrolms.iirs.gov.in/login/', note: 'Sign in to the IIRS online learning platform.', tag: 'LMS' },
]

const hackathons: Resource[] = [
  { name: 'Smart India Hackathon', href: 'https://www.sih.gov.in/', note: 'National innovation challenge for student teams.', tag: 'National' },
  { name: 'Unstop', href: 'https://unstop.com/', note: 'Competitions, hackathons and student opportunities.', tag: 'National' },
  { name: 'Hack2Skill', href: 'https://hack2skill.com/', note: 'Industry-backed hackathons and innovation programmes.', tag: 'National' },
  { name: 'HackIndia', href: 'https://hackindia.org/hackathons', note: 'Indian hackathon discovery and listings.', tag: 'National' },
  { name: 'Devpost', href: 'https://devpost.com/', note: 'Global hackathons and builder challenges.', tag: 'International' },
]

const academics: Resource[] = [
  { name: 'RGPV scheme & syllabus', href: 'https://www.rgpv.ac.in/Uni/frm_ViewScheme.aspx', note: 'Official schemes, subjects and course syllabi.', tag: 'Official' },
  { name: 'RGPV old question papers', href: 'https://www.rgpvonline.com/', note: 'Previous question papers for revision practice.', tag: 'Practice' },
  { name: 'Asha Khilrani', href: 'https://youtube.com/@ashakhilrani?si=99epIXbtg2F_0Cvg', note: 'Academic YouTube learning resource.', tag: 'Video' },
  { name: 'True Engineer', href: 'https://www.youtube.com/@TrueEngineer', note: 'Engineering concepts and study support.', tag: 'Video' },
  { name: 'RGPV Official', href: 'https://www.youtube.com/@rgpvofficial', note: 'Official RGPV video channel.', tag: 'Video' },
]

const certifications: Resource[] = [
  { name: 'Udemy', href: 'https://www.udemy.com', note: 'Practical courses across technical fields.', tag: 'Courses' },
  { name: 'upGrad', href: 'https://www.upgrad.com/', note: 'Professional programmes and certificates.', tag: 'Courses' },
  { name: 'IBM SkillsBuild', href: 'https://skillsbuild.org/', note: 'Free technology and workplace learning.', tag: 'Free' },
  { name: 'Infosys Springboard', href: 'https://www.infosys.com/about/esg/esg-opportunity/springboard.html', note: 'Digital learning from Infosys.', tag: 'Free' },
  { name: 'TCS iON Career Edge', href: 'https://www.tcsion.com/courses/career-edge-young-professional/', note: 'Employability and professional skills.', tag: 'Career' },
  { name: 'Coursera', href: 'https://www.coursera.org', note: 'University and industry certificates.', tag: 'Courses' },
  { name: 'Skill India Digital', href: 'https://www.skillindiadigital.gov.in/free-online-courses/', note: 'Government-supported free online courses.', tag: 'Free' },
  { name: 'SWAYAM / NPTEL', href: 'https://swayam.gov.in/about', note: 'National platform for structured academic learning.', tag: 'Academic' },
  { name: 'Google Career Certificates', href: 'https://grow.google/certificates', note: 'Job-ready programmes from Google.', tag: 'Career' },
  { name: 'AWS Cloud Practitioner', href: 'https://aws.amazon.com/training/learn-about/cloud-practitioner/?trk=fd2bb1b3-75af-4679-af46-1067ce0347a3&sc_channel=ps', note: 'Cloud fundamentals training from AWS.', tag: 'Cloud' },
]

const governmentInternships: Resource[] = [
  { name: 'AICTE Internships', href: 'https://internship.aicte-india.org/internships/1?uid=SU5URVJOU0hJUF8xNzg0NzEzMTYyNmE2MDhmY2E4Y2ZiMg%3D%3D&level=MTg%3D', note: 'Government internship portal.', tag: 'Portal' },
  { name: 'Indian Army internships', href: 'https://internship.aicte-india.org/dashboards/indianarmy', note: 'AICTE Indian Army dashboard.', tag: 'Defence' },
  { name: 'DRDO internships', href: 'https://drdo.gov.in/', note: 'Check DRDO notices and internship information.', tag: 'Defence' },
  { name: 'DRDO single-time form', href: 'https://drdo.gov.in/', note: 'Official DRDO portal; verify current form availability.', tag: 'Portal' },
  { name: 'ISRO internships & projects', href: 'https://www.isro.gov.in/InternshipAndProjects.html', note: 'Official ISRO internships and project opportunities.', tag: 'Space' },
  { name: 'Ministry of External Affairs', href: 'https://internship.mea.gov.in/internship', note: 'MEA internship programme.', tag: 'Government' },
  { name: 'PM Internship Scheme', href: 'https://pminternship.mca.gov.in/login/', note: 'Official PM Internship portal.', tag: 'Government' },
  { name: 'Women & Child Development', href: 'https://wcd.gov.in/offerings/internship', note: 'Ministry internship offering.', tag: 'Government' },
  { name: 'MoSPI internships', href: 'https://internship.mospi.gov.in/', note: 'Statistics and programme implementation internships.', tag: 'Government' },
  { name: 'Legislative Department', href: 'https://www.legislative.gov.in/offerings/schemes-and-services/details/internship-fellowships-ITM4AjMtQWa', note: 'Ministry of Law & Justice fellowships and internships.', tag: 'Government' },
  { name: 'MeitY internship portal', href: 'https://intern.meity.gov.in/login', note: 'Electronics and IT internship portal.', tag: 'Technology' },
  { name: 'India Science & Technology', href: 'https://www.indiascienceandtechnology.gov.in/listingpage/internships', note: 'Department of Science & Technology listings.', tag: 'Science' },
  { name: 'MoEFCC internships', href: 'https://portals.moef.gov.in/internship/', note: 'Environment, Forest and Climate Change portal.', tag: 'Government' },
  { name: 'NHRC internship programmes', href: 'https://nhrc.nic.in/training-programmes/internship-programmes', note: 'National Human Rights Commission programmes.', tag: 'Government' },
  { name: 'NITI Aayog internships', href: 'https://workforindia.niti.gov.in/intern/InternshipEntry/homepage.aspx', note: 'Policy and governance internship programme.', tag: 'Government' },
]

const iitInternships: Resource[] = [
  { name: 'IIT Kharagpur', note: 'Availability not listed in the supplied sheet.', tag: 'Check official site' },
  { name: 'IIT Bombay', note: 'Typical window: May–June.', tag: 'May–Jun' },
  { name: 'IIT Madras Summer Fellowship', href: 'https://ssp.iitm.ac.in/summer-fellowship-registration', note: 'Summer fellowship registration.', tag: 'Apply' },
  { name: 'IIT Kanpur', note: 'Supplied note: ₹750 for first round.', tag: 'Check details' },
  { name: 'IIT Delhi', note: 'Supplied note: February–March 2026.', tag: 'Feb–Mar' },
  { name: 'IIT Guwahati', note: 'Availability not listed in the supplied sheet.', tag: 'Check official site' },
  { name: 'IIT Roorkee SPARK', href: 'https://spark.iitr.ac.in/', note: 'Summer research programme.', tag: 'Apply' },
  { name: 'IIT BHU Varanasi', note: 'Availability not listed in the supplied sheet.', tag: 'Check official site' },
  { name: 'IIT Bhubaneswar', note: 'Supplied note: March.', tag: 'March' },
  { name: 'IIT Gandhinagar SRIP', href: 'https://srip.iitgn.ac.in/info/srip-2026/', note: 'Summer Research Internship Program.', tag: 'Apply' },
  { name: 'IIT Hyderabad', href: 'https://ocs.iith.ac.in/Overall%20Internship%20Brochure%202025-2026.pdf', note: 'Internship brochure supplied by the user.', tag: 'Brochure' },
  { name: 'IIT Jodhpur SURaJ', href: 'https://www.iitj.ac.in/suraj/en/suraj', note: 'Summer undergraduate research programme.', tag: 'Apply' },
  { name: 'IIT Patna', note: 'Typical window: May–June.', tag: 'May–Jun' },
  { name: 'IIT Ropar CSE', href: 'https://cse.iitrpr.ac.in/', note: 'Check department research opportunities.', tag: 'Department' },
  { name: 'IIT Indore', note: 'Availability not listed in the supplied sheet.', tag: 'Check official site' },
  { name: 'IIT Mandi', href: 'https://academics.iitmandi.ac.in/internships', note: 'Official internship information.', tag: 'Apply' },
  { name: 'IIT (ISM) Dhanbad SRIP', href: 'https://people.iitism.ac.in/~research/SRIP.php', note: 'Summer Research Internship Program.', tag: 'Apply' },
  { name: 'IIT Palakkad SUN', href: 'https://sun.iitpkd.ac.in/', note: 'Summer Undergraduate Research programme.', tag: 'Apply' },
  { name: 'IIT Tirupati', href: 'https://www.iittp.ac.in/Interns_and_Apprentice', note: 'Intern and apprentice information.', tag: 'Apply' },
  { name: 'IIT Bhilai', href: 'https://www.iitbhilai.ac.in/index.php?pid=internship_procedure', note: 'Internship procedure.', tag: 'Procedure' },
  { name: 'IIT Goa', href: 'https://iitgoa.ac.in/summer-internships-2025-iit-goa/', note: 'Summer internship information.', tag: 'Apply' },
  { name: 'IIT Jammu RISE-UP', href: 'https://iitjammu.ac.in/post/rise-up', note: 'Research and innovation programme.', tag: 'Apply' },
  { name: 'IIT Dharwad', note: 'Supplied note: first week of March.', tag: 'March' },
]

const companies: Resource[] = [
  ['Google', 'https://careers.google.com'], ['Microsoft', 'https://careers.microsoft.com'], ['Amazon', 'https://www.amazon.jobs'], ['Apple', 'https://jobs.apple.com'], ['Meta', 'https://www.metacareers.com'], ['Adobe', 'https://careers.adobe.com'], ['NVIDIA', 'https://www.nvidia.com/careers'], ['Tata Consultancy Services', 'https://www.tcs.com/careers'], ['Infosys', 'https://www.infosys.com/careers'], ['Accenture', 'https://www.accenture.com/careers'], ['Cognizant', 'https://careers.cognizant.com'], ['Wipro', 'https://www.wipro.com/careers'], ['HCLTech', 'https://www.hcltech.com/careers'], ['Capgemini', 'https://www.capgemini.com/careers'], ['LTIMindtree', 'https://www.ltimindtree.com/careers'], ['Tech Mahindra', 'https://careers.techmahindra.com'], ['Oracle', 'https://careers.oracle.com'], ['Salesforce', 'https://careers.salesforce.com'], ['ServiceNow', 'https://www.servicenow.com/careers.html'], ['SAP', 'https://jobs.sap.com'], ['IBM', 'https://www.ibm.com/careers'], ['Workday', 'https://www.workday.com/careers'], ['Red Hat', 'https://www.redhat.com/jobs'], ['Intel', 'https://jobs.intel.com'], ['AMD', 'https://careers.amd.com'], ['Qualcomm', 'https://www.qualcomm.com/company/careers'], ['Cisco', 'https://jobs.cisco.com'], ['Dell Technologies', 'https://jobs.dell.com'], ['Atlassian', 'https://www.atlassian.com/company/careers'], ['Zoho', 'https://www.zoho.com/careers'], ['Snowflake', 'https://careers.snowflake.com'], ['Datadog', 'https://careers.datadoghq.com'], ['BrowserStack', 'https://www.browserstack.com/careers'],
].map(([name, href]) => ({ name, href, note: 'Official careers portal.', tag: 'Careers' }))

const groups: ResourceGroup[] = [
  { id: 'space', label: 'Space & research', title: 'ISRO learning pathways', description: 'Course calendars, registration and LMS access from IIRS / ISRO.', icon: Rocket, resources: isroCourses },
  { id: 'hackathons', label: 'Build in public', title: 'Hackathons & innovation', description: 'National and international places to find a problem, form a team and ship a solution.', icon: Lightbulb, resources: hackathons },
  { id: 'academics', label: 'Learn with context', title: 'Academics & video learning', description: 'Official RGPV material, past papers and selected engineering video channels.', icon: BookOpen, resources: academics },
  { id: 'certifications', label: 'Strengthen your proof', title: 'Certifications & skill building', description: 'Recognised learning platforms for practical skills and career-ready credentials.', icon: Award, resources: certifications },
  { id: 'internships', label: 'Public sector', title: 'Government internships', description: 'Official public-sector portals for internships, research projects and policy programmes.', icon: Landmark, resources: governmentInternships },
  { id: 'iit', label: 'Research opportunities', title: 'IIT internships', description: 'The supplied IIT timeline and programme links. Always confirm dates and eligibility on the official page.', icon: GraduationCap, resources: iitInternships },
]

function initials(name: string) {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').split(/\s+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase()
}

const brandVectors = {
  google: siGoogle, apple: siApple, meta: siMeta, nvidia: siNvidia, infosys: siInfosys,
  accenture: siAccenture, wipro: siWipro, hcl: siHcl, sap: siSap, redhat: siRedhat,
  intel: siIntel, amd: siAmd, qualcomm: siQualcomm, cisco: siCisco, dell: siDell,
  atlassian: siAtlassian, zoho: siZoho, snowflake: siSnowflake, datadog: siDatadog,
  udemy: siUdemy, coursera: siCoursera, ycombinator: siYcombinator, devpost: siDevpost,
  youtube: siYoutube,
} as const

const specialMarks: Record<string, string> = {
  isro: 'ISRO', sih: 'SIH', drdo: 'DRDO', rgpv: 'RG', iit: 'IIT', india: 'GOI', aws: 'AWS',
  microsoft: 'MS', amazon: 'A', adobe: 'A', ibm: 'IBM', oracle: 'OR', salesforce: 'SF',
  servicenow: 'SN', workday: 'WD', browserstack: 'BS', tcs: 'TCS', cognizant: 'CO',
  capgemini: 'CG', ltimindtree: 'LT', techmahindra: 'TM', upgrad: 'upG', unstop: 'U',
  hack2skill: 'H2S', hackindia: 'HI', nptel: 'NPT', skillindia: 'SI', tcsion: 'TCS',
}

function brandKey(name: string) {
  const normalized = name.toLowerCase()
  if (normalized.includes('isro') || normalized.includes('iirs')) return 'isro'
  if (normalized.includes('smart india')) return 'sih'
  if (normalized.includes('drdo')) return 'drdo'
  if (normalized.includes('rgpv')) return 'rgpv'
  if (normalized.includes('iit')) return 'iit'
  if (normalized.includes('ministry') || normalized.includes('niti') || normalized.includes('nhrc') || normalized.includes('aicte') || normalized.includes('mosp') || normalized.includes('meity') || normalized.includes('environment') || normalized.includes('legislative') || normalized.includes('external affairs') || normalized.includes('pm internship')) return 'india'
  if (normalized.includes('amazon web') || normalized.includes('aws')) return 'aws'
  if (normalized.includes('microsoft')) return 'microsoft'
  if (normalized.includes('amazon')) return 'amazon'
  if (normalized.includes('adobe')) return 'adobe'
  if (normalized.includes('ibm')) return 'ibm'
  if (normalized.includes('oracle')) return 'oracle'
  if (normalized.includes('salesforce')) return 'salesforce'
  if (normalized.includes('servicenow')) return 'servicenow'
  if (normalized.includes('workday')) return 'workday'
  if (normalized.includes('browserstack')) return 'browserstack'
  if (normalized.includes('tata') || normalized.includes('tcs')) return normalized.includes('ion') ? 'tcsion' : 'tcs'
  if (normalized.includes('cognizant')) return 'cognizant'
  if (normalized.includes('capgemini')) return 'capgemini'
  if (normalized.includes('ltimindtree')) return 'ltimindtree'
  if (normalized.includes('tech mahindra')) return 'techmahindra'
  if (normalized.includes('upgrad')) return 'upgrad'
  if (normalized.includes('unstop')) return 'unstop'
  if (normalized.includes('hack2skill')) return 'hack2skill'
  if (normalized.includes('hackindia')) return 'hackindia'
  if (normalized.includes('nptel') || normalized.includes('swayam')) return 'nptel'
  if (normalized.includes('skill india')) return 'skillindia'
  if (normalized.includes('google')) return 'google'
  if (normalized.includes('apple')) return 'apple'
  if (normalized.includes('meta')) return 'meta'
  if (normalized.includes('nvidia')) return 'nvidia'
  if (normalized.includes('infosys')) return 'infosys'
  if (normalized.includes('accenture')) return 'accenture'
  if (normalized.includes('wipro')) return 'wipro'
  if (normalized.includes('hcl')) return 'hcl'
  if (normalized.includes('sap')) return 'sap'
  if (normalized.includes('red hat')) return 'redhat'
  if (normalized.includes('intel')) return 'intel'
  if (normalized.includes('amd')) return 'amd'
  if (normalized.includes('qualcomm')) return 'qualcomm'
  if (normalized.includes('cisco')) return 'cisco'
  if (normalized.includes('dell')) return 'dell'
  if (normalized.includes('atlassian')) return 'atlassian'
  if (normalized.includes('zoho')) return 'zoho'
  if (normalized.includes('snowflake')) return 'snowflake'
  if (normalized.includes('datadog')) return 'datadog'
  if (normalized.includes('udemy')) return 'udemy'
  if (normalized.includes('coursera')) return 'coursera'
  if (normalized.includes('y combinator')) return 'ycombinator'
  if (normalized.includes('devpost')) return 'devpost'
  if (normalized.includes('youtube')) return 'youtube'
  return 'generic'
}

function BrandMark({ name }: Pick<Resource, 'name'>) {
  const key = brandKey(name)
  const vector = brandVectors[key as keyof typeof brandVectors]
  return <span className="brand-mark" data-brand={key} aria-hidden="true" style={vector ? { color: '#' + vector.hex } : undefined}>{vector ? <svg viewBox="0 0 24 24"><path d={vector.path} /></svg> : <b>{specialMarks[key] ?? initials(name)}</b>}</span>
}

type DirectoryCategory = { id: string; nav: string; eyebrow: string; title: string; description: string; resources: Resource[]; tone: string }

const directoryCategories: DirectoryCategory[] = [
  { id: 'space', nav: 'ISRO', eyebrow: 'Space & research', title: 'ISRO Learning Desks', description: 'Official IIRS course calendars, registration and learning access for students exploring space science, geoinformatics and research.', resources: isroCourses, tone: 'space' },
  { id: 'hackathons', nav: 'HACKATHONS', eyebrow: 'National & global builds', title: 'Hackathons that move ideas forward', description: 'Choose an innovation arena, find the official portal and begin preparing before the problem statement opens.', resources: hackathons, tone: 'hack' },
  { id: 'academics', nav: 'ACADEMICS', eyebrow: 'Coursework, decoded', title: 'Your semester, properly sourced', description: 'Official RGPV schemes, practice papers and selected classroom channels for more deliberate study sessions.', resources: academics, tone: 'academics' },
  { id: 'certifications', nav: 'CERTIFICATIONS', eyebrow: 'Skill evidence', title: 'Credentials with career weight', description: 'Structured pathways from recognised learning providers—selected for buildable skill, not just another badge.', resources: certifications, tone: 'certs' },
  { id: 'internships', nav: 'GOVT DESKS', eyebrow: 'Public sector opportunities', title: 'Government internship desks', description: 'Direct pathways to official public-sector, research and ministry internship portals.', resources: governmentInternships, tone: 'govt' },
  { id: 'iit', nav: 'IIT SUMMER', eyebrow: 'Premier institutes', title: 'IIT Summer Research Programs', description: 'Fellowship tracks, SPARK, SRIP, SUN and department-level research desks across IIT campuses in India.', resources: iitInternships, tone: 'iit' },
  { id: 'startups', nav: 'STARTUPS', eyebrow: 'Founder launchpad', title: 'Build where ideas move fast', description: 'A high-leverage starting point for students who want to think like a founder and work in ambitious teams.', resources: [{ name: 'Y Combinator', href: 'https://www.ycombinator.com/', note: 'Startup School, founder resources and the global YC ecosystem.', tag: 'Founder path' }], tone: 'startup' },
  { id: 'companies', nav: 'MNC WALL', eyebrow: 'Global tech pipeline', title: 'Multinational engineering careers', description: 'Official career portals for Big Tech, Indian IT, semiconductor leaders and cloud companies.', resources: companies, tone: 'companies' },
]

function BoxCard({ resource, featured = false, category }: { resource: Resource; featured?: boolean; category: string }) {
  const inner = <><div className="box-logo"><BrandMark name={resource.name} /></div><div className="box-main"><span className="box-type">{resource.tag ?? 'Official source'}</span><h3>{resource.name}</h3><p>{resource.note}</p></div><div className="box-footer">{resource.href ? <span>Visit source <ArrowUpRight size={14} /></span> : <span className="pending-label">Link to be confirmed</span>}</div></>
  return resource.href ? <a className={'directory-box ' + (featured ? 'featured' : '')} data-category={category} href={resource.href} target="_blank" rel="noreferrer">{inner}</a> : <article className="directory-box pending" data-category={category}>{inner}</article>
}

function SearchResult({ resource }: { resource: Resource }) {
  return resource.href ? <a className="search-result" href={resource.href} target="_blank" rel="noreferrer"><BrandMark name={resource.name} /><span><b>{resource.name}</b><small>{resource.note}</small></span><ArrowUpRight size={15} /></a> : <div className="search-result pending"><BrandMark name={resource.name} /><span><b>{resource.name}</b><small>Official source link pending confirmation.</small></span></div>
}

function ThemeControl({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return <button className="directory-theme" onClick={onToggle} aria-label={'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' theme'}>{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
}

export default function ResourceHub() {
  const [theme, setTheme] = useState<Theme>(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [query, setQuery] = useState('')
  const [activeId, setActiveId] = useState('iit')
  const allResources = useMemo(() => directoryCategories.flatMap(category => category.resources), [])
  const category = directoryCategories.find(item => item.id === activeId) ?? directoryCategories[0]
  const activeIndex = directoryCategories.findIndex(item => item.id === category.id)
  const matches = query.trim() ? allResources.filter(resource => (resource.name + ' ' + resource.note + ' ' + resource.tag).toLowerCase().includes(query.trim().toLowerCase())) : []
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  const choose = (id: string) => { setActiveId(id); setQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }) }

  return <div className="directory-page boxed-directory" data-active={category.tone}>
    <header className="boxed-nav"><div className="boxed-shell"><a href="/" className="boxed-brand"><span>B</span><div><b>B.TECH MAKER</b><small>Opportunity Codex</small></div></a><nav aria-label="Resource categories">{directoryCategories.map(item => <button key={item.id} className={item.id === category.id ? 'active' : ''} onClick={() => choose(item.id)}>{item.nav}</button>)}</nav><div className="boxed-tools"><div className="boxed-search"><Search size={16} /><label className="sr-only" htmlFor="directory-search">Search resources</label><input id="directory-search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Search" />{query && <button onClick={() => setQuery('')}>×</button>}</div><ThemeControl theme={theme} onToggle={() => setTheme(current => current === 'light' ? 'dark' : 'light')} /></div></div></header>
    <main className="boxed-main"><div className="boxed-shell">
      {query ? <section className="directory-search-view"><p className="box-eyebrow">SEARCH RESULTS</p><h1>Find your next <i>destination.</i></h1><p className="box-description">{matches.length ? matches.length + ' resources match your search.' : 'No match found. Try an organisation, institute or topic.'}</p><div className="search-result-grid">{matches.map(resource => <SearchResult key={resource.name} resource={resource} />)}</div></section> : <section className="directory-category-view">
        <header className="boxed-section-header"><div><p className="box-eyebrow">{String(activeIndex + 1).padStart(2, '0')} / {category.eyebrow}</p><h1>{category.title}</h1><p className="box-description">{category.description}</p></div><div className="boxed-index"><span>{String(activeIndex + 1).padStart(2, '0')}</span><small>{category.resources.length} curated<br />destinations</small></div></header>
        <div className={'directory-box-grid grid-' + category.id}>{category.resources.map((resource, index) => <BoxCard key={resource.name} resource={resource} category={category.tone} featured={index === 0 && (category.id === 'startups' || category.id === 'hackathons' || category.id === 'space')} />)}</div>
        <aside className="directory-note"><Sparkles size={16} /><p>Always confirm programme dates, eligibility, fees and deadlines on the official source before applying.</p></aside>
      </section>}
    </div></main>
    <footer className="boxed-footer"><div className="boxed-shell"><span>© B.Tech Maker</span><p>Official sources. Clearer next moves.</p><a href="/"><ArrowLeft size={15} /> Back to main site</a></div></footer>
  </div>
}
