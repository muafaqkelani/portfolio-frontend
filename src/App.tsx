import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';
import { 
  FaTelegram, FaGithub, FaLinkedin, FaWhatsapp, FaTwitter, FaEnvelope, FaGlobe,
  FaReact, FaJava, FaPhp, FaJs, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker
} from 'react-icons/fa';
import { SiTypescript, SiLaravel, SiNestjs, SiTailwindcss, SiVite } from 'react-icons/si';

interface ProfileData {
  name: string;
  image: any;
  education: string;
  bio: string;
  location: string;
  availableForWork: boolean;
  email?: string;
  cvUrl: string;
  socials: { platform: string; url: string; _key: string }[];
}

interface SkillData {
  _id: string;
  title: string;
  image: any;
}

interface ProjectData {
  _id: string;
  title: string;
  description: string;
  mainImage: any;
  link: string;
}

// دالة ذكية لإرجاع أيقونة ولون منصات التواصل الاجتماعي
const getSocialIconAndColor = (platform: string) => {
  const lower = platform.toLowerCase();
  if (lower.includes('telegram') || lower.includes('تلغرام')) 
    return { icon: <FaTelegram className="text-xl text-[#229ED9]" />, color: 'hover:border-[#229ED9]/50 hover:bg-[#229ED9]/10' };
  if (lower.includes('github') || lower.includes('جيت هب')) 
    return { icon: <FaGithub className="text-xl text-white" />, color: 'hover:border-white/50 hover:bg-white/10' };
  if (lower.includes('linkedin') || lower.includes('لينكد إن')) 
    return { icon: <FaLinkedin className="text-xl text-[#0A66C2]" />, color: 'hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10' };
  if (lower.includes('whatsapp') || lower.includes('واتساب')) 
    return { icon: <FaWhatsapp className="text-xl text-[#25D366]" />, color: 'hover:border-[#25D366]/50 hover:bg-[#25D366]/10' };
  if (lower.includes('twitter') || lower.includes('x')) 
    return { icon: <FaTwitter className="text-xl text-white" />, color: 'hover:border-white/50 hover:bg-white/10' };
  
  return { icon: <FaGlobe className="text-xl text-cyan-400" />, color: 'hover:border-cyan-400/50 hover:bg-cyan-400/10' };
};

// دالة ذكية لإرجاع أيقونة ولون التقنيات والمهارات البرمجية
const getSkillIconAndColor = (title: string) => {
  const lower = title.toLowerCase();
  if (lower.includes('react')) return <FaReact className="text-xl text-[#61DAFB]" />;
  if (lower.includes('java')) return <FaJava className="text-xl text-[#ED8B00]" />;
  if (lower.includes('php')) return <FaPhp className="text-xl text-[#777BB4]" />;
  if (lower.includes('laravel')) return <SiLaravel className="text-xl text-[#FF2D20]" />;
  if (lower.includes('typescript') || lower.includes('ts')) return <SiTypescript className="text-xl text-[#3178C6]" />;
  if (lower.includes('javascript') || lower.includes('js')) return <FaJs className="text-xl text-[#F7DF1E]" />;
  if (lower.includes('node') || lower.includes('express')) return <FaNodeJs className="text-xl text-[#339933]" />;
  if (lower.includes('nest')) return <SiNestjs className="text-xl text-[#E0234E]" />;
  if (lower.includes('tailwind')) return <SiTailwindcss className="text-xl text-[#06B6D4]" />;
  if (lower.includes('html')) return <FaHtml5 className="text-xl text-[#E34F26]" />;
  if (lower.includes('css')) return <FaCss3Alt className="text-xl text-[#1572B6]" />;
  if (lower.includes('git')) return <FaGitAlt className="text-xl text-[#F05032]" />;
  if (lower.includes('docker')) return <FaDocker className="text-xl text-[#2496ED]" />;
  if (lower.includes('vite')) return <SiVite className="text-xl text-[#646CFF]" />;

  return <span className="text-cyan-400 font-bold">#</span>;
};

function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "profile": *[_type == "profile"][0] {
        name, image, education, bio, location, availableForWork, email,
        "cvUrl": cv.asset->url, 
        socials
      },
      "skills": *[_type == "skill"] | order(_createdAt asc),
      "projects": *[_type == "project"] | order(_createdAt desc)
    }`;

    client.fetch(query).then((data) => {
      setProfile(data.profile);
      setSkills(data.skills || []);
      setProjects(data.projects || []);
      setLoading(false);
    }).catch(console.error);
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#030508] text-cyan-500 flex items-center justify-center font-mono text-sm tracking-widest">
        <div className="animate-pulse">LOADING_SYSTEM...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#030508] text-gray-200 py-16 px-4 relative z-0 tech-grid selection:bg-cyan-500 selection:text-black">
      
      {/* إضاءة خلفية تقنية */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[60vw] max-w-[800px] h-[600px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <main className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
        
        {/* الصورة الشخصية */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-md opacity-50 group-hover:opacity-80 transition duration-500"></div>
          <div className="relative p-1 rounded-full bg-[#030508] border border-cyan-500/30">
            {profile.image && (
              <img 
                src={urlFor(profile.image).width(200).height(200).url()} 
                alt={profile.name} 
                className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover"
              />
            )}
          </div>
          {profile.availableForWork && (
            <span className="absolute bottom-1 right-2 w-4 h-4 bg-emerald-400 border-[3px] border-[#030508] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
          )}
        </div>

        {/* الاسم والتخصص */}
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 text-center md:whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
          {profile.name}
        </h1>
        
        <h2 className="font-mono text-cyan-400 text-sm md:text-base mb-6 text-center tracking-wider bg-cyan-950/40 px-4 py-1.5 rounded-full border border-cyan-500/20">
          <span className="text-gray-500">{"<"}</span> {profile.education} <span className="text-gray-500">{"/>"}</span>
        </h2>
        
        <p className="text-gray-400 text-sm md:text-base mb-8 text-center leading-loose max-w-xl">
          {profile.bio}
        </p>

        {/* أزرار التواصل الأساسية */}
        <div className="w-full max-w-xl flex flex-col gap-4 mb-8">
          <a href={profile.email ? `mailto:${profile.email}` : "mailto:contact@muafaq.dev"} className="group relative w-full p-[1px] rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300">
            <div className="relative bg-[#080c14] rounded-[11px] py-4 flex items-center justify-center gap-3 font-bold text-white group-hover:bg-opacity-0 transition-all duration-300">
              <FaEnvelope className="text-cyan-400 text-lg" /> لنعمل معاً (Let's Work Together)
            </div>
          </a>
          
          {profile.cvUrl && (
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-[#080c14] border border-cyan-900/50 hover:border-cyan-500/50 rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-cyan-100 hover:text-white transition-all duration-300">
              <span>📄</span> تحميل السيرة الذاتية (Resume)
            </a>
          )}
        </div>

        {/* روابط وسائل التواصل الاجتماعي مع أيقونات براند أصلية */}
        {profile.socials && profile.socials.length > 0 && (
          <div className="w-full max-w-xl mb-16 flex flex-wrap justify-center gap-4">
            {profile.socials.map((social) => {
              const { icon, color } = getSocialIconAndColor(social.platform);
              return (
                <a 
                  key={social._key} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`bg-[#0a0f18] border border-cyan-900/40 text-gray-200 px-6 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-all duration-300 ${color}`}
                >
                  {icon} {social.platform}
                </a>
              );
            })}
          </div>
        )}

        {/* قسم التقنيات مع لوغوات وألوان حقيقية */}
        <div className="w-full max-w-2xl mb-16 text-center">
          <h3 className="text-sm font-bold text-gray-400 mb-6 tracking-[0.2em]">TECH STACK</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-[#0a0f18] border border-cyan-900/30 text-gray-300 px-5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 hover:border-cyan-400 hover:text-white hover:shadow-[0_0_15px_rgba(34,211,238,0.15)] transition-all duration-300 cursor-default">
                {skill.image ? (
                  <img src={urlFor(skill.image).width(24).url()} alt={skill.title} className="w-4 h-4 object-contain" />
                ) : (
                  getSkillIconAndColor(skill.title)
                )}
                {skill.title}
              </div>
            ))}
          </div>
        </div>

        {/* قسم المشاريع */}
        <div className="w-full max-w-2xl">
          <h3 className="text-sm font-bold text-gray-400 mb-6 tracking-[0.2em] text-center">PROJECTS</h3>
          <div className="flex flex-col gap-6">
            {projects.map((project) => (
              <div key={project._id} className="group bg-[#0a0f18] border border-cyan-900/20 rounded-2xl overflow-hidden p-6 hover:border-cyan-500/40 transition-all duration-500 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl -z-10 group-hover:bg-cyan-500/10 transition-colors"></div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">{project.title}</h4>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-500 hover:text-cyan-300 transition-colors">
                    عرض المشروع <span className="mr-1">←</span>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;