import { EditProvider } from './context/EditContext'
import { showToast } from './context/EditContext'
import { CONTACT } from './data/contact'
import Nav from './components/Nav'
import EditBanner from './components/EditBanner'
import Hero from './components/Hero'
import Contact from './components/Contact'
import './styles/sections.css'

function saveAll() {
  try {
    const data = {
      heroBio: document.getElementById('heroBio')?.innerHTML || '',
      heroName: document.querySelector('.hero-name')?.innerHTML || '',
      aboutP1: document.getElementById('aboutP1')?.innerHTML || '',
      aboutP2: document.getElementById('aboutP2')?.innerHTML || '',
      aboutP3: document.getElementById('aboutP3')?.innerHTML || '',
      contactBio: document.getElementById('contactBio')?.innerHTML || '',
      expList: document.getElementById('expList')?.innerHTML || '',
      portGrid: document.getElementById('portGrid')?.innerHTML || '',
      coursesGrid: document.getElementById('coursesGrid')?.innerHTML || '',
      toolsWrap: document.getElementById('toolsWrap')?.innerHTML || '',
    }
    localStorage.setItem('msPort_v4', JSON.stringify(data))
    showToast('✓ Saved!')
  } catch (e) {
    showToast('Could not save — try again')
  }
}

function loadSaved() {
  try {
    const raw = localStorage.getItem('msPort_v4')
    if (!raw) return
    const d = JSON.parse(raw)
    const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.innerHTML = val }
    set('heroBio', d.heroBio); set('aboutP1', d.aboutP1); set('aboutP2', d.aboutP2)
    set('aboutP3', d.aboutP3); set('contactBio', d.contactBio)
    set('expList', d.expList); set('portGrid', d.portGrid)
    set('coursesGrid', d.coursesGrid); set('toolsWrap', d.toolsWrap)
  } catch (e) {}
}

export default function App() {
  // Load saved content after mount
  if (typeof window !== 'undefined') {
    window.addEventListener('load', loadSaved, { once: true })
  }

  return (
    <EditProvider>
      <Nav />
      <EditBanner onSave={saveAll} />

      <Hero />

      {/* STATS */}
      <div className="stats-row">
        <div className="stat-b"><span className="stat-n">4+</span><div className="stat-l">Years Exp.</div></div>
        <div className="stat-b"><span className="stat-n">5</span><div className="stat-l">Companies</div></div>
        <div className="stat-b"><span className="stat-n">13+</span><div className="stat-l">Tools</div></div>
        <div className="stat-b"><span className="stat-n">Honors</span><div className="stat-l">Ain Shams · 2021</div></div>
      </div>

      {/* ABOUT */}
      <div className="sec alt" id="about">
        <div className="wrap">
          <div className="s-eye" data-editable="true">01 / About</div>
          <h2 className="s-title" data-editable="true">Designing Learning<br />That Actually Works</h2>
          <div className="about-grid">
            <div>
              <p className="about-p" id="aboutP1" data-editable="true">
                Graduated with Honors in 2021 from the Faculty of Specific Education, Ain Shams University,
                majoring in Educational Technology. My graduation project focused on the design and development
                of Learning Management Systems (LMS).
              </p>
              <p className="about-p" id="aboutP2" data-editable="true">
                Currently full-time Instructional Designer at Selaheltelmeez, where I design storyboards,
                develop educational games, and create interactive learning experiences. Every project begins
                with a thorough Needs Analysis.
              </p>
              <p className="about-p" id="aboutP3" data-editable="true">
                I believe the most effective learning experiences encourage learners to think, explore, and make
                decisions — not passively receive information.
              </p>
            </div>
            <div className="skills-panel">
              <div className="sp-head" data-editable="true">Core Competencies</div>
              <div id="skillRows">
                {['Instructional Design','Storyboarding','Gamification','Needs Analysis',
                  'Articulate Storyline','Video Production','QA Review','AI Tools Integration'
                ].map(name => (
                  <div key={name} className="sk-r">
                    <div className="sk-h">
                      <span className="sk-name" data-editable="true">{name}</span>
                    </div>
                    <div className="sk-track" />
                    <button className="sk-del" onClick={e => e.target.closest('.sk-r').remove()}>✕</button>
                  </div>
                ))}
              </div>
              <div className="add-ctrl" style={{ marginTop: '.8rem' }}>
                <button className="add-btn-sm" onClick={() => {
                  const name = prompt('Skill name:'); if (!name) return
                  const rows = document.getElementById('skillRows')
                  const row = document.createElement('div'); row.className = 'sk-r'
                  row.innerHTML = `<div class="sk-h"><span class="sk-name" data-editable contenteditable="true">${name}</span></div><div class="sk-track"></div><button class="sk-del" onclick="this.closest('.sk-r').remove()">✕</button>`
                  rows.appendChild(row)
                }}>+ Add Skill</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPERIENCE */}
      <div className="sec" id="experience">
        <div className="wrap">
          <div className="s-eye" data-editable="true">02 / Experience</div>
          <h2 className="s-title" data-editable="true">Where I've Built Things</h2>
          <div className="add-ctrl" style={{ textAlign: 'right', marginBottom: '1rem' }}>
            <button className="add-btn-sm" onClick={() => openExpModal()}>+ Add Position</button>
          </div>
          <div className="exp-list" id="expList">
            <ExpCard date="Sep 2024 — Present" badge="bf" badgeLabel="Full-time" company="Selaheltelmeez" title="Instructional Designer"
              duties={['Conducting Needs Analysis to identify learning gaps and design targeted solutions','Developing storyboards guiding creation of interactive learning materials','Reviewing graphic designs and media to ensure alignment with learning objectives','Performing Quality Assurance (QA) to verify content accuracy and effectiveness','Designing innovative concepts for videos, educational games, and interactive elements','Integrating AI tools into instructional design and creative production workflows, including educational game development, graphic design, motion graphics, video production, and interactive content creation']} />
            <ExpCard date="Jul 2024 — Sep 2024" badge="bfr" badgeLabel="Freelance" company="almentor" title="Instructional Designer"
              duties={['Designing and creating digital educational content for students','Researching, processing, and developing video content','Designing gamification and interaction to enhance learner experience','Collaborating with the team to reach best outcomes']} />
            <ExpCard date="Mar 2024 — Aug 2024" badge="bf" badgeLabel="Full-time" company="Kayfa" title="Instructional Designer"
              duties={['Creating e-learning storyboards addressing different learning styles','Setting desired goals and measuring their achievement','Designing gamification and interaction to enhance learner experience','Reviewing output and writing notes for required modifications']} />
            <ExpCard date="Feb 2023 — Jul 2024" badge="bfr" badgeLabel="Freelance" company="learnkhana" title="Instructional Designer"
              duties={['Designing digital educational content to train corporate employees','Creating e-learning storyboards','Screen recording montage with voiceover','Researching and developing video content; implementing client modifications']} />
            <ExpCard date="Aug 2020 — Oct 2020" badge="bi" badgeLabel="Internship" company="Nafham Education" title="Instructional Designer Intern"
              duties={['Converting academic content into structured educational content','Creating e-learning storyboards for diverse learning styles','Producing supporting materials: audio, videos, gamification, simulations','Cross-department collaboration to ensure instructional design integrity']} />
          </div>
        </div>
      </div>

      {/* PORTFOLIO */}
      <div className="sec alt" id="portfolio">
        <div className="wrap">
          <div className="s-eye" data-editable="true">03 / Selected Work</div>
          <h2 className="s-title" data-editable="true">Storyboards, Games<br />&amp; Learning Experiences</h2>
          <div className="port-grid" id="portGrid">
            <PortCard grad="g6" emoji="🌌" type="3D Interactive" title="Cosmic Journey: From Galaxies to Moons"
              desc="A scientific 3D journey from the Local Group of galaxies through the Milky Way to the Solar System's planets and moons, running on a live real-time clock."
              tags={['3D Interactive','Astronomy','AI-Assisted']}
              gameLink="https://cosmic-journey-rho.vercel.app" gameLabel="🚀 Interactive" />
            <PortCard grad="g1" emoji="🪐" type="3D Interactive" title="Solar Odyssey: Space Explorer"
              desc="Explore the Sun, the planets and their major moons in 3D using NASA JPL data, then zoom out to the Milky Way and nearby galaxies, with a full Arabic interface."
              tags={['3D Interactive','Solar System','AI-Assisted']}
              gameLink="https://rihla-space-explorer.vercel.app" gameLabel="🚀 Interactive" />
            <PortCard grad="g2" emoji="🕸️" type="3D Educational Game" title="Nassaj: Threads of Knowledge"
              desc="A 3D voxel adventure where learners guide Nassaj the spider across 10 floating islands, answering science questions to weave bridges and bring light back to the garden."
              tags={['3D Game','Science','AI-Assisted']}
              gameLink="https://khuyoot-al-maarifa.vercel.app" />
            <PortCard grad="g1" emoji="🌍" type="Educational Game" title="The Pearl Hunting Game" desc="Collect electricity from the grid by answering the questions correctly." tags={['Gamification','Storyboard','Geography']}  sbLink="https://oman_soc - Google Drive"/>
            <PortCard grad="g2" emoji="🏛️" type="E-Learning Module" title="African Union & Economic Blocs" desc="Flashcard sets and interactive scenarios covering African economic blocs with varied patterns." tags={['Flashcards','Scenario','Africa']} />
            <PortCard grad="g3" emoji="🎙️" type="Voiceover Script" title="Colloquial Arabic Scripts" desc="Converting formal texts into scene-structured colloquial scripts with transition phrases for video production." tags={['Scripting','Voiceover','Video']} />
            <PortCard grad="g4" emoji="📊" type="Simulation" title="Africa Population Growth Sim" desc="Resource management game examining population growth causes through decision-making mechanics." tags={['Simulation','Decision-Making','Demographics']} />
            <PortCard grad="g5" emoji="🏺" type="Storyboard" title="Egypt's Civilizational Role" desc="Storyboard and flashcard series exploring Egypt's cultural and historical influence across Africa." tags={['Storyboard','Flashcards','History']} />
            <PortCard grad="g6" emoji="🏙️" type="Interactive Scenario" title="Nigeria City Dialogue Scenarios" desc="Dialogue-based interactive scenarios addressing social issues with visual feedback systems." tags={['Dialogue','Scenario','Social Studies']} />
            <div className="add-card port-card" style={{ minHeight: 280 }} onClick={() => alert('Add new project — use edit mode')}>
              <div className="add-icon-circle">+</div>
              <span style={{ fontSize: '.85rem' }}>Add New Project</span>
            </div>
          </div>
        </div>
      </div>

      {/* COURSES */}
      <div className="sec" id="courses">
        <div className="wrap">
          <div className="s-eye" data-editable="true">04 / Learning</div>
          <h2 className="s-title" data-editable="true">Courses &amp;<br />Certifications</h2>
          <div className="courses-grid" id="coursesGrid">
            <CourseCard platform="Meska AI" title="AI Training" />
            <CourseCard platform="MaharaTech" title="Instructional Design · E-learning Fundamentals · Gamification in eLearning · Computer Network Fundamentals" />
            <CourseCard platform="Edraak" title="Advanced Skills in Educational Technology · Gamification" />
            <CourseCard platform="LinkedIn Learning" title="Learning Articulate Storyline 3 · Storyboarding" />
            <CourseCard platform="Edmodo" title="Edmodo Basics — Digital Collaboration Platform" />
            <CourseCard platform="Coursera" title="Gamification — Strengthened instructional gamification skills." />
          </div>
          <div className="add-ctrl" style={{ marginTop: '1rem' }}>
            <button className="add-btn-sm" onClick={() => {
              const plat = prompt('Platform:'); const ttl = prompt('Course title(s):')
              if (!ttl) return
              const grid = document.getElementById('coursesGrid')
              const card = document.createElement('div'); card.className = 'course-card'
              card.innerHTML = `<div class="course-plat">${plat||'Platform'}</div><div class="course-ttl" data-editable contenteditable="true">${ttl}</div><div class="ei" style="display:flex"><button class="del" onclick="this.closest('.course-card').remove()">✕</button></div>`
              grid.appendChild(card)
            }}>+ Add Course</button>
          </div>
        </div>
      </div>

      {/* TOOLS */}
      <div className="sec alt" id="tools">
        <div className="wrap">
          <div className="s-eye" data-editable="true">05 / Toolkit</div>
          <h2 className="s-title" data-editable="true">Tools &amp;<br />Software</h2>
          <div className="tools-wrap" id="toolsWrap">
            {[['🤖','AI tools'],['🎯','Articulate Storyline'],['🎬','Adobe After Effects'],['✂️','Adobe Premiere'],
              ['🖼️','Adobe Photoshop'],['✒️','Adobe Illustrator'],['📄','Adobe InDesign'],
              ['📚','Adobe Captivate'],['🎥','Camtasia Studio'],['⬛','OBS Studio'],
              ['🖥️','Course Lab'],['📊','LMS'],['💼','Microsoft Office']
            ].map(([ico, name]) => (
              <ToolChip key={name} ico={ico} name={name} />
            ))}
            <button className="add-tool-btn" onClick={() => {
              const v = prompt('Tool name:'); if (!v) return
              const ico = prompt('Icon:','🛠')||'🛠'
              const wrap = document.getElementById('toolsWrap')
              const chip = document.createElement('span'); chip.className = 'tool-chip'
              chip.innerHTML = `<span>${ico}</span>${v}`
              chip.onclick = () => { if (document.body.classList.contains('editing') && confirm(`Remove "${v}"?`)) chip.remove() }
              wrap.insertBefore(chip, wrap.querySelector('.add-tool-btn'))
            }}>+ Add Tool</button>
          </div>
        </div>
      </div>

      <Contact />

      {/* FOOTER */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-wrap">
          <span>© 2025 Mahmoud Saied Abdelhamid · Instructional Designer</span>
          <a href={CONTACT.drive} target="_blank" rel="noreferrer">Portfolio Drive ↗</a>
        </div>
      </div>
    </EditProvider>
  )
}

/* ── Sub-components ── */

function ExpCard({ date, badge, badgeLabel, company, title, duties }) {
  return (
    <div className="exp-card">
      <div>
        <div className="exp-date" data-editable="true">{date}</div>
        <div className={`exp-badge ${badge}`}>{badgeLabel}</div>
      </div>
      <div style={{ position: 'relative' }}>
        <div className="exp-co" data-editable="true">{company}</div>
        <div className="exp-ttl" data-editable="true">{title}</div>
        <ul className="exp-ul">
          {duties.map((d, i) => <li key={i} data-editable="true">{d}</li>)}
        </ul>
        <div className="ei">
          <button onClick={e => {
            const ul = e.target.closest('div').previousElementSibling
            const li = document.createElement('li'); li.setAttribute('data-editable',''); li.setAttribute('contenteditable','true'); li.textContent = 'New responsibility'
            ul.appendChild(li); li.focus()
          }}>+</button>
          <button className="del" onClick={e => confirm('Remove position?') && e.target.closest('.exp-card').remove()}>✕</button>
        </div>
      </div>
    </div>
  )
}

// A link is usable only when it is a real http(s) address (no spaces).
function isUrl(u) {
  if (!u || /\s/.test(u)) return false
  try { return /^https?:$/.test(new URL(u).protocol) } catch { return false }
}

function PortCard({ grad, emoji, type, title, desc, tags, gameLink='', gameLabel='🎮 Game', sbLink='', vidLink='' }) {
  const editLink = (e, type) => {
    const a = e.currentTarget
    // Visitors: real links open in a new tab; empty ones do nothing.
    if (!document.body.classList.contains('editing')) { if (a.classList.contains('empty')) e.preventDefault(); return }
    e.preventDefault()
    const url = prompt(`Enter ${type} URL:`)
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noreferrer'; a.classList.remove('empty') }
  }
  const link = (href, dataType, label, kind) => {
    const ok = isUrl(href)
    return (
      <a href={ok ? href : '#'} className={`port-link${ok ? '' : ' empty'}`} data-type={dataType}
        target={ok ? '_blank' : undefined} rel={ok ? 'noreferrer' : undefined}
        onClick={e => editLink(e, kind)}>{label}</a>
    )
  }
  return (
    <div className="port-card">
      <div className={`port-thumb ${grad}`}>{emoji}
        <span className="port-type-tag">{type}</span>
      </div>
      <div className="port-body">
        <div className="port-title">{title}</div>
        <div className="port-desc">{desc}</div>
        <div className="port-links">
          {link(gameLink, 'game', gameLabel, 'Game')}
          {link(sbLink, 'storyboard', '📄 Storyboard', 'Storyboard')}
          {link(vidLink, 'video', '▶ Video', 'Video')}
        </div>
        <div className="port-tags">{tags.map(t=><span key={t} className="port-tag">{t}</span>)}</div>
      </div>
      <div className="ei">
        <button className="del" onClick={e=>confirm('Remove project?')&&e.target.closest('.port-card').remove()}>✕</button>
      </div>
    </div>
  )
}

function CourseCard({ platform, title }) {
  return (
    <div className="course-card">
      <div className="course-plat">{platform}</div>
      <div className="course-ttl" data-editable="true">{title}</div>
      <div className="ei">
        <button className="del" onClick={e=>e.target.closest('.course-card').remove()}>✕</button>
      </div>
    </div>
  )
}

function ToolChip({ ico, name }) {
  const handleClick = () => {
    if (document.body.classList.contains('editing') && confirm(`Remove "${name}"?`)) {
      // handled by DOM
    }
  }
  return (
    <span className="tool-chip" onClick={handleClick}>
      <span>{ico}</span>{name}
    </span>
  )
}
