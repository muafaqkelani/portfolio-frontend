import { useEffect, useState } from 'react';
import { client, urlFor } from './sanityClient';

interface ProfileData {
  name: string;
  image: any;
  education: string;
  bio: string;
  location: string;
  availableForWork: boolean;
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

function App() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [skills, setSkills] = useState<SkillData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = `{
      "profile": *[_type == "profile"][0] {
        name, image, education, bio, location, availableForWork,
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
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center font-mono text-sm tracking-widest opacity-70">
        <div className="animate-pulse">SYSTEM INITIALIZING...</div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#020202] text-gray-200 font-sans py-16 px-4 selection:bg-cyan-500 selection:text-black relative overflow-hidden z-0">
      
      {/* إضاءة محيطية فاخرة (Ambient Background Glow) */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[600px] h-[500px] bg-gradient-to-b from-purple-900/20 via-cyan-900/10 to-transparent blur-[100px] -z-10 pointer-events-none"></div>

      <main className="max-w-xl mx-auto flex flex-col items-center relative z-10">
        
        {/* 1. الصورة الشخصية (بتأثير توهج احترافي) */}
        <div className="relative mb-8 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-700"></div>
          <div className="relative p-[3px] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            {profile.image ? (
              <img 
                src={urlFor(profile.image).width(240).height(240).url()} 
                alt={profile.name} 
                className="w-32 h-32 rounded-full border-[4px] border-[#020202] object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-[4px] border-[#020202] bg-gray-900"></div>
            )}
          </div>
          {profile.availableForWork && (
            <span className="absolute bottom-2 right-2 w-5 h-5 bg-emerald-400 border-4 border-[#020202] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
          )}
        </div>

        {/* 2. النصوص (Typography Refinements) */}
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          {profile.name}
        </h1>
        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-semibold text-[16px] mb-5 text-center tracking-wide">
          {profile.education}
        </h2>
        
        <p className="text-gray-400 text-[15px] mb-6 text-center leading-relaxed max-w-sm font-medium">
          {profile.bio}
        </p>

        {/* 3. شريط المعلومات (Info Pill) */}
        <div className="flex items-center justify-center gap-4 text-xs font-semibold mb-10 bg-white/[0.03] border border-white/[0.05] rounded-full px-5 py-2.5 backdrop-blur-md">
          <span className="text-gray-300 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {profile.location}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-700"></span>
          {profile.availableForWork ? (
            <span className="text-emerald-400 flex items-center gap-1.5">
              متاح للعمل (Available)
            </span>
          ) : (
            <span className="text-gray-500">غير متاح حالياً</span>
          )}
        </div>

        {/* 4. أزرار التواصل (Premium Interactive Buttons) */}
        <div className="w-full flex flex-col gap-4 mb-14">
          <a href="mailto:email@example.com" className="group relative w-full p-[1px] rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 hover:-translate-y-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative bg-[#050505] rounded-[15px] py-4 flex items-center justify-center gap-3 font-bold text-white group-hover:bg-opacity-0 transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              لنعمل معاً (Let's Work Together)
            </div>
          </a>
          
          {profile.cvUrl && (
            <a href={profile.cvUrl} target="_blank" rel="noopener noreferrer" className="w-full bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04] rounded-2xl py-4 flex items-center justify-center gap-3 font-semibold text-gray-300 hover:text-white transition-all duration-300 hover:-translate-y-0.5 backdrop-blur-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
              تحميل السيرة الذاتية (Resume)
            </a>
          )}
        </div>

        {/* 5. قسم التقنيات (Glassmorphism Badges) */}
        <div className="w-full mb-14">
          <h3 className="text-xs font-bold text-gray-400 mb-5 flex items-center gap-2 tracking-widest uppercase">
            <span className="text-cyan-400">{"<"}</span> TECH STACK <span className="text-cyan-400">{"/>"}</span>
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((skill) => (
              <div key={skill._id} className="bg-white/[0.02] border border-white/[0.08] text-gray-300 px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2.5 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-white transition-all duration-300 backdrop-blur-md cursor-default">
                {skill.image && (
                  <img src={urlFor(skill.image).width(24).url()} alt={skill.title} className="w-4 h-4 object-contain drop-shadow-md" />
                )}
                {skill.title}
              </div>
            ))}
          </div>
        </div>

        {/* 6. قسم المشاريع (High-end Cards) */}
        <div className="w-full">
          <h3 className="text-xs font-bold text-gray-400 mb-5 flex items-center gap-2 tracking-widest uppercase">
            <span className="text-purple-400">✧</span> PROJECTS
          </h3>
          
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <div key={project._id} className="group relative p-[1px] rounded-[24px] bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-500/30 transition-colors duration-500">
                <div className="bg-[#050505] border border-transparent rounded-[23px] relative overflow-hidden p-7 backdrop-blur-xl flex flex-col items-center">
                  
                  {/* إضاءة داخلية دقيقة عند المرور */}
                  <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <h4 className="text-xl font-bold text-white mb-3 text-center group-hover:text-cyan-300 transition-colors">{project.title}</h4>
                  <p className="text-gray-400 text-sm text-center mb-8 leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                  
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full bg-white/[0.03] border border-white/[0.05] hover:bg-white/[0.08] hover:border-white/[0.15] text-white rounded-xl py-3.5 flex justify-center items-center gap-2 text-sm font-semibold transition-all duration-300">
                      استكشاف المشروع
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. التذييل (Minimalist Footer) */}
        <div className="w-full flex justify-center gap-6 mt-16 pt-8 border-t border-white/[0.05]">
          {profile.socials?.map((social) => (
            <a key={social._key} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white hover:-translate-y-1 transition-all duration-300 text-sm font-medium">
              {social.platform}
            </a>
          ))}
        </div>

      </main>
    </div>
  );
}

export default App;